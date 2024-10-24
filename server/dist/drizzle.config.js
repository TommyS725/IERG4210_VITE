import dotenv from "dotenv";
dotenv.config();
const DB_URL = process.env.DB_URL;
if (!DB_URL) {
    throw new Error("DB_URI is not set, please set it in .env file.");
}
export default {
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: 'mysql',
    dbCredentials: {
        url: DB_URL
    }
};
