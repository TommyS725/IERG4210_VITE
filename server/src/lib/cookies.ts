import { getCookie, setCookie, deleteCookie } from "hono/cookie";
import type { Context } from "hono";
import { expiresDate, hashAuthToken } from "./utils.js";
import { randomBytes } from "crypto";



//three cookies are set in the browser
//1. session cookie => SESSID, httpOnly, secure, sameSite, expires in 1 week
//2. auth cookie => hashed(userId|expiryDate|password,salt), httpOnly, secure, sameSite, expires in 3 day
//3. csrf cookie => CSRF token, to be read by javascript and set as hidden field in forms


class Cookies {
  static setSessionCookie(c: Context, sessionId: string) {
    const expires = expiresDate(7);
    setCookie(c, "SESSID", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires,
    });
  }
  static getSessionCookie(c: Context) {
    return getCookie(c, "SESSID");
  }

  static deleteSessionCookie(c: Context) {
    deleteCookie(c, "SESSID");
  }

  static setAuthCookie(
    c: Context,
    userId: string,
    expires: Date,
    hpassword: string,
    salt: string,
  ) {
    const expTs = expires.getTime();
    const token = hashAuthToken(userId, expTs, hpassword, salt);
    setCookie(c, "auth", token, {
      httpOnly: true,
      secure:true,
      sameSite: "Strict",
      expires,
    });
  }

  static getAuthCookie(c: Context) {
    return getCookie(c, "auth");
  }

  static deleteAuthCookie(c: Context) {
    deleteCookie(c, "auth");
  }
  static setCsrfCookie(c: Context) {
    const token = randomBytes(32).toString("hex");
    setCookie(c, "csrf", token, {
      sameSite: "Strict",
    });
  }
  static getCsrfCookie(c: Context) {
    return getCookie(c, "csrf");
  }
}


export default Cookies;