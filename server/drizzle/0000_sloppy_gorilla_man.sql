CREATE TABLE `categories` (
	`cid` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `categories_cid` PRIMARY KEY(`cid`),
	CONSTRAINT `catorgories_name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`pid` char(26) NOT NULL,
	`cid` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`price` float NOT NULL,
	`description` text NOT NULL,
	`inventory` int NOT NULL,
	`image` varchar(255) NOT NULL,
	CONSTRAINT `products_pid` PRIMARY KEY(`pid`),
	CONSTRAINT `products_name_idx` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`userid` varchar(36) NOT NULL,
	`username` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`salt` varchar(255) NOT NULL,
	`admin` boolean NOT NULL DEFAULT false,
	CONSTRAINT `users_userid` PRIMARY KEY(`userid`),
	CONSTRAINT `users_email_idx` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `products_cid_idx` ON `products` (`cid`);--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_cid_categories_cid_fk` FOREIGN KEY (`cid`) REFERENCES `categories`(`cid`) ON DELETE restrict ON UPDATE cascade;