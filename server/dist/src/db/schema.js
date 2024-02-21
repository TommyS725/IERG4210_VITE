import { text, mysqlTable, uniqueIndex, int, index, varchar, char, } from "drizzle-orm/mysql-core";
export const categories = mysqlTable("categories", {
    // uuid
    cid: varchar("cid", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
}, (table) => ({
    nameIdx: uniqueIndex("catorgories_name_idx").on(table.name),
}));
export const products = mysqlTable("products", {
    // ulid
    pid: char("pid", { length: 26 }).primaryKey(),
    cid: varchar("cid", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    price: int("price").notNull(),
    description: text("description").notNull(),
    inventory: int("inventory").notNull(),
    image: varchar("image", { length: 255 }).notNull(),
}, (table) => ({
    cidIdx: index("products_cid_idx").on(table.cid)
}));
