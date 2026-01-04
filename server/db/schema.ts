import {
    index,
    integer,
    pgEnum,
    pgTable,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdateFn(() => new Date()),
});

export const statusEnum = pgEnum("status", [
    "in_progress",
    "done",
    "pending",
    "on_hold",
]);

export const todosTable = pgTable(
    "todos",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        userId: integer("user_id")
            .notNull()
            .references(() => usersTable.id, { onDelete: "cascade" }),
        title: varchar({ length: 255 }).notNull(),
        status: statusEnum("status").notNull().default("pending"),
        description: varchar({ length: 255 }).notNull(),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdateFn(() => new Date()),
    },
    (table) => ({
        userIdIdx: index("user_id_idx").on(table.userId),
    })
);
