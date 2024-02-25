-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: store
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

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
  UNIQUE KEY `catorgories_name_idx` (`name`)
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
  UNIQUE KEY `products_name_idx` (`name`),
  KEY `products_cid_idx` (`cid`),
  CONSTRAINT `products_cid_categories_cid_fk` FOREIGN KEY (`cid`) REFERENCES `categories` (`cid`) ON DELETE CASCADE
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-25  1:49:07
