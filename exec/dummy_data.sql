CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ssafy601` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `ssafy601`;

--
-- set time zone
--

SET GLOBAL time_zone='+09:00';
SET time_zone = '+09:00';

--
-- create events
-- 
SET global event_scheduler = on;

--
-- scheduler for `move_daily data`
--
CREATE EVENT if NOT EXISTS move_daily_data
	ON schedule
		EVERY 1 day
		STARTS '2023-01-01 01:00:00' 
	DO
		INSERT INTO statistics(DATE, posture_id, user_id, TIME)
		SELECT DATE_ADD(CURDATE(), INTERVAL -1 DAY)e, posture_id, user_id, sum(TIMESTAMPDIFF(MINUTE, start_time, end_time)) AS time 
		FROM daily
		WHERE start_time < CURDATE()
		GROUP BY user_id, posture_id;

--
-- scheduler for `delete_daily data`
--
CREATE EVENT if NOT EXISTS delete_daily_data
	ON schedule
		EVERY 1 DAY
		STARTS '2023-01-01 06:00:00'
	DO
		delete FROM daily
		WHERE start_time < CURDATE();

--
-- scheduler for `move_statistics_data`
--
delimiter |

CREATE EVENT if NOT EXISTS move_statistics_data
	ON schedule
		EVERY 1 day
		STARTS '2023-01-01 04:00:00' 
	DO
		BEGIN 
			CREATE TABLE `total_table` (
			`total` INT(11) NOT NULL,
			`date` DATE NOT NULL,
			`user_id` BIGINT(20) NOT NULL
			);
			
			INSERT INTO total_table(total, DATE, user_id)
			SELECT SUM(TIME), DATE, user_id
			FROM statistics
			WHERE DATE = DATE_ADD(CURDATE(), INTERVAL -1 DAY)
			GROUP BY user_id;
			
			INSERT INTO grass(DATE, user_id, percentage)
			SELECT s.DATE, s.user_id, 100*s.TIME/t.total
			FROM statistics AS s
			join total_table AS t
			ON s.user_id = t.user_id
			WHERE s.DATE = DATE_ADD(CURDATE(), INTERVAL -1 DAY) AND s.posture_id=1
			GROUP BY s.user_id;
			
			DROP TABLE total_table;
		END |

delimiter ;

--
-- scheduler for `delete_gallery_data`
--
CREATE EVENT if NOT EXISTS delete_gallery_data
	ON SCHEDULE
		EVERY 1 DAY
		STARTS '2023-01-01 00:00:00'
	do
		delete FROM gallery;


--
-- to delete table disable foreign key constraints
--
set foreign_key_checks=0;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

--
-- if there is data inside table please clear data before use this dummy data
-- this is sql for clearing the 'category' table
--

-- DELETE FROM category;
-- ALTER TABLE category AUTO_INCREMENT = 1;


LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES
(1,'목'),
(2,'허리'),
(3,'전신');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily`
--

DROP TABLE IF EXISTS `daily`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily` (
  `daily_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `start_time` datetime(6) NOT NULL,
  `end_time` datetime(6) NOT NULL,
  `posture_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`daily_id`),
  KEY `FKlu01jfrx20yrl0c41urxynm1u` (`posture_id`),
  KEY `FKrv3whxwkta47nyg9ju12om1eo` (`user_id`),
  CONSTRAINT `FKlu01jfrx20yrl0c41urxynm1u` FOREIGN KEY (`posture_id`) REFERENCES `posture` (`posture_id`),
  CONSTRAINT `FKrv3whxwkta47nyg9ju12om1eo` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily`
--

--
-- if there is data inside table please clear data before use this dummy data
-- this is sql for clearing the 'daily' table
--

-- DELETE FROM daily;
-- ALTER TABLE daily AUTO_INCREMENT = 1;


