import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import { expiresDate, hashAuthToken } from "./utils.js";
import { randomBytes } from "crypto";
//three cookies are set in the browser
//1. session cookie => SESSID, httpOnly, secure, sameSite, expires in 1 week
//2. auth cookie => hashed(userId|expiryDate|password,salt), httpOnly, secure, sameSite, expires in 3 day
//3. csrf cookie => CSRF token, to be read by javascript and set as hidden field in forms, secure, sameSite, expires in the session
class Cookies {
    static setSessionCookie(c, sessionId) {
        const expires = expiresDate(7);
        setCookie(c, "SESSID", sessionId, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            expires,
        });
    }
    static getSessionCookie(c) {
        return getCookie(c, "SESSID");
    }
    static deleteSessionCookie(c) {
        deleteCookie(c, "SESSID");
    }
    static setAuthCookie(c, userId, expires, hpassword, salt) {
        const expTs = expires.getTime();
        const token = hashAuthToken(userId, expTs, hpassword, salt);
        setCookie(c, "auth", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            expires,
        });
    }
    static getAuthCookie(c) {
        return getCookie(c, "auth");
    }
    static deleteAuthCookie(c) {
        deleteCookie(c, "auth");
    }
    static setCsrfCookie(c) {
        const token = randomBytes(32).toString("hex");
        setCookie(c, "csrf", token, {
            sameSite: "Strict",
            secure: true,
        });
    }
    static getCsrfCookie(c) {
        return getCookie(c, "csrf");
    }
}
export default Cookies;
