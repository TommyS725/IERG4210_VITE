import { Context } from "hono";
import  Cookies  from "./cookies.js";
import Redis from "./redis.js";



class Session {
    /**
     *  get sessionId from cookie and return session object from redis
     * @param c 
     * @returns 
     */
    static getSession = async (c:Context) => {
        const sessionId = Cookies.getSessionCookie(c);
        if(!sessionId) return null;
        return await Redis.getSession(sessionId);
    }
    /**
     * set session in redis and set session cookie
     * @param c 
     * @param userId 
     * @returns 
     */
    static setSession = async (c:Context, userId:string,authExpiry:Date,isAdmin:boolean) => {
        const session = await Redis.setSession(userId,authExpiry.getTime(),isAdmin);
        Cookies.setSessionCookie(c, session.id);
        return session;
    }
    /**.js
     * clear session from redis and delete session cookie
     * @param c 
     * @returns 
     */
    static clearSession = async (c:Context) => {
        const sessionId = Cookies.getSessionCookie(c);
        if(!sessionId) return false;
        await Redis.clearSession(sessionId);
        Cookies.deleteSessionCookie(c);
        return true;
    }
}

export default Session;