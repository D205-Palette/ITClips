-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: itclips
-- ------------------------------------------------------
-- Server version	9.0.1

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
  `description` tinytext,
  `url` varchar(511) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_reported` tinyint(1) NOT NULL DEFAULT '0',
  `order` int NOT NULL,
  `bookmarklist_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bookmark_bookmarklist1_idx` (`bookmarklist_id`),
  CONSTRAINT `fk_bookmark_bookmarklist1` FOREIGN KEY (`bookmarklist_id`) REFERENCES `bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=292 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
INSERT INTO `bookmark` VALUES (3,'[React] 6. React Router (리액트 라우터) 사용하기','리액트 라우터 돔과 라우팅의 개념에 대해','https://goddaehee.tistory.com/305','2024-08-12 19:24:03','2024-08-12 19:24:03',0,2,103),(4,'리액트 라우터 써보기','리액트 라우터 기초 및 중첩 라우트 개념','https://woongtech.tistory.com/entry/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EC%8D%A8%EB%B3%B4%EA%B8%B0-reactroutertypescript','2024-08-12 19:24:51','2024-08-12 19:25:44',0,2,103),(5,'[React] React 개발환경 세팅하기 - React Router 설치 및 간단정리','리액트 처음시작하는 방법','https://shape-coding.tistory.com/entry/React-React-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0-React-Router-%EC%84%A4%EC%B9%98','2024-08-12 19:25:27','2024-08-12 19:25:27',0,2,103),(9,'QuerySet API reference | Django documentation | Django','장고 ORM에 대한 설명입니다.','https://docs.djangoproject.com/en/5.0/ref/models/querysets/','2024-08-12 21:05:53','2024-08-13 10:17:15',0,2,118),(10,'Home - Django REST framework','장고 REST 프레임워크에 대한 설명입니다.','https://www.django-rest-framework.org','2024-08-12 21:11:57','2024-08-12 21:11:57',0,2,118),(11,'Bootstrap · The most popular HTML, CSS, and JS library in the world.','','https://getbootstrap.com','2024-08-12 21:12:53','2024-08-12 21:12:53',0,2,114),(12,'Set Up Your Account | Font Awesome','','https://fontawesome.com','2024-08-12 21:13:54','2024-08-12 21:13:54',0,2,114),(13,'JavaScript에 발 담그기','','https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/A_first_splash','2024-08-12 21:48:32','2024-08-12 21:48:32',0,2,124),(14,'자바스크립트(JavaScript) 기초 및 문법ㅣ정의, 기본 문법, 변수, 함수','','https://www.codestates.com/blog/content/javascript-%EA%B8%B0%EC%B4%88-%EB%B0%8F-%EB%AC%B8%EB%B2%95','2024-08-12 21:51:57','2024-08-12 21:51:57',0,2,124),(15,'초보자를 위한 기초 7일 완성, 자바스크립트 강좌(Javascript) - 1 (JS란?, event, onclick, onchange, onkeydown, 웹에서 js사용하는 법)','','https://infodon.tistory.com/11','2024-08-12 21:57:16','2024-08-12 21:57:16',0,2,124),(16,'JavaScript 입문 수업','생활코딩 자바스크립트 입문','https://opentutorials.org/course/743','2024-08-12 21:58:01','2024-08-12 21:58:01',0,2,124),(18,'React 공부 순서와 샘플 프로젝트 추천','','https://brunch.co.kr/@princox/235','2024-08-12 22:24:01','2024-08-12 22:24:01',0,2,129),(19,'리액트(React) 쓸 때 흔히 범하는 초보자 실수 모음','','https://mycodings.fly.dev/blog/2023-03-07-common-beginner-mistakes-in-react','2024-08-12 22:25:45','2024-08-12 22:25:45',0,2,129),(20,'React 초보부터 숙련자까지 활용할 수 있는 프로젝트 폴더 구조','폴더 구조에 관한 자료','https://bttrthn-ystrdy.tistory.com/91','2024-08-12 22:27:00','2024-08-12 22:27:00',0,2,129),(21,'[React] React 중급 - hooks 기본 개념','','https://velog.io/@gyrbs22/React-React-%EC%A4%91%EA%B8%89-hooks-%EA%B8%B0%EB%B3%B8-%EA%B0%9C%EB%85%90','2024-08-12 22:28:55','2024-08-12 22:28:55',0,2,129),(22,'Cheat Sheet','','https://docs.emmet.io/cheat-sheet/','2024-08-12 22:30:16','2024-08-12 22:30:16',0,2,114),(24,'스프링 홈페이지','스프링 홈페이지','https://spring.io/','2024-08-12 23:30:09','2024-08-12 23:30:09',0,1,132),(25,'스프링 시큐리티 홈페이지','스프링 시큐리티 홈페이지','https://spring.io/projects/spring-security','2024-08-12 23:31:13','2024-08-12 23:31:13',0,1,132),(26,'React 공식 문서','React 라이브러리의 공식 문서','https://reactjs.org/docs/getting-started.html','2024-08-12 23:32:28','2024-08-12 23:32:28',0,2,128),(27,'스프링 기초','스프링 기초 블로그','https://programforlife.tistory.com/103','2024-08-12 23:32:36','2024-08-12 23:32:36',0,2,132),(28,'Redux 공식 문서','상태 관리를 위한 라이브러리 Redux의 공식 문서','https://redux.js.org/','2024-08-12 23:32:59','2024-08-12 23:32:59',0,2,128),(29,'스프링 배치란?','스프링 배치 설명','https://dkswnkk.tistory.com/707','2024-08-12 23:33:09','2024-08-12 23:33:09',0,2,132),(30,'필터 vs 인터셉터','필터와 인터셉터의 차이','https://mangkyu.tistory.com/173','2024-08-12 23:34:17','2024-08-12 23:34:17',0,3,132),(31,'Kotlin 공식 문서','안드로이드 앱 개발을 위한 Kotlin 언어의 공식 문서','https://kotlinlang.org/docs/home.html','2024-08-12 23:34:54','2024-08-12 23:34:54',0,2,133),(32,'안드로이드 개발자 가이드','안드로이드 앱 개발을 위한 공식 개발자 가이드.','https://developer.android.com/guide','2024-08-12 23:35:22','2024-08-12 23:35:22',0,2,133),(33,'Algorithm Visualizer','알고리즘 시각화를 통해 이해를 돕는 웹사이트','https://algorithm-visualizer.org','2024-08-12 23:36:36','2024-08-12 23:36:36',0,2,135),(34,'LeetCode 문제 모음','프로그래밍 문제를 풀고 실력을 향상시킬 수 있는 LeetCode','https://leetcode.com','2024-08-12 23:36:54','2024-08-12 23:36:54',0,2,135),(36,'Flask 프레임워크','파이썬의 경량 WSGI 웹 애플리케이션 프레임워크','https://flask.palletsprojects.com/','2024-08-12 23:39:27','2024-08-12 23:39:27',0,2,122),(37,'JavaScript.info','모던 자바스크립트 튜토리얼','https://javascript.info','2024-08-12 23:40:04','2024-08-12 23:40:04',0,2,123),(38,'Docker Docs','도커 공식 문서','https://docs.docker.com','2024-08-12 23:40:35','2024-08-12 23:40:35',0,2,126),(39,'AWS 클라우드 입문자 과정','AWS 클라우드의 기본 사항을 배우세요','https://aws.amazon.com/training','2024-08-12 23:41:10','2024-08-12 23:41:10',0,2,127),(40,'Scikit-learn 문서','파이썬 머신러닝 라이브러리 Scikit-learn의 문서','https://scikit-learn.org/stable/user_guide.html','2024-08-12 23:41:42','2024-08-12 23:41:42',0,2,125),(41,'GITHUB ACTION','githun action ','https://docs.github.com/en/actions','2024-08-12 23:46:22','2024-08-12 23:46:22',0,2,138),(43,'젠킨스','젠킨스 홈페이지','https://www.jenkins.io/','2024-08-12 23:47:23','2024-08-12 23:47:23',0,1,138),(44,'YAML 및 Properties 파일의 민감한 정보 보호하기','secret 관리','https://back-stead.tistory.com/85','2024-08-12 23:48:42','2024-08-12 23:48:42',0,2,138),(45,'Pipeline 이용하기 (with JUnit, SonarQube)','','https://yeonyeon.tistory.com/86','2024-08-12 23:49:25','2024-08-12 23:49:25',0,3,138),(46,'Jenkins와 Nginx를 통한 무중단 배포','','https://tech.xangle.io/backend/jenkins-cicd/','2024-08-12 23:50:08','2024-08-12 23:50:08',0,2,138),(49,' EC2 인스턴스에 Docker 컨테이너 배포하기','배포','https://sjh9708.tistory.com/100','2024-08-12 23:53:36','2024-08-12 23:53:36',0,1,140),(50,'Jenkins in Docker 배포 자동화 구축','','https://data-make.tistory.com/772','2024-08-12 23:53:36','2024-08-12 23:53:36',0,1,140),(51,'AWS EC2, Jenkins를 사용해 깃허브 웹훅 연결하기','','https://velog.io/@l0o0lv/SpringBoot-AWS-EC2-Jenkins%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4-%EA%B9%83%ED%97%88%EB%B8%8C-%EC%9B%B9%ED%9B%85-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0','2024-08-12 23:55:33','2024-08-12 23:55:33',0,3,140),(52,'Spring Boot에서 Presigned URL로 AWS S3에 파일 업로드하기','','https://leeeeeyeon-dev.tistory.com/88','2024-08-12 23:56:52','2024-08-12 23:56:52',0,1,140),(54,'서버리스 기반 S3 Presigned URL 적용하기','','https://velog.io/@jmjmjmz732002/Spring-Boot-%EC%84%9C%EB%B2%84%EB%A6%AC%EC%8A%A4-%EA%B8%B0%EB%B0%98-S3-Presigned-URL-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0#aws-s3-presigned-url','2024-08-12 23:57:25','2024-08-12 23:57:25',0,2,140),(55,'jpa 공홈','jpa 공홈','https://spring.io/projects/spring-data-jpa','2024-08-13 00:24:13','2024-08-13 00:24:13',0,1,141),(60,'jpa vs mybatis','jpa  mybatis 비교','https://www.elancer.co.kr/blog/view?seq=231','2024-08-13 00:26:47','2024-08-13 00:26:47',0,2,141),(61,'jpa란?','jpa 기초','https://dbjh.tistory.com/77','2024-08-13 00:26:47','2024-08-13 00:26:47',0,2,141),(62,'querydsl 공홈','querydsl 공홈','http://querydsl.com/','2024-08-13 00:28:11','2024-08-13 00:28:11',0,1,141),(63,'querydsl 기초','query dsl 기초','https://tecoble.techcourse.co.kr/post/2021-08-08-basic-querydsl/','2024-08-13 00:28:11','2024-08-13 00:28:11',0,1,141),(75,'pandas','데이터를 우리가 쉽게 다룰 수 있는 테이블 형식으로 만들어 줍니다.','https://pandas.pydata.org/','2024-08-13 01:16:07','2024-08-13 01:16:07',0,2,122),(76,'AWS 공식 사이트','AWS 클라우드 서비스를 위한 공식 사이트입니다','https://aws.amazon.com','2024-08-13 01:26:09','2024-08-13 01:26:09',0,2,127),(77,'Google Cloud 가이드','Google Cloud Platform에 대한 문서와 튜토리얼입니다','https://cloud.google.com/docs','2024-08-13 01:26:26','2024-08-13 01:26:26',0,2,127),(78,'Azure 문서','Microsoft Azure 클라우드 서비스를 위한 문서입니다','https://docs.microsoft.com/azure/','2024-08-13 01:26:45','2024-08-13 01:26:45',0,2,127),(79,'IBM Cloud 튜토리얼','IBM Cloud를 활용한 클라우드 컴퓨팅 가이드입니다.','https://cloud.ibm.com/docs','2024-08-13 01:27:04','2024-08-13 01:27:04',0,2,127),(80,'Oracle Cloud 문서','Oracle Cloud에 대한 문서와 가이드입니다','https://docs.oracle.com/en/cloud/','2024-08-13 01:27:27','2024-08-13 01:27:27',0,2,127),(81,'Pandas 문서','데이터 분석을 위한 Pandas 라이브러리 문서입니다','https://pandas.pydata.org/','2024-08-13 01:28:22','2024-08-13 01:28:22',0,2,125),(82,'TensorFlow 가이드','TensorFlow를 활용한 머신러닝 가이드입니다','https://www.tensorflow.org','2024-08-13 01:28:38','2024-08-13 01:28:38',0,2,125),(83,'Scikit-learn 문서','머신러닝을 위한 Scikit-learn 라이브러리입니다','https://scikit-learn.org/stable/','2024-08-13 01:28:54','2024-08-13 01:28:54',0,2,125),(84,'Matplotlib 튜토리얼','데이터 시각화를 위한 Matplotlib 튜토리얼입니다','https://matplotlib.org/stable/tutorials/index.html','2024-08-13 01:29:11','2024-08-13 01:29:11',0,2,125),(85,'Kubernetes 공식 문서','Kubernetes를 배우기 위한 가이드입니다','https://kubernetes.io/docs/','2024-08-13 01:29:42','2024-08-13 01:29:42',0,2,126),(86,'Jenkins 가이드','Jenkins를 활용한 CI/CD 구축을 위한 문서입니다','https://www.jenkins.io/doc/','2024-08-13 01:29:55','2024-08-13 01:29:55',0,2,126),(87,'Terraform 문서','Infrastructure as Code를 위한 Terraform 문서입니다','https://www.terraform.io/docs/','2024-08-13 01:30:12','2024-08-13 01:30:12',0,2,126),(88,'Ansible 공식 사이트','Ansible을 이용한 자동화 가이드입니다','https://docs.ansible.com/','2024-08-13 01:30:25','2024-08-13 01:30:25',0,2,126),(89,'React-Router-Dom 개념잡기','RRD에 관련한 기초내용들 있음','https://velog.io/@kandy1002/React-Router-Dom-%EA%B0%9C%EB%85%90%EC%9E%A1%EA%B8%B0','2024-08-13 03:38:57','2024-08-13 03:38:57',0,2,103),(90,'리액트 라리브러리 - 리액트 라우터 돔','React-Router-Dom으로 프로젝트 해보기','https://jin-co.tistory.com/368','2024-08-13 03:38:57','2024-08-13 03:38:57',0,2,103),(91,'TypeScript 공식 웹사이트','TypeScript의 공식 웹사이트로, 언어에 대한 소개, 설치 방법, 사용 가이드, 최신 버전의 변경 사항 등을 확인할 수 있습니다.','https://www.typescriptlang.org/','2024-08-13 03:39:43','2024-08-13 03:39:43',0,2,104),(92,'DefinitelyTyped','TypeScript 커뮤니티에서 유지보수하는 타입 선언 파일 레포지토리로, JavaScript 라이브러리와 함께 TypeScript를 사용할 때 필요한 타입 정의 파일들이 모여 있습니다.','https://github.com/DefinitelyTyped/DefinitelyTyped','2024-08-13 03:40:36','2024-08-13 03:40:36',0,2,104),(93,'TypeScript-eslint','TypeScript와 ESLint를 함께 사용하기 위한 도구로, TypeScript 코드베이스에 대한 정적 분석 및 코드 스타일 규칙 적용을 도와줍니다.','https://github.com/typescript-eslint/typescript-eslint','2024-08-13 03:41:11','2024-08-13 03:41:11',0,2,104),(94,'[TypeScript 독학] #1 타입스크립트 개념 및 타입','','https://velog.io/@bbaa3218/TypeScript-1-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%9C%EB%85%90-%EB%B0%8F-%ED%83%80%EC%9E%85','2024-08-13 03:41:46','2024-08-13 03:41:46',0,2,104),(95,'활용도가 높아지는 웹 프론트엔드 언어, 타입스크립트(TypeScript)','삼성SDS 인사이트','https://www.samsungsds.com/kr/insights/typescript.html','2024-08-13 03:42:18','2024-08-13 03:42:18',0,2,104),(96,'JavaScript 공식 문서 (MDN Web Docs)','Mozilla에서 관리하는 JavaScript의 공식 문서로, JavaScript의 기본 개념, 문법, 내장 함수 및 객체 등에 대한 포괄적인 정보를 제공','https://developer.mozilla.org/en-US/docs/Web/JavaScript','2024-08-13 03:43:15','2024-08-13 03:43:15',0,2,109),(97,'JavaScript.info','JavaScript의 기본부터 고급 주제까지 다루는 온라인 튜토리얼로, 다양한 예제와 함께 JavaScript의 핵심 개념을 학습','https://javascript.info/','2024-08-13 03:43:45','2024-08-13 03:43:45',0,2,109),(98,'Node.js','JavaScript로 서버 사이드 애플리케이션을 개발할 수 있게 해주는 런타임 환경','https://nodejs.org/en','2024-08-13 03:44:14','2024-08-13 03:44:14',0,2,109),(99,'npm (Node Package Manager)','JavaScript 패키지 매니저로, Node.js와 함께 사용되며, JavaScript 라이브러리와 모듈을 관리하는 데 사용','https://www.npmjs.com/','2024-08-13 03:44:33','2024-08-13 03:44:33',0,2,109),(100,'Babel','최신 JavaScript 코드를 구형 브라우저에서도 동작하도록 ES5로 트랜스파일하는 도구','https://babeljs.io/','2024-08-13 03:45:13','2024-08-13 03:45:13',0,2,109),(101,'Vue.js','점진적으로 채택할 수 있는 JavaScript 프레임워크로, SPA(Single Page Application) 개발에 주로 사용','https://vuejs.org/','2024-08-13 03:45:38','2024-08-13 03:45:38',0,2,109),(102,'Angular 공식 웹사이트','Angular의 공식 웹사이트로, 프레임워크에 대한 소개, 문서, 튜토리얼, 예제 등을 제공합니다. Angular CLI, 라이브러리, 및 최신 릴리스 정보도 확인','https://angular.io/','2024-08-13 03:46:11','2024-08-13 03:46:11',0,2,110),(103,'RxJS','Angular에서 비동기 데이터 흐름을 처리하기 위해 널리 사용되는 라이브러리','https://rxjs.dev/','2024-08-13 03:46:42','2024-08-13 03:46:42',0,2,110),(104,'NgRx','Angular 애플리케이션에서 상태 관리를 위해 사용되는 라이브러리','https://ngrx.io/','2024-08-13 03:47:08','2024-08-13 03:47:08',0,2,110),(105,'Protractor','Angular 애플리케이션을 위한 엔드투엔드 테스트 프레임워크','https://www.protractortest.org/#/','2024-08-13 03:47:46','2024-08-13 03:47:46',0,2,110),(106,'AngularFire','Angular 애플리케이션에서 Firebase를 쉽게 통합할 수 있게 해주는 라이브러리','https://github.com/angular/angularfire','2024-08-13 03:48:09','2024-08-13 03:48:09',0,2,110),(107,'Kotlin 공식 웹사이트','Kotlin 언어의 공식 웹사이트로, 언어에 대한 소개, 설치 방법, 문서, 튜토리얼 등을 제공합니다. Kotlin의 다양한 기능과 최신 릴리스 정보를 확인할 수 있습니다.','https://kotlinlang.org/','2024-08-13 03:48:40','2024-08-13 03:48:40',0,2,111),(108,'Jetpack Compose','Android UI를 선언적으로 구성할 수 있게 해주는 최신 UI 툴킷','https://developer.android.com/jetpack/compose','2024-08-13 03:49:19','2024-08-13 03:49:19',0,2,111),(109,'Ktor','Kotlin으로 작성된 비동기 웹 애플리케이션 프레임워크','https://ktor.io/','2024-08-13 03:50:23','2024-08-13 03:50:23',0,2,111),(110,'Kotlin for Android Developers','Kotlin을 사용하여 Android 애플리케이션을 개발하는 방법에 대한 리소스','https://developer.android.com/kotlin','2024-08-13 03:50:45','2024-08-13 03:50:45',0,2,111),(111,'코틀린이란?','나무위키','https://namu.wiki/w/Kotlin','2024-08-13 03:51:20','2024-08-13 03:51:20',0,2,111),(117,'타입스크립트 공식문서','','https://www.typescriptlang.org/docs/','2024-08-13 08:44:17','2024-08-13 08:44:17',0,2,116),(118,'Zustand TypeScript 사용법','','https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md','2024-08-13 08:45:35','2024-08-13 08:45:35',0,2,116),(119,'DOM 조작 참고용','','https://velog.io/@kimbangul/TypeScript-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-HTML-DOM-%EC%A1%B0%EC%9E%91%ED%95%98%EA%B8%B0','2024-08-13 08:46:30','2024-08-13 08:46:30',0,2,116),(120,'DOM 조작 참고용 2','','https://velog.io/@minh0518/TypeScript%EC%97%90%EC%84%9C-DOM-%EB%8B%A4%EB%A3%A8%EA%B8%B0-HTMLElement%EC%99%80HTMLCollection','2024-08-13 08:47:35','2024-08-13 08:47:43',0,2,116),(121,'TypeScript APi 참고용','','https://velog.io/@hgoguma_124/API-%ED%98%B8%EC%B6%9C-%EB%A1%9C%EC%A7%81%EC%97%90-Typescript-%EC%9E%85%ED%9E%88%EA%B8%B0','2024-08-13 08:48:47','2024-08-13 08:48:47',0,2,116),(122,'퍼센트바 만들기','','https://harukong.tistory.com/44','2024-08-13 08:49:39','2024-08-13 08:49:39',0,2,121),(123,'CS와 CX의 정확한 뜻과 차이점','CS와 관련된 용어 정리','https://blog.boldwork.co.kr/explanation/','2024-08-13 08:50:06','2024-08-13 08:50:06',0,2,143),(124,'[기술면접] CS 기술면접 질문 - 프로그래밍 공통','','https://mangkyu.tistory.com/88','2024-08-13 08:50:39','2024-08-13 08:50:39',0,2,143),(125,'배낭 문제','','https://gsmesie692.tistory.com/113','2024-08-13 08:51:02','2024-08-13 08:51:02',0,2,119),(126,'면접을 위한 CS 전공지식 노트','','https://ch.yes24.com/Article/View/51232','2024-08-13 08:51:32','2024-08-13 08:51:32',0,2,143),(127,'백엔드 cs지식 공부법 관련 사이트','','https://zero-base.co.kr/event/media_insight_contents_BE_backend_cs','2024-08-13 08:52:03','2024-08-13 08:52:03',0,2,143),(128,'다익스트라','최단경로 탐색','https://great-park.tistory.com/133','2024-08-13 08:52:07','2024-08-13 08:52:07',0,2,119),(129,'CS관련 지식 정리','','https://cho001.tistory.com/81','2024-08-13 08:52:31','2024-08-13 08:52:31',0,2,143),(130,'분할정복 백준 정리','','https://hroad.tistory.com/37','2024-08-13 08:52:48','2024-08-13 08:52:48',0,2,119),(131,'분할정복 참고용 1','','https://olrlobt.tistory.com/45','2024-08-13 08:53:57','2024-08-13 08:53:57',0,2,119),(132,'분할정복 참고용 2','','https://kkkdh.tistory.com/entry/Java-Softeer-%EC%8A%88%ED%8D%BC%EB%B0%94%EC%9D%B4%EB%9F%AC%EC%8A%A4%EB%A5%BC-%ED%92%80%EB%A9%B4%EC%84%9C-%EB%B6%84%ED%95%A0-%EC%A0%95%EB%B3%B5%EA%B3%BC-%EC%9D%B4%EA%B2%83-%EC%A0%80%EA%B2%83-%EC%A0%95%EB%A6%AC','2024-08-13 08:55:06','2024-08-13 08:55:06',0,2,119),(133,'파이썬 공식문서','','https://docs.python.org/ko/3/','2024-08-13 08:55:53','2024-08-13 08:55:53',0,2,117),(134,'피그마','','https://www.figma.com/','2024-08-13 08:56:56','2024-08-13 08:56:56',0,2,121),(135,'프로젝트 노션','','https://www.notion.so/IT-Clips-017d948065bf4fe19631a6518ea1b62c','2024-08-13 08:58:26','2024-08-13 08:58:26',0,2,121),(137,'Axios 요청 형식','','https://axios-http.com/docs/req_config','2024-08-13 09:18:14','2024-08-13 09:18:14',0,2,121),(141,'OAuth2 동작 원리','스프링 시큐리티 OAuth2 동작 원리','https://velog.io/@nefertiri/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%8B%9C%ED%81%90%EB%A6%AC%ED%8B%B0-OAuth2-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC','2024-08-13 09:23:34','2024-08-13 09:23:34',0,1,144),(142,'OAuth2 공식 문서','Spring security for OAuth2','https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html','2024-08-13 09:23:34','2024-08-13 09:23:34',0,1,144),(143,'Security, OAuth2, JWT Login','소셜 로그인 구현','https://do5do.tistory.com/20','2024-08-13 09:23:44','2024-08-13 09:23:44',0,1,144),(144,'OAuth2 공식 문서','Spring security for OAuth2','https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html','2024-08-13 09:23:44','2024-08-13 09:23:44',0,1,144),(145,'OAuth2 동작 원리','스프링 시큐리티 OAuth2 동작 원리','https://velog.io/@nefertiri/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%8B%9C%ED%81%90%EB%A6%AC%ED%8B%B0-OAuth2-%EB%8F%99%EC%9E%91-%EC%9B%90%EB%A6%AC','2024-08-13 09:23:44','2024-08-13 09:23:44',0,1,144),(149,'상세한 합격 후기','CT, 에세이, PT 면접','https://claris.tistory.com/62','2024-08-13 09:29:11','2024-08-13 09:29:11',0,1,145),(150,'11기 합격 후기','11기 합격 후기','https://velog.io/@jeon-yj/SSAFY-11%EA%B8%B0-%EC%B5%9C%EC%A2%85-%ED%95%A9%EA%B2%A9-%ED%9B%84%EA%B8%B0','2024-08-13 09:29:11','2024-08-13 09:29:11',0,1,145),(151,'11기 전공자 합격 후기','11기 전공자','https://toki0411.tistory.com/85','2024-08-13 09:29:11','2024-08-13 09:29:11',0,3,145),(155,'10기 1학기 후기','10기 1학기 수료 후기','https://olrlobt.tistory.com/69','2024-08-13 09:30:38','2024-08-13 09:30:38',0,1,145),(156,'11기 1학기 수료 후기','1학기 수료 후기!','https://winterflower.tistory.com/458','2024-08-13 09:30:38','2024-08-13 09:30:38',0,1,145),(159,'NumPy 공식 문서','과학 컴퓨팅을 위한 파이썬 패키지 NumPy의 공식 문서','https://numpy.org/doc/','2024-08-13 09:31:29','2024-08-13 09:31:29',0,1,122),(160,'부팅 검은 화면','','https://m.blog.naver.com/PostView.naver?blogId=trman&logNo=223106040037&categoryNo=22&proxyReferer=','2024-08-13 09:32:21','2024-08-13 09:32:21',0,2,146),(161,'selenium','크롤링','https://github.com/SeleniumHQ/selenium/','2024-08-13 09:32:28','2024-08-13 09:32:28',0,2,122),(162,'beautifulsoup4','크롤링','https://www.crummy.com/software/BeautifulSoup/bs4/doc/','2024-08-13 09:32:28','2024-08-13 09:32:28',0,2,122),(164,'안켜질때 검은 화면 먹통','','https://m.blog.naver.com/jazzlubu/222675677494','2024-08-13 09:32:56','2024-08-13 09:32:56',0,2,146),(167,'전원 안 켜지고 검은 화면','','https://www.asus.com/kr/support/faq/1014276/','2024-08-13 09:33:33','2024-08-13 09:33:33',0,2,146),(168,'부팅 안되고 검은 화면','','https://www.samsungsvc.co.kr/solution/26204','2024-08-13 09:33:54','2024-08-13 09:33:54',0,1,146),(169,'전원은 켜지는데 화면 안나옴','','https://www.samsungsvc.co.kr/solution/32280','2024-08-13 09:33:54','2024-08-13 09:33:54',0,1,146),(171,'콘텐츠 기반 필터링','','https://tech.kakao.com/posts/486','2024-08-13 09:47:25','2024-08-13 09:47:25',0,2,150),(172,'아이템 기반 쇼핑몰 상품 추천','','https://wikidocs.net/89215','2024-08-13 09:48:15','2024-08-13 09:48:15',0,2,150),(178,'추천시스템 TF-IDF','','https://casa-de-feel.tistory.com/43','2024-08-13 09:51:20','2024-08-13 09:51:20',0,3,150),(179,'TF-IDF, Word2Vec 비교','','https://velog.io/@ttogle918/Recommendation-02','2024-08-13 09:51:20','2024-08-13 09:51:20',0,3,150),(180,'추천 시스템 알고리즘','','https://blog.blux.ai/%EC%B6%94%EC%B2%9C-%EC%8B%9C%EC%8A%A4%ED%85%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EC%A2%85%EB%A5%98-%EB%B0%8F-%EC%A0%81%EC%9A%A9%EC%82%AC%EB%A1%80-%EC%B4%9D%EC%A0%95%EB%A6%AC-20771','2024-08-13 09:51:34','2024-08-13 09:51:34',0,1,150),(181,'추천시스템 TF-IDF','','https://casa-de-feel.tistory.com/43','2024-08-13 09:51:34','2024-08-13 09:51:34',0,1,150),(182,'TF-IDF, Word2Vec 비교','','https://velog.io/@ttogle918/Recommendation-02','2024-08-13 09:51:34','2024-08-13 09:51:34',0,1,150),(183,'추천 시스템 알고리즘 비교','','https://zzgrworkspace.tistory.com/96','2024-08-13 09:51:34','2024-08-13 09:51:34',0,1,150),(184,'Vite + React + Typescript','','https://velog.io/@nh2545/SSAFYcial-Vite-React-Typescript%EB%A1%9C-chrome-extension%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90','2024-08-13 09:54:11','2024-08-13 09:54:11',0,2,158),(185,'Chrome 공식문서','','https://support.google.com/chrome/a/answer/2714278?hl=ko','2024-08-13 09:54:30','2024-08-13 09:54:30',0,2,158),(186,'배포 자동화까지','','https://kang-ju.tistory.com/entry/%EC%82%AC%EC%9D%B4%EB%93%9C-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%9A%B0%EB%8B%B9%ED%83%95%ED%83%95-%EB%A6%AC%EC%95%A1%ED%8A%B8%EB%A1%9C-%ED%81%AC%EB%A1%AC-%EC%9D%B5%EC%8A%A4%ED%85%90%EC%85%98-%EB%A7%8C%EB%93%A4%EA%B8%B0-Gachon-Tools','2024-08-13 09:55:08','2024-08-13 09:55:08',0,2,158),(187,'구조 정리 good','','https://kyechan99.github.io/post/lib/chrome-extension-2','2024-08-13 09:55:36','2024-08-13 09:55:36',0,2,158),(188,'URL 크롤링','','https://security-jeong.tistory.com/167','2024-08-13 09:55:56','2024-08-13 09:55:56',0,2,158),(189,'ChatGPT 기반 뉴스 요악 익스텐션','','https://junnyhi.tistory.com/268','2024-08-13 09:56:31','2024-08-13 09:56:31',0,2,158),(192,'The web framework for perfectionists with deadlines | Django','','https://www.djangoproject.com','2024-08-13 10:20:53','2024-08-13 10:20:53',0,1,118),(196,'MDN Web Docs(웹 표준 사이트)','','https://developer.mozilla.org/ko/','2024-08-13 10:29:53','2024-08-13 10:29:53',0,2,114),(198,'OAuth 2.0 홈  |  Apigee  |  Google Cloud','','https://cloud.google.com/apigee/docs/api-platform/security/oauth/oauth-home?hl=ko','2024-08-13 13:35:58','2024-08-13 13:35:58',0,2,169),(199,'GitHub App settings - itclipslogin','깃허브','https://github.com/settings/apps/itclipslogin','2024-08-13 13:36:41','2024-08-13 13:36:41',0,2,169),(200,'REST API | Kakao Developers 문서','카카오','https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api','2024-08-13 13:37:26','2024-08-13 13:37:26',0,2,169),(201,'초보자를 위한 기초 7일 완성, 자바스크립트 강좌(Javascript) - 1 (JS란?, event, onclick, onchange, onkeydown, 웹에서 js사용하는 법)','','https://infodon.tistory.com/11','2024-08-13 13:49:55','2024-08-13 13:49:55',0,2,170),(202,'Home - Django REST framework','장고 REST 프레임워크에 대한 설명입니다.','https://www.django-rest-framework.org','2024-08-13 13:56:51','2024-08-13 13:56:51',0,2,170),(203,'The web framework for perfectionists with deadlines | Django','','https://www.djangoproject.com','2024-08-13 13:56:55','2024-08-13 13:56:55',0,2,170),(204,'QuerySet API reference | Django documentation | Django','장고 ORM에 대한 설명입니다.','https://docs.djangoproject.com/en/5.0/ref/models/querysets/','2024-08-13 13:56:58','2024-08-13 13:56:58',0,2,170),(205,'리액트 아이콘','','https://react-icons.github.io/react-icons/','2024-08-13 13:57:05','2024-08-13 13:57:05',0,2,170),(206,'리액트 라우터 참고용','','https://noah-dev.tistory.com/38','2024-08-13 13:57:12','2024-08-13 13:57:12',0,1,170),(221,'타입스크립트 공홈','','typescript.com','2024-08-14 10:06:47','2024-08-14 10:06:47',0,2,176),(223,'The web framework for perfectionists with deadlines | Django','','https://www.djangoproject.com','2024-08-14 13:02:45','2024-08-14 13:02:45',0,2,170),(224,'Android 개발자 공식 사이트','안드로이드 개발에 대한 기본적인 가이드와 튜토리얼을 제공','https://developer.android.com/','2024-08-14 14:46:17','2024-08-14 14:46:17',0,2,189),(225,'Android Basics by Google','Google과 제휴하여 제작된 안드로이드 기초 과정으로, 앱 개발의 기본을 학습할 수 있습니다.','https://www.udacity.com/','2024-08-14 14:47:13','2024-08-14 14:47:13',0,2,189),(226,'안드로이드 앱 개발 특화 과정','초급부터 중급까지의 안드로이드 개발 과정을 제공','https://www.coursera.org/specializations/android-app-development','2024-08-14 14:47:41','2024-08-14 14:47:41',0,2,189),(227,'Coding in Flow','다양한 안드로이드 개발 튜토리얼을 영상으로 제공','https://www.youtube.com/c/codinginflow','2024-08-14 14:48:05','2024-08-14 14:48:05',0,2,189),(228,'생활코딩','무료로 제공되는 한국어 튜토리얼로, 기초부터 앱 개발까지 단계별로 학습할 수 있습니다.','https://opentutorials.org/course/1','2024-08-14 14:49:06','2024-08-14 14:49:06',0,2,189),(229,'실무에서 필요한 정보들','안드로이드 개발자들이 작성한 고급 기술 관련 블로그','https://proandroiddev.com/','2024-08-14 14:51:29','2024-08-14 14:51:29',0,2,192),(230,'Android Intermediate and Advanced Tutorials','다양한 안드로이드 개발 주제를 다루는 튜토리얼 모음','https://www.geeksforgeeks.org/android-projects-from-basic-to-advanced-level/','2024-08-14 14:53:13','2024-08-14 14:53:13',0,2,192),(231,'Awesome Android','안드로이드 관련 오픈 소스 프로젝트, 라이브러리, 튜토리얼을 모아둔 레포지토리','https://github.com/JStumpp/awesome-android','2024-08-14 14:53:53','2024-08-14 14:53:53',0,2,192),(232,'Android Advanced Topics','안드로이드 고급 주제에 대한 비디오 강의를 제공','https://www.pluralsight.com/paths/android-development-with-kotlin-fundamentals','2024-08-14 14:54:50','2024-08-14 14:54:50',0,2,192),(233,'Github Google Samples','구글에서 제공하는 다양한 안드로이드 예제 프로젝트 모음, 중급 개발자들이 참고하기 좋은 코드와 패턴을 제공','https://github.com/googlesamples','2024-08-14 14:55:33','2024-08-14 14:55:33',0,2,192),(234,'웹 소켓의 개념과 간단한 예제','','https://www.chanstory.dev/blog/post/26','2024-08-14 15:13:29','2024-08-14 15:13:29',0,2,193),(235,'웹소켓으로 개발하기 전 알아야 할 것들 - 요즘IT','','https://yozm.wishket.com/magazine/detail/1911/','2024-08-14 15:31:21','2024-08-14 15:31:21',0,2,193),(236,'WebSocket 대 HTTP 통신 프로토콜','WebSocket과 HTTP 차이점 요약','https://sendbird.com/ko/developer/tutorials/websocket-vs-http-communication-protocols','2024-08-14 15:31:39','2024-08-14 15:31:39',0,2,193),(237,'Web Socket 이란?','','https://velog.io/@codingbotpark/Web-Socket-%EC%9D%B4%EB%9E%80','2024-08-14 15:31:51','2024-08-14 15:31:51',0,2,193),(244,'자습서: React 시작하기','','https://react.dev/learn/tutorial-tic-tac-toe','2024-08-14 17:14:40','2024-08-14 17:14:40',0,2,186),(245,'React 공부 순서와 샘플 프로젝트 추천','','https://brunch.co.kr/@princox/235','2024-08-14 17:14:58','2024-08-14 17:14:58',0,2,186),(246,'리액트 연습 프로젝트','재사용 가능한 카드 컴포넌트 만들기 및 모달 구현','https://velog.io/@tpgus758/%EC%9E%AC%EC%82%AC%EC%9A%A9-%EA%B0%80%EB%8A%A5%ED%95%9C-%EC%B9%B4%EB%93%9C-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0','2024-08-14 17:16:30','2024-08-14 17:16:30',0,2,186),(247,'React 연습장','웹에서 리액트 코드 쓰면 바로 렌더링되는 사이트','https://codesandbox.io/s/react-yeonseubjang-lcgh2','2024-08-14 17:17:52','2024-08-14 17:17:52',0,2,186),(248,'리액트 연습하기!- todo만들기 (타입스크립트와 함께하는)','','https://khj0426.tistory.com/219','2024-08-14 17:18:17','2024-08-14 17:18:17',0,2,186),(249,'React 무료 공부 사이트 모음','','https://blog.naver.com/jaeeun_98/222078327412','2024-08-14 17:18:40','2024-08-14 17:18:40',0,2,186),(250,'','','https://gdngy.tistory.com/99','2024-08-14 17:29:49','2024-08-14 17:29:49',0,2,132),(251,'','','https://do5do.tistory.com/17','2024-08-14 17:56:30','2024-08-14 17:56:30',0,2,132),(253,'','','https://chromewebstore.google.com/category/themes?hl=ko','2024-08-14 20:32:18','2024-08-14 20:32:18',0,2,132),(260,'리액트 공식문서','','https://ko.react.dev/','2024-08-15 12:11:05','2024-08-15 12:11:05',0,2,177),(261,'리액트 아이콘','','https://react-icons.github.io/react-icons/','2024-08-15 12:13:30','2024-08-15 12:13:30',0,2,177),(262,'리액트 라우터 공식문서','','https://reactrouter.com/en/main','2024-08-15 12:13:54','2024-08-15 12:13:54',0,2,177),(263,'AWS(Amazon 웹 서비스)란?','','https://appmaster.io/ko/blog/aws-amazon-web-seobiseuran-mueosibnigga','2024-08-15 12:14:10','2024-08-15 12:14:10',0,2,180),(264,'시작하기 - AWS 기반 구축을 위한 클라우드 컴퓨팅 자습서','','https://aws.amazon.com/ko/getting-started/','2024-08-15 12:14:54','2024-08-15 12:14:54',0,2,180),(265,'클라우드 컴퓨팅과 아마존 AWS 대해서 알아보자 - 네이버 블로그','','https://m.blog.naver.com/skh556/221879418423','2024-08-15 12:15:19','2024-08-15 12:15:19',0,2,180),(266,'클라우드 컴퓨팅 개념 허브','','https://aws.amazon.com/ko/what-is/?faq-hub-cards.sort-by=item.additionalFields.sortDate&faq-hub-cards.sort-order=desc&awsf.tech-category=*all','2024-08-15 12:15:40','2024-08-15 12:15:40',0,2,180),(267,'AWS 대표 서비스 10가지: 초보자를 위한 가이드','','https://www.smileshark.kr/post/top-10-aws-beginner-guide','2024-08-15 12:16:06','2024-08-15 12:16:06',0,2,180),(268,'JavaScript가 뭔가요? - Web 개발 학습하기','','https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/What_is_JavaScript','2024-08-15 12:17:50','2024-08-15 12:17:50',0,2,184),(269,'자바스크립트(JavaScript) 기초 및 문법ㅣ정의, 기본 문법, 변수, 함수','','https://www.codestates.com/blog/content/javascript-%EA%B8%B0%EC%B4%88-%EB%B0%8F-%EB%AC%B8%EB%B2%95','2024-08-15 12:18:08','2024-08-15 12:18:08',0,2,184),(270,'자바스크립트 기본 문법','','https://dinfree.com/lecture/frontend/123_js_2.html','2024-08-15 12:18:38','2024-08-15 12:18:38',0,2,184),(271,'자바스크립트 기본','','https://ko.javascript.info/first-steps','2024-08-15 12:18:56','2024-08-15 12:18:56',0,2,184),(277,'','','https://ko.legacy.reactjs.org/tutorial/tutorial.html','2024-08-15 16:42:14','2024-08-15 16:42:14',0,2,186);
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark_category`
--

DROP TABLE IF EXISTS `bookmark_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `bookmark_id` bigint NOT NULL,
  `category_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bookmark_category_bookmark1_idx` (`bookmark_id`),
  KEY `fk_bookmark_category_category1_idx` (`category_id`),
  CONSTRAINT `fk_bookmark_category_bookmark1` FOREIGN KEY (`bookmark_id`) REFERENCES `bookmark` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_bookmark_category_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_category`
--

LOCK TABLES `bookmark_category` WRITE;
/*!40000 ALTER TABLE `bookmark_category` DISABLE KEYS */;
INSERT INTO `bookmark_category` VALUES (82,24,607),(83,25,608),(84,27,607),(85,30,607),(86,43,617),(87,44,617),(88,45,617),(90,49,620),(91,50,620),(92,51,620),(93,52,619),(94,54,619),(95,55,622),(96,60,622),(97,61,622),(98,62,623),(99,63,623),(105,141,649),(106,142,649),(107,143,648),(108,144,648),(109,145,648),(110,149,651),(111,150,651),(112,151,651),(114,156,653),(115,155,653),(117,159,628),(118,161,628),(119,162,628),(121,169,660),(122,168,660),(125,178,682),(126,179,682),(127,180,683),(128,181,683),(129,182,683),(130,183,683),(135,206,712);
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
  CONSTRAINT `FK_Bookmark_TO_BookmarkLike_1` FOREIGN KEY (`bookmark_id`) REFERENCES `bookmark` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_User_TO_BookmarkLike_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_like`
