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

export const studioBookings = sqliteTable("studio_bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  sessionType: text("session_type").notNull(),
  preferredDate: text("preferred_date").notNull(),
  duration: text("duration").notNull(),
  genre: text("genre").notNull().default(""),
  projectStage: text("project_stage").notNull().default(""),
  message: text("message").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
