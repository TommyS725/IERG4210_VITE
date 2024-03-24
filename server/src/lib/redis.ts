import dotenv from "dotenv";
import { createClient } from "redis";
import { z } from "zod";

dotenv.config();

const SESSION_TTL = 60 * 60 * 24 * 7; // 1 week

const REDIS_HOST = process.env.REDIS_HOST;
if (!REDIS_HOST) {
  throw new Error("REDIS_HOST is not set");
}

console.log("Connecting to Redis at host:", REDIS_HOST);

const redis_url = `redis://${REDIS_HOST}:6379`;

const client = await createClient({
  url: redis_url,
}).on('connect', () => {
  console.log('Connected to Redis');
}).on('error', (err) => {
  console.error('Error with Redis client:', err);
})
.connect();

const sessionSchema = z.object({
  id: z.string().length(36), // session id (uuid)
  userId: z.string().length(36), // user id (uuid)
  admin: z.boolean().default(false), // admin flag
  createdAt: z.number(), // timestamp of session creation
  authExpiry: z.number(), // timestamp of auth cookie expiry
});


class Redis {
  static setSession = async (userId:string,authExp:number,isAdmin:boolean) => {
    if (!sessionSchema.shape.userId.safeParse(userId).success) {
      throw new Error("Invalid userId");
    }
    const id = crypto.randomUUID();
    const createdAt = Date.now();
    const session = {
      id,
      userId,
      createdAt,
      admin: isAdmin,
      authExpiry: authExp
    } satisfies z.infer<typeof sessionSchema>;
    const sessionKey = `session:${id}`;
    const sessionStr = JSON.stringify(session);
    await client.setEx(sessionKey, SESSION_TTL, sessionStr);
    console.log("Session created, id:",id);
    return session;
  };

  static getSession = async (id: string) => {
    const key = `session:${id}`;
    const sessionStr = await client.get(key);
    if (!sessionStr) {
      return null;
    }
    try {
      const json = JSON.parse(sessionStr);
      const session = sessionSchema.parse(json);
      return session;
    } catch (e) {
      //delete invalid session
      await client.del(key);
      return null;
    }
  };

  static clearSession = async (id: string) => {
    const key = `session:${id}`;
    await client.del(key);
  };

}



export default Redis;