--

LOCK TABLES `bookmark_like` WRITE;
/*!40000 ALTER TABLE `bookmark_like` DISABLE KEYS */;
INSERT INTO `bookmark_like` VALUES (44,104,3,'2024-08-13 00:49:51'),(45,104,5,'2024-08-13 00:49:52'),(57,112,12,'2024-08-13 13:42:02'),(58,112,196,'2024-08-13 13:45:48'),(59,112,90,'2024-08-13 13:46:28'),(60,112,89,'2024-08-13 13:46:29'),(61,112,3,'2024-08-13 13:46:49'),(62,112,4,'2024-08-13 13:46:50'),(63,112,15,'2024-08-13 13:47:06'),(64,112,124,'2024-08-13 13:55:03'),(65,112,13,'2024-08-13 14:46:02'),(66,104,89,'2024-08-13 22:17:06'),(67,104,90,'2024-08-13 22:17:07'),(68,112,205,'2024-08-14 13:02:49'),(69,116,18,'2024-08-14 14:37:59'),(70,116,19,'2024-08-14 14:38:02'),(72,116,244,'2024-08-15 20:19:30'),(73,116,124,'2024-08-15 20:21:43'),(74,105,117,'2024-08-15 21:07:19');
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
  `description` varchar(511) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image` varchar(511) DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT '0',
  `hit` bigint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_User_TO_BookmarkList_1` (`user_id`),
  CONSTRAINT `FK_User_TO_BookmarkList_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_list`
--

