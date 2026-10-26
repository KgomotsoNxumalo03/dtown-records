CREATE TABLE `enquiries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`organisation` text DEFAULT '' NOT NULL,
	`artist` text NOT NULL,
	`event_type` text NOT NULL,
	`event_date` text NOT NULL,
	`venue` text NOT NULL,
	`city` text NOT NULL,
	`budget` text DEFAULT '' NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
