-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: canopy
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.22.04.2

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
-- Table structure for table `canopy_agenda`
--

DROP TABLE IF EXISTS `canopy_agenda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canopy_agenda` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department` varchar(500) DEFAULT NULL,
  `agenda` varchar(5000) DEFAULT NULL,
  `additional_info` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canopy_agenda`
--

LOCK TABLES `canopy_agenda` WRITE;
/*!40000 ALTER TABLE `canopy_agenda` DISABLE KEYS */;
INSERT INTO `canopy_agenda` VALUES (1,'Operations','Revision\r\ncorrection','This is just a test'),(2,NULL,NULL,NULL),(3,NULL,NULL,NULL),(4,'Innovation','Test agenda','test additional info'),(5,'Operations','Heyy','this is just a test'),(6,'Operations','Heyy','this is just a test'),(7,'Operations','Heyy','this is just a test'),(8,'Innovation','g','jj'),(9,'Innovation','g','jj');
/*!40000 ALTER TABLE `canopy_agenda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `canopy_mileage`
--

DROP TABLE IF EXISTS `canopy_mileage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canopy_mileage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `carnumber` varchar(500) DEFAULT NULL,
  `carengine` varchar(500) DEFAULT NULL,
  `taskdone` varchar(500) DEFAULT NULL,
  `distancecovered` varchar(500) DEFAULT NULL,
  `totalcost` varchar(500) DEFAULT NULL,
  `file` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canopy_mileage`
--

LOCK TABLES `canopy_mileage` WRITE;
/*!40000 ALTER TABLE `canopy_mileage` DISABLE KEYS */;
INSERT INTO `canopy_mileage` VALUES (1,'KDA 778J','item2','Travelled from Karatina to Nairobi','1000 km','Ksh. 4000','http://localhost:4500/undefined'),(2,'jh','item2','sss','1000','1000','http://localhost:4500/undefined'),(3,'jh','item2','sss','1000','1000','http://localhost:4500/undefined'),(4,'jh','item2','sss','1000','1000','http://localhost:4500/undefined'),(5,'jh','item2','tty','233','3243','http://localhost:4500/undefined'),(6,'jh','item2','tty','233','3243','http://localhost:4500/RATECARD.docx'),(7,'jh','item2','tty','233','3243','http://localhost:4500/attachment_1.pdf'),(8,'jh','2500-3000','tty','233','3243','http://localhost:4500/attachment_1.pdf'),(9,'jh','1500-2000','tty','233','3243','http://localhost:4500/attachment_1.pdf'),(10,'KBG 568G','2500-3000','Travelling','2000 km','9000','http://localhost:4500/DOC-20230509-WA0037..pdf'),(11,'KCJ 222J','1500-2000','Travel','2000','5678','http://localhost:4500/undefined'),(12,'KCJ 222J','1500-2000','Travel','2000','5678','http://localhost:4500/[object Object]'),(13,'KCJ 222J','1500-2000','Travel','2000','5678','http://localhost:4500/PERIOPERATIVE THEATRE TEC LEVEL 6.docx'),(14,'KBT 556Y','1500-2000','Travelling to juja','2000 km','4500','http://localhost:4500/Verify@Emigration2022.pdf');
/*!40000 ALTER TABLE `canopy_mileage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `canopy_minute`
--

DROP TABLE IF EXISTS `canopy_minute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canopy_minute` (
  `id` int NOT NULL AUTO_INCREMENT,
  `minute` varchar(5000) DEFAULT NULL,
  `file` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canopy_minute`
--

LOCK TABLES `canopy_minute` WRITE;
/*!40000 ALTER TABLE `canopy_minute` DISABLE KEYS */;
INSERT INTO `canopy_minute` VALUES (28,'test','http://localhost:4500/RATECARD.docx'),(29,'Canopy minutes 4/5/2023','http://localhost:4500/Verify@Emigration2022.pdf');
/*!40000 ALTER TABLE `canopy_minute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `canopy_notice`
--

DROP TABLE IF EXISTS `canopy_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canopy_notice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `notice` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canopy_notice`
--

LOCK TABLES `canopy_notice` WRITE;
/*!40000 ALTER TABLE `canopy_notice` DISABLE KEYS */;
INSERT INTO `canopy_notice` VALUES (1,'Meeting');
/*!40000 ALTER TABLE `canopy_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `canopy_users`
--

DROP TABLE IF EXISTS `canopy_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canopy_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canopy_users`
--

LOCK TABLES `canopy_users` WRITE;
/*!40000 ALTER TABLE `canopy_users` DISABLE KEYS */;
INSERT INTO `canopy_users` VALUES (1,'Harry','harrycanopytest');
/*!40000 ALTER TABLE `canopy_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-04 12:56:50