LOCK TABLES `bookmark_list` WRITE;
/*!40000 ALTER TABLE `bookmark_list` DISABLE KEYS */;
INSERT INTO `bookmark_list` VALUES (103,104,'리액트 도움될만한 정보들','react-router-dom에 관해서 자세한 내용들','2024-08-12 19:19:00','2024-08-15 22:12:12','images/3fd4217e-cb45-4d0b-914d-0b4995fe814b-리액트 도움될만한 정보들-104',1,305),(104,104,'타입스크립트 기초','타입스크립트 시작할 때 알아두면 좋은것들','2024-08-12 19:42:14','2024-08-15 23:11:41','images/90f5d3c7-aecb-46b8-b78b-ba8b5f34b145-타입스크립트 기초-104',1,49),(109,104,'자바스크립트 관련 모음','자바스크립트 관련 모음','2024-08-12 20:01:55','2024-08-15 22:12:15','images/34b030f3-2d03-4a1d-a8bd-0d0f24720b15-자바스크립트 심화-104',1,64),(110,104,'앵귤러 학습에 도움되는 리스트','앵귤러 첫시작','2024-08-12 20:03:14','2024-08-15 23:11:44','images/f1428c77-1603-4c98-9591-0b6e417e5f27-앵귤러 학습에 도움되는 리스트-104',1,35),(111,104,'코틀린 잡학지식','코틀린에 대해 필요없지만 궁금한 내용들','2024-08-12 20:06:21','2024-08-14 12:56:09','images/48abe3be-8ecd-4003-ad9f-49fbd90300c7-코틀린 잡학지식-104',1,24),(114,102,'Web','웹사이트 기초 학습에 도움되는 북마크들 입니다.','2024-08-12 20:24:36','2024-08-15 20:25:55','images/6f3f8580-aec9-43fd-834c-a507f37aab99-Web-102',1,306),(116,105,'타입 스크립트 참고용','','2024-08-12 20:51:19','2024-08-15 21:41:09','images/2314617e-7143-4252-83ce-97d11da86dad-타입 스크립트 참고용-105',1,453),(117,105,'파이썬 참고용','알고리즘 참고 자료들입니다\n','2024-08-12 20:58:26','2024-08-15 23:16:01','images/2338ff0d-1d62-4f12-a296-6df3024a9da0-파이썬 참고용-105',1,81),(118,102,'Django 기초 Document 자료','장고 학습 시작할 때 도움이 되는 문서 자료입니다.','2024-08-12 20:58:27','2024-08-15 22:12:04','images/0cc16332-39aa-4839-b8cb-4b4d8a756c02-Django 기초 Document 자료-102',1,124),(119,105,'알고리즘','','2024-08-12 21:03:25','2024-08-15 21:07:45','images/3f164506-be3b-4d63-8601-34be7a56c19c-알고리즘-105',1,43),(121,105,'메모용 리스트','정리용','2024-08-12 21:21:44','2024-08-15 23:03:16','default',1,59),(122,107,'파이썬 라이브러리 Top 10','데이터 과학에 가장 많이 사용되는 파이썬 라이브러리 모음.','2024-08-12 21:34:30','2024-08-15 12:42:56','images/43662bb8-c74d-4ff8-acf0-2b943f8f3e2e-파이썬 라이브러리 Top 10-107',1,61),(123,107,'웹 개발 리소스','모던 웹 개발을 위한 필수 리소스','2024-08-12 21:41:32','2024-08-15 14:22:05','images/ffe4736c-df62-4a7e-84db-ab8009789516-웹 개발 리소스-107',1,28),(124,102,'자바스크립트 초급','자바스크립트 초급 학습에 도움되는 북마크들 입니다.','2024-08-12 21:42:54','2024-08-15 22:20:22','images/6c94c93a-1bda-47fe-b410-5f816822947e-자바스크립트 기초 -102',1,123),(125,107,'AI & 머신러닝 튜토리얼','AI와 머신러닝 관련 튜토리얼 모음','2024-08-12 21:46:40','2024-08-15 12:43:07','images/6d8be565-5684-450d-8ba9-85dc2da2d3bc-AI & 머신러닝 튜토리얼-107',1,23),(126,107,'DevOps 도구 및 실습','필수 DevOps 도구 및 실습 가이드','2024-08-12 21:47:11','2024-08-14 13:25:06','images/9980bd90-6a38-4290-bfe1-fc6536e801da-DevOps 도구 및 실습-107',1,22),(127,107,'클라우드 컴퓨팅 플랫폼','AWS, Azure, GCP와 같은 주요 클라우드 플랫폼 개요','2024-08-12 21:47:45','2024-08-15 12:26:28','images/86e04be2-df1c-41e9-bf7e-3af2162bea90-클라우드 컴퓨팅 플랫폼-107',1,20),(128,107,'React 라이브러리 모음','모던 웹 개발을 위한 React 라이브러리 및 도구 모음.','2024-08-12 21:59:32','2024-08-13 01:47:25','images/5f4e2ba3-3f5a-4634-9326-7c30de53e2a1-React 라이브러리 모음-107',1,15),(129,102,'리액트 기초부터 중급까지','리액트 입문부터 중급 기술까지 포함','2024-08-12 22:10:43','2024-08-14 14:37:22','images/5fdb3ad6-8577-44db-9dbf-7fdb60de55c8-리액트 기초부터 중급까지-102',1,71),(132,106,'spring 기초','스프링 기초 공부','2024-08-12 23:25:45','2024-08-15 17:07:01','images/c7040960-8f42-41c6-94d0-f1ad3d6218f0-spring 기초-106',1,40),(133,107,'안드로이드 앱 개발 튜토리얼','초보자를 위한 안드로이드 앱 개발 입문서','2024-08-12 23:34:14','2024-08-13 01:36:49','images/875d829e-0001-49e0-b2d5-c4cee8e999a6-안드로이드 앱 개발 튜토리얼-107',1,8),(135,107,'알고리즘 문제 해결 전략','프로그래밍 대회 및 면접을 위한 알고리즘 문제 풀이 전략','2024-08-12 23:36:08','2024-08-13 23:34:21','default',1,8),(138,106,'CI/CD','CI/CD를 공부해보자','2024-08-12 23:44:36','2024-08-13 23:40:22','images/6c682d1f-990e-4790-a0b0-f882b1dff61e-CI/CD-106',1,23),(140,106,'AWS','AWS를 공부해보자','2024-08-12 23:51:14','2024-08-13 23:16:03','images/56b1bcb4-f148-4d9a-bfe1-c9f99ed1b3e5-AWS-106',1,49),(141,106,'jpa 공부하자','jpa 공부하자','2024-08-13 00:23:22','2024-08-15 17:06:57','images/bd1656aa-1cf7-4daf-a5c3-80ed7584bb72-jpa 공부하자-106',1,344),(143,104,'비전공자 cs준비','cs관련 자주 출제되는 내용들 모음','2024-08-13 08:48:55','2024-08-15 20:35:12','images/c6d9d879-a7c6-434b-bd81-19568fa006de-비전공자 cs준비-104',1,54),(144,108,'Spring security 원샷원킬','내게 와,,, 스프링 시큐리티,,,,','2024-08-13 09:14:21','2024-08-14 13:24:52','images/f4ebc3ce-6637-45d0-a342-9401994eae84-Spring security 원샷원킬-108',1,70),(145,108,'SSAFY 13기 하고 싶어요','SSAFY 갈끄니까!!','2024-08-13 09:26:48','2024-08-14 12:44:29','images/b4446f24-ccb8-41b3-82aa-45a191b9f2dd-SSAFY 13기 하고 싶어요-108',1,31),(146,108,'내 노트북 살려내','갤럭시북 플렉스 알파가 기절하신 사건','2024-08-13 09:32:05','2024-08-13 23:37:27','images/16e03fc2-cf9d-45ba-9f75-c0447bbd5ed6-내 노트북 살려내-108',1,21),(148,107,'itclips 프로젝트 자료','프로젝트 자료 모음 ','2024-08-13 09:40:32','2024-08-15 22:02:22','images/4494df36-457b-4689-be49-b39cc2201658-itclips 프로젝트 자료-107',1,23),(150,108,'추천 시스템? 껌이네요 ㅋ','컨텐츠 기반 필터링에 관한 고찰..','2024-08-13 09:43:40','2024-08-15 20:31:24','images/47e45a7a-2322-4b7a-8085-0801530e4912-추천 시스템? 껌이네요 ㅋ-108',1,48),(158,108,'Chrome Extension 뿌수기 ?','재밌겠당!!!','2024-08-13 09:52:40','2024-08-14 16:18:03','images/f77ce74e-1d60-4d95-bf43-65a226c43a20-Chrome Extension 뿌수기 ?-108',1,24),(164,106,'테스트','테스트리스트','2024-08-13 10:41:36','2024-08-14 12:44:58','images/25b4964e-3a14-40d3-b637-6c5bae60208a-테스트-106',1,24),(165,106,'비공개','','2024-08-13 10:42:14','2024-08-13 10:42:14','images/fdc75169-ee94-423a-bae3-08e236b16720-비공개-106',0,0),(169,102,'소셜 로그인','소셜 로그인 하는 방법 소개','2024-08-13 13:35:20','2024-08-15 20:57:27','images/fd5e27c6-ff18-402e-a8aa-a22ba10ac8b0-소셜 로그인-102',1,22),(170,112,'스터디','공부','2024-08-13 13:49:39','2024-08-15 01:42:48','images/51cf739e-a4e4-438b-984d-e2136df33e3f-스터디-112',1,18),(171,104,'테스트 북마크리스트','그룹 테스트','2024-08-13 23:10:41','2024-08-14 09:59:28','default',1,54),(175,117,'리액트 관련 공식문서들','','2024-08-14 10:02:43','2024-08-15 23:08:57','images/a4c0a030-472d-443a-85db-3600e3c863c9-리액트 관련 공식문서들-117',1,14),(176,117,'더 많은 타입 스크립트','','2024-08-14 10:03:24','2024-08-15 23:08:39','images/9dc36103-7eda-4075-8c01-ebb2de5a2b30-더 많은 타입 스크립트-117',1,24),(177,105,'리액트 참고용','리액트 참고용 링크 모음','2024-08-14 10:44:02','2024-08-15 21:07:36','images/6fea29b0-d22e-41c2-b0ba-0944d18a401f-리액트 참고용-105',1,31),(179,120,'예찬이의 보석함','수정정정정\n민락쿤','2024-08-14 12:46:36','2024-08-15 16:31:29','images/92bfb6b0-5024-459c-82f0-73a97f4725a2-예찬이의 보석함-120',1,6),(180,116,'AWS에 대해서 알아보자!','AWS가 뭔지 알려주는 북마크 모음입니다!','2024-08-14 12:58:59','2024-08-15 22:19:24','images/afba1473-d2bd-47d8-ae53-4ae1ecadb6e1-AWS에 대해서 알아보자!-116',1,52),(184,116,'자바스크립트 중급','자바스크립트를 처음 학습하시는 분들을 위한 북마크리스트','2024-08-14 13:00:27','2024-08-15 21:18:37','images/0c3333de-4746-4ae2-9112-35d3112393ba-자바스크립트 기초-116',1,40),(186,116,'리액트 고수가 되는 길','','2024-08-14 13:01:41','2024-08-15 22:14:48','images/69195218-35c5-43ad-802f-a4c18e6101b2-리액트 고수가 되는 길-116',1,70),(188,108,'테스트','테스트','2024-08-14 13:20:21','2024-08-15 14:35:46','images/624e6719-116b-4b52-9a39-ad4f58e0fe55-테스트-108',1,3),(189,104,'안드로이드 입문','안드로이드 기초 학습을 위한 북마크 모음','2024-08-14 14:45:35','2024-08-14 14:49:06','images/8c2e5aa9-c344-4e87-9cbe-033e597b21f9-안드로이드 입문-104',1,11),(190,102,'너도 할 수 있어 리액트 !','리액트 초보들을 위한 북마크리스트 입니다~ 같이 관리하실 분들은 메세지 주세요!','2024-08-14 14:46:06','2024-08-14 14:46:10','images/f1d630d7-aadd-4ed7-b5fe-3ebc67e43dc4-너도 할 수 있어 리액트 !-102',1,1),(191,102,'django로 REST API 서버 만들기!','백엔드 서버를 만드는데 도움이 되는 북마크리스트 공유드립니다~','2024-08-14 14:48:13','2024-08-14 14:48:13','images/a50d6308-df49-4936-868c-0d1e0bd525ed-django로 REST API 서버 만들기!-102',1,0),(192,104,'안드로이드 중급 학습 자료','','2024-08-14 14:49:58','2024-08-15 01:48:53','images/6c74ccc9-2d86-4662-b845-cb99f5a7b283-안드로이드 중급 학습 자료-104',1,13),(193,116,'웹 소켓 구현하기 전 알아야 할 것들','','2024-08-14 15:13:05','2024-08-15 21:54:50','images/00cb5d78-298c-4fbc-b02e-62b8b59bb65c-웹 소켓 구현하기 전 알아야 할 것들-116',1,19),(194,124,'RAG관련','RAG관련 모음','2024-08-14 18:54:22','2024-08-15 12:43:15','images/e79fb224-343f-4ca1-b2fc-96a0d2d9cfd0-RAG관련-124',1,15),(196,108,'gg','','2024-08-15 14:35:53','2024-08-15 14:35:53','default',1,0);
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
  `contents` tinytext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `bookmark_id` (`bookmark_id`),
  CONSTRAINT `bookmarklistcomment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarklistcomment_ibfk_2` FOREIGN KEY (`bookmark_id`) REFERENCES `bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_list_comment`
--

LOCK TABLES `bookmark_list_comment` WRITE;
/*!40000 ALTER TABLE `bookmark_list_comment` DISABLE KEYS */;
INSERT INTO `bookmark_list_comment` VALUES (62,107,103,'리액트 공부할때 많은 도움이 됐습니다!','2024-08-13 01:00:16','2024-08-13 01:00:16'),(63,107,150,'정말 유용한 정보내요','2024-08-13 09:47:46','2024-08-13 09:47:46'),(65,102,114,'12312','2024-08-13 10:25:22','2024-08-13 10:25:22'),(66,104,114,'많은 도움이 되었습니다!','2024-08-13 10:26:13','2024-08-13 10:31:18'),(69,108,119,'알고리즘이랑 친해졌어요...','2024-08-13 22:44:47','2024-08-13 22:44:47');
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
  CONSTRAINT `bookmarklistlike_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarklistlike_ibfk_2` FOREIGN KEY (`bookmark_list_id`) REFERENCES `bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=268 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_list_like`
--

LOCK TABLES `bookmark_list_like` WRITE;
/*!40000 ALTER TABLE `bookmark_list_like` DISABLE KEYS */;
INSERT INTO `bookmark_list_like` VALUES (190,106,122,'2024-08-13 01:45:43'),(191,102,123,'2024-08-13 01:47:22'),(213,102,140,'2024-08-13 10:33:11'),(214,102,143,'2024-08-13 10:40:11'),(215,102,164,'2024-08-13 10:41:47'),(216,102,114,'2024-08-13 10:59:13'),(217,112,143,'2024-08-13 13:55:13'),(219,102,129,'2024-08-13 17:31:38'),(229,104,109,'2024-08-13 22:17:29'),(230,104,103,'2024-08-13 22:19:05'),(233,106,124,'2024-08-14 09:31:54'),(234,106,169,'2024-08-14 09:31:55'),(235,106,129,'2024-08-14 09:31:55'),(236,105,117,'2024-08-14 09:32:19'),(237,105,177,'2024-08-14 14:03:50'),(249,107,123,'2024-08-15 20:32:38'),(250,102,180,'2024-08-15 20:53:10'),(252,102,184,'2024-08-15 20:54:50'),(253,105,119,'2024-08-15 21:07:30'),(254,116,109,'2024-08-15 21:17:16'),(256,104,189,'2024-08-15 21:56:07'),(257,104,111,'2024-08-15 21:56:08'),(262,104,169,'2024-08-15 22:10:26'),(263,104,143,'2024-08-15 22:10:31'),(264,106,180,'2024-08-15 22:10:45'),(265,104,180,'2024-08-15 22:16:57'),(266,104,184,'2024-08-15 22:16:58'),(267,104,127,'2024-08-15 22:17:06');
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
  `category` enum('AD','COPY_RIGHT','ETC') NOT NULL DEFAULT 'AD',
  `reason` tinytext NOT NULL,
  `status` enum('PENDING','RESOLVED','REJECTED') DEFAULT 'PENDING',
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookmark_list_id` (`bookmark_list_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookmarklistreport_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarklistreport_ibfk_2` FOREIGN KEY (`bookmark_list_id`) REFERENCES `bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_list_report`
--

LOCK TABLES `bookmark_list_report` WRITE;
/*!40000 ALTER TABLE `bookmark_list_report` DISABLE KEYS */;
INSERT INTO `bookmark_list_report` VALUES (8,102,114,'2024-08-13 10:28:00','AD','신고테스트','PENDING'),(9,102,143,'2024-08-13 10:41:33','AD','123','PENDING'),(11,105,119,'2024-08-13 12:32:31','COPY_RIGHT','as','PENDING'),(12,105,117,'2024-08-14 10:40:07','COPY_RIGHT','겨ㅗㅓㄳ','PENDING'),(13,105,177,'2024-08-14 12:40:14','AD','ㅁㄴㄹㅇ','PENDING'),(14,116,184,'2024-08-15 11:16:15','AD','신고하기','PENDING');
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
  CONSTRAINT `bookmarkfavoritelist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarkfavoritelist_ibfk_2` FOREIGN KEY (`bookmark_list_id`) REFERENCES `bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_list_scrap`
--

LOCK TABLES `bookmark_list_scrap` WRITE;
/*!40000 ALTER TABLE `bookmark_list_scrap` DISABLE KEYS */;
INSERT INTO `bookmark_list_scrap` VALUES (144,104,103,'2024-08-13 00:30:51'),(146,104,110,'2024-08-13 00:31:05'),(148,102,124,'2024-08-13 00:32:08'),(152,107,103,'2024-08-13 00:59:50'),(154,106,122,'2024-08-13 01:45:42'),(155,102,140,'2024-08-13 01:47:34'),(161,102,143,'2024-08-13 10:41:23'),(162,112,143,'2024-08-13 13:55:12'),(167,102,164,'2024-08-13 16:01:13'),(174,106,144,'2024-08-13 23:50:21'),(176,116,169,'2024-08-14 13:02:31'),(177,116,118,'2024-08-14 13:02:37'),(178,116,143,'2024-08-14 13:02:47'),(179,112,170,'2024-08-14 13:02:51'),(180,116,127,'2024-08-14 13:04:20'),(181,116,104,'2024-08-15 00:16:00'),(182,104,111,'2024-08-15 18:14:15'),(183,104,189,'2024-08-15 18:14:37'),(188,104,193,'2024-08-15 22:17:16'),(189,116,124,'2024-08-15 22:20:27');
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
  CONSTRAINT `FK_BookmarkList_TO_BookmarkListTag_1` FOREIGN KEY (`bookmark_list_id`) REFERENCES `bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Tag_TO_BookmarkListTag_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1083 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_list_tag`
--

LOCK TABLES `bookmark_list_tag` WRITE;
/*!40000 ALTER TABLE `bookmark_list_tag` DISABLE KEYS */;
INSERT INTO `bookmark_list_tag` VALUES (1049,103,24),(1050,103,102),(1051,103,195),(860,104,103),(862,104,196),(861,104,197),(1002,109,14),(1001,109,198),(1003,109,199),(845,110,26),(847,110,200),(846,110,201),(849,111,21),(848,111,202),(850,111,203),(966,114,1),(965,114,135),(1036,116,103),(1034,116,130),(1035,116,138),(991,117,13),(992,117,140),(993,117,141),(967,118,27),(790,119,140),(789,119,142),(962,121,151),(961,121,152),(823,122,13),(876,123,1),(877,123,278),(1076,124,146),(827,125,13),(825,125,153),(826,125,154),(828,126,155),(829,126,158),(831,127,35),(830,127,156),(832,127,157),(834,128,1),(833,128,24),(808,129,24),(810,129,161),(809,129,163),(811,132,29),(835,133,168),(815,135,142),(818,138,81),(819,140,34),(821,141,174),(820,141,188),(998,143,228),(999,143,229),(1000,143,230),(863,144,29),(864,144,234),(865,144,235),(866,145,240),(867,145,241),(868,145,242),(870,146,249),(871,146,250),(869,146,251),(883,150,327),(882,150,330),(885,158,332),(899,164,336),(905,169,343),(904,169,344),(903,169,345),(951,171,349),(1065,175,24),(1064,175,231),(1067,176,204),(1066,176,231),(974,177,24),(973,177,231),(994,179,350),(1004,180,34),(1005,180,351),(1074,184,352),(1075,184,353),(1062,186,24),(1061,186,39),(1063,186,354),(1023,189,21),(1022,189,168),(1025,190,24),(1024,190,39),(1026,190,160),(1027,191,40),(1028,191,148),(1029,191,357),(1078,193,360),(1037,194,4);
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
  `category` tinytext NOT NULL,
  `reason` tinytext NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_User_TO_BookmarkReport_1` (`user_id`),
  KEY `FK_Bookmark_TO_BookmarkReport_1` (`bookmark_id`),
  CONSTRAINT `FK_Bookmark_TO_BookmarkReport_1` FOREIGN KEY (`bookmark_id`) REFERENCES `bookmark` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_User_TO_BookmarkReport_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_report`
--

LOCK TABLES `bookmark_report` WRITE;
/*!40000 ALTER TABLE `bookmark_report` DISABLE KEYS */;
INSERT INTO `bookmark_report` VALUES (8,102,196,'2024-08-13 10:30:13','AD','1123','PENDING');
/*!40000 ALTER TABLE `bookmark_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark_tag`
--

DROP TABLE IF EXISTS `bookmark_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark_tag` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tag_id` bigint NOT NULL,
  `bookmark_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_id` (`tag_id`,`bookmark_id`),
  KEY `FK_Bookmark_TO_BookmarkTag_1` (`bookmark_id`),
  CONSTRAINT `FK_Bookmark_TO_BookmarkTag_1` FOREIGN KEY (`bookmark_id`) REFERENCES `bookmark` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Tag_TO_BookmarkTag_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=644 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark_tag`
--

LOCK TABLES `bookmark_tag` WRITE;
/*!40000 ALTER TABLE `bookmark_tag` DISABLE KEYS */;
INSERT INTO `bookmark_tag` VALUES (416,1,192),(421,1,196),(523,1,203),(577,1,223),(631,1,268),(625,6,265),(627,6,266),(242,8,25),(256,13,40),(385,13,133),(321,14,96),(324,14,97),(325,14,98),(330,14,100),(629,14,268),(632,14,269),(633,14,270),(634,14,271),(244,15,27),(250,21,31),(339,21,107),(342,21,108),(344,21,109),(346,21,110),(347,21,111),(585,21,224),(183,24,3),(189,24,4),(187,24,5),(231,24,18),(229,24,19),(235,24,20),(238,24,21),(243,24,26),(312,24,89),(313,24,90),(528,24,205),(529,24,206),(607,24,244),(608,24,245),(609,24,246),(610,24,247),(611,24,248),(613,24,249),(621,24,260),(332,26,102),(335,26,105),(411,27,9),(208,27,10),(414,27,192),(518,27,202),(521,27,203),(524,27,204),(575,27,223),(252,28,36),(241,29,24),(245,29,27),(247,29,29),(326,30,98),(254,33,38),(311,34,76),(622,34,263),(623,34,264),(624,34,265),(626,34,266),(628,34,267),(184,102,3),(190,102,4),(188,102,5),(314,102,89),(315,102,90),(216,135,11),(376,140,125),(379,140,128),(381,140,130),(383,140,131),(384,140,132),(412,144,9),(525,144,204),(220,146,13),(222,146,14),(224,146,15),(227,146,16),(509,146,201),(210,147,10),(520,147,202),(209,148,10),(415,148,192),(519,148,202),(522,148,203),(576,148,223),(217,149,11),(218,149,12),(219,150,12),(255,156,39),(223,159,14),(226,160,15),(511,160,201),(225,161,15),(232,161,18),(510,161,201),(228,162,16),(239,163,21),(236,164,20),(237,166,21),(246,167,29),(340,168,108),(345,168,110),(586,168,225),(587,168,226),(588,168,227),(589,168,228),(590,168,229),(591,168,230),(594,168,231),(595,168,232),(596,168,233),(248,169,30),(249,170,30),(404,173,159),(253,175,37),(257,177,41),(259,178,43),(260,178,44),(261,178,45),(264,178,46),(273,178,50),(262,179,45),(263,180,45),(265,181,46),(270,182,49),(271,183,49),(274,183,51),(272,184,50),(275,185,51),(277,186,52),(279,186,54),(276,187,52),(280,188,55),(289,188,61),(294,188,62),(295,188,63),(296,189,63),(293,190,60),(406,193,161),(405,193,162),(309,194,75),(318,197,93),(334,201,104),(341,202,108),(316,204,91),(320,204,95),(583,204,117),(580,204,118),(366,204,120),(370,204,121),(612,204,248),(317,205,92),(319,206,94),(322,207,96),(630,207,268),(323,208,96),(327,209,99),(329,210,100),(328,211,100),(331,212,101),(333,213,103),(337,214,105),(336,215,105),(338,216,106),(343,217,109),(530,220,206),(527,221,205),(582,222,117),(372,222,122),(581,223,118),(361,224,119),(365,224,120),(362,225,119),(369,226,121),(373,228,123),(374,228,124),(377,228,126),(378,228,127),(380,228,129),(371,231,122),(386,231,134),(620,231,260),(375,232,125),(382,232,131),(387,233,134),(390,237,137),(389,238,137),(396,243,150),(395,244,149),(397,245,151),(403,246,155),(401,247,156),(402,248,156),(408,334,189),(413,335,9),(526,335,204),(504,344,199),(508,344,200),(501,345,198),(503,345,199),(507,345,200),(502,346,198),(506,347,200),(505,348,200),(584,356,224),(593,358,230),(592,359,230),(597,360,234),(598,360,235),(599,360,236),(600,360,237);
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
  UNIQUE KEY `unique_name_bookmarklist` (`name`,`bookmarklist_id`),
  KEY `fk_category_bookmarklist_idx` (`bookmarklist_id`),
  CONSTRAINT `fk_category_bookmarklist` FOREIGN KEY (`bookmarklist_id`) REFERENCES `bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=899 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (653,'1학기 후기',145),(615,'CI/CD',138),(620,'ec2',140),(617,'Jenkins',138),(622,'jpa',141),(648,'JWT',144),(649,'OAuth2',144),(623,'query dsl',141),(619,'s3',140),(682,'TF-IDF',150),(762,'Undefined',171),(660,'공식 답변',146),(629,'데이터 분석 & 시각화',122),(880,'블로그 자료',104),(843,'새 카테고리',103),(644,'새 카테고리',104),(801,'새 카테고리',109),(639,'새 카테고리',110),(640,'새 카테고리',111),(829,'새 카테고리',116),(797,'새 카테고리',117),(589,'새 카테고리',119),(772,'새 카테고리',121),(668,'새 카테고리',123),(891,'새 카테고리',124),(631,'새 카테고리',125),(632,'새 카테고리',126),(633,'새 카테고리',127),(634,'새 카테고리',128),(602,'새 카테고리',129),(635,'새 카테고리',133),(611,'새 카테고리',135),(800,'새 카테고리',143),(790,'새 카테고리',148),(686,'새 카테고리',158),(705,'새 카테고리',164),(706,'새 카테고리',165),(711,'새 카테고리',169),(712,'새 카테고리',170),(849,'새 카테고리',175),(850,'새 카테고리',176),(787,'새 카테고리',177),(798,'새 카테고리',179),(847,'새 카테고리',186),(816,'새 카테고리',188),(821,'새 카테고리',189),(822,'새 카테고리',190),(823,'새 카테고리',191),(825,'새 카테고리',192),(894,'새 카테고리',193),(834,'새 카테고리',194),(848,'새 카테고리',196),(607,'스프링 기초',132),(608,'스프링 시큐리티',132),(890,'자바스크립트',184),(683,'추천 시스템',150),(851,'카테고리 2',176),(852,'카테고리 3',176),(774,'카테고리1',114),(775,'카테고리2',118),(776,'카테고리3',118),(628,'크롤링',122),(651,'합격 후기',145);
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
  `message_cnt` bigint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `chat_room` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=359 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (1,NULL,1,2),(2,NULL,1,2),(3,NULL,2,0),(4,NULL,2,0),(5,NULL,3,0),(6,NULL,4,0),(7,NULL,4,0),(10,NULL,6,0),(11,NULL,6,0),(12,NULL,7,0),(13,NULL,7,0),(14,NULL,8,0),(15,NULL,8,0),(16,NULL,9,0),(17,NULL,9,0),(18,NULL,10,0),(19,NULL,10,0),(20,NULL,11,0),(21,NULL,11,0),(22,NULL,12,0),(23,NULL,12,0),(24,NULL,13,0),(26,NULL,13,0),(27,NULL,14,0),(28,NULL,14,0),(29,NULL,14,0),(30,NULL,15,0),(31,NULL,15,0),(32,NULL,16,0),(33,NULL,16,0),(34,NULL,17,0),(35,NULL,17,0),(37,NULL,18,3),(39,NULL,19,0),(41,NULL,20,0),(43,NULL,21,0),(45,NULL,22,13),(50,NULL,25,3),(52,NULL,25,3),(53,NULL,26,3),(55,NULL,27,0),(56,NULL,27,0),(57,NULL,28,0),(58,NULL,28,0),(59,NULL,28,0),(60,NULL,29,0),(61,NULL,29,0),(66,NULL,31,5),(73,NULL,48,1),(76,NULL,49,0),(78,NULL,50,0),(80,NULL,51,2),(82,NULL,52,0),(85,NULL,54,0),(89,NULL,56,0),(90,NULL,56,1),(92,NULL,57,0),(93,NULL,57,0),(94,NULL,58,0),(95,NULL,58,0),(97,NULL,59,0),(99,NULL,60,0),(100,NULL,60,0),(101,NULL,60,0),(102,NULL,60,0),(104,NULL,60,0),(105,NULL,61,0),(106,NULL,61,0),(107,NULL,62,0),(108,NULL,62,0),(109,NULL,63,0),(110,NULL,63,0),(111,NULL,64,0),(112,NULL,64,0),(113,NULL,64,0),(114,NULL,64,0),(115,NULL,65,0),(116,NULL,65,0),(117,NULL,66,0),(118,NULL,66,0),(119,NULL,67,0),(120,NULL,67,0),(121,NULL,68,0),(122,NULL,68,0),(123,NULL,60,5),(124,NULL,69,0),(125,NULL,69,0),(126,NULL,70,0),(127,NULL,70,0),(142,106,78,0),(147,106,80,0),(153,106,83,0),(155,1,84,0),(156,106,85,0),(158,107,86,0),(159,106,86,1),(160,107,87,0),(163,107,88,0),(164,107,89,0),(166,107,90,0),(168,110,91,0),(170,110,92,1),(171,108,92,0),(172,113,93,0),(173,112,93,0),(175,112,94,0),(177,112,95,0),(178,106,82,0),(201,108,107,0),(223,105,118,0),(229,117,121,0),(230,105,121,0),(234,106,123,0),(236,108,124,0),(238,106,125,0),(242,106,127,0),(252,1,132,0),(258,106,135,0),(260,1,136,0),(262,106,137,2),(273,120,143,1),(274,108,143,0),(284,117,148,0),(286,117,149,1),(292,117,152,0),(293,105,153,0),(294,117,153,1),(295,108,154,0),(296,118,154,0),(297,108,155,0),(298,118,155,0),(299,1,156,0),(300,2,156,0),(303,105,157,0),(304,117,157,3),(324,102,167,0),(327,105,168,0),(331,107,170,0),(341,2,174,1),(342,102,175,0),(344,105,175,0),(346,102,176,0),(349,110,177,0),(351,102,178,0),(353,102,179,0),(354,104,180,0),(355,116,180,0),(356,104,181,0),(357,107,181,0),(358,119,181,0);
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
  `name` varchar(255) NOT NULL,
  `last_message` varchar(255) DEFAULT NULL,
  `last_modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room`
