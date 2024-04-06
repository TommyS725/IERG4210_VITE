-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: 127.0.0.1    Database: store
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__drizzle_migrations`
--

DROP TABLE IF EXISTS `__drizzle_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__drizzle_migrations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `hash` text NOT NULL,
  `created_at` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__drizzle_migrations`
--

LOCK TABLES `__drizzle_migrations` WRITE;
/*!40000 ALTER TABLE `__drizzle_migrations` DISABLE KEYS */;
INSERT INTO `__drizzle_migrations` VALUES (1,'beb5b0d4c8afc3aaed6e563ae362c2b727f5fccc84694e222dc47336f76df2f3',1708817917921);
/*!40000 ALTER TABLE `__drizzle_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `cid` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `catorgories_name_unique_idx` (`name`),
  KEY `categories_name_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('851ec4f9-cf7a-4f97-86e0-af286535b680','Electronics'),('91d438c4-611a-4168-aa9b-a03ee826d12f','Fashion'),('835a57b0-7e38-4bc4-94d4-3f38a788750b','Food & Grocery'),('95a89b80-b689-4fd6-a22f-6032b467165a','Health & Personal Care');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `UUID` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `digest` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `orderDetails` text,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UUID`),
  KEY `orders_username_idx` (`username`),
  KEY `orders_createdAt_idx` (`createdAt`),
  CONSTRAINT `orders_username_users_username_fk` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('02c85d4a-1800-4662-ae89-caa8a013944b','test-usr','27da78cfa9f82e5a32b94e2281122aaf767dbe3542f4f6d9322c7316a28af995','ff75de0d9786e20e4d0534a552c4e3fa',NULL,'2024-04-06 17:06:52'),('8f767685-005e-41df-9915-311ca7cbdde9','test-usr','d6c52f24b5ee14c348f39741fe13ff19aa027d21dc753d567de8541b761dff37','eaeeb8b048c909b0d901041c9500bc61','{\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\"659.08\",\"breakdown\":{\"item_total\":{\"currency_code\":\"USD\",\"value\":\"659.08\"}}},\"items\":[{\"name\":\"Macbook\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"659.08\"},\"quantity\":\"1\"}],\"custom_id\":\"8f767685-005e-41df-9915-311ca7cbdde9\",\"invoice_id\":\"8791f4ac-2c3f-4977-becd-a64e3dbffbbe\"}]}','2024-04-06 19:27:06'),('a1d35a37-c0c7-43c6-9580-9aedb243545c','test-usr','c6a5b4ea04d574ff4623d62113ca62ed781012ac6dc3cf96490de63a7624092b','59c7af6a977a4a207d1e36f1c19b05a9','{\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\"28.94\",\"breakdown\":{\"item_total\":{\"currency_code\":\"USD\",\"value\":\"28.94\"}}},\"items\":[{\"name\":\"Toothbrush\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"8.96\"},\"quantity\":\"1\"},{\"name\":\"Cargo Pants\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"19.98\"},\"quantity\":\"1\"}],\"custom_id\":\"a1d35a37-c0c7-43c6-9580-9aedb243545c\",\"invoice_id\":\"4c92a369-4651-4187-bd3c-1186ace35cba\"}]}','2024-04-06 19:25:44'),('b30df304-1978-4d51-8447-2b029507b342','yannis','05584101bd9e99b964ac613d8eadac4726c67745dd834db2c7401020ff6a5006','d255fbf3e6af964aeab0f808b61bfdfb','{\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\"33.43\",\"breakdown\":{\"item_total\":{\"currency_code\":\"USD\",\"value\":\"33.43\"}}},\"items\":[{\"name\":\"Vitamin\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"18.90\"},\"quantity\":\"1\"},{\"name\":\"Cashews\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"14.53\"},\"quantity\":\"1\"}],\"custom_id\":\"b30df304-1978-4d51-8447-2b029507b342\",\"invoice_id\":\"b11459e8-14fe-4bee-88c7-91fa07c04c32\"}]}','2024-04-05 12:34:14'),('b735bf9b-623c-418f-a689-991a4aca1977','yannis','c41b356e9ec95d34404967267b12bb2d9fd26e83261d2f2ed5e2330a695b7412','971353b6ec8487c0634ff7a807a8c6a3','{\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\"107.17\",\"breakdown\":{\"item_total\":{\"currency_code\":\"USD\",\"value\":\"107.17\"}}},\"items\":[{\"name\":\"Toothbrush\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"8.96\"},\"quantity\":\"1\"},{\"name\":\"Vitamin\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"18.90\"},\"quantity\":\"1\"},{\"name\":\"Shirt\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"29.50\"},\"quantity\":\"1\"},{\"name\":\"Bomber Jacket\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"39.96\"},\"quantity\":\"1\"},{\"name\":\"Royal Dansk Danish Cookie Selection\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"9.85\"},\"quantity\":\"1\"}],\"custom_id\":\"b735bf9b-623c-418f-a689-991a4aca1977\",\"invoice_id\":\"b951dbef-888e-4de9-a1e6-bb67236a8376\"}]}','2024-04-05 09:38:04'),('b9d40b07-e928-4ba1-bd94-3b794a13b6de','test-usr','c94de37ad056a355a632fe35390d8e9b1acc8c7e080874b033865275f8daf33e','6994c381247dbc0517959a1a0ea8f3ce','{\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\"1327.69\",\"breakdown\":{\"item_total\":{\"currency_code\":\"USD\",\"value\":\"1327.69\"}}},\"items\":[{\"name\":\"Vitamin\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"18.90\"},\"quantity\":\"1\"},{\"name\":\"Snack Box\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"34.00\"},\"quantity\":\"1\"},{\"name\":\"Cashews\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"14.53\"},\"quantity\":\"1\"},{\"name\":\"Macbook\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"659.08\"},\"quantity\":\"1\"},{\"name\":\"Royal Dansk Danish Cookie Selection\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"9.85\"},\"quantity\":\"1\"},{\"name\":\"Cargo Pants\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"19.98\"},\"quantity\":\"1\"},{\"name\":\"Shirt\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"29.50\"},\"quantity\":\"1\"},{\"name\":\"Quest 2\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"234.98\"},\"quantity\":\"1\"},{\"name\":\"Toothbrush\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"8.96\"},\"quantity\":\"1\"},{\"name\":\"Body Lotion\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"8.95\"},\"quantity\":\"1\"},{\"name\":\"Bomber Jacket\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"39.96\"},\"quantity\":\"1\"},{\"name\":\"Apple AirPods Pro (2nd Generation)\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"249.00\"},\"quantity\":\"1\"}],\"custom_id\":\"b9d40b07-e928-4ba1-bd94-3b794a13b6de\",\"invoice_id\":\"285c770c-a0ba-441e-a97d-4285464ca330\"}]}','2024-04-05 14:08:49'),('bf3852f3-2871-477d-b59a-d4fc9c843187','test-usr','fed60b68a5b5db9670c2479bad1c89d5ae522e4657f14578ef89aee34cbe8d8c','d2d5a2525dcb8295084281d3433ef6ce','{\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\"9.85\",\"breakdown\":{\"item_total\":{\"currency_code\":\"USD\",\"value\":\"9.85\"}}},\"items\":[{\"name\":\"Royal Dansk Danish Cookie Selection\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"9.85\"},\"quantity\":\"1\"}],\"custom_id\":\"bf3852f3-2871-477d-b59a-d4fc9c843187\",\"invoice_id\":\"25aa276e-fd3a-4cee-abee-5b442ae9ac17\"}]}','2024-04-06 19:24:45'),('d8654c14-fbd0-4d16-852e-09bc3afc00de','test-usr','5b8b32236f5cf2c57345523f14469def13c0908d4e0bb4a013bac11064dd20fb','2dc28c4d6504747d292020573cffdd05','{\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\"9.85\",\"breakdown\":{\"item_total\":{\"currency_code\":\"USD\",\"value\":\"9.85\"}}},\"items\":[{\"name\":\"Royal Dansk Danish Cookie Selection\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"9.85\"},\"quantity\":\"1\"}],\"custom_id\":\"d8654c14-fbd0-4d16-852e-09bc3afc00de\",\"invoice_id\":\"046b04b8-8446-4eeb-9d36-00e85399ebf2\"}]}','2024-04-06 19:19:11'),('f2d5b69d-51a7-40f1-a010-78ae0318f8fb','test-usr','419e4870610ff0c91cf64c4e7c172730299307aed53b79b52937a16b24c18029','994ea9e58c3de995d8ee678d9a43ed30','{\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\"9.85\",\"breakdown\":{\"item_total\":{\"currency_code\":\"USD\",\"value\":\"9.85\"}}},\"items\":[{\"name\":\"Royal Dansk Danish Cookie Selection\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"9.85\"},\"quantity\":\"1\"}],\"custom_id\":\"f2d5b69d-51a7-40f1-a010-78ae0318f8fb\",\"invoice_id\":\"54752529-657e-4ba7-b935-62191c5dcbff\"}]}','2024-04-06 19:23:02'),('f9b95dd0-59bb-47cf-95c1-6aca892cabbf','test-usr','7a580a316bb10cd65593de861695b32282b0da7849706fa0ee5251f4d4ab0f34','b99afecf73269b75242a33e024a3c9b4','{\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\"28.94\",\"breakdown\":{\"item_total\":{\"currency_code\":\"USD\",\"value\":\"28.94\"}}},\"items\":[{\"name\":\"Toothbrush\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"8.96\"},\"quantity\":\"1\"},{\"name\":\"Cargo Pants\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"19.98\"},\"quantity\":\"1\"}],\"custom_id\":\"f9b95dd0-59bb-47cf-95c1-6aca892cabbf\",\"invoice_id\":\"c10e946a-2e1d-41fc-9b12-24df269f6ba8\"}]}','2024-04-06 19:26:22'),('ff23ede5-80f2-43c6-a760-d220e04c21bc','test-usr','cc9e9eef768057be3c868a8f08eea2d02fa700a476e98022305bd959050aae28','a6af120a1741ea0f975a6408913264bc','{\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\"33.34\",\"breakdown\":{\"item_total\":{\"currency_code\":\"USD\",\"value\":\"33.34\"}}},\"items\":[{\"name\":\"Toothbrush\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"8.96\"},\"quantity\":\"1\"},{\"name\":\"Royal Dansk Danish Cookie Selection\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"9.85\"},\"quantity\":\"1\"},{\"name\":\"Cashews\",\"unit_amount\":{\"currency_code\":\"USD\",\"value\":\"14.53\"},\"quantity\":\"1\"}],\"custom_id\":\"ff23ede5-80f2-43c6-a760-d220e04c21bc\",\"invoice_id\":\"bcd12c9d-fffa-4b06-8c9a-5c9b7cef48bd\"}]}','2024-04-05 21:04:03');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `pid` char(26) NOT NULL,
  `cid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `description` text NOT NULL,
  `inventory` int NOT NULL,
  `image` varchar(255) NOT NULL,
  PRIMARY KEY (`pid`),
  UNIQUE KEY `products_name_unique` (`name`),
  KEY `products_cid_idx` (`cid`),
  KEY `products_name_idx` (`name`),
  CONSTRAINT `products_cid_categories_cid_fk` FOREIGN KEY (`cid`) REFERENCES `categories` (`cid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('01HQEVR4GVBW4HZ70EXZT85N2X','851ec4f9-cf7a-4f97-86e0-af286535b680','Macbook',659.08,'Apple 2020 MacBook Air Laptop M1 Chip, 13” Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Gold',2,'Macbook.jpeg'),('01HQEVVWMZ072YDANBWQTQ4S11','851ec4f9-cf7a-4f97-86e0-af286535b680','Quest 2',234.98,'Quest 2 — Advanced All-In-One Virtual Reality Headset — 128 GB',3,'Quest 2.jpeg'),('01HQEVX1S5B52Y8WRHPDQ7E7J0','851ec4f9-cf7a-4f97-86e0-af286535b680','Apple AirPods Pro (2nd Generation)',249,'Apple AirPods Pro (2nd Generation) Wireless Ear Buds with USB-C Charging, Up to 2X More Active Noise Cancelling Bluetooth Headphones, Transparency Mode, Adaptive Audio, Personalized Spatial Audio',10,'Apple AirPods Pro (2nd Generation).jpeg'),('01HQEVZH401X9G0Z9YVT3B34HS','835a57b0-7e38-4bc4-94d4-3f38a788750b','Snack Box',34,'OREO Original, OREO Golden, CHIPS AHOY! & Nutter Butter Cookie Snacks Variety Pack, 56 Snack Packs (2 Cookies Per Pack)',2,'Snack Box.jpeg'),('01HQEW0MKNHAN6PZSVCBM6AFZW','835a57b0-7e38-4bc4-94d4-3f38a788750b','Cashews',14.53,'Planters Lightly Salted Whole Cashews (8.5 oz Canister) Lightly salted with sea salt',34,'Cashews.jpeg'),('01HQEW227C6C9VGE9QJM8N35X8','835a57b0-7e38-4bc4-94d4-3f38a788750b','Royal Dansk Danish Cookie Selection',9.85,'Royal Dansk Danish Cookie Selection, No Preservatives or Coloring Added, 12 Ounce',20,'Royal Dansk Danish Cookie Selection.jpeg'),('01HQEW5966M9RYJ50J6QA2RFGY','91d438c4-611a-4168-aa9b-a03ee826d12f','Shirt',29.5,'Legendary Whitetails Men\'s Buck Camp Flannel, Long Sleeve Plaid Button Down Casual Shirt, Corduroy Cuffs',30,'Shirt.jpeg'),('01HQEW6N1JYYQVKVT5JWF95521','91d438c4-611a-4168-aa9b-a03ee826d12f','Bomber Jacket',39.96,'MAGCOMSEN Men\'s Bomber Jacket Warm Zip Up Spring Coat Lightweight Casual Windbreaker Pilot Jacket with Pockets',23,'Bomber Jacket.jpeg'),('01HQEWA303HP7EXC43HNZXXMT0','95a89b80-b689-4fd6-a22f-6032b467165a','Vitamin',18.9,'Nutricost Vitamin C with Rose Hips 1025mg, 240 Capsules - Vitamin C 1,000mg, Rose Hips 25mg, Premium, Non-GMO, Gluten Free Supplement',20,'Vitamin.jpeg'),('01HQEWBB3Q9A336WDH8JRN1BJR','95a89b80-b689-4fd6-a22f-6032b467165a','Body Lotion',8.95,'eos Shea Better Body Lotion- Fresh & Cozy, 24-Hour Moisture Skin Care, Lightweight & Non-Greasy, Made with Natural Shea, Vegan, 16 fl oz',49,'Body Lotion.jpeg'),('01HQEWDC2QRHKBNNTKE80TXH5D','95a89b80-b689-4fd6-a22f-6032b467165a','Toothbrush',8.96,'Colgate Gum Expert Ultra Soft Gum Toothbrush Pack, Extra Soft Toothbrush for Gum Bleeding and Irritation, Helps Deep Clean Along Gum Line, 2 Pack',15,'Toothbrush.jpeg'),('01HQEWTSYJP63TF5HAZ9HMPF93','91d438c4-611a-4168-aa9b-a03ee826d12f','Cargo Pants',19.98,'WZIKAI Mens Cargo Pants,Elastic Waist Sweatpants for Men Casual Long Trousers Light Jogger Pants Khaki XL\r\n',28,'Cargo Pants.jpeg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` varchar(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `hpassword` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `users_email_idx` (`email`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_username_idx` (`username`),
  KEY `users_user_idx` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('340f9014-95bb-40b1-93a0-c86936b3bab7','admin@admin.com','59b39859f64b67012aa9a2ca183cb19bc53cd3ea5ebf1c4ee03197236aa12603','7295c14ddcf8c19d4e60e33ccf1fd5b2',1,'admin-usr'),('72e1b97a-da4d-4201-aecb-8054894c63d8','usr@example.com','b270915e0a625afbcf1a95dd90d4b1405829570150474e82e71c0aee73939a73','d3bff477a0085064c3e6f5684c53bfa4',0,'test-usr'),('90461638-7bdc-483f-b0b8-cb8ceea05ec5','yannis@tommy.com','c4d8cce2234413b9803b5ecbbc4127a266076d70f49c5cb46d02544badb04927','99de3c9509114df51718df0aa1f3c745',1,'yannis');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-07  5:15:04
