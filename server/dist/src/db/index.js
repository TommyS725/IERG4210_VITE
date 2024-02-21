import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
const DB_URL = process.env.DB_URL;
if (!DB_URL) {
    throw new Error("DB_URI is not set, please set it in .env file.");
}
const connection = await mysql.createConnection({
    uri: DB_URL,
});
export const db = drizzle(connection);