--

LOCK TABLES `chat_room` WRITE;
/*!40000 ALTER TABLE `chat_room` DISABLE KEYS */;
INSERT INTO `chat_room` VALUES (1,'Chat Room 1',NULL,'2024-08-02 07:17:11'),(2,'Chat Room 2',NULL,'2024-08-02 07:17:11'),(3,'Chat Room 3',NULL,'2024-08-02 07:17:11'),(4,'UserOne,UserTwo',NULL,'2024-08-02 07:17:11'),(6,'UserOne,UserThree',NULL,'2024-08-02 07:17:11'),(7,'UserOne,UserFour',NULL,'2024-08-02 07:17:11'),(8,'UserOne,UserTwo',NULL,'2024-08-02 07:17:11'),(9,'UserOne,UserThree',NULL,'2024-08-02 07:17:11'),(10,'UserOne,UserTwo',NULL,'2024-08-02 07:17:11'),(11,'UserOne,UserThree',NULL,'2024-08-02 07:17:11'),(12,'UserOne,UserThree',NULL,'2024-08-02 07:17:11'),(13,'UserOne,UserThree',NULL,'2024-08-02 07:17:11'),(14,'test',NULL,'2024-08-02 07:17:11'),(15,'UserOne,UserThree',NULL,'2024-08-04 05:44:50'),(16,'UserThree,UserOne',NULL,'2024-08-04 07:31:22'),(17,'UserOne,UserThree',NULL,'2024-08-04 08:43:38'),(18,'테스트새진,UserOne',NULL,'2024-08-04 11:23:12'),(19,'테스트새진,UserTwo',NULL,'2024-08-04 11:23:50'),(20,'테스트새진,UserThree',NULL,'2024-08-04 11:23:59'),(21,'테스트새진,UserFour',NULL,'2024-08-04 11:24:01'),(22,'테스트새진,UserFive',NULL,'2024-08-04 11:24:03'),(23,'Room 1',NULL,'2024-08-06 03:42:16'),(24,'Room 2',NULL,'2024-08-06 03:42:16'),(25,'그룹채팅방1',NULL,'2024-08-06 19:37:59'),(26,'strisdgasdgng,테스트새진2',NULL,'2024-08-06 19:54:57'),(27,'UserOne,UserTwo',NULL,'2024-08-06 22:16:13'),(28,'그룹2',NULL,'2024-08-06 22:39:50'),(29,'UserOne,UserTwo',NULL,'2024-08-06 22:40:00'),(30,'테스트새진2,개발이좋아요',NULL,'2024-08-07 09:25:09'),(31,'그룹채팅방1722991358707',NULL,'2024-08-07 09:42:40'),(42,'테스트새진2,개발이좋아요',NULL,'2024-08-07 15:47:09'),(48,'strisdgasdgng,테스트새진2',NULL,'2024-08-07 15:52:24'),(49,'테스트새진2,UserFour',NULL,'2024-08-07 15:52:58'),(50,'테스트새진2,strisdgasdgng',NULL,'2024-08-07 15:57:00'),(51,'테스트새진2,UserOne',NULL,'2024-08-07 15:57:49'),(52,'테스트새진2,UserTwo',NULL,'2024-08-07 15:58:01'),(53,'테스트새진2,개발이좋아요',NULL,'2024-08-07 16:03:42'),(54,'Fluito,테스트새진2',NULL,'2024-08-07 08:28:01'),(55,'테스트새진2,테스트새진새진',NULL,'2024-08-07 12:02:10'),(56,'으앙,kdj4355',NULL,'2024-08-08 13:06:45'),(57,'으앙,Fluito',NULL,'2024-08-08 13:07:59'),(58,'김민솔,나는 진규',NULL,'2024-08-08 15:19:06'),(59,'나는 진규,테스트새진2',NULL,'2024-08-08 15:20:59'),(60,'그룹채팅방(69,79,7,77,67)',NULL,'2024-08-08 15:27:24'),(61,'socialsignup,soojung',NULL,'2024-08-08 20:40:23'),(62,'테스트새진2,테스트새진새진',NULL,'2024-08-08 21:43:06'),(63,'soojung,테스트새진2',NULL,'2024-08-09 13:20:12'),(64,'그룹채팅방(69,67,77,7)',NULL,'2024-08-09 13:21:32'),(65,'나는 진규,테스트새진2',NULL,'2024-08-09 13:44:45'),(66,'김민솔,테스트새진2',NULL,'2024-08-09 14:15:05'),(67,'김민솔,soojung',NULL,'2024-08-09 15:11:50'),(68,'으앙,테스트새진2',NULL,'2024-08-09 16:15:40'),(69,'준구글계정,테스트새진2',NULL,'2024-08-09 17:25:24'),(70,'UserOne,UserTwo',NULL,'2024-08-12 17:39:08'),(71,'해피웨일,갱생새진',NULL,'2024-08-12 21:01:13'),(72,'갱생새진,해피웨일',NULL,'2024-08-12 21:23:56'),(73,'갱생새진,해피웨일',NULL,'2024-08-12 21:24:34'),(74,'갱생새진,해피웨일',NULL,'2024-08-12 21:24:44'),(75,'갱생새진,해피웨일',NULL,'2024-08-12 21:24:50'),(76,'갱생새진,해피웨일',NULL,'2024-08-12 21:24:57'),(77,'갱생새진,해피웨일',NULL,'2024-08-12 21:25:02'),(78,'징규러미,갱생새진',NULL,'2024-08-12 21:51:28'),(79,'갱생새진,해피웨일',NULL,'2024-08-12 23:50:01'),(80,'갱생새진,징규러미',NULL,'2024-08-12 23:50:22'),(81,'갱생새진,해피웨일',NULL,'2024-08-12 23:51:54'),(82,'갱생새진,해피웨일',NULL,'2024-08-12 23:54:35'),(83,'갱생새진,징규러미',NULL,'2024-08-12 23:54:42'),(84,'갱생새진,홍길동',NULL,'2024-08-13 00:01:50'),(85,'징규러미,해피웨일',NULL,'2024-08-13 01:16:07'),(86,'김민솔,징규러미',NULL,'2024-08-13 01:39:45'),(87,'김민솔,갱생새진',NULL,'2024-08-13 09:02:22'),(88,'갱생새진,김민솔',NULL,'2024-08-13 09:02:44'),(89,'김민솔,해피웨일',NULL,'2024-08-13 10:15:14'),(90,'김민솔,해피웨일',NULL,'2024-08-13 10:16:13'),(91,'김수정 부계임,김숮엉',NULL,'2024-08-13 13:19:21'),(92,'김수정 부계임,김숮엉',NULL,'2024-08-13 13:19:25'),(93,'coach,test',NULL,'2024-08-13 13:49:23'),(94,'coach,test',NULL,'2024-08-13 13:49:44'),(95,'coach,test',NULL,'2024-08-13 13:50:42'),(96,'으앙,갱생새진',NULL,'2024-08-13 17:15:16'),(97,'으앙,갱생새진',NULL,'2024-08-13 17:15:33'),(98,'으앙,갱생새진',NULL,'2024-08-13 17:15:56'),(99,'으앙,갱생새진',NULL,'2024-08-13 17:16:18'),(100,'으앙,갱생새진',NULL,'2024-08-13 17:16:55'),(101,'해피웨일,갱생새진',NULL,'2024-08-13 17:22:12'),(102,'해피웨일,갱생새진',NULL,'2024-08-13 17:22:31'),(103,'해피웨일,갱생새진',NULL,'2024-08-13 17:22:37'),(104,'해피웨일,갱생새진',NULL,'2024-08-13 17:22:37'),(105,'해피웨일,갱생새진',NULL,'2024-08-13 17:22:41'),(106,'해피웨일,갱생새진',NULL,'2024-08-13 17:23:55'),(107,'김숮엉,갱생새진',NULL,'2024-08-13 22:42:03'),(108,'으앙,해피웨일',NULL,'2024-08-14 09:09:06'),(109,'으앙,해피웨일',NULL,'2024-08-14 09:13:29'),(110,'으앙,갱생새진',NULL,'2024-08-14 09:44:09'),(111,'해피웨일,김싸피',NULL,'2024-08-14 09:44:17'),(112,'으앙,해피웨일',NULL,'2024-08-14 09:44:19'),(113,'으앙,해피웨일',NULL,'2024-08-14 09:44:27'),(114,'으앙,해피웨일',NULL,'2024-08-14 09:44:36'),(115,'으앙,해피웨일',NULL,'2024-08-14 09:44:57'),(116,'으앙,해피웨일',NULL,'2024-08-14 09:45:13'),(117,'으앙,해피웨일',NULL,'2024-08-14 09:45:16'),(118,'으앙,해피웨일',NULL,'2024-08-14 09:45:23'),(119,'으앙,갱생새진',NULL,'2024-08-14 09:47:25'),(120,'갱생새진,김싸피',NULL,'2024-08-14 09:49:04'),(121,'으앙앙,으앙',NULL,'2024-08-14 09:56:04'),(122,'갱생새진,해피웨일',NULL,'2024-08-14 10:18:53'),(123,'갱생새진,고양양',NULL,'2024-08-14 10:34:00'),(124,'갱생새진,김숮엉',NULL,'2024-08-14 10:34:16'),(125,'갱생새진,고양양',NULL,'2024-08-14 10:35:15'),(126,'갱생새진,해피웨일',NULL,'2024-08-14 10:35:35'),(127,'갱생새진,고양양',NULL,'2024-08-14 10:35:44'),(128,'갱생새진,해피웨일',NULL,'2024-08-14 10:43:44'),(129,'갱생새진,김싸피',NULL,'2024-08-14 10:43:53'),(130,'갱생새진,해피웨일',NULL,'2024-08-14 10:44:39'),(131,'갱생새진,해피웨일',NULL,'2024-08-14 10:45:43'),(132,'갱생새진,홍길동',NULL,'2024-08-14 10:49:54'),(133,'갱생새진,해피웨일',NULL,'2024-08-14 10:56:00'),(134,'갱생새진,해피웨일',NULL,'2024-08-14 10:56:29'),(135,'갱생새진,고양양',NULL,'2024-08-14 10:56:38'),(136,'갱생새진,홍길동',NULL,'2024-08-14 11:00:09'),(137,'갱생새진,고양양',NULL,'2024-08-14 12:14:42'),(138,'갱생새진,해피웨일',NULL,'2024-08-14 12:32:15'),(139,'갱생새진,으앙',NULL,'2024-08-14 12:33:26'),(140,'갱생새진,김싸피',NULL,'2024-08-14 12:34:53'),(141,'갱생새진,김싸피',NULL,'2024-08-14 12:37:19'),(142,'갱생새진,김싸피',NULL,'2024-08-14 12:43:27'),(143,'예차니즘,김숮엉',NULL,'2024-08-14 12:45:18'),(144,'갱생새진,김싸피',NULL,'2024-08-14 12:48:18'),(145,'갱생새진,김싸피',NULL,'2024-08-14 12:59:38'),(146,'갱생새진,김싸피',NULL,'2024-08-14 16:24:46'),(147,'김싸피,해피웨일',NULL,'2024-08-15 11:18:59'),(148,'김싸피,으앙앙',NULL,'2024-08-15 12:10:39'),(149,'김싸피,으앙앙',NULL,'2024-08-15 12:10:45'),(150,'김싸피,해피웨일',NULL,'2024-08-15 12:10:57'),(151,'김싸피,갱생새진',NULL,'2024-08-15 12:11:27'),(152,'으앙,으앙앙',NULL,'2024-08-15 12:11:45'),(153,'으앙,으앙앙',NULL,'2024-08-15 12:11:56'),(154,'김숮엉,뜌떵이칭구',NULL,'2024-08-15 12:15:04'),(155,'김숮엉,뜌떵이칭구',NULL,'2024-08-15 12:15:06'),(156,'홍길동,김철수',NULL,'2024-08-15 15:00:55'),(157,'김싸피,갱생새진',NULL,'2024-08-15 20:16:32'),(158,'해피웨일,갱생새진',NULL,'2024-08-15 20:27:04'),(159,'김싸피,해피웨일',NULL,'2024-08-15 20:27:24'),(160,'해피웨일,갱생새진',NULL,'2024-08-15 20:27:45'),(161,'해피웨일,갱생새진',NULL,'2024-08-15 20:29:20'),(162,'해피웨일,갱생새진',NULL,'2024-08-15 20:30:47'),(163,'해피웨일,갱생새진',NULL,'2024-08-15 20:31:49'),(164,'해피웨일,갱생새진',NULL,'2024-08-15 20:32:00'),(165,'해피웨일,갱생새진',NULL,'2024-08-15 20:33:33'),(166,'해피웨일,갱생새진',NULL,'2024-08-15 20:33:39'),(167,'갱생새진,해피웨일',NULL,'2024-08-15 20:34:42'),(168,'그룹채팅방(102,104,105)',NULL,'2024-08-15 20:36:39'),(169,'그룹채팅방(104,102,116)',NULL,'2024-08-15 20:36:44'),(170,'그룹채팅방(107,102,104)',NULL,'2024-08-15 20:36:48'),(171,'갱생새진,김싸피',NULL,'2024-08-15 20:38:58'),(172,'갱생새진,김싸피',NULL,'2024-08-15 20:40:12'),(173,'김싸피,갱생새진',NULL,'2024-08-15 20:42:54'),(174,'녹차마루,김철수',NULL,'2024-08-15 21:08:56'),(175,'그룹채팅방(가나다, 마바사, 아자차)',NULL,'2024-08-15 21:39:47'),(176,'그룹채팅방(갱생새진,해피웨일,김싸피)',NULL,'2024-08-15 21:40:33'),(177,'갱생새진,김수정 부계임',NULL,'2024-08-15 21:40:53'),(178,'갱생새진,해피웨일',NULL,'2024-08-15 21:46:24'),(179,'갱생새진,해피웨일',NULL,'2024-08-15 21:46:58'),(180,'갱생새진,김싸피',NULL,'2024-08-15 21:50:04'),(181,'갱생새진님의 그룹채팅방',NULL,'2024-08-15 22:24:33');
/*!40000 ALTER TABLE `chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_room_seq`
--

DROP TABLE IF EXISTS `chat_room_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_room_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_room_seq`
--

LOCK TABLES `chat_room_seq` WRITE;
/*!40000 ALTER TABLE `chat_room_seq` DISABLE KEYS */;
INSERT INTO `chat_room_seq` VALUES (1);
/*!40000 ALTER TABLE `chat_room_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_seq`
--

DROP TABLE IF EXISTS `chat_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_seq`
--

LOCK TABLES `chat_seq` WRITE;
/*!40000 ALTER TABLE `chat_seq` DISABLE KEYS */;
INSERT INTO `chat_seq` VALUES (1);
/*!40000 ALTER TABLE `chat_seq` ENABLE KEYS */;
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
  CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`to_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`from_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (127,104,102,'2024-08-12 21:00:55'),(128,104,106,'2024-08-12 21:51:12'),(129,102,107,'2024-08-12 23:50:01'),(130,102,106,'2024-08-13 01:15:51'),(131,106,107,'2024-08-13 01:33:05'),(132,107,106,'2024-08-13 01:42:09'),(133,102,104,'2024-08-13 08:54:43'),(134,106,104,'2024-08-13 08:54:52'),(135,108,107,'2024-08-13 09:34:40'),(136,106,108,'2024-08-13 09:57:42'),(138,107,108,'2024-08-13 09:59:16'),(139,104,108,'2024-08-13 10:40:26'),(140,106,102,'2024-08-13 10:40:36'),(142,102,108,'2024-08-13 22:44:27'),(143,108,106,'2024-08-13 23:36:08'),(144,102,105,'2024-08-14 09:13:28'),(145,104,105,'2024-08-14 09:13:40'),(146,116,102,'2024-08-14 09:43:34'),(147,102,116,'2024-08-14 09:43:43'),(148,104,116,'2024-08-14 09:43:46'),(149,105,116,'2024-08-14 09:43:52'),(150,106,116,'2024-08-14 09:43:57'),(151,107,116,'2024-08-14 09:44:02'),(153,116,108,'2024-08-14 09:45:55'),(154,116,104,'2024-08-14 09:49:00'),(156,116,117,'2024-08-14 09:52:41'),(159,105,117,'2024-08-14 10:01:32'),(160,108,118,'2024-08-14 10:54:25'),(161,116,107,'2024-08-14 11:58:30'),(162,104,107,'2024-08-14 12:00:10'),(163,105,107,'2024-08-14 12:00:16'),(164,108,120,'2024-08-14 12:44:01'),(165,105,112,'2024-08-14 13:06:48'),(168,117,105,'2024-08-15 15:00:20'),(169,116,106,'2024-08-15 22:10:43');
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `message` tinytext NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `chat_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `chat_id` (`chat_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1455 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (3,'ㄹㄹ',0,'2024-08-01 05:27:23',20),(4,'ㄹㄹ',0,'2024-08-01 05:27:24',21),(5,'ㄹㄹㄹㄹ',0,'2024-08-01 05:27:30',20),(6,'ㄹㄹㄹㄹ',0,'2024-08-01 05:27:30',21),(7,'ㅇㅇㅇㅇㅇㅇ',0,'2024-08-01 05:28:00',20),(8,'ㅇㅇㅇㅇㅇㅇ',0,'2024-08-01 05:28:00',21),(12,'11111',0,'2024-08-01 15:58:31',24),(13,'111111',0,'2024-08-01 15:58:37',24),(15,'111111',0,'2024-08-01 16:53:38',24),(16,'222222',0,'2024-08-01 16:54:18',24),(17,'333',0,'2024-08-01 16:56:02',24),(18,'1111222',0,'2024-08-01 16:56:08',24),(19,'1111',0,'2024-08-01 16:57:18',24),(20,'11113',0,'2024-08-01 16:57:49',24),(21,'1',0,'2024-08-01 16:59:10',24),(22,'1',0,'2024-08-01 16:59:18',24),(23,'333',0,'2024-08-01 16:59:37',24),(26,'1111',0,'2024-08-01 17:07:23',24),(27,'ㄹㄹㄹㄹ',0,'2024-08-01 17:08:35',24),(28,'33333',0,'2024-08-02 00:22:09',24),(29,'113131',0,'2024-08-02 00:49:16',24),(30,'111111111',0,'2024-08-02 01:08:01',24),(31,'111',0,'2024-08-04 05:21:01',24),(32,'1111111',0,'2024-08-04 05:21:14',24),(33,'3333333',0,'2024-08-04 05:21:43',24),(34,'rrrr',0,'2024-08-04 05:37:06',24),(35,'ㅎㅎㅎ',0,'2024-08-04 07:03:52',30),(36,'1111',0,'2024-08-04 07:07:12',30),(37,'ㅇㅇㅇㅇ',0,'2024-08-04 07:10:18',30),(38,'111111',0,'2024-08-04 07:31:40',33),(39,'ffff',0,'2024-08-04 07:35:27',33),(40,'111111',0,'2024-08-04 07:39:01',33),(41,'11111',0,'2024-08-04 07:49:30',24),(42,'ㄹㄷㅁㅇㄴㄻ',0,'2024-08-04 07:50:56',24),(43,'ㄹㄹㄹㄹ',0,'2024-08-04 07:51:08',24),(44,'1111111',0,'2024-08-04 08:21:42',24),(45,'333',0,'2024-08-04 08:21:46',24),(46,'11111',0,'2024-08-04 08:28:30',24),(47,'ㄹㄹㄹ',0,'2024-08-04 08:35:14',24),(48,'ㅇㅁㄴㅁㅇ',0,'2024-08-04 08:38:25',24),(49,'ㅇㅁㄴㅇ',0,'2024-08-04 08:40:29',24),(50,'1111111',0,'2024-08-04 08:50:48',24),(51,'ㅇㅎㄶㄴㅇ',0,'2024-08-04 08:51:36',24),(52,'ㅇㄴㄴㅇ',0,'2024-08-04 08:53:12',33),(53,'ㄴㅇㄹㄴㅇㄹ',0,'2024-08-04 08:53:24',33),(54,'ㄴㅇㄹㄴㅇㄹ',0,'2024-08-04 08:53:31',24),(59,'111111',0,'2024-08-06 04:20:16',1),(60,'111',0,'2024-08-06 04:20:24',1),(66,'111111111',0,'2024-08-06 05:02:41',1),(67,'3333',0,'2024-08-06 05:03:40',3),(68,'1111',0,'2024-08-06 05:03:53',1),(69,'3333333',0,'2024-08-06 05:04:01',3),(142,'ㅇㅇ',0,'2024-08-07 08:28:07',85),(143,'호호ㅓ호ㅓㅗ',0,'2024-08-07 08:28:31',85),(145,'ㅇㅇ',0,'2024-08-07 08:30:38',85),(164,'dfd',0,'2024-08-07 09:04:20',85),(165,'하이요',0,'2024-08-07 09:04:24',85),(234,'ㅇㅇ',0,'2024-08-08 10:15:07',85),(235,'ㅎㅇ',0,'2024-08-08 10:15:14',85),(236,'ㅎㅇㅎㅇ',0,'2024-08-08 10:15:20',85),(237,'ㅎㅇㅎㅇ',0,'2024-08-08 10:15:57',85),(238,'ㅎㅇㅇㅎ',0,'2024-08-08 10:15:59',85),(239,'ㅇㅇ',0,'2024-08-08 10:18:50',85),(245,'하이',0,'2024-08-08 12:04:21',85),(246,'ㄹㄹㄹㄹ',0,'2024-08-08 12:04:31',85),(247,'아아아',0,'2024-08-08 13:07:03',89),(248,'아아아',0,'2024-08-08 13:08:02',92),(249,'ㅇㅇ',0,'2024-08-08 13:08:16',93),(250,'ㅁㄴㅇㅁㄴ',0,'2024-08-08 13:08:22',93),(251,'ㅇㅁ',0,'2024-08-08 13:08:33',92),(252,'ㅁㅇㄴㄻㄴㅇ',0,'2024-08-08 13:08:34',92),(263,'ㅊㅊㅊㅊ',0,'2024-08-08 15:09:34',93),(265,'ㅎㅇㅎㅇㅎㅇ',0,'2024-08-08 15:09:46',93),(266,'ㅎㅇㅎㅇㅎㄹㅇㅎ',0,'2024-08-08 15:09:50',85),(268,'ㅎㅇㅎㅇ',0,'2024-08-08 15:14:16',85),(269,'엔터치면 보내지게 해주삼',0,'2024-08-08 15:14:25',85),(274,'ddd',0,'2024-08-08 15:16:19',85),(275,'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',0,'2024-08-08 15:16:23',85),(276,'ㅇㄹㄹㅇ',0,'2024-08-08 15:16:27',85),(279,'야',0,'2024-08-08 15:19:11',94),(280,'ㅎㅇㅎㅇ',0,'2024-08-08 15:19:30',95),(281,'내 리스트 볼래?',0,'2024-08-08 15:19:35',95),(282,'차단할게요',0,'2024-08-08 15:19:43',94),(285,'하윙',0,'2024-08-08 15:21:11',97),(288,'야',0,'2024-08-08 15:21:27',94),(289,'뭔가 이상한데',0,'2024-08-08 15:21:46',94),(290,'ㅇㅇㅇㅇㅇㅇ',0,'2024-08-08 15:22:37',94),(291,'뭐가',0,'2024-08-08 15:23:11',95),(292,'ㅇㄴㅁㅇㅁ',0,'2024-08-08 15:27:47',102),(293,'ㅎㅇ',0,'2024-08-08 15:28:27',94),(295,'테ㅡ트2',0,'2024-08-08 15:42:05',97),(296,'ㅇㄹㅇㄹ',0,'2024-08-08 15:47:22',85),(301,'ㄶㄶㄴㅇ',0,'2024-08-08 15:56:21',97),(302,'ㅎㄴㅇㅎㄴㅇ',0,'2024-08-08 15:56:22',97),(304,'fassafs',0,'2024-08-08 16:00:34',97),(307,'fassafaasf',0,'2024-08-08 16:02:41',97),(308,'fsafasf',0,'2024-08-08 16:02:43',97),(309,'fasf',0,'2024-08-08 16:02:44',97),(310,'테스트1',0,'2024-08-08 16:02:48',97),(311,'테스트2',0,'2024-08-08 16:02:52',97),(312,'테스트3',0,'2024-08-08 16:02:55',97),(313,'ㅎㅇ',0,'2024-08-08 17:01:42',101),(314,'메세지 안보내지는거 고침',0,'2024-08-08 17:02:01',101),(315,'오 된다',0,'2024-08-08 17:07:36',102),(317,'세진아',0,'2024-08-08 17:18:06',85),(318,'세진아',0,'2024-08-08 17:18:16',85),(322,'테스트 메세지1',0,'2024-08-08 17:29:19',97),(323,'이제 엔터로 전송되게 바꾼다',0,'2024-08-08 17:29:32',97),(324,'기다려봐',0,'2024-08-08 17:29:37',97),(335,'가나다',0,'2024-08-08 17:53:48',85),(336,'ㅎㅇㅎㅇ',0,'2024-08-08 17:56:26',95),(337,'안녕하세요',0,'2024-08-08 17:56:29',100),(338,'오',0,'2024-08-08 17:56:30',101),(339,'ㅎㅇㅎㅇ',0,'2024-08-08 17:56:31',101),(340,'쩐다',0,'2024-08-08 17:56:32',101),(341,'ㅋㅋ',0,'2024-08-08 17:56:36',101),(342,'오 숫자 올라간다',0,'2024-08-08 17:56:40',100),(343,'채팅 잘됨?',0,'2024-08-08 17:56:40',102),(344,'https://i11d205.p.ssafy.io/bookmarklist/93',0,'2024-08-08 17:56:46',101),(345,'나갈때 0 안되는거 빼고',0,'2024-08-08 17:56:54',100),(346,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',0,'2024-08-08 17:57:04',101),(347,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',0,'2024-08-08 17:57:07',101),(348,'??',0,'2024-08-08 17:57:08',104),(349,'https://i11d205.p.ssafy.io/bookmarklist/93',0,'2024-08-08 17:57:10',101),(350,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',0,'2024-08-08 17:57:11',100),(351,'하이요',0,'2024-08-08 17:57:11',104),(352,'ㅎㅇㅎㅇ',0,'2024-08-08 17:57:17',101),(353,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',0,'2024-08-08 17:57:18',104),(354,'https://i11d205.p.ssafy.io/bookmarklist/93',0,'2024-08-08 17:57:21',101),(355,'잘된다',0,'2024-08-08 17:57:24',100),(356,'sdfdfsddddddddddddddddddddddddddddddddddddddddddddddddddddd',0,'2024-08-08 17:57:25',104),(357,'ㅔㅅㄴㅁㅇ마',0,'2024-08-08 17:57:31',97),(358,'채팅방 가로스크롤',0,'2024-08-08 17:57:33',100),(360,'없애주세요',0,'2024-08-08 17:57:37',100),(363,'dfdsfjkfhjqkwefhqwefqwefweqkfnqwejkfqwejnkfnweqkjfjnkqwefjnqwenjkfqwejnkfjnkqwejnfqwejkfwenqjkfqfqw',0,'2024-08-08 17:57:38',104),(367,'ㅏㄹ어ㅏㅣㅏㄴㅇ머ㅣㅏ;ㅇ넘리ㅏㅓㄴ이ㅏ러ㅏㅣㄴㅇ럼',0,'2024-08-08 17:57:41',100),(379,'왜 맞팔 안해주세요????',0,'2024-08-08 17:58:31',94),(380,'???????',0,'2024-08-08 17:58:45',94),(381,'가로 스크롤을 없애려면',0,'2024-08-08 19:40:10',102),(382,'영어를 길게 쓰지 않으면 됩니다',0,'2024-08-08 19:40:19',102),(383,'해결 완료!',0,'2024-08-08 19:40:22',102),(387,'ㅎㅇ',0,'2024-08-08 20:36:46',102),(388,'yu',0,'2024-08-08 20:40:26',105),(389,'y\\y',0,'2024-08-08 20:40:26',105),(390,'fvvf',0,'2024-08-08 20:40:33',105),(391,'ㅎ',0,'2024-08-08 20:41:28',106),(392,'헷',0,'2024-08-08 20:41:31',106),(393,'하ㅏ',0,'2024-08-08 20:41:33',106),(401,'ㅇㄴㅁㅇㅁ',0,'2024-08-08 20:48:32',99),(419,'1',0,'2024-08-08 21:43:09',107),(420,'2',0,'2024-08-08 21:43:15',108),(421,'3',0,'2024-08-08 21:43:16',107),(422,'4',0,'2024-08-08 21:43:18',108),(423,'5',0,'2024-08-08 21:43:24',107),(424,'6',0,'2024-08-08 21:43:29',107),(425,'7',0,'2024-08-08 21:43:29',107),(426,'8',0,'2024-08-08 21:43:32',108),(427,'9',0,'2024-08-08 21:43:33',108),(428,'10',0,'2024-08-08 21:43:41',107),(429,'ㅇㄴㅁㅇㅁ',0,'2024-08-08 21:43:49',108),(430,'ㅇㄴㅁㅇㅁ',0,'2024-08-08 21:49:16',107),(431,'ㅇㄴㅁㅇㅁㄴ',0,'2024-08-08 21:49:20',107),(432,'ㅇㄴㅁㅇ',0,'2024-08-08 21:51:55',107),(433,'ㅇㄴㅁ',0,'2024-08-08 21:54:01',107),(434,'ㅇㅁㄴ',0,'2024-08-08 21:54:03',107),(435,'ㅇㅁㅇ',0,'2024-08-08 21:54:11',107),(436,'ㄹㅇㄴㄹ',0,'2024-08-08 21:54:23',107),(437,'ㄹㄴㄹ',0,'2024-08-08 21:54:25',107),(438,'ㄴㅇㄹㄴㅇ',0,'2024-08-08 21:54:31',107),(439,'ㄴㅇㄹㄴ',0,'2024-08-08 21:54:36',107),(440,'ㄴㅇㅁㄴ',0,'2024-08-08 21:55:10',108),(441,'ㅇㅁㄴㅇㅁ',0,'2024-08-08 21:55:12',107),(442,'ㅇㅁㄴㅇ',0,'2024-08-08 21:55:18',107),(443,'ㅁㄴㅇㅁㄴㅇㅁ',0,'2024-08-08 21:55:23',108),(444,'ㅁㄴㅇ',0,'2024-08-08 21:55:24',108),(445,'ㅁㄴㅇㅁ',0,'2024-08-08 21:55:31',108),(446,'ㅇㄴㅁㅇ',0,'2024-08-08 21:55:33',107),(447,'ㄴㅁㅇ',0,'2024-08-08 21:55:37',107),(448,'ㄴㅁㅇㅁㄴㅇㄴㅁ',0,'2024-08-08 21:55:40',107),(449,'ㅁㄴㅇㅁㄴㅇㅇ',0,'2024-08-08 21:55:41',107),(450,'ㅇㄴㅁㅇㄴㅁ',0,'2024-08-08 21:55:42',107),(451,'ㄴㅁㅇㅁㄴ',0,'2024-08-08 21:55:44',107),(452,'테스트1',0,'2024-08-08 22:05:47',108),(453,'2',0,'2024-08-08 22:06:01',108),(454,'3',0,'2024-08-08 22:06:07',107),(455,'4',0,'2024-08-08 22:06:22',108),(456,'5',0,'2024-08-08 22:06:23',108),(457,'6',0,'2024-08-08 22:06:23',108),(458,'7',0,'2024-08-08 22:06:30',108),(459,'8',0,'2024-08-08 22:06:31',108),(460,'9',0,'2024-08-08 22:06:32',108),(461,'10',0,'2024-08-08 22:06:44',108),(462,'11',0,'2024-08-08 22:06:45',108),(463,'12',0,'2024-08-08 22:06:45',108),(464,'13',0,'2024-08-08 22:06:46',108),(465,'14',0,'2024-08-08 22:06:46',108),(466,'15',0,'2024-08-08 22:06:56',107),(467,'16',0,'2024-08-08 22:07:02',107),(468,'17',0,'2024-08-08 22:07:03',107),(469,'18',0,'2024-08-08 22:07:07',107),(470,'19',0,'2024-08-08 22:07:11',108),(471,'20',0,'2024-08-08 22:07:17',108),(472,'21',0,'2024-08-08 22:07:19',107),(473,'22',0,'2024-08-08 22:08:13',108),(474,'23',0,'2024-08-08 22:08:17',108),(475,'24',0,'2024-08-08 22:08:21',107),(476,'25',0,'2024-08-08 22:08:24',107),(477,'26',0,'2024-08-08 22:08:30',107),(478,'27',0,'2024-08-08 22:08:36',107),(479,'Dddd',0,'2024-08-08 22:32:38',100),(480,'123',0,'2024-08-08 23:09:56',107),(481,'23',0,'2024-08-08 23:09:59',107),(482,'1',0,'2024-08-08 23:10:02',108),(483,'2',0,'2024-08-08 23:10:06',108),(484,'3',0,'2024-08-08 23:10:08',107),(485,'4',0,'2024-08-08 23:10:11',108),(486,'5',0,'2024-08-08 23:10:13',107),(487,'1',0,'2024-08-08 23:15:28',108),(488,'2',0,'2024-08-08 23:15:30',107),(489,'3',0,'2024-08-08 23:15:32',108),(490,'4',0,'2024-08-08 23:15:34',108),(491,'5',0,'2024-08-08 23:15:36',108),(492,'6',0,'2024-08-08 23:15:36',108),(493,'7',0,'2024-08-08 23:15:36',108),(494,'8',0,'2024-08-08 23:15:36',108),(495,'9',0,'2024-08-08 23:15:44',108),(496,'10',0,'2024-08-08 23:15:45',108),(497,'1',0,'2024-08-08 23:15:46',108),(498,'2',0,'2024-08-08 23:15:46',108),(499,'3',0,'2024-08-08 23:15:46',108),(500,'4',0,'2024-08-08 23:15:46',108),(501,'4',0,'2024-08-08 23:15:46',108),(502,'1',0,'2024-08-08 23:15:52',108),(503,'2',0,'2024-08-08 23:15:52',108),(504,'3',0,'2024-08-08 23:15:52',108),(505,'dd',0,'2024-08-08 23:18:44',85),(506,'https://localhost:3000/bookmarklist/65',0,'2024-08-08 23:19:34',85),(507,'1',0,'2024-08-08 23:23:19',107),(508,'2',0,'2024-08-08 23:23:20',107),(509,'3',0,'2024-08-08 23:23:20',107),(510,'4',0,'2024-08-08 23:23:20',107),(511,'1',0,'2024-08-08 23:23:28',108),(512,'2',0,'2024-08-08 23:23:29',108),(513,'3',0,'2024-08-08 23:23:29',108),(514,'4',0,'2024-08-08 23:23:29',108),(515,'5',0,'2024-08-08 23:23:30',108),(516,'6',0,'2024-08-08 23:23:30',108),(517,'7',0,'2024-08-08 23:23:30',108),(518,'8',0,'2024-08-08 23:23:31',108),(519,'1',0,'2024-08-08 23:23:38',108),(520,'2',0,'2024-08-08 23:23:38',108),(521,'3',0,'2024-08-08 23:23:38',108),(522,'4',0,'2024-08-08 23:23:38',108),(523,'5',0,'2024-08-08 23:23:39',108),(524,'12',0,'2024-08-08 23:23:55',108),(525,'1',0,'2024-08-08 23:25:20',107),(526,'2',0,'2024-08-08 23:25:20',107),(527,'3',0,'2024-08-08 23:25:21',107),(528,'4',0,'2024-08-08 23:25:21',107),(529,'5',0,'2024-08-08 23:25:21',107),(530,'6',0,'2024-08-08 23:25:21',107),(531,'1',0,'2024-08-08 23:25:51',107),(532,'2',0,'2024-08-08 23:25:52',107),(533,'ㅇ',0,'2024-08-08 23:26:40',108),(534,'1',0,'2024-08-08 23:28:25',108),(535,'2',0,'2024-08-08 23:28:25',108),(536,'3',0,'2024-08-08 23:28:25',108),(537,'4',0,'2024-08-08 23:28:26',108),(538,'1',0,'2024-08-08 23:28:40',108),(539,'2',0,'2024-08-08 23:28:41',108),(540,'3',0,'2024-08-08 23:28:41',108),(541,'4',0,'2024-08-08 23:28:41',108),(542,'dsfdsfsd',0,'2024-08-09 09:01:45',100),(543,'sdfzdsf',0,'2024-08-09 09:01:46',100),(544,'dfsdfsdf',0,'2024-08-09 09:01:52',100),(545,'di',0,'2024-08-09 09:02:10',94),(546,'야',0,'2024-08-09 09:02:12',94),(547,'잘되는데',0,'2024-08-09 09:02:26',94),(548,'영어 금지입니다',0,'2024-08-09 09:05:06',102),(549,'ㅎㅇㅎㅇ',0,'2024-08-09 09:10:22',95),(550,'뭐가',0,'2024-08-09 09:10:34',95),(551,'asdddddddddddddddddddddddddddd',0,'2024-08-09 09:10:51',101),(553,'ㄷㄷㄷㄷㄷㄷㄷ',0,'2024-08-09 09:40:02',101),(554,'아닌데',0,'2024-08-09 09:40:07',95),(555,'하나만 가는데',0,'2024-08-09 09:40:09',95),(556,'저거 내가 2개 보낸건데',0,'2024-08-09 09:40:12',95),(557,'ㄴㅇㄹㅇㄴㄹㄴㅇ',0,'2024-08-09 09:40:56',100),(558,'ㅇㄹㄴㅇㄹㅇㄴㄹㄴㅇㅋㄹㅇㄴㄹ',0,'2024-08-09 10:17:00',100),(559,'ㅌㅇㄹㅊㅇㄹㅊㅇ',0,'2024-08-09 10:17:01',100),(560,'ㅇㄴㅋㄹㅇㄴㄹㅇㄴㄹ',0,'2024-08-09 10:19:16',100),(561,'아아앙',0,'2024-08-09 11:04:34',100),(562,'테스트',0,'2024-08-09 11:04:40',100),(563,'ㄹㅇㄴㄹㅇㄴㄹㅇ',0,'2024-08-09 11:04:46',100),(564,'di',0,'2024-08-09 11:17:50',95),(565,'야',0,'2024-08-09 11:17:51',95),(566,'나가씾',0,'2024-08-09 11:17:52',95),(567,'나갔지',0,'2024-08-09 11:17:54',95),(568,'세진아',0,'2024-08-09 11:23:39',85),(569,'세진맨',0,'2024-08-09 11:23:42',85),(570,'1',0,'2024-08-09 12:53:29',108),(571,'2',0,'2024-08-09 12:53:30',108),(572,'3',0,'2024-08-09 12:53:30',108),(573,'ㄴㅇㄹㄹㅇㄴㅇㄹ',0,'2024-08-09 13:00:38',94),(574,'fdf',0,'2024-08-09 13:05:46',94),(575,'ff',0,'2024-08-09 13:05:48',94),(576,'fd',0,'2024-08-09 13:05:50',94),(577,'dfdfd',0,'2024-08-09 13:05:51',94),(578,'fdfd',0,'2024-08-09 13:05:53',94),(579,'dfdfd',0,'2024-08-09 13:05:54',94),(580,'dfdf',0,'2024-08-09 13:05:58',94),(581,'ㅇㅇ',0,'2024-08-09 13:06:20',95),(582,'ㅎㅇㅎㅇ',0,'2024-08-09 13:06:22',95),(583,'dsdsfdsfdsfsdfdsfdsfdsfdsfdsfdsfdsfdsfsdfsdfsd',0,'2024-08-09 13:06:50',94),(584,'ㅇㄹㄹㅇㄴㄹㄴㅇㅁㄹㄴㅇㄹㄴㅇㄹㅇㄹㅇㄴㄹㄴㅇㄻㅎㅇㄴㅌㄹㄴㅇㅋㅊㅌㄹㄴㅋㄷㅇㅊ ㅇㄹㄴ',0,'2024-08-09 13:07:02',94),(585,'ㅎㄶㄴ',0,'2024-08-09 13:10:51',85),(586,'ㄴ혼ㅇㅎ',0,'2024-08-09 13:11:20',85),(587,'rewr',0,'2024-08-09 13:16:28',85),(588,'dfdsfsdfsdfsfsdfsdfsfsd',0,'2024-08-09 13:16:39',85),(589,'dsdddddddddddddddddddddddddddddddddddddddddddddd',0,'2024-08-09 13:16:42',85),(590,'dfd',0,'2024-08-09 13:17:17',85),(591,'dd',0,'2024-08-09 13:20:22',85),(592,'왜자꾸 나만',0,'2024-08-09 13:20:36',109),(593,'아ㅣ~~~~~~~~~~',0,'2024-08-09 13:20:38',109),(594,'아아',0,'2024-08-09 13:20:40',101),(595,'오와',0,'2024-08-09 13:20:40',109),(596,'댑악;;;',0,'2024-08-09 13:20:43',109),(597,'마이크테스트',0,'2024-08-09 13:20:45',101),(598,'될수도잇고',0,'2024-08-09 13:20:47',109),(599,'안될수도잇습니다?',0,'2024-08-09 13:20:50',109),(600,'ㅋㅋㅋ',0,'2024-08-09 13:20:52',109),(601,'와 개신기',0,'2024-08-09 13:20:54',109),(602,'근데 저는',0,'2024-08-09 13:20:57',109),(603,'저한테 채팅 보내는',0,'2024-08-09 13:21:00',109),(604,'사람이 없어서',0,'2024-08-09 13:21:01',109),(605,'보질 못해요',0,'2024-08-09 13:21:03',109),(606,'ㅠㅠ',0,'2024-08-09 13:21:04',109),(607,'ㅋㅋ',0,'2024-08-09 13:21:57',110),(608,'한번 보세요',0,'2024-08-09 13:22:01',110),(609,'ㅎㅇㅎㅇ',0,'2024-08-09 13:23:16',113),(610,'ㅇㄹㄴㅇㅁㄴ',0,'2024-08-09 13:44:48',115),(611,'ㅎㄹㅇ',0,'2024-08-09 13:45:18',115),(612,'누가 내 리스트에 좋아요나 댓글좀 달아줘봐유',0,'2024-08-09 13:59:32',100),(613,'댓글',0,'2024-08-09 14:01:19',95),(614,'달러갔는데',0,'2024-08-09 14:01:21',95),(615,'private이라',0,'2024-08-09 14:01:24',95),(616,'못담',0,'2024-08-09 14:01:25',95),(617,'잠시만유',0,'2024-08-09 14:14:18',102),(618,'ㅇㄱㅁㄴㅇㅁ',0,'2024-08-09 14:15:07',117),(619,'ㄹㅇㄶ',0,'2024-08-09 14:15:41',117),(620,'앗',0,'2024-08-09 14:22:31',94),(621,'ㅇㅇㅇㅇㅇ',0,'2024-08-09 14:49:33',115),(622,'dsada',0,'2024-08-09 14:50:43',116),(623,'fdfsadf',0,'2024-08-09 14:51:42',116),(624,'메세지 테스트',0,'2024-08-09 14:51:50',116),(625,'dsadas',0,'2024-08-09 15:05:00',85),(626,'gdfgdfd',0,'2024-08-09 15:05:33',85),(627,'gsdgsd',0,'2024-08-09 15:06:39',85),(628,'dsadsdaas',0,'2024-08-09 15:07:20',104),(631,'ccccc',0,'2024-08-09 15:11:07',100),(632,'안녕',0,'2024-08-09 15:11:53',119),(633,'네',0,'2024-08-09 15:11:57',102),(634,'우와',0,'2024-08-09 15:12:03',100),(635,'안녕하세요? 저는 IT Clips AI입니다. 무엇을 도와드릴까요?',0,'2024-08-09 15:12:27',102),(636,'ddddd',0,'2024-08-09 15:35:34',85),(637,'ㅎㅇㅇ',0,'2024-08-09 15:35:35',115),(638,'ㅎㅇㅎㅇ',0,'2024-08-09 15:35:35',115),(639,'세진세진',0,'2024-08-09 16:15:24',85),(640,'ㅁㄴㅇㄻㅇㄴㄹ',0,'2024-08-09 16:15:43',121),(641,'ㅋㅋㅋ',0,'2024-08-09 16:18:46',115),(642,'ㅋㅋㅋ',0,'2024-08-09 16:18:47',115),(643,'ㅋㅋㅋ',0,'2024-08-09 16:18:48',115),(644,'ㅋㅋ',0,'2024-08-09 16:19:18',115),(645,'ㅋㅋㅋㅋ',0,'2024-08-09 16:19:20',115),(646,'ㅋㅋㅋㅋ',0,'2024-08-09 16:19:21',115),(647,'ㄹㄹㄹㄹ',0,'2024-08-09 16:19:57',117),(648,'세진아',0,'2024-08-09 16:24:55',85),(649,'대답',0,'2024-08-09 16:24:56',85),(651,'1',0,'2024-08-09 16:36:25',107),(652,'2',0,'2024-08-09 16:36:34',107),(653,'3',0,'2024-08-09 16:36:39',107),(654,'4\\',0,'2024-08-09 16:36:50',107),(655,'5',0,'2024-08-09 16:36:51',107),(656,'6',0,'2024-08-09 16:36:53',108),(657,'ㅊ',0,'2024-08-09 16:37:03',107),(658,'펑',0,'2024-08-09 16:38:00',85),(659,'에러납니다',0,'2024-08-09 16:38:02',85),(661,'테스트',0,'2024-08-09 16:43:00',108),(662,'ㅇㄴㅁㅇ',0,'2024-08-09 16:43:09',108),(663,'ㄹㄹㄹ',0,'2024-08-09 17:02:21',100),(664,'ㅇㄴㅁㅇ',0,'2024-08-09 17:04:04',108),(665,'ㄴㅁㅇㅁㄴㅁ',0,'2024-08-09 17:04:10',107),(666,'dsad',0,'2024-08-09 17:05:39',108),(667,'dasdasdas',0,'2024-08-09 17:05:48',107),(668,'dsad',0,'2024-08-09 17:05:50',107),(669,'안녕하세요',0,'2024-08-09 17:18:00',85),(670,'dd',0,'2024-08-09 17:18:14',85),(671,'dfd',0,'2024-08-09 17:18:16',85),(672,'sp',0,'2024-08-09 17:18:17',85),(673,'네',0,'2024-08-09 17:18:18',85),(674,'그래요',0,'2024-08-09 17:18:19',85),(675,'네',0,'2024-08-09 17:18:22',85),(676,'네',0,'2024-08-09 17:18:28',85),(677,'꼬여가지고',0,'2024-08-09 17:18:31',85),(678,'아하',0,'2024-08-09 17:18:34',85),(679,'sdklfsdjklfksdjflqsjklfwjklfwjeklfqwklefjklqwjlefkqwk',0,'2024-08-09 17:18:43',85),(680,'ㅇㅇ',0,'2024-08-09 17:19:09',104),(681,'ㅇㅇ',0,'2024-08-09 17:19:18',123),(682,'ㅎㅇ',0,'2024-08-09 17:25:40',117),(683,'얌밈',0,'2024-08-09 17:25:40',124),(684,'얌',0,'2024-08-09 17:25:45',124),(685,'ㅎㅇ',0,'2024-08-09 17:25:46',100),(686,'ㅎㅇ',0,'2024-08-09 17:25:59',101),(687,'ㅎㅂㅎ',0,'2024-08-09 17:26:15',100),(688,'ㅎㅅㅎ',0,'2024-08-09 17:26:18',101),(689,'야호',0,'2024-08-09 17:26:47',94),(690,'룰루',0,'2024-08-09 17:26:51',113),(691,'ㅋㅋ',0,'2024-08-09 17:27:27',101),(692,'ㅋㅋㅂㅂ',0,'2024-08-09 17:27:30',115),(693,'https://i11d205.p.ssafy.io/bookmarklist/120',0,'2024-08-09 17:32:51',101),(694,'몰래봐',0,'2024-08-09 17:32:56',101),(695,'gd',0,'2024-08-09 17:55:38',120),(696,'ㅎㅇ',0,'2024-08-09 17:55:38',120),(697,'ㅋㅋ',0,'2024-08-09 17:55:39',120),(698,'헤헷',0,'2024-08-09 17:55:40',120),(699,'1. 욱슈슈 콘을 딴다. 2. 억슈슈 콘의 국물을 버린다. 3. 마요네즈랑 모짜렐라',0,'2024-08-09 17:55:42',120),(700,'ㅇㅁㄴㅇㅁㅇ',0,'2024-08-10 11:20:55',108),(701,'테스트1',0,'2024-08-10 11:24:45',107),(702,'테스트2',0,'2024-08-10 11:25:51',108),(703,'테ㅡ슽3',0,'2024-08-10 11:25:55',107),(704,'dsa',0,'2024-08-10 11:53:20',108),(705,'dsad',0,'2024-08-10 11:53:31',99),(706,'ggg',0,'2024-08-10 11:54:50',102),(707,'테스트메세지',0,'2024-08-10 11:55:08',107),(708,'ㅇㅇ',0,'2024-08-10 11:56:21',107),(709,'ㄹㄹㄹ',0,'2024-08-10 11:57:33',107),(710,'ㅎㅎㅎ',0,'2024-08-10 12:05:27',108),(711,'ㄱㄷ',0,'2024-08-10 12:06:43',107),(712,'ㄱㄷ2',0,'2024-08-10 12:07:00',107),(713,'ㄱㄷ',0,'2024-08-10 12:19:22',108),(714,'ㄱㄷ',0,'2024-08-10 12:19:43',107),(715,'ㅇㄴ',0,'2024-08-10 13:23:13',107),(716,'ㅇㄴㅁ',0,'2024-08-10 13:23:37',108),(717,'ㅁㄴㅇ',0,'2024-08-10 13:23:49',108),(718,'ㄹㅇㄴㄹㅇㄴ',0,'2024-08-10 13:36:05',108),(719,'ㄹㅇㄴㄹㅇㄴ',0,'2024-08-10 13:36:05',108),(720,'테ㅡ슽',0,'2024-08-10 13:38:35',107),(721,'테ㅡ슽',0,'2024-08-10 13:38:35',107),(722,'fsdf',0,'2024-08-10 13:48:25',107),(723,'ㅇㄴㅇㅁㄴㅇㅁㄴㅇㄴㅁㅇㅁㄴㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㅇㅁㅇ',0,'2024-08-10 13:59:42',107),(724,'ㅇㄴㅁㅇㅁ',0,'2024-08-10 15:27:53',107),(725,'ㅇㅁㄴㅇ',0,'2024-08-10 15:46:08',107),(726,'ㄹㅇㄴ',0,'2024-08-10 15:46:50',108),(727,'ㄴㅇㅁㄴㅇ',0,'2024-08-10 15:48:43',107),(756,'ㅎㅇㅎㅇ',0,'2024-08-12 21:51:30',142),(757,'ㅎㅇㅇㅎㅇ',0,'2024-08-12 21:51:32',142),(761,'ㅎㅇㅎㅇ',0,'2024-08-12 21:51:50',142),(763,'sdfafasdfsadfsdafasdfsdf',0,'2024-08-12 21:51:52',142),(764,'fdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',0,'2024-08-12 21:51:54',142),(779,'asfdsdfasdfdsa',0,'2024-08-12 21:52:40',142),(782,'adfsasdfasdfasd',0,'2024-08-12 21:52:41',142),(784,'dasfasdfsadf',0,'2024-08-12 21:52:42',142),(785,'dasfasdfasdf',0,'2024-08-12 21:52:43',142),(787,'ㅎㅇ',0,'2024-08-13 01:22:52',156),(789,'ㅎㅇㅎㅇ',0,'2024-08-13 01:23:59',156),(790,'ㅎㅇ',0,'2024-08-13 01:24:04',156),(791,'ㅎㅇㅎㅇ',0,'2024-08-13 01:24:08',156),(792,'ㅎㅇ',0,'2024-08-13 01:24:27',156),(793,'ㅎㅇㅎㅇ',0,'2024-08-13 01:24:29',156),(794,'ㅎㅇㅎㅇ',0,'2024-08-13 01:24:31',156),(795,'ㅎㅇ',0,'2024-08-13 01:24:39',142),(796,'ㅎㅇ',0,'2024-08-13 01:27:14',156),(798,'ㅎㅇ',0,'2024-08-13 01:28:39',156),(799,'ㅎㅇ',0,'2024-08-13 01:28:41',156),(800,'하이하이',0,'2024-08-13 01:28:44',156),(801,'굿굿',0,'2024-08-13 01:28:47',156),(802,'3',0,'2024-08-13 01:28:49',156),(803,'4',0,'2024-08-13 01:28:49',156),(804,'5',0,'2024-08-13 01:28:49',156),(805,'6',0,'2024-08-13 01:28:50',156),(807,'7',0,'2024-08-13 01:28:50',156),(808,'1',0,'2024-08-13 01:28:50',156),(809,'2',0,'2024-08-13 01:28:51',156),(810,'3',0,'2024-08-13 01:28:51',156),(811,'5',0,'2024-08-13 01:28:51',156),(813,'왜',0,'2024-08-13 01:28:53',156),(814,'못가요',0,'2024-08-13 01:28:54',156),(816,'좀가봐요',0,'2024-08-13 01:28:57',156),(818,'나도 내려가고싶어',0,'2024-08-13 01:29:00',156),(819,'지우지마',0,'2024-08-13 01:29:03',156),(820,'지우지마',0,'2024-08-13 01:29:06',156),(821,'지우지마',0,'2024-08-13 01:29:16',156),(822,'ㅎㅇㅎㅇ',0,'2024-08-13 01:29:25',156),(824,'바이요',0,'2024-08-13 01:29:33',156),(825,'바이요',0,'2024-08-13 01:29:50',156),(827,'올라가보세요',0,'2024-08-13 01:29:56',156),(828,'왜 안가요',0,'2024-08-13 01:30:05',156),(830,'저도 천천히 쳐요',0,'2024-08-13 01:30:23',156),(836,'하이',0,'2024-08-13 01:39:49',158),(837,'북마크 리스트 보고 연락드려요',0,'2024-08-13 01:40:00',158),(838,'네',0,'2024-08-13 01:40:57',159),(839,'안녕하세요',0,'2024-08-13 01:40:59',159),(840,'어디서 정보를 모으시나요',0,'2024-08-13 01:41:06',158),(841,'채팅',0,'2024-08-13 01:41:16',159),(842,'세진이 형거에서도',0,'2024-08-13 01:41:19',159),(843,'나오는걸',0,'2024-08-13 01:41:21',159),(844,'무슨 말씀이시죠',0,'2024-08-13 01:41:42',158),(845,'근데 저 알림이 안뜨네요',0,'2024-08-13 01:41:48',158),(846,'세진이형 채팅방에서',0,'2024-08-13 01:41:49',159),(847,'이 채팅이 나오는중',0,'2024-08-13 01:41:53',159),(848,'야 대답까지',0,'2024-08-13 01:42:01',159),(850,'나왔네',0,'2024-08-13 01:42:02',159),(853,'근데',0,'2024-08-13 01:43:10',159),(854,'또 잘돌아가는거같기도',0,'2024-08-13 01:43:14',159),(855,'시간은 괜찮은거같은데',0,'2024-08-13 01:43:45',158),(856,'엉',0,'2024-08-13 01:44:03',159),(857,'근데 한번씩 꼬이면',0,'2024-08-13 01:44:06',159),(858,'쭉 그런데',0,'2024-08-13 01:44:07',159),(859,'ㅎㅇ',0,'2024-08-13 01:44:34',158),(860,'왜그럴까',0,'2024-08-13 01:44:37',158),(861,'나도',0,'2024-08-13 01:44:41',159),(862,'알림안뜨네 갑자기',0,'2024-08-13 01:44:43',159),(1003,'적~~당',0,'2024-08-13 09:02:16',142),(1004,'안녕하세요',0,'2024-08-13 09:02:26',160),(1007,'예',0,'2024-08-13 09:02:56',142),(1009,'보내는중',0,'2024-08-13 09:03:01',142),(1010,'bbbbbb',0,'2024-08-13 09:03:05',142),(1011,'cccccc',0,'2024-08-13 09:03:07',142),(1012,'하이하이',0,'2024-08-13 09:03:10',142),(1013,'계속 보내는중',0,'2024-08-13 09:03:14',142),(1014,'ㅋㅋ',0,'2024-08-13 09:03:22',142),(1016,'어때',0,'2024-08-13 09:03:27',142),(1017,'갱갱',0,'2024-08-13 09:03:29',142),(1018,'새새',0,'2024-08-13 09:03:31',142),(1019,'생생',0,'2024-08-13 09:03:33',142),(1020,'진진',0,'2024-08-13 09:03:35',142),(1023,'혹시',0,'2024-08-13 09:03:55',160),(1025,'ㅇㅇㅇ',0,'2024-08-13 09:04:00',142),(1026,'갱생새진님도',0,'2024-08-13 09:04:05',160),(1027,'잘되는거 같기도',0,'2024-08-13 09:04:06',142),(1028,'채팅방을만든거죠',0,'2024-08-13 09:04:10',160),(1029,'??',0,'2024-08-13 09:04:11',160),(1030,'방이 두개길래',0,'2024-08-13 09:04:14',160),(1032,'ㅇㅎ',0,'2024-08-13 09:04:22',142),(1033,'닫',0,'2024-08-13 09:04:23',142),(1034,'다',0,'2024-08-13 09:04:23',142),(1035,'다다',0,'2024-08-13 09:04:24',142),(1037,'닫',0,'2024-08-13 09:04:24',142),(1038,'ㅏㄷ',0,'2024-08-13 09:04:24',142),(1039,'ㅏㄷ',0,'2024-08-13 09:04:24',142),(1040,'ㅏㄷ',0,'2024-08-13 09:04:24',142),(1041,'ㅏㄷ',0,'2024-08-13 09:04:25',142),(1042,'ㅏㄷ',0,'2024-08-13 09:04:25',142),(1044,'ㅏㄷ다다다',0,'2024-08-13 09:04:26',142),(1045,'휴,,~~',0,'2024-08-13 09:04:26',160),(1047,'다다다ㅏ닫',0,'2024-08-13 09:04:27',142),(1048,'와와다다다ㅏ닫',0,'2024-08-13 09:04:29',142),(1049,'와다다다ㅏㄷ',0,'2024-08-13 09:04:35',142),(1050,'다다다다ㅏㄷ',0,'2024-08-13 09:04:36',142),(1052,'다다다다다ㅏㄷ다와다다다',0,'2024-08-13 09:04:39',142),(1057,'으아아아아아아아',0,'2024-08-13 09:04:45',142),(1059,'오',0,'2024-08-13 09:04:47',142),(1062,'괜찮은듯?',0,'2024-08-13 09:04:49',142),(1063,'조금 겹치는감이',0,'2024-08-13 09:04:55',142),(1064,'잘되는거같슴다',0,'2024-08-13 09:04:56',160),(1065,'없지않아 있짐ㄴ',0,'2024-08-13 09:04:57',142),(1066,'아닌가요',0,'2024-08-13 09:04:58',160),(1069,'잘되나요',0,'2024-08-13 09:05:00',160),(1071,'어제보다 훨씬 좋아졌다',0,'2024-08-13 09:05:02',142),(1073,'안되나요',0,'2024-08-13 09:05:02',160),(1077,'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',0,'2024-08-13 09:05:17',156),(1078,'채팅',0,'2024-08-13 09:05:17',160),(1081,'아ㅏㅇ',0,'2024-08-13 09:05:19',160),(1085,'옆방에서 채팅보이는데요 근데',0,'2024-08-13 09:05:25',142),(1089,'ㅇ니ㅏ어ㅏㄹ어ㅏㄴㅇㄹ',0,'2024-08-13 09:05:32',160),(1092,'여보세요',0,'2024-08-13 09:05:36',160),(1093,'오',0,'2024-08-13 09:05:37',142),(1095,'여보세여',0,'2024-08-13 09:05:39',160),(1096,'올리면 해결ㄷ괴는가',0,'2024-08-13 09:05:40',142),(1100,'ㄱㄱㄱㄱ',0,'2024-08-13 09:05:45',142),(1101,'좋다',0,'2024-08-13 09:05:46',142),(1103,'엿보세요',0,'2024-08-13 09:05:48',158),(1104,'어케했노',0,'2024-08-13 09:05:48',142),(1112,'굿',0,'2024-08-13 09:06:20',160),(1120,'와',0,'2024-08-13 09:09:50',142),(1121,'다다',0,'2024-08-13 09:09:50',142),(1122,'다',0,'2024-08-13 09:09:51',142),(1123,'닫',0,'2024-08-13 09:09:51',142),(1124,'ㅏ다',0,'2024-08-13 09:09:51',142),(1125,'닫',0,'2024-08-13 09:09:52',142),(1126,'다다',0,'2024-08-13 09:09:53',142),(1127,'다다다ㅏ',0,'2024-08-13 09:09:54',142),(1128,'다다다다다',0,'2024-08-13 09:09:55',142),(1129,'앙',0,'2024-08-13 09:10:27',142),(1130,'돠',0,'2024-08-13 09:10:28',142),(1131,'도닫',0,'2024-08-13 09:10:30',142),(1132,'다다',0,'2024-08-13 09:10:30',142),(1133,'ㄴㅇ러ㅣㄹ',0,'2024-08-13 09:10:31',142),(1134,'멩러;ㅇㅁ너',0,'2024-08-13 09:10:33',142),(1135,'하이하이',0,'2024-08-13 09:10:34',142),(1136,'보내는주',0,'2024-08-13 09:10:35',142),(1139,'ㅇ테스트입니다',0,'2024-08-13 09:10:37',142),(1140,'ㅁㄴ암',0,'2024-08-13 09:10:37',142),(1141,'ㄴㅇㅁ',0,'2024-08-13 09:10:38',142),(1142,'ㄴㅇ',0,'2024-08-13 09:10:38',142),(1143,'ㅁㄴㅇ',0,'2024-08-13 09:10:38',142),(1144,'좋다좋다',0,'2024-08-13 09:10:41',142),(1145,'오',0,'2024-08-13 09:10:42',142),(1146,'굿',0,'2024-08-13 09:10:43',142),(1150,'ㅋㅋ',0,'2024-08-13 09:10:53',142),(1151,'어ㅗ',0,'2024-08-13 09:11:30',142),(1152,'아ㅓㅓ어',0,'2024-08-13 09:11:31',142),(1153,'어어ㅓㅇ',0,'2024-08-13 09:11:32',142),(1154,'어어어',0,'2024-08-13 09:11:33',142),(1156,'루루루루',0,'2024-08-13 09:11:34',142),(1157,'마마마마',0,'2024-08-13 09:11:36',142),(1159,'구ㅜ구구',0,'2024-08-13 09:11:39',142),(1160,'아',0,'2024-08-13 09:11:41',142),(1161,'ㅋㅋ',0,'2024-08-13 09:11:41',142),(1162,'네ㅔ',0,'2024-08-13 09:11:53',160),(1163,'네네네',0,'2024-08-13 09:11:55',160),(1165,'채팅',0,'2024-08-13 09:11:56',160),(1170,'원하나요',0,'2024-08-13 09:11:59',160),(1173,'얼만큼',0,'2024-08-13 09:12:03',160),(1174,'원하시죠',0,'2024-08-13 09:12:06',160),(1175,'언제까지',0,'2024-08-13 09:12:08',160),(1176,'하면될까요',0,'2024-08-13 09:12:11',160),(1178,'ㅇㄴㅁㄹ',0,'2024-08-13 09:12:11',142),(1179,'ㄴ어ㅏㅣㄴㅇ',0,'2024-08-13 09:12:12',160),(1181,'굿',0,'2024-08-13 09:12:15',160),(1182,'ㅁㄻㄴ',0,'2024-08-13 09:12:16',142),(1183,'ㅁㄴㄻㄴㄹㄴㅁㄹ',0,'2024-08-13 09:12:17',142),(1184,'ㅁㄴㄻㄴㄻㄴㄹ',0,'2024-08-13 09:12:18',142),(1185,'안녕하세요',0,'2024-08-13 10:15:28',164),(1186,'안녕하세요',0,'2024-08-13 10:16:21',166),(1187,'아아4',0,'2024-08-13 10:16:31',166),(1249,'ㅎㅇㅎㅇ',0,'2024-08-13 10:47:10',156),(1257,'ㅎㅇㅎㅇ',0,'2024-08-13 10:47:14',156),(1258,'ㅎㅇ',0,'2024-08-13 10:47:15',156),(1259,'ㅎㅇ',0,'2024-08-13 10:47:16',156),(1260,'ㅎㅇ',0,'2024-08-13 10:47:16',156),(1261,'ㅎㅇ',0,'2024-08-13 10:47:17',156),(1262,'ㅎㅇ',0,'2024-08-13 10:47:17',156),(1263,'ㅎㅇ',0,'2024-08-13 10:47:18',156),(1266,'ㅎㅇ',0,'2024-08-13 10:47:21',156),(1269,'ㅎㅇ',0,'2024-08-13 10:47:21',156),(1271,'ㅎㅇ',0,'2024-08-13 10:47:21',156),(1272,'ㅎㅇ',0,'2024-08-13 10:47:22',156),(1273,'ㅎㅇ',0,'2024-08-13 10:47:22',156),(1274,'ㅎㅇ',0,'2024-08-13 10:47:22',156),(1275,'ㅎㅇ',0,'2024-08-13 10:47:23',156),(1276,'ㅎㅇ',0,'2024-08-13 10:47:23',156),(1277,'ㅎㅇ',0,'2024-08-13 10:47:23',156),(1278,'ㅎㅇ',0,'2024-08-13 10:47:24',156),(1279,'ㅎㅇ',0,'2024-08-13 10:47:24',156),(1284,'안녕',0,'2024-08-13 13:49:27',172),(1287,'GKDL',0,'2024-08-13 13:50:58',173),(1288,'하이',0,'2024-08-13 13:51:01',173),(1289,'안녕',0,'2024-08-13 13:51:04',173),(1290,'이건 테스트야',0,'2024-08-13 13:51:08',173),(1291,'보이니?',0,'2024-08-13 13:51:31',173),(1293,'보여',0,'2024-08-13 13:52:22',172),(1294,'크흠',0,'2024-08-13 13:52:27',173),(1295,'이거 맞나',0,'2024-08-13 13:52:30',173),(1296,'아아',0,'2024-08-13 13:52:41',172),(1297,'갑자기 잘돼',0,'2024-08-13 13:52:47',172),(1298,'열어놓으면',0,'2024-08-13 13:52:53',173),(1299,'보이는거 아님?',0,'2024-08-13 13:52:55',173),(1300,'닫아볼까',0,'2024-08-13 13:52:59',173),(1301,'그런가봐 지금 열어놓으니까',0,'2024-08-13 13:53:02',172),(1302,'잘돼',0,'2024-08-13 13:53:03',172),(1303,'닫으면 어떄',0,'2024-08-13 13:53:07',172),(1304,'잘 되는듯',0,'2024-08-13 13:53:11',173),(1305,'다시 해봐',0,'2024-08-13 13:53:13',173),(1306,'아아아',0,'2024-08-13 13:53:16',172),(1307,'아아아앙 아아앙',0,'2024-08-13 13:53:18',172),(1308,'아아아앙아아앙',0,'2024-08-13 13:53:20',172),(1309,'ㅏㅏㅏ',0,'2024-08-13 13:53:21',172),(1310,'된다',0,'2024-08-13 13:53:24',173),(1311,'아까 왜 안됐지',0,'2024-08-13 13:53:27',173),(1312,'여기 근데 UI는 뭔가',0,'2024-08-13 13:53:43',172),(1313,'깔끔하긴하네',0,'2024-08-13 13:53:44',172),(1314,'응응',0,'2024-08-13 13:53:54',173),(1315,'근데 이미지랑',0,'2024-08-13 13:53:59',173),(1316,'뭔가 전부',0,'2024-08-13 13:54:02',173),(1317,'됐다가 안됐다가 해',0,'2024-08-13 13:54:06',173),(1318,'프로필도 바꿨는데',0,'2024-08-13 13:54:19',173),(1319,'토스트 메시지도 떴는데',0,'2024-08-13 13:54:25',173),(1320,'안바뀌고',0,'2024-08-13 13:54:27',173),(1321,'북마크도 이미지 넣었는데',0,'2024-08-13 13:54:42',173),(1322,'새로고침해야지 바뀜',0,'2024-08-13 13:54:48',173),(1323,'ㅋㅋ',0,'2024-08-13 14:15:50',159),(1334,'흠',0,'2024-08-13 22:42:28',171),(1335,'엥',0,'2024-08-14 01:03:37',201),(1336,'내 메세지 어디갔어',0,'2024-08-14 01:03:39',201),(1339,'ㅁㄴㅇㅁㄻㄴㄹ',0,'2024-08-14 10:01:42',230),(1340,'ㄻㅁㄴㄹ',0,'2024-08-14 10:01:47',229),(1362,'ㅎㅇㅎㅇ',0,'2024-08-14 12:45:20',273),(1365,'ㅎㅇ',0,'2024-08-14 13:19:44',274),(1366,'gd',0,'2024-08-14 13:25:24',236),(1367,'ㅎㅇ',0,'2024-08-14 13:25:29',236),(1374,'dmdkd',0,'2024-08-15 12:12:00',293),(1400,'여보세요',0,'2024-08-15 20:33:46',158),(1405,'오긴오는데',0,'2024-08-15 20:36:10',324),(1406,'실시간은안오네예',0,'2024-08-15 20:36:14',324),(1407,'새로고침해야되는듯',0,'2024-08-15 20:36:17',324),(1411,'뭐지',0,'2024-08-15 20:37:07',331),(1415,'온다',0,'2024-08-15 20:37:44',331),(1416,'온다',0,'2024-08-15 20:37:45',331),(1420,'ㅋㅋㅋㅋ',0,'2024-08-15 20:37:50',331),(1424,'된다',0,'2024-08-15 20:38:01',331),(1425,'채팅을 많이 쳐선 안돼',0,'2024-08-15 20:38:15',331),(1443,'안녕하세요~ 김싸피님 올려주신 북마크덕분에 많은 도움이 되었습니다!',0,'2024-08-15 21:55:09',354),(1444,'제 북마크리스트도 좋은거 많아요~',0,'2024-08-15 21:55:14',354),(1445,'네 감사합니다~!!',0,'2024-08-15 21:55:41',355),(1446,'도움이 많이 되었스빈다',0,'2024-08-15 21:55:47',354),(1447,'북마크리스트 좋은거 많네요',0,'2024-08-15 22:07:32',354),(1448,'네 많은 이용부탁드려요!!',0,'2024-08-15 22:07:44',355),(1449,'정말 도움이 많이 되었습니다!',0,'2024-08-15 22:07:45',354),(1450,'안녕하세요~',0,'2024-08-15 22:18:52',354),(1451,'김싸피님 올려주신 북마크덕분에 많은 도움이 되었습니다!',0,'2024-08-15 22:18:56',354),(1452,'네 우리 소통해요!!',0,'2024-08-15 22:19:03',355),(1453,'제 북마크리스트도 좋은거 많아요~ 다음에 보러 오세요!',0,'2024-08-15 22:19:04',354),(1454,'넵',0,'2024-08-15 22:19:07',355);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_seq`
--

DROP TABLE IF EXISTS `message_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_seq`
--

LOCK TABLES `message_seq` WRITE;
/*!40000 ALTER TABLE `message_seq` DISABLE KEYS */;
INSERT INTO `message_seq` VALUES (1);
/*!40000 ALTER TABLE `message_seq` ENABLE KEYS */;
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
  `sender_id` bigint NOT NULL,
  `type` enum('FOLLOW','LIST_LIKE','ROADMAP_LIKE','LIST_SCRAP','ROADMAP_SCRAP','LIST_COMMENT','ROADMAP_COMMENT') NOT NULL,
  `type_id` bigint NOT NULL,
  `contents` text NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_notification_user1_idx` (`user_id`),
  CONSTRAINT `fk_notification_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=739 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (517,106,107,'FOLLOW',107,'김민솔님이 회원님을 팔로우했습니다.',1,'2024-08-12 16:33:04'),(523,106,102,'LIST_SCRAP',140,'해피웨일님이 회원님의 북마크리스트를 스크랩했습니다.',1,'2024-08-12 16:47:33'),(531,106,104,'FOLLOW',104,'갱생새진님이 회원님을 팔로우했습니다.',1,'2024-08-12 23:54:52'),(548,106,108,'FOLLOW',108,'김숮엉님이 회원님을 팔로우했습니다.',1,'2024-08-13 00:57:41'),(559,106,102,'LIST_LIKE',140,'해피웨일님이 회원님의 북마크리스트를 좋아합니다.',1,'2024-08-13 01:33:11'),(564,106,102,'FOLLOW',102,'해피웨일님이 회원님을 팔로우했습니다.',1,'2024-08-13 01:40:35'),(642,102,105,'FOLLOW',105,'으앙님이 회원님을 팔로우했습니다.',1,'2024-08-14 00:13:27'),(644,102,106,'LIST_LIKE',124,'고양양님이 회원님의 북마크리스트를 좋아합니다.',1,'2024-08-14 00:31:53'),(645,102,106,'LIST_LIKE',169,'고양양님이 회원님의 북마크리스트를 좋아합니다.',1,'2024-08-14 00:31:54'),(646,102,106,'LIST_LIKE',129,'고양양님이 회원님의 북마크리스트를 좋아합니다.',1,'2024-08-14 00:31:54'),(650,102,116,'FOLLOW',116,'김싸피님이 회원님을 팔로우했습니다.',1,'2024-08-14 00:43:43'),(653,106,116,'FOLLOW',116,'김싸피님이 회원님을 팔로우했습니다.',0,'2024-08-14 00:43:56'),(654,107,116,'FOLLOW',116,'김싸피님이 회원님을 팔로우했습니다.',1,'2024-08-14 00:44:01'),(663,108,118,'FOLLOW',118,'뜌떵이칭구님이 회원님을 팔로우했습니다.',1,'2024-08-14 01:54:24'),(669,108,120,'FOLLOW',120,'예차니즘님이 회원님을 팔로우했습니다.',1,'2024-08-14 03:44:01'),(671,102,116,'LIST_SCRAP',169,'김싸피님이 회원님의 북마크리스트를 스크랩했습니다.',1,'2024-08-14 04:02:30'),(673,102,116,'LIST_SCRAP',118,'김싸피님이 회원님의 북마크리스트를 스크랩했습니다.',1,'2024-08-14 04:02:37'),(676,112,112,'LIST_SCRAP',170,'test님이 회원님의 북마크리스트를 스크랩했습니다.',0,'2024-08-14 04:02:51'),(677,102,116,'ROADMAP_SCRAP',179,'김싸피님이 회원님의 로드맵을 스크랩했습니다.',1,'2024-08-14 04:03:59'),(678,107,116,'LIST_SCRAP',127,'김싸피님이 회원님의 북마크리스트를 스크랩했습니다.',1,'2024-08-14 04:04:20'),(681,105,105,'LIST_LIKE',177,'으앙님이 회원님의 북마크리스트를 좋아합니다.',1,'2024-08-14 05:03:50'),(694,117,105,'FOLLOW',105,'으앙님이 회원님을 팔로우했습니다.',0,'2024-08-15 06:00:19'),(697,107,104,'ROADMAP_COMMENT',177,'갱생새진님이 회원님의 로드맵에 댓글을 남겼습니다.',1,'2024-08-15 10:25:36'),(704,107,107,'LIST_LIKE',123,'김민솔님이 회원님의 북마크리스트를 좋아합니다.',1,'2024-08-15 11:32:38'),(708,105,105,'LIST_LIKE',119,'으앙님이 회원님의 북마크리스트를 좋아합니다.',1,'2024-08-15 12:07:29'),(722,116,104,'ROADMAP_SCRAP',207,'갱생새진님이 회원님의 로드맵을 스크랩했습니다.',0,'2024-08-15 13:10:19'),(723,116,104,'ROADMAP_LIKE',207,'갱생새진님이 회원님의 로드맵을 좋아합니다.',0,'2024-08-15 13:10:20'),(724,116,104,'ROADMAP_LIKE',226,'갱생새진님이 회원님의 로드맵을 좋아합니다.',0,'2024-08-15 13:10:21'),(725,102,104,'LIST_LIKE',169,'갱생새진님이 회원님의 북마크리스트를 좋아합니다.',0,'2024-08-15 13:10:26'),(726,104,104,'LIST_LIKE',143,'갱생새진님이 회원님의 북마크리스트를 좋아합니다.',0,'2024-08-15 13:10:31'),(727,116,104,'LIST_LIKE',143,'갱생새진님이 회원님의 북마크리스트를 좋아합니다.',0,'2024-08-15 13:10:31'),(728,116,106,'FOLLOW',106,'고양양님이 회원님을 팔로우했습니다.',0,'2024-08-15 13:10:42'),(729,116,106,'LIST_LIKE',180,'고양양님이 회원님의 북마크리스트를 좋아합니다.',0,'2024-08-15 13:10:45'),(730,116,106,'ROADMAP_SCRAP',207,'고양양님이 회원님의 로드맵을 스크랩했습니다.',0,'2024-08-15 13:10:50'),(731,116,104,'LIST_LIKE',180,'갱생새진님이 회원님의 북마크리스트를 좋아합니다.',0,'2024-08-15 13:16:56'),(732,116,104,'LIST_LIKE',184,'갱생새진님이 회원님의 북마크리스트를 좋아합니다.',0,'2024-08-15 13:16:57'),(733,116,104,'ROADMAP_LIKE',208,'갱생새진님이 회원님의 로드맵을 좋아합니다.',0,'2024-08-15 13:16:59'),(734,116,104,'ROADMAP_SCRAP',207,'갱생새진님이 회원님의 로드맵을 스크랩했습니다.',0,'2024-08-15 13:17:01'),(735,107,104,'LIST_LIKE',127,'갱생새진님이 회원님의 북마크리스트를 좋아합니다.',0,'2024-08-15 13:17:06'),(736,102,104,'LIST_SCRAP',193,'갱생새진님이 회원님의 북마크리스트를 스크랩했습니다.',0,'2024-08-15 13:17:16'),(737,116,104,'LIST_SCRAP',193,'갱생새진님이 회원님의 북마크리스트를 스크랩했습니다.',0,'2024-08-15 13:17:16'),(738,102,116,'LIST_SCRAP',124,'김싸피님이 회원님의 북마크리스트를 스크랩했습니다.',0,'2024-08-15 13:20:26');
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
  `description` varchar(511) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `image` varchar(511) DEFAULT NULL,
  `is_public` tinyint NOT NULL DEFAULT '0',
  `origin` bigint DEFAULT NULL,
  `hit` bigint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `roadmap_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=232 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap`
--

LOCK TABLES `roadmap` WRITE;
/*!40000 ALTER TABLE `roadmap` DISABLE KEYS */;
INSERT INTO `roadmap` VALUES (173,104,'개발자가 되기위한 발걸음 첫단계','','2024-08-12 20:59:58','2024-08-15 19:37:18','images/588eeaae-86eb-4726-a475-4e0ecf7b1e0b-개발자가 되기위한 발걸음 첫단계-104',1,NULL,92),(174,107,'파이썬 전문가 되기 ','파이썬 프로그래밍을 마스터하기 위한 단계별 가이드','2024-08-12 21:49:05','2024-08-15 14:22:13','default',1,NULL,13),(175,107,'풀스택 웹 개발자','풀스택 웹 개발자가 되기 위한 로드맵','2024-08-12 21:51:33','2024-08-14 12:03:46','default',1,NULL,6),(176,107,'머신러닝 엔지니어','머신러닝 엔지니어가 되기 위한 종합 로드맵','2024-08-12 21:51:51','2024-08-14 12:03:40','default',1,NULL,3),(177,107,'DevOps 엔지니어','숙련된 DevOps 엔지니어가 되기 위한 경로','2024-08-12 21:52:07','2024-08-15 20:30:37','default',1,NULL,13),(178,107,'클라우드 아키텍트','AWS, Azure, GCP에 능숙한 클라우드 아키텍트가 되기 위한 단계','2024-08-12 21:52:26','2024-08-14 12:03:35','default',1,NULL,4),(179,102,'풀스택으로 웹사이트 만들어 보기! (기초)','웹 기초부터 자바스크립트, 리액트,  백엔드 프레임워크 장고까지 학습할 수 있는 로드맵!','2024-08-12 23:01:08','2024-08-15 22:01:26','images/6fffb18b-2324-4589-a091-bae45e199041-풀스택으로 웹사이트 만들어 보기! (기초)-102',1,NULL,86),(180,107,'React 개발 로드맵','React를 활용한 웹 애플리케이션 개발에 필요한 기술과 도구에 대한 로드맵입니다','2024-08-12 23:47:12','2024-08-14 12:03:44','default',1,NULL,4),(181,102,'파이썬 전문가 되기 ','파이썬 프로그래밍을 마스터하기 위한 단계별 가이드','2024-08-13 00:28:09','2024-08-15 20:11:33','default',1,174,29),(182,104,'삼성전자 코테 준비','','2024-08-13 03:52:41','2024-08-15 02:56:22','images/b0afec8d-fb1c-4e7c-ae84-0c81f6a92247-삼성전자 코테 준비-104',1,NULL,5),(183,104,'신한 해커톤 준비','','2024-08-13 03:55:53','2024-08-15 16:28:52','images/a5896059-17f6-4ea6-a2fc-0cda0518dca9-신한 해커톤 준비-104',1,NULL,7),(185,104,'주간 학습','','2024-08-13 03:57:06','2024-08-13 17:21:33','default',1,NULL,3),(186,104,'개발자 준비 초급','','2024-08-13 03:57:49','2024-08-13 21:53:05','default',1,NULL,11),(189,105,'리액트 공부','리액트용 로드맵입니다 로드맵 입니다','2024-08-13 10:37:49','2024-08-15 20:22:48','images/93e6843e-4094-46ad-a98a-80e78d97f830-리액트 공부-105',1,NULL,318),(193,112,'로드맵','로드맵','2024-08-13 13:57:40','2024-08-15 01:43:13','default',1,NULL,5),(207,116,'풀스택으로 웹사이트 만들어 보기! (기초)','웹 기초부터 자바스크립트, 리액트,  백엔드 프레임워크 장고까지 학습할 수 있는 로드맵!','2024-08-14 13:03:59','2024-08-15 22:19:17','images/6fffb18b-2324-4589-a091-bae45e199041-풀스택으로 웹사이트 만들어 보기! (기초)-102',1,179,9),(208,116,'개발자가 되기위한 발걸음 첫단계','','2024-08-14 13:04:38','2024-08-15 11:15:22','images/588eeaae-86eb-4726-a475-4e0ecf7b1e0b-개발자가 되기위한 발걸음 첫단계-104',1,173,6),(209,108,'나도 개발 잘하고싶당','나도 개발 잘하고싶당','2024-08-14 13:21:21','2024-08-15 14:21:42','images/9c7a4c6f-403a-412b-9b45-dcf186ab7a6d-나도 개발 잘하고싶당-108',1,NULL,12),(227,104,'풀스택으로 웹사이트 만들어 보기! (기초)','웹 기초부터 자바스크립트, 리액트,  백엔드 프레임워크 장고까지 학습할 수 있는 로드맵!','2024-08-15 22:10:20','2024-08-15 22:10:20','images/6fffb18b-2324-4589-a091-bae45e199041-풀스택으로 웹사이트 만들어 보기! (기초)-102',1,207,0),(228,106,'풀스택으로 웹사이트 만들어 보기! (기초)','웹 기초부터 자바스크립트, 리액트,  백엔드 프레임워크 장고까지 학습할 수 있는 로드맵!','2024-08-15 22:10:51','2024-08-15 22:10:51','images/6fffb18b-2324-4589-a091-bae45e199041-풀스택으로 웹사이트 만들어 보기! (기초)-102',1,207,0),(229,104,'풀스택으로 웹사이트 만들어 보기! (기초)','웹 기초부터 자바스크립트, 리액트,  백엔드 프레임워크 장고까지 학습할 수 있는 로드맵!','2024-08-15 22:17:02','2024-08-15 22:17:02','images/6fffb18b-2324-4589-a091-bae45e199041-풀스택으로 웹사이트 만들어 보기! (기초)-102',1,207,0),(230,116,'자바스크립트는 자바인가?','','2024-08-15 22:20:58','2024-08-15 22:21:00','default',1,NULL,1),(231,105,'메모용 로드맵','','2024-08-15 23:19:21','2024-08-15 23:22:22','default',1,NULL,10);
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
  `contents` tinytext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `roadmap_id` (`roadmap_id`),
  CONSTRAINT `roadmapcomment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roadmapcomment_ibfk_2` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmap` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap_comment`
--

LOCK TABLES `roadmap_comment` WRITE;
/*!40000 ALTER TABLE `roadmap_comment` DISABLE KEYS */;
INSERT INTO `roadmap_comment` VALUES (23,104,177,'궁금했었는데 많은 도움이 되었네요!','2024-08-15 19:25:37','2024-08-15 19:25:37');
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
  CONSTRAINT `roadmaplike_ibfk_1` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmap` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roadmaplike_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap_like`
--

LOCK TABLES `roadmap_like` WRITE;
/*!40000 ALTER TABLE `roadmap_like` DISABLE KEYS */;
INSERT INTO `roadmap_like` VALUES (71,181,102,'2024-08-13 00:55:39'),(72,185,104,'2024-08-13 03:57:19'),(75,179,102,'2024-08-13 10:45:19'),(77,173,104,'2024-08-13 15:26:30'),(81,183,102,'2024-08-13 17:12:33'),(82,186,102,'2024-08-13 17:32:44'),(86,207,104,'2024-08-15 22:10:21'),(88,208,104,'2024-08-15 22:17:00');
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
  `check` bit(1) NOT NULL,
  `order` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookmark_list_id` (`bookmark_list_id`,`roadmap_id`),
  KEY `roadmap_id` (`roadmap_id`),
  CONSTRAINT `roadmapstep_ibfk_1` FOREIGN KEY (`roadmap_id`) REFERENCES `roadmap` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roadmapstep_ibfk_2` FOREIGN KEY (`bookmark_list_id`) REFERENCES `bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=642 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roadmap_step`
--

LOCK TABLES `roadmap_step` WRITE;
/*!40000 ALTER TABLE `roadmap_step` DISABLE KEYS */;
INSERT INTO `roadmap_step` VALUES (455,173,110,_binary '\0',0),(456,173,111,_binary '',1),(457,173,104,_binary '',2),(458,173,103,_binary '',3),(459,174,122,_binary '',0),(460,174,125,_binary '\0',1),(461,175,123,_binary '\0',0),(462,176,125,_binary '\0',0),(463,177,126,_binary '\0',0),(464,178,127,_binary '',0),(469,180,128,_binary '\0',0),(470,179,114,_binary '\0',0),(471,179,124,_binary '\0',1),(472,179,129,_binary '',2),(473,179,118,_binary '',3),(474,181,122,_binary '',0),(475,181,125,_binary '',1),(476,182,104,_binary '\0',0),(477,182,110,_binary '\0',1),(478,182,111,_binary '',2),(479,183,103,_binary '\0',0),(480,183,110,_binary '\0',1),(481,183,111,_binary '\0',2),(482,183,109,_binary '',3),(483,183,104,_binary '',4),(486,185,104,_binary '',0),(487,185,110,_binary '',1),(488,186,103,_binary '\0',0),(489,186,104,_binary '\0',1),(490,186,110,_binary '\0',2),(491,186,109,_binary '',3),(509,193,170,_binary '\0',0),(558,189,116,_binary '',1),(560,207,114,_binary '',0),(561,207,124,_binary '',1),(562,207,129,_binary '\0',2),(563,207,118,_binary '\0',3),(564,208,110,_binary '',0),(565,208,111,_binary '\0',1),(566,208,104,_binary '\0',2),(567,208,103,_binary '\0',3),(568,209,144,_binary '',0),(569,209,158,_binary '',1),(570,209,150,_binary '\0',2),(626,227,114,_binary '\0',0),(627,227,124,_binary '\0',1),(628,227,129,_binary '\0',2),(629,227,118,_binary '\0',3),(630,228,114,_binary '\0',0),(631,228,124,_binary '\0',1),(632,228,129,_binary '\0',2),(633,228,118,_binary '\0',3),(634,229,114,_binary '\0',0),(635,229,124,_binary '\0',1),(636,229,129,_binary '\0',2),(637,229,118,_binary '\0',3),(638,230,124,_binary '',0),(639,230,184,_binary '',1),(640,230,109,_binary '',2),(641,231,121,_binary '\0',0);
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
  `title` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin DEFAULT NULL,
  `is_origin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=363 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'Web',1),(2,'Mobile',1),(3,'Data Science',1),(4,'AI',1),(5,'Machine Learning',1),(6,'Cloud',1),(7,'DevOps',1),(8,'Security',1),(9,'UI/UX Design',1),(10,'Game',1),(11,'Blockchain',1),(12,'IoT',1),(13,'Python',1),(14,'JavaScript',1),(15,'Java',1),(16,'C++',1),(17,'C#',1),(18,'Ruby',1),(19,'Go',1),(20,'Swift',1),(21,'Kotlin',1),(22,'PHP',1),(23,'Rust',1),(24,'React',1),(25,'Vue',1),(26,'Angular',1),(27,'Django',1),(28,'Flask',1),(29,'Spring',1),(30,'Node.js',1),(31,'TensorFlow',1),(32,'Kubernetes',1),(33,'Docker',1),(34,'AWS',1),(35,'Azure',1),(36,'Git',1),(37,'GitHub',1),(38,'VSCode',1),(39,'Frontend',1),(40,'Backend',1),(41,'Full Stack',1),(42,'System',1),(43,'Database',1),(44,'Network',1),(45,'QA',1),(46,'PM',1),(47,'Open Source',1),(48,'Startup',1),(49,'Tech New',1),(50,'Coding Tests',1),(51,'Algorithms',1),(52,'Data Structures',1),(53,'Career',1),(54,'Freelancing',1),(55,'Agile',1),(56,'Scrum',1),(57,'Big Data',1),(58,'VR',1),(59,'AR',1),(60,'3D Printing',1),(61,'Quantum Computing',1),(62,'Robotics',1),(63,'Wearables',1),(64,'eCommerce',1),(65,'FinTech',1),(66,'HealthTech',1),(67,'EduTech',1),(68,'Smart Home',1),(69,'User Research',1),(70,'Metaverse',1),(71,'Automation',1),(72,'Tech Startups',1),(73,'AR/VR',1),(74,'HCI',1),(75,'Software Engineering',1),(76,'Cloud Native',1),(77,'Data Visualization',1),(78,'Technical Writing',1),(79,'Serverless',1),(80,'Enterprise',1),(81,'CI/CD',1),(82,'Computer Vision',1),(83,'Cross Platform',1),(84,'Storage',1),(85,'Data Mining',1),(86,'Techniques',1),(87,'Software Design',1),(88,'Patterns',1),(89,'Learning',1),(90,'Integration',1),(91,'Analysis',1),(92,'Strategy',1),(93,'Technology',1),(94,'Management',1),(95,'Basics',1),(96,'Success',1),(97,'Project',1),(98,'Documentation',1),(99,'Design',1),(100,'Tools',1),(101,'Deployment',1),(102,'React-router-dom',0),(103,'Typescript',0),(121,'Zavascript',0),(122,'If',0),(123,'Implements',0),(125,'Boolean',0),(130,'Fe',0),(135,'Bootstrap',0),(136,'Browser',0),(138,'Ts',0),(140,'알고리즘',0),(141,'파이썬',0),(142,'Algorithm',0),(143,'#framwork',0),(144,'Orm',0),(145,'Framwork',0),(146,'Javascript',0),(147,'Rest',0),(148,'Framework',0),(149,'Css',0),(150,'Font',0),(151,'창고',0),(152,'메모',0),(153,'Ai',0),(154,'Ml',0),(155,'Devops',0),(156,'Aws',0),(157,'Gcp',0),(158,'도커',0),(159,'문법',0),(160,'초보',0),(161,'초급',0),(162,'입문',0),(163,'중급',0),(164,'폴더',0),(165,'Reactd',0),(166,'Hook',0),(167,'Batch',0),(168,'Android',0),(169,'Filter',0),(170,'Interceptor',0),(172,'Jenkins',0),(173,'Numpy',0),(174,'spring',0),(175,'Js',0),(176,'java',0),(177,'github',0),(178,'jenkins',0),(179,'junit',0),(180,'sonarcube',0),(181,'nginx',0),(182,'aws',0),(183,'ec2',0),(184,'docker',0),(185,'webhook',0),(186,'s3',0),(187,'presigned url',0),(188,'jpa',0),(189,'mybatis',0),(190,'query dsl',0),(191,'redis',0),(192,'cache',0),(193,'크롤링',0),(194,'pnadas',0),(195,'리액트',0),(196,'타입스크립트',0),(197,'eslint',0),(198,'ECMAScript',0),(199,'자바스크립트',0),(200,'RxJS',0),(201,'NgRx',0),(202,'Jetpack Compose',0),(203,'Ktor',0),(204,'TypeScript',0),(205,'Type',0),(206,'TypeScript입문',0),(207,'MDN',0),(208,'Mozilla',0),(209,'npm',0),(210,'ES6+',0),(211,'Babel',0),(212,'Vue.js',0),(213,'RxJs',0),(214,'프레임워크',0),(215,'E2E',0),(216,'AngularFire',0),(217,'AsyncTask',0),(218,'모션',0),(219,'디자인',0),(220,'React Router',0),(221,'Icon',0),(222,'Script',0),(223,'Zustand',0),(224,'DOM',0),(225,'TYpeScript',0),(226,'API',0),(227,'TypieScript',0),(228,'CS',0),(229,'Study',0),(230,'비전공',0),(231,'FE',0),(232,'DP',0),(233,'Figma',0),(234,'Spring Security',0),(235,'백엔드',0),(236,'OAuth2',0),(237,'Axios',0),(238,'Api',0),(239,'OAUth2',0),(240,'SSAFY',0),(241,'삼성',0),(242,'이재용',0),(243,'11기',0),(244,'PT 주제 예시',0),(245,'코테 1.5솔',0),(246,'1학기',0),(247,'11기 1학기',0),(248,'싸피셜',0),(249,'노트북 고장',0),(250,'삼성 전자 서비스',0),(251,'갤럭시북 플렉스 알파',0),(278,'http',0),(327,'콘텐츠 기반 필터링',0),(328,'프로젝트_파이팅',0),(329,'Content based',0),(330,'Filtering',0),(331,'sts',0),(332,'Chrome Extension',0),(333,'ChatGPt',0),(334,'ChatGPT',0),(335,'테스트',0),(336,'REDIS',0),(337,'string',0),(338,'dasffasd',0),(339,'adfds',0),(340,'fads',0),(341,'ㅁㄴㅇㄻㅇㄴ',0),(342,'ㄴㅇㅁㄹㅇㄴ',0),(343,'social',0),(344,'login',0),(345,'Oauth',0),(346,'google',0),(347,'Kakao',0),(348,' social',0),(349,'test',0),(350,'예찬',0),(351,'클라우드',0),(352,'javascript',0),(353,'web',0),(354,'library',0),(355,'기초',0),(356,'Adnroid',0),(357,'django',0),(358,'RxJava',0),(359,'Jetpack',0),(360,'WebSocket',0),(361,'자바',0),(362,'스프링',0);
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
  `nickname` varchar(50) DEFAULT NULL,
  `profile_image` varchar(511) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `birth` date DEFAULT NULL,
  `job` varchar(50) DEFAULT NULL,
  `gender` tinyint(1) DEFAULT '0',
  `refresh_token` varchar(511) DEFAULT NULL,
  `role` enum('USER','ADMIN') DEFAULT 'USER',
  `dark_mode` tinyint(1) DEFAULT '0',
  `provider` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'hong@example.com','password123','홍길동','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1990-01-01','개발자',0,NULL,'USER',0,'local',NULL),(2,'kim@example.com','password123','김철수','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1985-05-10','시스템 관리자',1,NULL,'USER',1,'local',NULL),(3,'lee@example.com','password123','이영희','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1992-07-21','네트워크 엔지니어',1,NULL,'USER',0,'local',NULL),(4,'park@example.com','password123','박민수','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1980-11-12','데이터 분석가',0,NULL,'USER',0,'local',NULL),(5,'choi@example.com','password123','최은지','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1994-02-15','프론트엔드 개발자',1,NULL,'USER',0,'local',NULL),(6,'jung@example.com','password123','정해인','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1987-09-09','백엔드 개발자',1,NULL,'USER',1,'local',NULL),(7,'kang@example.com','password123','강유미','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1991-03-22','풀스택 개발자',0,NULL,'USER',0,'local',NULL),(8,'cho@example.com','password123','조수민','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1995-07-18','보안 전문가',1,NULL,'USER',0,'local',NULL),(9,'jang@example.com','password123','장준혁','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1982-12-05','데브옵스 엔지니어',1,NULL,'USER',0,'local',NULL),(10,'yoon@example.com','password123','윤하나','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1989-04-17','소프트웨어 엔지니어',0,NULL,'USER',1,'local',NULL),(11,'ahn@example.com','password123','안민수','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1978-11-25','클라우드 엔지니어',1,NULL,'USER',0,'local',NULL),(12,'jo@example.com','password123','조영수','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1985-06-30','머신러닝 엔지니어',0,NULL,'USER',0,'local',NULL),(13,'shin@example.com','password123','신은지','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1993-08-10','인공지능 엔지니어',1,NULL,'USER',1,'local',NULL),(14,'hwang@example.com','password123','황지훈','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1990-10-13','데이터 과학자',0,NULL,'USER',0,'local',NULL),(15,'oh@example.com','password123','오세훈','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1988-12-25','모바일 앱 개발자',1,NULL,'USER',0,'local',NULL),(16,'jak@example.com','password123','장서영','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1991-05-19','게임 개발자',0,NULL,'USER',0,'local',NULL),(17,'im@example.com','password123','임수정','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1983-09-27','데이터 엔지니어',1,NULL,'USER',1,'local',NULL),(18,'bae@example.com','password123','배상민','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1986-01-08','빅데이터 엔지니어',0,NULL,'USER',1,'local',NULL),(19,'kwon@example.com','password123','권하늘','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1992-11-11','블록체인 개발자',1,NULL,'USER',0,'local',NULL),(20,'jeong@example.com','password123','정다혜','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1984-03-29','사이버 보안 전문가',0,NULL,'USER',0,'local',NULL),(21,'mj.kim1@example.com','password123','김민재1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1991-06-01','웹 개발자',0,NULL,'USER',0,'local',NULL),(22,'jh.park1@example.com','password123','박지훈1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1984-02-15','데이터 분석가',1,NULL,'USER',1,'local',NULL),(23,'sj.lee1@example.com','password123','이서준1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1990-03-12','프론트엔드 개발자',0,NULL,'USER',0,'local',NULL),(24,'yh.choi1@example.com','password123','최윤호1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1989-07-25','백엔드 개발자',1,NULL,'USER',1,'local',NULL),(25,'ha.kim2@example.com','password123','김하늘1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1987-11-19','시스템 관리자',0,NULL,'USER',0,'local',NULL),(26,'se.park1@example.com','password123','박서은1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1993-04-07','네트워크 엔지니어',1,NULL,'USER',0,'local',NULL),(27,'ja.lee1@example.com','password123','이재아1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1985-08-11','보안 전문가',0,NULL,'USER',0,'local',NULL),(28,'hy.kang1@example.com','password123','강하영1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1992-01-23','클라우드 엔지니어',1,NULL,'USER',1,'local',NULL),(29,'ju.cho1@example.com','password123','조지우1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1988-05-29','데브옵스 엔지니어',0,NULL,'USER',0,'local',NULL),(30,'mj.han1@example.com','password123','한민준1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1995-09-17','소프트웨어 엔지니어',1,NULL,'USER',1,'local',NULL),(31,'si.lee1@example.com','password123','이서인1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1990-12-05','데이터 과학자',0,NULL,'USER',0,'local',NULL),(32,'ja.song1@example.com','password123','송재아1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1989-03-15','머신러닝 엔지니어',1,NULL,'USER',1,'local',NULL),(33,'ha.yoon1@example.com','password123','윤하늘1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1986-11-07','인공지능 엔지니어',0,NULL,'USER',0,'local',NULL),(34,'ja.hong1@example.com','password123','홍재아1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1993-07-22','데이터 엔지니어',1,NULL,'USER',1,'local',NULL),(35,'hw.choi1@example.com','password123','최현우1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1984-10-30','빅데이터 엔지니어',0,NULL,'USER',0,'local',NULL),(36,'sj.kim1@example.com','password123','김서준1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1987-05-13','블록체인 개발자',1,NULL,'USER',1,'local',NULL),(37,'ja.yoon1@example.com','password123','윤재아1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1992-04-21','사이버 보안 전문가',0,NULL,'USER',0,'local',NULL),(38,'hj.lee1@example.com','password123','이하진1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1989-06-18','풀스택 개발자',1,NULL,'USER',1,'local',NULL),(39,'sj.han1@example.com','password123','한서준1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1986-08-05','모바일 앱 개발자',0,NULL,'USER',0,'local',NULL),(40,'mj.yoon1@example.com','password123','윤민재1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1994-02-14','게임 개발자',1,NULL,'USER',1,'local',NULL),(41,'ja.han1@example.com','password123','한재아1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1991-07-19','프론트엔드 개발자',0,NULL,'USER',0,'local',NULL),(42,'ha.kim3@example.com','password123','김하린1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1985-04-22','백엔드 개발자',1,NULL,'USER',1,'local',NULL),(43,'se.choi1@example.com','password123','최서은1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1988-12-20','데이터 과학자',0,NULL,'USER',0,'local',NULL),(44,'ja.kang1@example.com','password123','강재아1','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1993-01-11','머신러닝 엔지니어',1,NULL,'USER',1,'local',NULL),(45,'yh.cho2@example.com','password123','조윤호2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1984-05-25','인공지능 엔지니어',0,NULL,'USER',0,'local',NULL),(46,'ha.lee2@example.com','password123','이하린2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1990-07-16','데이터 엔지니어',1,NULL,'USER',1,'local',NULL),(47,'ja.hong2@example.com','password123','홍재아2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1995-03-30','빅데이터 엔지니어',0,NULL,'USER',0,'local',NULL),(48,'si.kim1@example.com','password123','김서인2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1989-02-19','블록체인 개발자',1,NULL,'USER',1,'local',NULL),(49,'jh.kang2@example.com','password123','강지훈2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1986-10-13','사이버 보안 전문가',0,NULL,'USER',0,'local',NULL),(50,'sj.yoon2@example.com','password123','윤서준2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1991-06-01','풀스택 개발자',1,NULL,'USER',1,'local',NULL),(51,'mj.choi1@example.com','password123','최민재2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1994-08-24','모바일 앱 개발자',0,NULL,'USER',0,'local',NULL),(52,'ha.kang3@example.com','password123','강하린2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1987-11-12','게임 개발자',1,NULL,'USER',1,'local',NULL),(53,'yh.cho3@example.com','password123','조윤하2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1985-09-08','프론트엔드 개발자',0,NULL,'USER',0,'local',NULL),(54,'ha.hong2@example.com','password123','홍하린2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1990-10-14','백엔드 개발자',1,NULL,'USER',1,'local',NULL),(55,'sj.choi2@example.com','password123','최서준2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1984-01-03','데이터 과학자',0,NULL,'USER',0,'local',NULL),(56,'ja.park1@example.com','password123','박재아2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1993-09-20','머신러닝 엔지니어',1,NULL,'USER',1,'local',NULL),(57,'hy.kim2@example.com','password123','김현우2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1988-06-27','인공지능 엔지니어',0,NULL,'USER',0,'local',NULL),(58,'ha.song1@example.com','password123','송하린2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1991-03-23','데이터 엔지니어',1,NULL,'USER',1,'local',NULL),(59,'mj.kang1@example.com','password123','강민재2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1994-07-10','빅데이터 엔지니어',0,NULL,'USER',0,'local',NULL),(60,'sj.cho3@example.com','password123','조서준2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1986-02-14','블록체인 개발자',1,NULL,'USER',1,'local',NULL),(61,'jh.lee2@example.com','password123','이지훈2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1990-05-15','사이버 보안 전문가',0,NULL,'USER',0,'local',NULL),(62,'si.yoon1@example.com','password123','윤서인2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1989-09-17','풀스택 개발자',1,NULL,'USER',1,'local',NULL),(63,'ja.kim1@example.com','password123','김재아3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1995-12-26','모바일 앱 개발자',0,NULL,'USER',0,'local',NULL),(64,'hy.cho1@example.com','password123','조현우2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1987-03-31','게임 개발자',1,NULL,'USER',1,'local',NULL),(65,'sj.han2@example.com','password123','한서준2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1992-11-05','프론트엔드 개발자',0,NULL,'USER',0,'local',NULL),(66,'ja.yoon2@example.com','password123','윤재아2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1991-01-28','백엔드 개발자',1,NULL,'USER',1,'local',NULL),(67,'hy.hong1@example.com','password123','홍현우2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1986-08-18','데이터 과학자',0,NULL,'USER',0,'local',NULL),(68,'yh.kim3@example.com','password123','김윤호3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1983-06-05','웹 개발자',0,NULL,'USER',0,'local',NULL),(69,'ha.park2@example.com','password123','박하린2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1987-01-10','데이터 분석가',1,NULL,'USER',1,'local',NULL),(70,'sj.lee3@example.com','password123','이서준3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1990-04-23','프론트엔드 개발자',0,NULL,'USER',0,'local',NULL),(71,'ja.cho2@example.com','password123','조재아2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1989-02-15','백엔드 개발자',1,NULL,'USER',1,'local',NULL),(72,'hw.kim3@example.com','password123','김현우3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1985-09-19','시스템 관리자',0,NULL,'USER',0,'local',NULL),(73,'mj.park2@example.com','password123','박민재2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1992-03-07','네트워크 엔지니어',1,NULL,'USER',0,'local',NULL),(74,'yh.lee3@example.com','password123','이윤호3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1994-12-11','보안 전문가',0,NULL,'USER',0,'local',NULL),(75,'ha.kang4@example.com','password123','강하린3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1993-08-12','클라우드 엔지니어',1,NULL,'USER',1,'local',NULL),(76,'ju.cho2@example.com','password123','조지우2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1988-06-14','데브옵스 엔지니어',0,NULL,'USER',0,'local',NULL),(77,'sj.han3@example.com','password123','한서준3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1995-10-19','소프트웨어 엔지니어',1,NULL,'USER',1,'local',NULL),(78,'si.kim2@example.com','password123','김서인3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1990-11-09','데이터 과학자',0,NULL,'USER',0,'local',NULL),(79,'ja.song2@example.com','password123','송재아2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1986-04-25','머신러닝 엔지니어',1,NULL,'USER',1,'local',NULL),(80,'ha.yoon2@example.com','password123','윤하늘2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1993-05-17','인공지능 엔지니어',0,NULL,'USER',0,'local',NULL),(81,'ja.hong3@example.com','password123','홍재아3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1985-09-08','데이터 엔지니어',1,NULL,'USER',1,'local',NULL),(82,'hw.choi3@example.com','password123','최현우3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1994-10-26','빅데이터 엔지니어',0,NULL,'USER',0,'local',NULL),(83,'yh.kim4@example.com','password123','김윤호4','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1987-03-13','블록체인 개발자',1,NULL,'USER',1,'local',NULL),(84,'ja.yoon3@example.com','password123','윤재아3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1992-11-21','사이버 보안 전문가',0,NULL,'USER',0,'local',NULL),(85,'hj.lee3@example.com','password123','이하진3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1988-02-18','풀스택 개발자',1,NULL,'USER',1,'local',NULL),(86,'sj.han4@example.com','password123','한서준4','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1991-07-05','모바일 앱 개발자',0,NULL,'USER',0,'local',NULL),(87,'mj.yoon2@example.com','password123','윤민재3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1989-08-24','게임 개발자',1,NULL,'USER',1,'local',NULL),(88,'ja.han2@example.com','password123','한재아2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1994-03-13','프론트엔드 개발자',0,NULL,'USER',0,'local',NULL),(89,'ha.kim5@example.com','password123','김하린4','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1985-12-12','백엔드 개발자',1,NULL,'USER',1,'local',NULL),(90,'se.choi2@example.com','password123','최서은2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1990-04-30','데이터 과학자',0,NULL,'USER',0,'local',NULL),(91,'ja.kang2@example.com','password123','강재아2','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1986-01-11','머신러닝 엔지니어',1,NULL,'USER',1,'local',NULL),(92,'yh.cho4@example.com','password123','조윤호3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1993-02-25','인공지능 엔지니어',0,NULL,'USER',0,'local',NULL),(93,'ha.lee3@example.com','password123','이하린3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1990-09-16','데이터 엔지니어',1,NULL,'USER',1,'local',NULL),(94,'ja.hong4@example.com','password123','홍재아4','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1987-03-30','빅데이터 엔지니어',0,NULL,'USER',0,'local',NULL),(95,'si.kim3@example.com','password123','김서인4','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1989-04-19','블록체인 개발자',1,NULL,'USER',1,'local',NULL),(96,'jh.kang3@example.com','password123','강지훈3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1995-10-13','사이버 보안 전문가',0,NULL,'USER',0,'local',NULL),(97,'sj.yoon3@example.com','password123','윤서준3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1986-12-01','풀스택 개발자',1,NULL,'USER',1,'local',NULL),(98,'mj.choi2@example.com','password123','최민재3','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1994-09-24','모바일 앱 개발자',0,NULL,'USER',0,'local',NULL),(99,'ha.kang6@example.com','password123','강하린5','default','2024-08-12 08:53:33','2024-08-12 08:53:33','1987-01-12','게임 개발자',1,NULL,'USER',1,'local',NULL),(100,'joon4355@gmail.com','DEFAULT_PASSWORD','구글가고싶다',NULL,'2024-08-12 17:53:49','2024-08-12 17:53:49','1995-03-14','프론트엔드 개발자',1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTAwNjU0NjIyOTMzNjc3OTg0NDciLCJhdXRoIjoiT0FVVEgyX1VTRVIiLCJleHAiOjE3MjQ4MzIxNTZ9.YMfN1Am2hsBRsAjqfecgYLOX6TlHASd9Qp3veQeH0zM','USER',1,'Google',NULL),(101,'wlsrb690@gmail.com','DEFAULT_PASSWORD','징귤',NULL,'2024-08-12 17:58:09','2024-08-12 17:58:09','1999-03-03','백엔드 개발자',1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDk5NTYyMTY3NzEwNzA2NDU5NjAiLCJhdXRoIjoiT0FVVEgyX1VTRVIiLCJleHAiOjE3MjQ2NjI4NzN9.QSPfUy7ziOh7Rkfw39uj7euXLWfryIxyPD3gMUxYqlw','USER',NULL,'Google',''),(102,'kdj4355@naver.com','$2a$10$fS1qfXTWLsHdPI/tj4XSR.2KRr7LAwTd2eDBIH1bRtQPx.ayPvcS2','해피웨일','images/c1a57a9f-75b6-4fb6-9338-cdd174310377-102-profileImg','2024-08-12 18:01:51','2024-08-12 18:01:51','1995-03-14','프론트엔드 개발자',1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJrZGo0MzU1QG5hdmVyLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MjQ5Mzc3NjB9.mKrMS8jPGPgoNBF5siB92TNHe5h7cy8DPNURQCZuk7w','USER',NULL,NULL,'안녕하세요 초보개발자입니다.'),(103,'sidamo.dev@gmail.com','DEFAULT_PASSWORD','aaa',NULL,'2024-08-12 19:06:06','2024-08-12 19:06:06','1111-11-11','프론트엔드 개발자',1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTI0NDI3MzI2NTEyMDQ1NDYxOTAiLCJhdXRoIjoiT0FVVEgyX1VTRVIiLCJleHAiOjE3MjQ4NTk5NTh9.0zJh55iSO3P6Gfm9DYQVvxYrn6lbSkQoxRreIs494QI','USER',1,'Google',NULL),(104,'rlatpwls30@gmail.com','$2a$10$KquMSvhV6bJgyPZ2YHM8kOm7wk8KT14zlEogVJbP0HYLACzEmprti','갱생새진','images/16980889-3978-4691-bdc0-655511c51dc6-104-profileImg','2024-08-12 19:14:06','2024-08-12 19:14:06','1997-02-04','안드로이드 개발자',1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJybGF0cHdsczMwQGdtYWlsLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE3MjQ5NDA2NDJ9.0HgLEjsT_dwOQI9l_ZqNrPlHL2j5eHqhN5jG79q5PGM','USER',NULL,NULL,'안녕하세요 안드로이드 개발자 김세진입니다.'),(105,'chlguddn1212@naver.com','$2a$10$EqtrM/78CrfzLDgwMPc6K.0/vMPZGRGrFk8wGO2wbYfCkdPb8Jtsi','으앙','default','2024-08-12 20:25:27','2024-08-12 20:25:27','1995-10-24','프론트엔드 개발자',1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGxndWRkbjEyMTJAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTcyNDk0MDcxNH0.VIElm8Mn9JVjnxhoOvAF6JgkPTOX1CEl_S_xCv8rFhw','USER',NULL,NULL,''),(106,'wlsrb6905@naver.com','$2a$10$oYSB8PGknqjnh4qfgqQIu.sXWBPCiOwrKr3fWn4BJJZV0DvLwRgmO','고양양','images/54a0ae33-5a29-4235-bfbe-2134746978f6-106-profileImg','2024-08-12 20:40:29','2024-08-12 20:40:29','1999-03-03','백엔드 개발자',1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3bHNyYjY5MDVAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTcyNDkzNzAzM30.ad9L_RujcNYEQBm67aTJRdXx9ieffGn67aYaiCn7Kic','USER',NULL,NULL,''),(107,'a01092247763@gmail.com','DEFAULT_PASSWORD','김민솔','images/112afaab-4109-41ab-9a6e-9a3c74be9a8a-107-profileImg','2024-08-12 21:27:19','2024-08-12 21:27:19','2000-02-27','백엔드 개발자',0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTQ1ODM3MjgyOTgwMzI4Njg1MzIiLCJhdXRoIjoiT0FVVEgyX1VTRVIiLCJleHAiOjE3MjQ5MzEwMzB9.7BhHn5Uz-Gf1acDj62DtmHBm8f9J2P9x9qtaLaP1Vks','USER',NULL,'Google','안녕하세여'),(108,'crystar2402@cu.ac.kr','DEFAULT_PASSWORD','김숮엉','images/54b78e31-5077-4701-890a-66f670b39262-108-profileImg','2024-08-13 09:07:09','2024-08-13 04:07:34','2001-12-11','백엔드 개발자',0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTczMzE1MDQxNTIyMzIzOTYwNTgiLCJhdXRoIjoiT0FVVEgyX1VTRVIiLCJleHAiOjE3MjQ5MTQzNjZ9.ohD1at2OybC0bcTH1h1j_4pzAtIHRDA6ffG89D9zf_c','USER',NULL,'Google','안녕하살법'),(110,'crystar2402@naver.com','$2a$10$/5UgHdEFfdBqJuLswebszOV4H3gJkd.JxOVU7rxkeYFiqXoEm./d2','김수정 부계임','images/168a4b73-128f-4472-825d-80e3ef609935-110-profileImg','2024-08-13 13:17:39','2024-08-13 13:17:39','2001-12-11','게임 프로그래머',0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjcnlzdGFyMjQwMkBuYXZlci5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzI0NzMyNTA3fQ.1Dt8n83BRaBGLguWQp7a1wP37msyVrP9T1QwHzHDn3U','USER',NULL,NULL,'끄하하하하'),(112,'danbxx22@gmail.com','DEFAULT_PASSWORD','test',NULL,'2024-08-13 13:40:13','2024-08-13 13:40:13','2024-01-01','프론트엔드 개발자',0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTc5NzAxMjk5Mzk5MDA1MjA4OTkiLCJhdXRoIjoiT0FVVEgyX1VTRVIiLCJleHAiOjE3MjQ4MTc2NzV9.3GtgQhc833hPESO0c3dtW08gagBcCamKofiVO801Gw8','USER',NULL,'Google',''),(113,'ssafy.coach004@gmail.com','DEFAULT_PASSWORD','coach',NULL,'2024-08-13 13:44:33','2024-08-13 13:44:33','2024-08-13','프론트엔드 개발자',1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDk4NTA5MDc2NTkwNTY0MzIwNzIiLCJhdXRoIjoiT0FVVEgyX1VTRVIiLCJleHAiOjE3MjQ3MzM4NzJ9.-iXJhkHF1y6Q8p7MCTZ8MpHI74yEbRa5-7BMcINpQno','USER',1,'Google',NULL),(114,'dlwldjs7544@naver.com','$2a$10$ujooxhwaMB5uQ8tuw24V9e3AWaQe9rzfBDN.uh0fobmmKh9pza8wC','히히',NULL,'2024-08-13 14:07:11','2024-08-13 14:07:11','1900-01-01','릴리즈 매니저',0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbHdsZGpzNzU0NEBuYXZlci5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzI0NzM1MjMxfQ.P2MDOw4_zVDhNDkyIwDDpk82qLTvA-b3aIsN-vS0E3c','USER',1,NULL,NULL),(116,'ssafy@ssafy.com','$2a$10$.XL4SNxvUT8mnsoVvCFfbebcbhvPTcOODOvx323BTvLt9CqTbDAzC','김싸피','images/c1d01c9e-3356-4e52-9917-6fcefc14c12a-116-profileImg','2024-08-14 09:35:20','2024-08-14 09:35:20','2024-08-14','풀스택 개발자',1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzc2FmeUBzc2FmeS5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzI0OTM3OTUxfQ.zRSnTdcdSxYFxXw9qbjgsOfHUC7XdtKnqCtmfekZdKk','USER',NULL,NULL,'안녕하세요 김싸피입니다.'),(117,'chw99321069@gmail.com','$2a$10$fhJigEDIotgd9kqgJztIteuVTkzp9z02daQ0NtZQ7VIsgdnRL1iNu','으앙앙','default','2024-08-14 09:51:40','2024-08-14 09:51:40','1111-11-11','릴리즈 매니저',1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaHc5OTMyMTA2OUBnbWFpbC5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzI0OTQwMjA3fQ.zc3P2WvfECOu-qR4atKTvJrEqljPbTWAlISKAVUvgxo','USER',NULL,NULL,''),(118,'hyunstu16@gmail.com','$2a$10$4IglBvaMIp95Wu.B7xMzZe4ikObfcPu2U8tELBBylNRxRJkD6QQUa','뜌떵이칭구',NULL,'2024-08-14 10:53:49','2024-08-14 10:53:49','2000-01-06','기타',0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoeXVuc3R1MTZAZ21haWwuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTcyNDgxMDAyOX0.Dpw63VmNVY0c3erqSxIU8qRXoFCiDfaHfXspS5YMLLE','USER',1,NULL,NULL),(119,'crystar2402@gmail.com','DEFAULT_PASSWORD','김수정 부계일까?',NULL,'2024-08-14 10:55:04','2024-08-14 10:55:04','2001-12-11','프론트엔드 개발자',0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2NTI3MjI5NyIsImF1dGgiOiJPQVVUSDJfVVNFUiIsImV4cCI6MTcyNDgxMDEwNH0.TerPCnc1eWbUI41j4NtMkBNPQQigp2wCRqz2Io7piMI','USER',1,'Github',NULL),(120,'dlgpdnjs34@gmail.com','DEFAULT_PASSWORD','예차니즘',NULL,'2024-08-14 12:43:18','2024-08-14 12:43:18','1996-01-18','백엔드 개발자',0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTMzMTk5NDUzODgzOTUyMDQzODciLCJhdXRoIjoiT0FVVEgyX1VTRVIiLCJleHAiOjE3MjQ4MTY1OTh9.XzdeTR0F_f57rzwDXd2igslND2ZZh7fwr5ZThkH7S_U','USER',1,'Google',NULL),(123,'dj4355@naver.com','$2a$10$H2tGog/jG1SAJUHOFLQOAulQnS3bCMwCN/KEtRcJXj3w0ss6erxOe','초보개발자',NULL,'2024-08-14 17:01:56','2024-08-14 17:01:56','1995-03-14','프론트엔드 개발자',1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkajQzNTVAbmF2ZXIuY29tIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTcyNDgzMjIwM30.NnUBj1T_hR_boufsITieTCtwt32rTaHLVYmCPlNr-iM','USER',1,NULL,NULL),(124,'armitage@naver.com','$2a$10$lJrgcx19gGNgt8nN/Ji2n.u73BpYgaqrCQE9W3xmjTXObTYRnr7Gy','북마크왕?',NULL,'2024-08-14 18:44:47','2024-08-14 18:44:47',NULL,'',0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhcm1pdGFnZUBuYXZlci5jb20iLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzI0ODM4Njk1fQ.k4vdkajJniN74xZDlOziY95v0vLiOGzCCHnkZbdXwGc','USER',NULL,NULL,'또 써야 하나..?'),(125,'kdj4355@kmu.kr','DEFAULT_PASSWORD','깃허브계정',NULL,'2024-08-15 00:13:09','2024-08-15 00:13:09','1995-03-14','프론트엔드 개발자',1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNTYzODc4OTUiLCJhdXRoIjoiT0FVVEgyX1VTRVIiLCJleHAiOjE3MjQ4NTc5ODh9.eUSJv63sbZQAb8p33d_SXnmvRakDg6OXVnoxKx0niSk','USER',1,'Github',NULL),(126,'merong2391@gmail.com','DEFAULT_PASSWORD','닉네임',NULL,'2024-08-15 03:58:05','2024-08-15 03:58:05','1998-04-29','풀스택 개발자',0,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDc1NDcwMzA1OTg2NTA2NzI3NDgiLCJhdXRoIjoiT0FVVEgyX1VTRVIiLCJleHAiOjE3MjQ4NzE0ODR9.dASxwOaFtKM4rNvsK-lEIasg-EFGAWBhfRKHozJ7l3o','USER',1,'Google',NULL),(127,'testssafy1@gmail.com','DEFAULT_PASSWORD','녹차마루',NULL,'2024-08-15 21:07:46','2024-08-15 21:07:46','1900-01-01','IOS 개발자',1,'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTI2MTIwMDAzNTM5MDE4OTMxOTkiLCJhdXRoIjoiT0FVVEgyX1VTRVIiLCJleHAiOjE3MjQ5MzMyNjV9.xdWgo2300G4tafJTXn4ZbTIipjDGdsd5BJutZq983WE','USER',1,'Google',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_group` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `bookmark_list_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookmark_list_id` (`bookmark_list_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_group_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_group_ibfk_2` FOREIGN KEY (`bookmark_list_id`) REFERENCES `bookmark_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=337 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group`
--

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
INSERT INTO `user_group` VALUES (186,104,103),(303,116,103),(187,104,104),(192,104,109),(279,116,109),(193,104,110),(194,104,111),(197,102,114),(261,104,114),(199,105,116),(200,105,117),(201,102,118),(262,104,118),(202,105,119),(259,102,121),(204,105,121),(205,107,122),(206,107,123),(207,102,124),(208,107,125),(209,107,126),(210,107,127),(211,107,128),(212,102,129),(215,106,132),(216,107,133),(218,107,135),(221,106,138),(223,106,140),(224,106,141),(226,104,143),(278,116,143),(227,108,144),(228,108,145),(229,108,146),(272,102,148),(273,104,148),(274,106,148),(231,107,148),(271,108,148),(270,117,148),(233,108,150),(241,108,158),(247,106,164),(248,106,165),(252,102,169),(253,112,170),(257,102,171),(254,104,171),(256,110,171),(267,117,175),(268,117,176),(269,105,177),(276,120,179),(280,116,180),(285,116,184),(287,116,186),(289,108,188),(290,104,189),(291,102,190),(292,102,191),(293,104,192),(332,102,193),(294,116,193),(295,124,194),(306,108,196);
/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
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
  CONSTRAINT `FK_Tag_TO_UserTags_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_User_TO_UserTags_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tag`
--

LOCK TABLES `user_tag` WRITE;
/*!40000 ALTER TABLE `user_tag` DISABLE KEYS */;
INSERT INTO `user_tag` VALUES (27,1,1),(28,1,13),(29,2,2),(30,2,9),(31,3,3),(32,3,4),(33,4,6),(34,5,4),(35,5,5),(36,6,39),(38,7,29),(37,7,40),(39,8,41),(40,9,45),(42,10,22),(41,10,45),(43,11,7),(44,12,9),(45,12,39),(46,13,83),(47,14,76),(48,15,49),(49,15,64),(50,16,70),(51,17,6),(52,17,81),(53,18,13),(54,18,14),(55,19,3),(56,20,4),(57,20,5),(58,21,2),(59,22,45),(60,22,50),(61,23,27),(62,24,14),(63,24,24),(64,25,86),(65,26,12),(66,27,42),(67,27,83),(68,28,7),(69,29,8),(70,29,42),(71,30,29),(72,31,42),(73,32,59),(74,33,31),(75,33,85),(76,34,27),(77,35,11),(78,35,42),(79,36,67),(80,37,37),(81,38,32),(82,38,33),(83,39,50),(84,40,83),(85,41,42),(86,42,8),(87,43,2),(88,43,9),(89,44,3),(90,45,83),(91,46,4),(92,46,5),(93,47,6),(94,48,32),(95,49,27),(96,49,57),(97,50,42),(98,51,2),(99,52,76),(100,53,27),(101,54,42),(102,55,47),(103,56,6),(104,56,81),(105,57,8),(106,58,4),(107,59,32),(108,59,33),(109,60,12),(110,61,31),(111,62,10),(112,63,6),(113,64,3),(114,64,57),(115,65,3),(116,66,49),(117,67,37),(118,68,11),(119,69,42),(120,70,13),(121,70,14),(122,71,4),(123,72,59),(124,73,83),(125,74,4),(126,74,31),(127,75,9),(128,76,32),(129,77,37),(130,78,27),(131,79,6),(132,80,3),(133,81,42),(134,82,49),(135,83,3),(136,83,57),(137,84,45),(138,85,83),(139,86,8),(140,87,27),(141,88,3),(142,89,49),(143,90,6),(144,91,27),(145,92,76),(146,93,2),(147,94,3),(148,95,83),(149,96,4),(150,97,6),(151,98,32),(152,99,3),(153,101,1),(159,102,1),(204,102,4),(160,102,10),(162,102,12),(164,102,34),(203,104,1),(158,104,2),(202,104,4),(161,104,12),(163,104,20),(156,105,1),(174,105,29),(166,106,1),(168,107,1),(167,107,4),(169,107,40),(179,108,1),(178,108,7),(170,108,8),(171,108,40),(172,108,67),(173,110,3),(198,116,2),(187,116,13),(186,116,14),(181,116,15),(199,116,20),(201,116,24),(200,116,25),(196,124,4),(197,124,5);
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

-- Dump completed on 2024-08-15 23:23:04
