ALTER TABLE `categories` ADD CONSTRAINT `catorgories_name_unique_idx` UNIQUE(`name`);--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_name_unique` UNIQUE(`name`);--> statement-breakpoint
ALTER TABLE `categories` DROP INDEX `catorgories_name_idx`;--> statement-breakpoint
ALTER TABLE `products` DROP INDEX `products_name_idx`;--> statement-breakpoint
CREATE INDEX `categories_name_idx` ON `categories` (`name`);--> statement-breakpoint
CREATE INDEX `products_name_idx` ON `products` (`name`);--> statement-breakpoint
CREATE INDEX `users_user_idx` ON `users` (`userid`);