import { sql, type InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

export const messages = sqliteTable("messages", {
	id: integer("id").primaryKey(),
	createdAt: text("created_at")
		.notNull()
		.default(sql`(CURRENT_TIMESTAMP)`),
	message: text("message").notNull(),
});

export type Message = InferSelectModel<typeof messages>;
export const insertMessageSchema = createInsertSchema(messages);
