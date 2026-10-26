CREATE TABLE `studio_bookings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`session_type` text NOT NULL,
	`preferred_date` text NOT NULL,
	`duration` text NOT NULL,
	`genre` text DEFAULT '' NOT NULL,
	`project_stage` text DEFAULT '' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
