import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const enquiries = sqliteTable("enquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  organisation: text("organisation").notNull().default(""),
  artist: text("artist").notNull(),
  eventType: text("event_type").notNull(),
  eventDate: text("event_date").notNull(),
  venue: text("venue").notNull(),
  city: text("city").notNull(),
  budget: text("budget").notNull().default(""),
  message: text("message").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
