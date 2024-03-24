import dotenv from "dotenv";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { createHmac, randomBytes } from "crypto";
dotenv.config();
//three cookies are set in the browser
//1. session cookie => SESSID, httpOnly, secure, sameSite, expires in 1 week
//2. auth cookie => hashed(userId|expiryDate|password,salt), httpOnly, secure, sameSite, expires in 3 day
//3. csrf cookie => CSRF token, to be read by javascript and set as hidden field in forms
const SECURE_COOKIE = process.env.SECURE_COOKIE?.toLowerCase() !== "false";
function expiresDate(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}
export function setSessionCookie(c, sessionId) {
    const expires = expiresDate(7);
    setCookie(c, "SESSID", sessionId, {
        httpOnly: true,
        secure: SECURE_COOKIE,
        sameSite: "Strict",
        expires,
    });
}
export function getSessionCookie(c) {
    return getCookie(c, "SESSID");
}
export function deleteSessionCookie(c) {
    deleteCookie(c, "SESSID");
}
export function setAuthCookie(c, userId, password, salt) {
    const expires = expiresDate(3);
    const expTs = expires.getTime();
    const hash = createHmac("sha256", salt);
    const unhashed = `${userId}${expTs}${password}`;
    const token = hash.update(unhashed).digest("hex");
    setCookie(c, "auth", token, {
        httpOnly: true,
        secure: SECURE_COOKIE,
        sameSite: "Strict",
        expires,
    });
}
export function getAuthCookie(c) {
    return getCookie(c, "auth");
}
export function deleteAuthCookie(c) {
    deleteCookie(c, "auth");
}
export function setCsrfCookie(c) {
    const token = randomBytes(32).toString("hex");
    setCookie(c, "csrf", token, {
        sameSite: "Strict",
    });
}
export function getCsrfCookie(c) {
    return getCookie(c, "csrf");
}
