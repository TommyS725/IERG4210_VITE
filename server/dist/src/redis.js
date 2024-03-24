import dotenv from "dotenv";
import { createClient } from "redis";
import { z } from "zod";
dotenv.config();
const SESSION_TTL = 60 * 60 * 24 * 7; // 1 week
const REDIS_URL = process.env.REDIS_URL;
if (!REDIS_URL) {
    throw new Error("REDIS_URL is not set, please set it in .env file.");
}
const client = createClient({
    url: REDIS_URL,
});
const sessionSchema = z.object({
    id: z.string().length(36), // session id (uuid)
    email: z.string().email(),
    isAdmin: z.boolean().default(false),
    createdAt: z.number(), // timestamp
});
export const setSession = async (email, isAdmin) => {
    if (!z.string().email().safeParse(email).success) {
        throw new Error("Invalid email");
    }
    isAdmin = isAdmin ? isAdmin : undefined;
    const id = crypto.randomUUID();
    const createdAt = Date.now();
    const session = {
        id,
        email,
        createdAt,
        isAdmin
    };
    const sessionKey = `session:${id}`;
    const sessionStr = JSON.stringify(session);
    await client.setEx(sessionKey, SESSION_TTL, sessionStr);
    return session;
};
export const getSession = async (id) => {
    const key = `session:${id}`;
    const sessionStr = await client.get(key);
    if (!sessionStr) {
        return null;
    }
    try {
        const json = JSON.parse(sessionStr);
        const session = sessionSchema.parse(json);
        return session;
    }
    catch (e) {
        //delete invalid session
        await client.del(key);
        return null;
    }
};