LOCK TABLES `daily` WRITE;
/*!40000 ALTER TABLE `daily` DISABLE KEYS */;
INSERT INTO `daily`(start_time, end_time, posture_id, user_id) VALUES
(CONCAT(DATE_FORMAT(CURDATE(), '%Y-%m-%d'), ' ', '01:04:28'),CONCAT(DATE_FORMAT(CURDATE(), '%Y-%m-%d'), ' ', '01:33:09'),2,2),
(CONCAT(DATE_FORMAT(CURDATE(), '%Y-%m-%d'), ' ', '01:33:09'),CONCAT(DATE_FORMAT(CURDATE(), '%Y-%m-%d'), ' ', '01:40:09'),1,2),
(CONCAT(DATE_FORMAT(CURDATE(), '%Y-%m-%d'), ' ', '01:40:09'),CONCAT(DATE_FORMAT(CURDATE(), '%Y-%m-%d'), ' ', '01:50:09'),3,2),
(CONCAT(DATE_FORMAT(CURDATE(), '%Y-%m-%d'), ' ', '01:50:09'),CONCAT(DATE_FORMAT(CURDATE(), '%Y-%m-%d'), ' ', '02:50:09'),4,2);
/*!40000 ALTER TABLE `daily` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gallery` (
  `gallery_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `posture_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`gallery_id`),
  KEY `FKi4viukmk18pbliam7af4uq7s3` (`posture_id`),
  KEY `FKrlkb1hrhn15hr0stswxhfesfs` (`user_id`),
  CONSTRAINT `FKi4viukmk18pbliam7af4uq7s3` FOREIGN KEY (`posture_id`) REFERENCES `posture` (`posture_id`),
  CONSTRAINT `FKrlkb1hrhn15hr0stswxhfesfs` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `goal`
--

DROP TABLE IF EXISTS `goal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goal` (
  `goal_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `percentage` int(11) NOT NULL,
  `time` int(11) NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`goal_id`),
  UNIQUE KEY `UK_7b7j83l6dquot72lsg25y8323` (`user_id`),
  CONSTRAINT `FKf70arauooy8e5a5egk8k69xdr` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `grass`
--

DROP TABLE IF EXISTS `grass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grass` (
  `grass_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `percentage` int(11) NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`grass_id`),
  KEY `FKe0jcp5w2kh1854aaaba5iv2xh` (`user_id`),
  CONSTRAINT `FKe0jcp5w2kh1854aaaba5iv2xh` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grass`
--

--
-- if there is data inside table please clear data before use this dummy data
-- this is sql for clearing the 'grass' table
--

-- DELETE FROM grass;
-- ALTER TABLE grass AUTO_INCREMENT = 1;

LOCK TABLES `grass` WRITE;
/*!40000 ALTER TABLE `grass` DISABLE KEYS */;
INSERT INTO `grass`(DATE, percentage, user_id) VALUES
('2022-11-08',10,2),
('2022-11-12',1,2),
('2022-11-13',18,2),
('2022-11-21',72,2),
('2022-11-22',21,2),
('2022-11-23',64,2),
('2022-11-24',21,2),
('2022-11-28',54,2),
('2022-11-29',74,2),
('2022-12-01',76,2),
('2022-12-03',24,2),
('2022-12-04',68,2),
('2022-12-05',20,2),
('2022-12-06',1,2),
('2022-12-07',18,2),
('2022-12-08',49,2),
('2022-12-09',45,2),
('2022-12-10',11,2),
('2022-12-11',68,2),
('2022-12-15',56,2),
('2022-12-16',79,2),
('2022-12-17',52,2),
('2022-12-18',52,2),
('2022-12-19',30,2),
('2022-12-20',94,2),
('2022-12-21',68,2),
('2022-12-22',70,2),
('2022-12-23',50,2),
('2022-12-27',50,2),
('2022-12-28',7,2),
('2022-12-29',72,2),
('2022-12-30',71,2),
('2023-01-03',35,2),
('2023-01-04',19,2),
('2023-01-05',39,2),
('2023-01-06',71,2),
('2023-01-07',34,2),
('2023-01-08',19,2),
('2023-01-10',9,2),
('2023-01-11',20,2),
('2023-01-12',49,2),
('2023-01-13',17,2),
('2023-01-15',32,2),
('2023-01-16',62,2),
('2023-01-17',39,2),
('2023-01-20',28,2),
('2023-01-21',47,2),
('2023-01-22',28,2),
('2023-01-23',8,2),
('2023-01-24',15,2),
('2023-01-26',60,2),
('2023-01-27',15,2),
('2023-01-30',8,2),
('2023-01-31',16,2),
('2023-02-02',21,2),
('2023-02-03',11,2),
('2023-02-04',40,2),
('2023-02-06',20,2),
('2023-02-09',71,2),
('2023-02-10',28,2),
('2023-02-11',19,2);
/*!40000 ALTER TABLE `grass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phrases`
--

DROP TABLE IF EXISTS `phrases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phrases` (
  `phrases_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`phrases_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phrases`
--

--
-- if you want to reset table use this sql
--

-- DELETE FROM phrases;
-- ALTER TABLE phrases AUTO_INCREMENT = 1;


LOCK TABLES `phrases` WRITE;
/*!40000 ALTER TABLE `phrases` DISABLE KEYS */;
INSERT INTO `phrases`(content) VALUES
('다리를 꼬고 앉으면 골반이 틀어질 수 있습니다.'),
('SHabit을 꾸준히 사용하면 자세가 좋아집니다.'),
('올바른 자세로 앉으면 키가 커집니다.'),
('한 가지 행동을 66일 동안 지속하면 습관이 됩니다.');
/*!40000 ALTER TABLE `phrases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posture`
--

DROP TABLE IF EXISTS `posture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posture` (
  `posture_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`posture_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posture`
--

--
-- if there is data inside table please clear data before use this dummy data
-- this is sql for clearing the 'posture' table
--

-- DELETE FROM posture;
-- ALTER TABLE posture AUTO_INCREMENT = 1;

LOCK TABLES `posture` WRITE;
/*!40000 ALTER TABLE `posture` DISABLE KEYS */;
INSERT INTO `posture` VALUES
(1,'바른 자세'),
(2,'거북목 자세'),
(3,'비스듬한 자세'),
(4,'누운 자세');
/*!40000 ALTER TABLE `posture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setting` (
  `setting_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `alert_time` int(11) NOT NULL DEFAULT 3,
  `stretching_time` int(11) NOT NULL DEFAULT 50,
  PRIMARY KEY (`setting_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `setting`
--

--
-- if there is data inside table please clear data before use this dummy data
-- this is sql for clearing the 'setting' table
--

-- DELETE FROM setting;
-- ALTER TABLE setting AUTO_INCREMENT = 1;


LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;
INSERT INTO `setting` VALUES
(1,3,50);
/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statistics`
--

DROP TABLE IF EXISTS `statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statistics` (
  `statistics_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` int(11) NOT NULL,
  `posture_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`statistics_id`),
  KEY `FK84hg4ryeg06vvm3jeguqg816a` (`posture_id`),
  KEY `FKgubpcsln9g1fvbi3f5sgt5def` (`user_id`),
  CONSTRAINT `FK84hg4ryeg06vvm3jeguqg816a` FOREIGN KEY (`posture_id`) REFERENCES `posture` (`posture_id`),
  CONSTRAINT `FKgubpcsln9g1fvbi3f5sgt5def` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statistics`
--

--
-- if there is data inside table please clear data before use this dummy data
-- this is sql for clearing the 'statistics' table
--

-- DELETE FROM statistics;
-- ALTER TABLE statistics AUTO_INCREMENT = 1;


LOCK TABLES `statistics` WRITE;
/*!40000 ALTER TABLE `statistics` DISABLE KEYS */;
INSERT INTO `statistics`(DATE, TIME, posture_id, user_id) VALUES
('2023-02-06',4,1,2),
('2023-02-06',3,2,2),
('2023-02-06',2,3,2),
('2023-02-06',11,4,2),
('2023-02-04',44,1,2),
('2023-02-04',33,2,2),
('2023-02-04',22,3,2),
('2023-02-04',11,4,2),
('2023-02-03',15,1,2),
('2023-02-03',9,2,2),
('2023-02-03',99,3,2),
('2023-02-03',10,4,2),
('2023-02-02',15,1,2),
('2023-02-02',2,2,2),
('2023-02-02',44,3,2),
('2023-02-02',10,4,2),
('2023-01-31',15,1,2),
('2023-01-31',29,2,2),
('2023-01-31',40,3,2),
('2023-01-31',10,4,2),
('2023-01-30',8,1,2),
('2023-01-30',28,2,2),
('2023-01-30',48,3,2),
('2023-01-30',18,4,2),
('2023-01-27',11,1,2),
('2023-01-27',13,2,2),
('2023-01-27',19,3,2),
('2023-01-27',30,4,2),
('2023-01-26',73,1,2),
('2023-01-26',13,2,2),
('2023-01-26',23,3,2),
('2023-01-26',13,4,2),
('2023-01-24',40,1,2),
('2023-01-24',101,2,2),
('2023-01-24',20,3,2),
('2023-01-24',100,4,2),
('2023-01-23',4,1,2),
('2023-01-23',11,2,2),
('2023-01-23',26,3,2),
('2023-01-23',10,4,2),
('2023-01-22',41,1,2),
('2023-01-22',21,2,2),
('2023-01-22',36,3,2),
('2023-01-22',50,4,2),
('2023-01-21',43,1,2),
('2023-01-21',13,2,2),
('2023-01-21',23,3,2),
('2023-01-21',13,4,2),
('2023-01-20',41,1,2),
('2023-01-20',71,2,2),
('2023-01-20',24,3,2),
('2023-01-20',10,4,2),
('2023-01-17',24,1,2),
('2023-01-17',11,2,2),
('2023-01-17',26,3,2),
('2023-01-16',43,1,2),
('2023-01-16',10,2,2),
('2023-01-16',6,3,2),
('2023-01-16',10,4,2),
('2023-01-15',41,1,2),
('2023-01-15',21,2,2),
('2023-01-15',56,3,2),
('2023-01-15',10,4,2),
('2023-01-13',43,1,2),
('2023-01-13',83,2,2),
('2023-01-13',23,3,2),
('2023-01-13',103,4,2),
('2023-01-12',61,1,2),
('2023-01-12',21,2,2),
('2023-01-12',31,3,2),
('2023-01-12',11,4,2),
('2023-01-11',24,1,2),
('2023-01-11',36,2,2),
('2023-01-11',47,3,2),
('2023-01-11',15,4,2),
('2023-01-10',13,1,2),
('2023-01-10',54,2,2),
('2023-01-10',34,3,2),
('2023-01-10',50,4,2),
('2023-01-08',45,1,2),
('2023-01-08',15,2,2),
('2023-01-08',26,3,2),
('2023-01-08',150,4,2),
('2023-01-07',33,1,2),
('2023-01-07',15,2,2),
('2023-01-07',40,3,2),
('2023-01-07',10,4,2),
('2023-01-06',41,1,2),
('2023-01-06',1,2,2),
('2023-01-06',6,3,2),
('2023-01-06',10,4,2),
('2023-01-05',43,1,2),
('2023-01-05',31,2,2),
('2023-01-05',24,3,2),
('2023-01-05',11,4,2),
('2023-01-04',20,1,2),
('2023-01-04',13,2,2),
('2023-01-04',56,3,2),
('2023-01-04',19,4,2),
('2023-01-03',24,1,2),
('2023-01-03',9,2,2),
('2023-01-03',26,3,2),
('2023-01-03',10,4,2),
('2022-12-30',100,1,2),
('2022-12-30',10,2,2),
('2022-12-30',20,3,2),
('2022-12-30',10,4,2),
('2022-12-29',140,1,2),
('2022-12-29',40,2,2),
('2022-12-29',10,3,2),
('2022-12-29',5,4,2),
('2022-12-28',3,1,2),
('2022-12-28',20,2,2),
('2022-12-28',17,3,2),
('2022-12-28',4,4,2),
('2022-12-27',14,1,2),
('2022-12-27',11,2,2),
('2022-12-27',2,3,2),
('2022-12-27',1,4,2),
('2022-12-23',103,1,2),
('2022-12-23',73,2,2),
('2022-12-23',24,3,2),
('2022-12-23',7,4,2),
('2022-12-22',50,1,2),
('2022-12-22',6,2,2),
('2022-12-22',7,3,2),
('2022-12-22',8,4,2),
('2022-12-21',106,1,2),
('2022-12-21',14,2,2),
('2022-12-21',25,3,2),
('2022-12-21',11,4,2),
('2022-12-20',100,1,2),
('2022-12-20',3,2,2),
('2022-12-20',2,3,2),
('2022-12-20',1,4,2),
('2022-12-19',99,1,2),
('2022-12-19',88,2,2),
('2022-12-19',77,3,2),
('2022-12-19',66,4,2),
('2022-12-18',27,1,2),
('2022-12-18',16,2,2),
('2022-12-18',5,3,2),
('2022-12-18',4,4,2),
('2022-12-17',133,1,2),
('2022-12-17',40,2,2),
('2022-12-17',66,3,2),
('2022-12-17',19,4,2),
('2022-12-16',15,1,2),
('2022-12-16',1,2,2),
('2022-12-16',2,3,2),
('2022-12-16',1,4,2),
('2022-12-15',50,1,2),
('2022-12-15',10,2,2),
('2022-12-15',20,3,2),
('2022-12-15',10,4,2),
('2022-12-11',155,1,2),
('2022-12-11',12,2,2),
('2022-12-11',50,3,2),
('2022-12-11',11,4,2),
('2022-12-10',17,1,2),
('2022-12-10',40,2,2),
('2022-12-10',20,3,2),
('2022-12-10',80,4,2),
('2022-12-09',103,1,2),
('2022-12-09',102,2,2),
('2022-12-09',21,3,2),
('2022-12-09',1,4,2),
('2022-12-08',30,1,2),
('2022-12-08',20,2,2),
('2022-12-08',10,3,2),
('2022-12-08',1,4,2),
('2022-12-07',40,1,2),
('2022-12-07',50,2,2),
('2022-12-07',60,3,2),
('2022-12-07',70,4,2),
('2022-12-06',1,1,2),
('2022-12-06',40,2,2),
('2022-12-06',20,3,2),
('2022-12-06',10,4,2),
('2022-12-05',11,1,2),
('2022-12-05',11,2,2),
('2022-12-05',22,3,2),
('2022-12-05',11,4,2),
('2022-12-04',123,1,2),
('2022-12-04',45,2,2),
('2022-12-04',6,3,2),
('2022-12-04',7,4,2),
('2022-12-03',34,1,2),
('2022-12-03',45,2,2),
('2022-12-03',56,3,2),
('2022-12-03',7,4,2),
('2022-12-01',100,1,2),
('2022-12-01',1,2,2),
('2022-12-01',20,3,2),
('2022-12-01',10,4,2),
('2022-11-29',105,1,2),
('2022-11-29',3,2,2),
('2022-11-29',22,3,2),
('2022-11-29',11,4,2),
('2022-11-28',124,1,2),
('2022-11-28',15,2,2),
('2022-11-28',88,3,2),
('2022-11-28',3,4,2),
('2022-11-24',14,1,2),
('2022-11-24',12,2,2),
('2022-11-24',5,3,2),
('2022-11-24',35,4,2),
('2022-11-23',105,1,2),
('2022-11-23',24,2,2),
('2022-11-23',20,3,2),
('2022-11-23',14,4,2),
('2022-11-22',11,1,2),
('2022-11-22',17,2,2),
('2022-11-22',23,3,2),
('2022-11-22',1,4,2),
('2022-11-21',111,1,2),
('2022-11-21',11,2,2),
('2022-11-21',22,3,2),
('2022-11-21',11,4,2),
('2022-11-13',50,1,2),
('2022-11-13',67,2,2),
('2022-11-13',76,3,2),
('2022-11-13',80,4,2),
('2022-11-12',1,1,2),
('2022-11-12',31,2,2),
('2022-11-12',28,3,2),
('2022-11-12',30,4,2),
('2022-11-08',4,1,2),
('2022-11-08',11,2,2),
('2022-11-08',6,3,2),
('2022-11-08',19,4,2),
('2023-02-09',39,1,2),
('2023-02-09',13,2,2),
('2023-02-09',3,3,2),
('2023-02-10',82,1,2),
('2023-02-10',133,2,2),
('2023-02-10',22,3,2),
('2023-02-10',56,4,2),
('2023-02-11',48,1,2),
('2023-02-11',107,2,2),
('2023-02-11',99,3,2);
/*!40000 ALTER TABLE `statistics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `modified_date` datetime(6) DEFAULT NULL,
  `email` varchar(63) NOT NULL,
  `nickname` varchar(15) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `provider_type` varchar(20) NOT NULL,
  `theme` int(11) DEFAULT 0,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--


--
-- if there is data inside table please clear data before use this dummy data
-- this is sql for clearing the 'users' table
--

-- DELETE FROM users;
-- ALTER TABLE users AUTO_INCREMENT = 1;


LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'2023-02-09 10:53:54.788549','2023-02-10 16:34:28.106872','ssafyezpz@gmail.com','ssafy','$2a$10$fPRXXpn9BDGUBccBwijiDuwWIVxNr9JX.6frJWektpyVbSnvSYa6e',NULL,'LOCAL',0),
(2,'2023-02-09 10:54:00.118287','2023-02-11 19:50:56.961676','ssafy1234@gmail.com','ssafy','$2a$10$lfxwiNgd9i/IuM4A5v.ap.d446icChoL/Rhioq/IZ5tW9FprKMw4W','https://shabit.s3.ap-northeast-2.amazonaws.com/profile/ssafy1234%40gmail.com%20%EB%86%80%EC%9E%90%EC%97%90%EB%AA%BD.jpg','LOCAL',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_roles` (
  `users_user_id` bigint(20) unsigned NOT NULL,
  `roles` varchar(255) DEFAULT NULL,
  KEY `FKmaps3ffbyjaxkt50q1c7s7v5j` (`users_user_id`),
  CONSTRAINT `FKmaps3ffbyjaxkt50q1c7s7v5j` FOREIGN KEY (`users_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

--
-- if there is data inside table please clear data before use this dummy data
--

-- DELETE FROM users_roles;

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES
(1,'ROLE_ADMIN'),
(2,'ROLE_USER');
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vod`
--

DROP TABLE IF EXISTS `vod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vod` (
  `vod_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `length` int(11) NOT NULL,
  `original_length` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `video_id` varchar(255) NOT NULL,
  `category_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`vod_id`),
  KEY `FKvq5du2g54h73kb66pl1ur5in` (`category_id`),
  CONSTRAINT `FKvq5du2g54h73kb66pl1ur5in` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vod`
--

--
-- if there is data inside table please clear data before use this dummy data
-- this is sql for clearing the 'vod' table
--

-- DELETE FROM vod;
-- ALTER TABLE vod AUTO_INCREMENT = 1;

LOCK TABLES `vod` WRITE;
/*!40000 ALTER TABLE `vod` DISABLE KEYS */;
INSERT INTO `vod`(length, original_length, thumbnail, title, video_id, category_id) VALUES
(3,'3:5','https://i.ytimg.com/vi/UZBx6DmKb2k/hqdefault.jpg','목소리를 위한 선택! 하루 3분! 목 스트레칭','UZBx6DmKb2k',1),
(5,'4:14','https://i.ytimg.com/vi/ZJjBDpOn11c/hqdefault.jpg','어깨, 목 통증  뻐근함  3분 운동(#집에서함께운동해요)','ZJjBDpOn11c',1),
(10,'9:3','https://i.ytimg.com/vi/FMOISIlhLEY/hqdefault.jpg','목 결림, 어깨 뭉침을 풀어주는 스트레칭 (with 3분 마사지)','FMOISIlhLEY',1),
(10,'9:39','https://i.ytimg.com/vi/mUnSpfItRf0/hqdefault.jpg','목, 어깨 통증이 사라지는 10분 스트레칭! 초간단 뭉친걸 싹 풀어봅시다!','mUnSpfItRf0',1),
(10,'10:12','https://i.ytimg.com/vi/UH9sZnQLu6I/hqdefault.jpg','[목, 어깨, 등 통증 완화 10분 운동법]  승모근 스트레칭 및 거북목, 라운드숄더 완화! 물리치료사와 함께해요','UH9sZnQLu6I',1),
(10,'10:47','https://i.ytimg.com/vi/kgCj8UUEWjU/hqdefault.jpg','딱 10분! 거북목, 버섯증후군이 있다면 이 운동 제발 하셔야 합니다! 일자목, 거북목 스트레칭, 버섯증후군교정운동','kgCj8UUEWjU',1),
(3,'3:13','https://i.ytimg.com/vi/iyuoSR0VZV8/hqdefault.jpg','허리근육 풀어주는 스트레칭 (3분 투자로 최대효과 누리세요!)','iyuoSR0VZV8',2),
(5,'4:44','https://i.ytimg.com/vi/fQfC6IBfaCo/hqdefault.jpg','3분 스트레칭[허리]','fQfC6IBfaCo',2),
(10,'10:48','https://i.ytimg.com/vi/8dpdyiprNUg/hqdefault.jpg','세상에서 제일 시원한 3분 의자 스트레칭 - 송영민의 바른자세만들기 #12','8dpdyiprNUg',2),
(10,'8:59','https://i.ytimg.com/vi/QhRcs9d2Y9E/hqdefault.jpg','과학적으로 검증된 허리 스트레칭! 8분이면 그냥 끝! 허리 아프신 분들 필독!','QhRcs9d2Y9E',2),
(3,'3:42','https://i.ytimg.com/vi/KO9tr8Wscow/hqdefault.jpg','3분 전신 트레이닝','KO9tr8Wscow',3),
(3,'3:47','https://i.ytimg.com/vi/yM_B7Uy4JZs/hqdefault.jpg','[교실놀이-스트레칭] 다함께  일어서서 3분 스트레칭!','yM_B7Uy4JZs',3),
(5,'6:17','https://i.ytimg.com/vi/uPOWvBj7nFY/hqdefault.jpg','[쉬는 시간 5분 스트레칭] 거북목/굽은 어깨/허리 통증/틀어진 골반 풀어주기','uPOWvBj7nFY',3),
(5,'5:25','https://i.ytimg.com/vi/XdFhIyu_7Vw/hqdefault.jpg','#스트레칭 #stretching 매일 \"5분  스트레칭 체조\" 아침,저녁으로 2번씩 해주세요~','XdFhIyu_7Vw',3),
(5,'5:37','https://i.ytimg.com/vi/TFuAarzTdOw/hqdefault.jpg','서서하는 5분 전신스트레칭 | 상,하체 스트레칭','TFuAarzTdOw',3),
(5,'5:18','https://i.ytimg.com/vi/WdT4wzneh24/hqdefault.jpg','5MIN DAILY STRETCH 매일 5분 스트레칭!','WdT4wzneh24',3),
(10,'10:24','https://i.ytimg.com/vi/bOWoNq2nUgg/hqdefault.jpg','우리에게 꼭 필요한 10분 스트레칭 | 앉아서 하는 전신스트레칭 요가','bOWoNq2nUgg',3),
(10,'10:25','https://i.ytimg.com/vi/50WCSpZtdmA/hqdefault.jpg','심으뜸 매일 아침 10분 스트레칭ㅣ2023 리뉴얼','50WCSpZtdmA',3);
/*!40000 ALTER TABLE `vod` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


--
-- set foreign key constraints
--
set foreign_key_checks=1;