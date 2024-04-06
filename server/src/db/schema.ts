import { sql } from "drizzle-orm";
import {
  text,
  mysqlTable,
  uniqueIndex,
  int,
  index,
  varchar,
  char,
  float,
  boolean,
  timestamp,
} from "drizzle-orm/mysql-core";

export const categories = mysqlTable(
  "categories",
  {
    // uuid
    cid: varchar("cid",{length:36}).primaryKey(),
    name: varchar("name",{length:255}).notNull(),
  },
  (table) => ({
    nameUniqueIdx: uniqueIndex("catorgories_name_unique_idx").on(table.name),
    nameIdx: index("categories_name_idx").on(table.name),

  })
);

export const products = mysqlTable(
  "products",
  {
    // ulid
    pid: char("pid",{length:26}).primaryKey(),
    cid: varchar("cid",{length:255}).references(() => categories.cid, {onDelete:'restrict',onUpdate:'cascade'}).notNull(),
    name: varchar("name",{length:255}).notNull().unique(),
    price: float("price").notNull(),
    description: text("description").notNull(),
    inventory: int("inventory").notNull(),
    image: varchar("image",{length:255}).notNull(),
  },
  (table) => ({
    cidIdx:index("products_cid_idx").on(table.cid),
    nameIdx: index("products_name_idx").on(table.name),
  })
);


export const users = mysqlTable(
  "users",
  {
    // uuid
    userid: varchar("userid",{length:36}).primaryKey(),
    username: varchar("username",{length:255}).unique().notNull(),
    email: varchar("email",{length:255}).notNull(),
    hpassword: varchar("hpassword",{length:255}).notNull(),
    salt : varchar("salt",{length:255}).notNull(),
    admin: boolean("admin").default(false).notNull(),
  },
  (table) => ({
    emailIdx: uniqueIndex("users_email_idx").on(table.email),
    usernameIdx: uniqueIndex("users_username_idx").on(table.username),
    userIndx:index("users_user_idx").on(table.userid),
  })
);


export const orders = mysqlTable(
  'orders',
  {
    UUID: varchar('UUID',{length:36}).primaryKey(),
    username: varchar('username',{length:255}).notNull().references(() => users.username,{onDelete:"cascade",onUpdate:'cascade'}),
    digest: varchar('digest',{length:255}).notNull(),
    salt: varchar('salt',{length:255}).notNull(),
    orderDetails: text('orderDetails'),
    createdAt:timestamp('createdAt').default(sql`NOW()`).notNull(),
  },
  (table) => ({
    usernameIdx:index('orders_username_idx').on(table.username),
    createdAtIdx:index('orders_createdAt_idx').on(table.createdAt),
  })
)
