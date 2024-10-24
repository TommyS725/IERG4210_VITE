import { Hono } from "hono";
import Session from "../lib/session.js";
import { db, schema } from "../db/client.js";
import { z } from "zod";
import { checkCsrf, requireSecure } from "../lib/middleware.js";
import { ClientError, expiresDate, FormValidator } from "../lib/utils.js";
import { createHmac, randomBytes } from "crypto";
import Cookies from "../lib/cookies.js";
import { and, eq } from "drizzle-orm";
const DEMO_USER_EMAILS = [
    "demo.user@tommyshum.com",
];
const authHandler = new Hono();
authHandler.use(requireSecure);
authHandler.get("/profile", async (c) => {
    // return c.json({
    //   username: "test",
    //   email: "a@b.com",
    //   userid:"2323",
    //   admin:true,
    // })
    const session = await Session.getSession(c);
    if (!session)
        return c.notFound();
    const profile = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.userid, session.userId),
        columns: {
            userid: true,
            username: true,
            email: true,
            admin: true,
        },
    });
    if (!profile) {
        await Session.clearSession(c);
        return c.notFound();
    }
    if (!profile.admin) {
        //not sending admin flag to client
        const { admin, ...rest } = profile;
        return c.json(rest);
    }
    return c.json(profile);
});
const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
authHandler.post("/login", checkCsrf, async (c) => {
    const parse = await FormValidator.parse(c, loginFormSchema);
    if (!parse.success)
        return FormValidator.errorRespone(c);
    const { email, password } = parse.data;
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
    });
    // console.log('user',user);
    if (!user)
        return ClientError.unauthorized(c);
    const { hpassword, salt } = user;
    const hash = createHmac("sha256", salt);
    const hashed = hash.update(password).digest("hex");
    const match = hashed === hpassword;
    if (!match)
        return ClientError.unauthorized(c);
    await Session.clearSession(c);
    const authExpiry = expiresDate(3);
    const sessionSet = Session.setSession(c, user.userid, authExpiry, user.admin);
    const authToken = Cookies.setAuthCookie(c, user.userid, authExpiry, hpassword, salt);
    await sessionSet;
    const redirectPath = user.admin ? "/admin/" : "/";
    return c.json({ message: "Login successful", redirect: redirectPath });
});
authHandler.get("/logout", async (c) => {
    await Session.clearSession(c);
    Cookies.deleteAuthCookie(c);
    return c.redirect("/");
});
const resetFormSchema = z.object({
    email: z.string().email(),
    oldPassword: z.string(),
    newPassword: z.string(),
    newPasswordConfirm: z.string(),
});
authHandler.put("change-password", checkCsrf, async (c) => {
    const parse = await FormValidator.parse(c, resetFormSchema);
    if (!parse.success)
        return FormValidator.errorRespone(c);
    const { email, oldPassword, newPassword, newPasswordConfirm } = parse.data;
    if (oldPassword === newPassword) {
        c.status(400);
        return c.text("New password must be different from old password");
    }
    if (newPassword !== newPasswordConfirm) {
        c.status(400);
        return c.text("New password and confirm password do not match");
    }
    const session = await Session.getSession(c);
    if (!session)
        return ClientError.unauthorized(c);
    const user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.userid, session.userId),
    });
    if (!user || user.email !== email) {
        await Session.clearSession(c);
        return ClientError.unauthorized(c);
    }
    if (DEMO_USER_EMAILS.includes(email)) {
        c.status(400);
        return c.text("Demo user");
    }
    const { hpassword, salt } = user;
    const hash = createHmac("sha256", salt);
    const oldHashedPw = hash.update(oldPassword).digest("hex");
    if (oldHashedPw !== hpassword) {
        c.status(400);
        return c.text("Original password is incorrect");
    }
    const newSalt = randomBytes(16).toString("hex");
    const newHash = createHmac("sha256", newSalt);
    const newHashedPw = newHash.update(newPassword).digest("hex");
    try {
        const transaction = await db.transaction(async (tx) => {
            const updated = await tx
                .update(schema.users)
                .set({
                salt: newSalt,
                hpassword: newHashedPw,
            })
                .where(and(eq(schema.users.userid, user.userid), eq(schema.users.email, email)));
            const affected = updated[0].affectedRows;
            if (affected !== 1) {
                throw new Error("Unable to update user password");
            }
            //logout user
            await Session.clearSession(c);
            Cookies.deleteAuthCookie(c);
        });
        return c.json({ message: "Password updated successfully" });
    }
    catch (error) {
        c.status(500);
        return c.text("Unable to update password");
    }
});
export default authHandler;
