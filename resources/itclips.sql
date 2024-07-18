-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: itclips
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_reported` tinyint(1) NOT NULL DEFAULT '0',
  `order` int NOT NULL,
  `bookmarklist_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bookmark_bookmarklist1_idx` (`bookmarklist_id`),
  CONSTRAINT `fk_bookmark_bookmarklist1` FOREIGN KEY (`bookmarklist_id`) REFERENCES `tmp`.`bookmark_list` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark_category`
--

DROP TABLE IF EXISTS `bookmark_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark_category` (
  `id` bigint NOT NULL,
  `bookmark_id` bigint NOT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bookmark_category_bookmark1_idx` (`bookmark_id`),
  KEY `fk_bookmark_category_category1_idx` (`category_id`),
  CONSTRAINT `fk_bookmark_category_bookmark1` FOREIGN KEY (`bookmark_id`) REFERENCES `tmp`.`bookmark` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_bookmark_category_category1` FOREIGN KEY (`category_id`) REFERENCES `mydb`.`category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_category`
--

LOCK TABLES `bookmark_category` WRITE;
/*!40000 ALTER TABLE `bookmark_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark_like`
--

DROP TABLE IF EXISTS `bookmark_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark_like` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `bookmark_id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`bookmark_id`),
  KEY `FK_Bookmark_TO_BookmarkLike_1` (`bookmark_id`),
  CONSTRAINT `FK_Bookmark_TO_BookmarkLike_1` FOREIGN KEY (`bookmark_id`) REFERENCES `tmp`.`bookmark` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_User_TO_BookmarkLike_1` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_like`
--

LOCK TABLES `bookmark_like` WRITE;
/*!40000 ALTER TABLE `bookmark_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark_list`
--

DROP TABLE IF EXISTS `bookmark_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark_list` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_User_TO_BookmarkList_1` (`user_id`),
  CONSTRAINT `FK_User_TO_BookmarkList_1` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_list`
--

LOCK TABLES `bookmark_list` WRITE;
/*!40000 ALTER TABLE `bookmark_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark_list_comment`
--

DROP TABLE IF EXISTS `bookmark_list_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark_list_comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `bookmark_id` bigint NOT NULL,
  `contents` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `bookmark_id` (`bookmark_id`),
  CONSTRAINT `bookmarklistcomment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarklistcomment_ibfk_2` FOREIGN KEY (`bookmark_id`) REFERENCES `tmp`.`bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_list_comment`
--

LOCK TABLES `bookmark_list_comment` WRITE;
/*!40000 ALTER TABLE `bookmark_list_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark_list_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark_list_like`
--

DROP TABLE IF EXISTS `bookmark_list_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark_list_like` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `bookmark_list_id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookmark_list_id` (`bookmark_list_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookmarklistlike_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarklistlike_ibfk_2` FOREIGN KEY (`bookmark_list_id`) REFERENCES `tmp`.`bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_list_like`
--

LOCK TABLES `bookmark_list_like` WRITE;
/*!40000 ALTER TABLE `bookmark_list_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark_list_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark_list_report`
--

DROP TABLE IF EXISTS `bookmark_list_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark_list_report` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `bookmark_list_id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category` enum('광고','저작권침해','부적절한 콘텐츠','기타') NOT NULL,
  `reason` text NOT NULL,
  `status` enum('pending','resolved','rejected') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookmark_list_id` (`bookmark_list_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookmarklistreport_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarklistreport_ibfk_2` FOREIGN KEY (`bookmark_list_id`) REFERENCES `tmp`.`bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_list_report`
--

LOCK TABLES `bookmark_list_report` WRITE;
/*!40000 ALTER TABLE `bookmark_list_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark_list_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark_list_scrap`
--

DROP TABLE IF EXISTS `bookmark_list_scrap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark_list_scrap` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `bookmark_list_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookmark_list_id` (`bookmark_list_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookmarkfavoritelist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarkfavoritelist_ibfk_2` FOREIGN KEY (`bookmark_list_id`) REFERENCES `tmp`.`bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_list_scrap`
--

LOCK TABLES `bookmark_list_scrap` WRITE;
/*!40000 ALTER TABLE `bookmark_list_scrap` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark_list_scrap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark_list_tag`
--

DROP TABLE IF EXISTS `bookmark_list_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark_list_tag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bookmark_list_id` bigint NOT NULL,
  `tag_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookmark_list_id` (`bookmark_list_id`,`tag_id`),
  KEY `FK_Tag_TO_BookmarkListTag_1` (`tag_id`),
  CONSTRAINT `FK_BookmarkList_TO_BookmarkListTag_1` FOREIGN KEY (`bookmark_list_id`) REFERENCES `tmp`.`bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Tag_TO_BookmarkListTag_1` FOREIGN KEY (`tag_id`) REFERENCES `tmp`.`tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_list_tag`
--

LOCK TABLES `bookmark_list_tag` WRITE;
/*!40000 ALTER TABLE `bookmark_list_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark_list_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark_report`
--

DROP TABLE IF EXISTS `bookmark_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark_report` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `bookmark_id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category` enum('광고','저작권침해','부적절한 콘텐츠','기타') NOT NULL,
  `reason` text NOT NULL,
  `status` enum('pending','resolved','rejected') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `FK_User_TO_BookmarkReport_1` (`user_id`),
  KEY `FK_Bookmark_TO_BookmarkReport_1` (`bookmark_id`),
  CONSTRAINT `FK_Bookmark_TO_BookmarkReport_1` FOREIGN KEY (`bookmark_id`) REFERENCES `tmp`.`bookmark` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_User_TO_BookmarkReport_1` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_report`
--

LOCK TABLES `bookmark_report` WRITE;
/*!40000 ALTER TABLE `bookmark_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark_tag`
--

DROP TABLE IF EXISTS `bookmark_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark_tag` (
  `id` bigint NOT NULL,
  `tag_id` bigint NOT NULL,
  `bookmark_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_id` (`tag_id`,`bookmark_id`),
  KEY `FK_Bookmark_TO_BookmarkTag_1` (`bookmark_id`),
  CONSTRAINT `FK_Bookmark_TO_BookmarkTag_1` FOREIGN KEY (`bookmark_id`) REFERENCES `tmp`.`bookmark` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Tag_TO_BookmarkTag_1` FOREIGN KEY (`tag_id`) REFERENCES `tmp`.`tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_tag`
--

LOCK TABLES `bookmark_tag` WRITE;
/*!40000 ALTER TABLE `bookmark_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT 'Undefined',
  `bookmarklist_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category_bookmarklist_idx` (`bookmarklist_id`),
  CONSTRAINT `fk_category_bookmarklist` FOREIGN KEY (`bookmarklist_id`) REFERENCES `tmp`.`bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `room_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `tmp`.`chat_room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room`
--

DROP TABLE IF EXISTS `chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `to_id` bigint NOT NULL,
  `from_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `to_id` (`to_id`,`from_id`),
  KEY `from_id` (`from_id`),
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`to_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`from_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `bookmark_list_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookmark_list_id` (`bookmark_list_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`),
  CONSTRAINT `groups_ibfk_2` FOREIGN KEY (`bookmark_list_id`) REFERENCES `tmp`.`bookmark_list` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `chat_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `chat_id` (`chat_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `tmp`.`chat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `type` enum('user','list','roadmap') NOT NULL,
  `type_id` bigint NOT NULL,
  `contents` text NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_notification_user1_idx` (`user_id`),
  CONSTRAINT `fk_notification_user1` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roadmap`
--

DROP TABLE IF EXISTS `roadmap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roadmap` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL,
  `is_public` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `roadmap_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap`
--

LOCK TABLES `roadmap` WRITE;
/*!40000 ALTER TABLE `roadmap` DISABLE KEYS */;
/*!40000 ALTER TABLE `roadmap` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roadmap_comment`
--

DROP TABLE IF EXISTS `roadmap_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roadmap_comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `roadmap_id` bigint NOT NULL,
  `contents` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `roadmap_id` (`roadmap_id`),
  CONSTRAINT `roadmapcomment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roadmapcomment_ibfk_2` FOREIGN KEY (`roadmap_id`) REFERENCES `tmp`.`roadmap` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap_comment`
--

LOCK TABLES `roadmap_comment` WRITE;
/*!40000 ALTER TABLE `roadmap_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `roadmap_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roadmap_like`
--

DROP TABLE IF EXISTS `roadmap_like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roadmap_like` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `roadmap_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roadmap_id` (`roadmap_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `roadmaplike_ibfk_1` FOREIGN KEY (`roadmap_id`) REFERENCES `tmp`.`roadmap` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roadmaplike_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap_like`
--

LOCK TABLES `roadmap_like` WRITE;
/*!40000 ALTER TABLE `roadmap_like` DISABLE KEYS */;
/*!40000 ALTER TABLE `roadmap_like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roadmap_step`
--

DROP TABLE IF EXISTS `roadmap_step`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roadmap_step` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `roadmap_id` bigint NOT NULL,
  `bookmark_list_id` bigint NOT NULL,
  `check` tinyint NOT NULL DEFAULT '0',
  `order` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookmark_list_id` (`bookmark_list_id`,`roadmap_id`),
  KEY `roadmap_id` (`roadmap_id`),
  CONSTRAINT `roadmapstep_ibfk_1` FOREIGN KEY (`roadmap_id`) REFERENCES `tmp`.`roadmap` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roadmapstep_ibfk_2` FOREIGN KEY (`bookmark_list_id`) REFERENCES `tmp`.`bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap_step`
--

LOCK TABLES `roadmap_step` WRITE;
/*!40000 ALTER TABLE `roadmap_step` DISABLE KEYS */;
/*!40000 ALTER TABLE `roadmap_step` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `is_origin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(511) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `birth` timestamp NULL DEFAULT NULL,
  `job` varchar(50) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `refresh_token` varchar(511) DEFAULT NULL,
  `role` enum('ADMIN','NORMAL') DEFAULT 'NORMAL',
  `dark_mode` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tag`
--

DROP TABLE IF EXISTS `user_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `tag_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`tag_id`),
  KEY `FK_Tag_TO_UserTags_1` (`tag_id`),
  CONSTRAINT `FK_Tag_TO_UserTags_1` FOREIGN KEY (`tag_id`) REFERENCES `tmp`.`tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_User_TO_UserTags_1` FOREIGN KEY (`user_id`) REFERENCES `tmp`.`user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tag`
--

LOCK TABLES `user_tag` WRITE;
/*!40000 ALTER TABLE `user_tag` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-18 15:49:17
