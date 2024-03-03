import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { createConnection } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL 
if (!DB_URL) {
  throw new Error("DB_URI is not set, please set it in .env file.");
}

async function runMigration() {
  const connection = await createConnection({
      uri: DB_URL,
  });

  const db = drizzle(connection);
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
  } catch (error) {
    if (error.code === "ER_TABLE_EXISTS_ERROR") {
      console.log("Database already migrated");
    } else {
      throw error;
    }
  }


  await connection.end();

  console.log("Migration complete");
}

runMigration();