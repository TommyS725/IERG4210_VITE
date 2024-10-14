import { createMiddleware } from "hono/factory";
import Cookies from "./cookies.js";
import Session from "./session.js";
import { db } from "../db/client.js";
import { ClientError, hashAuthToken } from "./utils.js";
import dotenv from "dotenv";
dotenv.config();
const ssl = process.env.REQ_SSL === "true";
export const checkCsrf = createMiddleware(async (c, next) => {
    const csrfToken = Cookies.getCsrfCookie(c);
    if (!csrfToken || csrfToken === "") {
        console.log("no csrf token for ", c.req.path);
        return ClientError.badRequest(c);
    }
    try {
        const fd = await c.req.formData();
        const match = fd.get("csrf") === csrfToken;
        if (!match) {
            console.log("csrf token mismatch for ", c.req.path);
            return ClientError.badRequest(c);
        }
        console.log("csrf token match for ", c.req.path);
        await next();
    }
    catch (error) {
        return ClientError.badRequest(c);
    }
});
export const checkAdminAuthToken = createMiddleware(async (c, next) => {
    console.log("admin auth token check on", c.req.path);
    const session = await Session.getSession(c);
    const token = Cookies.getAuthCookie(c);
    if (!session)
        return ClientError.unauthorized(c);
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.userid, session.userId),
    });
    if (!user || !token) {
        if (!user)
            await Session.clearSession(c);
        return ClientError.unauthorized(c);
    }
    if (!session.admin || !user.admin)
        return ClientError.forbidden(c);
    const { hpassword, salt, userid } = user;
    const hashedToken = hashAuthToken(userid, session.authExpiry, hpassword, salt);
    const match = hashedToken === token;
    if (!match) {
        await Session.clearSession(c);
        Cookies.deleteAuthCookie(c);
        return ClientError.unauthorized(c);
    }
    console.log("admin auth token check passed", c.req.path);
    await next();
});
export const requireAdmin = createMiddleware(async (c, next) => {
    console.log("admin check on", c.req.path);
    const session = await Session.getSession(c);
    if (!session || !session.admin)
        return c.redirect("/login");
    console.log("admin check passed", c.req.path);
    await next();
});
export const setCsrfCookie = createMiddleware(async (c, next) => {
    // const cookie = Cookies.getCsrfCookie(c);
    // console.log("csrf cookie", cookie);
    // if (!cookie) {
    //   console.log("setting csrf cookie");
    //   Cookies.setCsrfCookie(c);
    // }
    Cookies.setCsrfCookie(c);
    await next();
});
export const requireSecure = createMiddleware(async (c, next) => {
    if (!ssl)
        return await next();
    const protocol = c.req.header("x-forwarded-proto");
    // console.log("protocol", protocol);
    if (protocol === "https")
        return await next();
    return ClientError.upgradeRequired(c);
});
export const checkAuthToken = createMiddleware(async (c, next) => {
    console.log("auth token check on", c.req.path);
    const session = await Session.getSession(c);
    const token = Cookies.getAuthCookie(c);
    if (!session)
        return ClientError.unauthorized(c);
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.userid, session.userId),
    });
    if (!user || !token) {
        if (!user)
            await Session.clearSession(c);
        return ClientError.unauthorized(c);
    }
    const { hpassword, salt, userid } = user;
    const hashedToken = hashAuthToken(userid, session.authExpiry, hpassword, salt);
    const match = hashedToken === token;
    if (!match) {
        await Session.clearSession(c);
        Cookies.deleteAuthCookie(c);
        return ClientError.unauthorized(c);
    }
    console.log("auth token check passed", c.req.path);
    await next();
});
