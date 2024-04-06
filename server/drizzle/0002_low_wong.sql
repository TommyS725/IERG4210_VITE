CREATE TABLE `orders` (
	`UUID` varchar(36) NOT NULL,
	`username` varchar(255) NOT NULL,
	`digest` varchar(255) NOT NULL,
	`salt` varchar(255) NOT NULL,
	`orderDetails` text,
	`createdAt` timestamp NOT NULL DEFAULT NOW(),
	CONSTRAINT `orders_UUID` PRIMARY KEY(`UUID`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_username_unique` UNIQUE(`username`);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_username_idx` UNIQUE(`username`);--> statement-breakpoint
CREATE INDEX `orders_username_idx` ON `orders` (`username`);--> statement-breakpoint
CREATE INDEX `orders_createdAt_idx` ON `orders` (`createdAt`);--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_username_users_username_fk` FOREIGN KEY (`username`) REFERENCES `users`(`username`) ON DELETE cascade ON UPDATE cascade;