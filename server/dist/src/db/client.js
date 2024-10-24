import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import * as _schema from "./schema.js";
dotenv.config();
const DB_URL = process.env.DB_URL;
if (!DB_URL) {
    throw new Error("DB_URI is not set, please set it in .env file.");
}
const connection = mysql.createPool({
    uri: DB_URL,
});
export const db = drizzle(connection, {
    schema: _schema,
    mode: "default"
});
export const schema = _schema;
