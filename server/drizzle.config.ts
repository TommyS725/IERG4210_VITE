
import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DB_URL
if (!DB_URL) {
  throw new Error("DB_URI is not set, please set it in .env file.");
}

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: 'mysql2',
  dbCredentials: {
    uri: DB_URL
  }
} satisfies Config;