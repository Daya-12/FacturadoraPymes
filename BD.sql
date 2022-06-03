CREATE DATABASE  IF NOT EXISTS `bd_facturadora` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bd_facturadora`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: bd_facturadora
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(60) DEFAULT NULL,
  `activo` bit(1) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Agricultura',_binary ''),(2,'Animales y mascotas',_binary ''),(3,'Alimentos',_binary ''),(4,'Belleza',_binary ''),(5,'Construcción',_binary ''),(6,'Deporte y fitness',_binary ''),(7,'Electricidad',_binary ''),(8,'Entretenimiento',_binary ''),(9,'Fotografía',_binary ''),(10,'Hogar & Jardín',_binary ''),(11,'Limpieza',_binary ''),(12,'Moda',_binary ''),(13,'Mobiliario urbano',_binary ''),(14,'Medios de comunicación',_binary ''),(15,'Papelería',_binary ''),(16,'Transporte',_binary ''),(17,'Viajes',_binary ''),(18,'Otras categorias',_binary '');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoriaempresa`
--

DROP TABLE IF EXISTS `categoriaempresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoriaempresa` (
  `id_categoria` int NOT NULL,
  `id_empresa` int NOT NULL,
  PRIMARY KEY (`id_categoria`,`id_empresa`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `categoriaempresa_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  CONSTRAINT `categoriaempresa_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoriaempresa`
--

LOCK TABLES `categoriaempresa` WRITE;
/*!40000 ALTER TABLE `categoriaempresa` DISABLE KEYS */;
INSERT INTO `categoriaempresa` VALUES (5,1),(13,1),(5,2),(4,3),(11,3),(12,3),(4,4),(12,4),(8,5),(14,5);
/*!40000 ALTER TABLE `categoriaempresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudad`
--

DROP TABLE IF EXISTS `ciudad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudad` (
  `id_ciudad` int NOT NULL AUTO_INCREMENT,
  `nombre_ciudad` varchar(150) NOT NULL,
  `activo` bit(1) NOT NULL,
  PRIMARY KEY (`id_ciudad`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudad`
--

LOCK TABLES `ciudad` WRITE;
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT INTO `ciudad` VALUES (1,'Bogotá',_binary ''),(2,'Medellín',_binary ''),(3,'Cali',_binary ''),(4,'Popayán',_binary ''),(5,'Pasto',_binary ''),(6,'Manizales',_binary ''),(7,'Pereira',_binary ''),(8,'Armenia',_binary ''),(9,'Valledupar',_binary ''),(10,'Bucaramanga',_binary ''),(11,'Yopal',_binary ''),(12,'Buenaventura',_binary ''),(13,'Cartagena',_binary ''),(14,'Barranquilla',_binary ''),(15,'Santa Marta',_binary ''),(16,'Riohacha',_binary '');
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `id_tdocumento` int NOT NULL,
  `num_documento` varchar(20) NOT NULL,
  `nombre_cli` varchar(100) NOT NULL,
  `direccion_cli` varchar(100) NOT NULL,
  `id_ciudad` int NOT NULL,
  `id_empresa` int NOT NULL,
  `codpostal_cli` varchar(10) NOT NULL,
  `telefono_cli` varchar(30) NOT NULL,
  `activo` bit(1) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  KEY `id_tdocumento` (`id_tdocumento`),
  KEY `id_ciudad` (`id_ciudad`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_tdocumento`) REFERENCES `documento` (`id_tdocumento`),
  CONSTRAINT `cliente_ibfk_2` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad` (`id_ciudad`),
  CONSTRAINT `cliente_ibfk_3` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,1,'79582145','Cintia Lopez','Cra 24 N 45 56 Bis',1,1,'114523','3213597425',_binary '\0'),(2,4,'1025478964','ColorMagic S.A.S','Clle 25 N 12 74 ',2,1,'1147854','7620585',_binary ''),(3,5,'9003652587','Constructores S.A','Aut. Nort 22 N 58 12 Bis',1,1,'1102541','3652541',_binary ''),(4,1,'75265412','Armando Ortiz','Cra 91 N 12 56',2,1,'147853','3012541782',_binary ''),(5,5,'800852147','Diseños U&A','Cra 63 C Bis N 25 41',1,1,'114785','3213654125',_binary ''),(6,5,'700258417','Construcciones Services','Clle 22 N 87A Norte Piso 3',6,1,'1125632','3214587536',_binary ''),(8,1,'53254147','Fernando Ardila','Clle 82 N 12 56 Sur',2,3,'1125412','3213478547',_binary '\0'),(10,1,'80765789','Katherine Aguilar','Clle 91 N 34 Sur 33',9,1,'112342','3212342112',_binary ''),(11,4,'342123434','KarmaJumy S.A.','Cra a43 Bis N 7 Este',10,1,'1123421','7647689',_binary ''),(12,1,'90876545','Edison Perez','Cra 45 N 13 34',1,5,'1123122','3112342342',_binary ''),(13,5,'9001231456','KoalaBeauty','Cra 53 N 12 42 Bis 12',1,3,'110923','3223457856',_binary '');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle`
--

DROP TABLE IF EXISTS `detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle` (
  `id_factura` int NOT NULL,
  `id_producto` int NOT NULL,
  `cantidad` int NOT NULL,
  `valor_unitario` double NOT NULL,
  `valor_total` double NOT NULL,
  PRIMARY KEY (`id_factura`,`id_producto`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `detalle_ibfk_1` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`id_factura`),
  CONSTRAINT `detalle_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle`
--

LOCK TABLES `detalle` WRITE;
/*!40000 ALTER TABLE `detalle` DISABLE KEYS */;
INSERT INTO `detalle` VALUES (1,3,2,1250000,2500000),(1,5,4,1200000,4800000),(2,2,5,150000,750000),(2,3,3,1250000,3750000),(2,6,1,2000000,2000000),(3,3,6,1250000,7500000),(3,5,7,1200000,8400000),(4,8,4,185000,740000),(5,1,2,900000,1800000),(5,2,5,150000,750000),(5,5,1,1200000,1200000),(5,6,3,2000000,6000000),(6,3,2,1250000,2500000),(7,2,4,150000,600000),(7,5,5,1200000,6000000),(8,6,1,2000000,2000000),(9,1,1,900000,900000),(10,1,2,900000,1800000),(10,5,1,1200000,1200000),(11,1,2,900000,1800000),(11,3,3,1250000,3750000),(11,5,1,1200000,1200000),(12,2,1,150000,150000),(12,6,2,2000000,4000000),(13,1,1,900000,900000),(13,3,1,1250000,1250000),(13,5,3,1200000,3600000),(13,6,2,2000000,4000000),(14,1,3,900000,2700000),(14,2,1,150000,150000),(14,3,1,1250000,1250000),(15,2,5,150000,750000),(15,3,3,1250000,3750000),(15,6,1,2000000,2000000),(16,1,4,900000,3600000),(16,5,1,1200000,1200000),(16,6,1,2000000,2000000),(17,1,1,900000,900000),(17,2,1,150000,150000),(17,3,1,1250000,1250000),(17,5,1,1200000,1200000),(17,6,2,2000000,4000000),(17,10,2,310000,620000),(17,12,1,1000000,1000000),(17,13,3,90000,270000),(17,14,2,400000,800000),(17,15,2,550000,1100000),(17,16,3,670000,2010000),(17,17,3,120000,360000),(17,18,3,1800000,5400000),(17,19,1,1500000,1500000),(17,20,1,1700000,1700000),(18,20,1,1700000,1700000),(19,7,1,135000,135000),(19,21,3,19500,58500),(19,22,2,33800,67600),(19,23,4,6000,24000),(20,7,15,135000,2025000);
/*!40000 ALTER TABLE `detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documento`
--

DROP TABLE IF EXISTS `documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documento` (
  `id_tdocumento` int NOT NULL AUTO_INCREMENT,
  `nombre_tdocumento` varchar(80) NOT NULL,
  `activo` bit(1) NOT NULL,
  PRIMARY KEY (`id_tdocumento`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documento`
--

LOCK TABLES `documento` WRITE;
/*!40000 ALTER TABLE `documento` DISABLE KEYS */;
INSERT INTO `documento` VALUES (1,'C.C.',_binary ''),(2,'P.A.',_binary ''),(3,'C.E.',_binary ''),(4,'R.U.T.',_binary ''),(5,'N.I.T.',_binary ''),(6,'D.N.I.',_binary ''),(7,'P.E.P.',_binary '');
/*!40000 ALTER TABLE `documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `razon_social` varchar(100) NOT NULL,
  `slogan` varchar(250) DEFAULT NULL,
  `nit` varchar(20) NOT NULL,
  `url_logo` varchar(350) NOT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `direccion` varchar(70) NOT NULL,
  `id_ciudad` int NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `activo` bit(1) NOT NULL,
  `abreviacion` varchar(10) NOT NULL,
  PRIMARY KEY (`id_empresa`),
  KEY `id_ciudad` (`id_ciudad`),
  CONSTRAINT `empresa_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad` (`id_ciudad`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES (1,'Urbancol Ltda','Mobiliario urbano','NIT900377036-8','Urbancol Ltda.png','urbancolltda23@yahoo.es','Cra 67 N 45 89 Trans. 67',1,'7624563',_binary '','URBYFHG'),(2,'Constructores S.A.S.','Construcción y acabados','NIT900873920','Constructores S.A.S..jpeg','constructorescya@gmail.com','Clle 89C N 23 98 Bis',2,'76253843',_binary '','CONFGOV'),(3,'Glamming S.A.','Naturaleza y Vida','NIT900254136','Glamming S.A..jpeg','glamming458@gmail.com','Cra 12 Bis Sur N 85 6',7,'3133645874',_binary '','GLASIDT'),(4,'Natura glamming','Belleza y moda','8009876754','Natura glamming.png','glammingjua32@gmail.com','Cra 89 Sur N 23 56',3,'3133234531',_binary '','NATXYY'),(5,'Premium Services ','Entretenimiento en casa','NIT90023412343','Premium Services .png','premiumservices21@gmail.com','Clle 90 A SUR N 12 56',3,'3113452312',_binary '','PREPJNP');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado` (
  `id_estado` int NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(50) NOT NULL,
  `activo` bit(1) NOT NULL,
  PRIMARY KEY (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
INSERT INTO `estado` VALUES (1,'Emitido',_binary ''),(2,'Anulado',_binary '');
/*!40000 ALTER TABLE `estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `id_factura` int NOT NULL AUTO_INCREMENT,
  `id_ciudad` int NOT NULL,
  `id_cliente` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_estado` int NOT NULL,
  `id_formapago` int DEFAULT NULL,
  `formapago_personalizada` varchar(100) DEFAULT NULL,
  `fecha_emision` date NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `subtotal_factura` double NOT NULL,
  `total_fact` double NOT NULL,
  `valor_letras` varchar(300) NOT NULL,
  `ref_pago` varchar(300) NOT NULL,
  PRIMARY KEY (`id_factura`),
  KEY `id_ciudad` (`id_ciudad`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_estado` (`id_estado`),
  KEY `id_formapago` (`id_formapago`),
  CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad` (`id_ciudad`),
  CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `factura_ibfk_3` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `factura_ibfk_4` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`),
  CONSTRAINT `factura_ibfk_5` FOREIGN KEY (`id_formapago`) REFERENCES `formapago` (`id_formapago`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (1,2,4,1,1,4,NULL,'2022-04-03','2022-04-06',7300000,8687000,'Ocho millones seiscientos ochenta y siete mil pesos Mcte','URBYFHG-2677'),(2,1,1,1,2,2,NULL,'2022-04-03','2022-04-03',6500000,7735000,'Siete millones setecientos treinta y cinco mil pesos Mcte','URBYFHG-32280'),(3,2,2,2,1,2,NULL,'2022-04-11','2022-04-18',15900000,18921000,'Dieciocho millones novecientos veintiun mil pesos Mcte','URBYFHG-22779'),(4,1,8,13,2,2,NULL,'2022-04-11','2022-04-12',740000,880600,'Ochocientos ochenta mil seiscientos pesos Mcte','GLASIDT-32793'),(5,1,1,1,1,1,'','2022-04-13','2022-04-19',9750000,9750000,'Nueve millones setecientos cincuenta mil pesos Mcte','URBYFHG-4718'),(6,1,4,1,1,4,NULL,'2022-04-14','2022-04-13',2500000,2500000,'Dos millones quinientos mil pesos Mcte','URBYFHG-49541'),(7,2,1,1,1,4,NULL,'2022-04-14','2022-04-19',6600000,6600000,'Seis millones seiscientos mil pesos Mcte','URBYFHG-51816'),(8,1,4,1,1,4,NULL,'2022-04-14','2022-04-13',12800000,12800000,'Doce millones ochocientos mil pesos Mcte','URBYFHG-84809'),(9,2,2,1,1,5,NULL,'2022-04-14','2022-04-14',900000,900000,'Novecientos mil pesos Mcte','URBYFHG-28174'),(10,14,11,1,1,6,NULL,'2022-04-14','2022-04-20',18250000,18250000,'Dieciocho millones doscientos cincuenta mil pesos Mcte','URBYFHG-98086'),(11,3,6,1,1,3,NULL,'2022-04-14','2022-04-20',6750000,8032500,'Ocho millones treinta y dos mil quinientos pesos Mcte','URBYFHG-54910'),(12,3,2,1,1,2,NULL,'2022-04-14','2022-04-27',4300000,4300000,'Cuatro millones trescientos mil pesos Mcte','URBYFHG-72177'),(13,4,1,1,1,3,NULL,'2022-04-14','2022-04-19',9750000,9750000,'Nueve millones setecientos cincuenta mil pesos Mcte','URBYFHG-2391'),(14,1,6,1,1,2,NULL,'2022-04-14','2022-04-27',4100000,4100000,'Cuatro millones cien mil pesos Mcte','URBYFHG-33388'),(15,1,1,1,1,1,NULL,'2022-04-28','2022-04-27',6500000,7735000,'Siete millones setecientos treinta y cinco mil pesos Mcte','URBYFHG-32450'),(16,3,2,1,1,3,NULL,'2022-05-03','2022-05-03',6800000,6800000,'Seis millones ochocientos mil pesos Mcte','URBYFHG-28308'),(17,4,6,1,1,4,NULL,'2022-05-04','2022-05-17',22260000,22260000,'Veintidós millones doscientos sesenta mil pesos Mcte','URBYFHG-57747'),(18,4,6,1,1,5,NULL,'2022-05-04','2022-05-11',1700000,1700000,'Un millón setecientos mil pesos Mcte','URBYFHG-98062'),(19,2,13,13,2,1,NULL,'2022-05-06','2022-05-09',285100,339269,'Trescientos treinta y nueve mil doscientos sesenta y nueve pesos Mcte','GLASIDT-94158'),(20,2,13,13,1,3,NULL,'2022-05-06','2022-05-18',2025000,2025000,'Dos millones veinticinco mil pesos Mcte','GLASIDT-36388');
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formapago`
--

DROP TABLE IF EXISTS `formapago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formapago` (
  `id_formapago` int NOT NULL AUTO_INCREMENT,
  `nombre_formapago` varchar(80) NOT NULL,
  `activo` bit(1) NOT NULL,
  PRIMARY KEY (`id_formapago`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formapago`
--

LOCK TABLES `formapago` WRITE;
/*!40000 ALTER TABLE `formapago` DISABLE KEYS */;
INSERT INTO `formapago` VALUES (1,'Contado',_binary ''),(2,'Contraentrega',_binary ''),(3,'50%ANT. 50%COD.',_binary ''),(4,'30%ANT. 70%COD.',_binary ''),(5,'20%ANT. 80%COD.',_binary ''),(6,'10%ANT. 90%COD.',_binary '');
/*!40000 ALTER TABLE `formapago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impuesto`
--

DROP TABLE IF EXISTS `impuesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `impuesto` (
  `id_impuesto` int NOT NULL AUTO_INCREMENT,
  `nombre_impuesto` varchar(30) NOT NULL,
  `porc_impuesto` double NOT NULL,
  `activo` bit(1) NOT NULL,
  PRIMARY KEY (`id_impuesto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impuesto`
--

LOCK TABLES `impuesto` WRITE;
/*!40000 ALTER TABLE `impuesto` DISABLE KEYS */;
INSERT INTO `impuesto` VALUES (1,'IVA',19,_binary '');
/*!40000 ALTER TABLE `impuesto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `impuestofactura`
--

DROP TABLE IF EXISTS `impuestofactura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `impuestofactura` (
  `id_impuesto` int NOT NULL,
  `id_factura` int NOT NULL,
  PRIMARY KEY (`id_impuesto`,`id_factura`),
  KEY `id_factura` (`id_factura`),
  CONSTRAINT `impuestofactura_ibfk_1` FOREIGN KEY (`id_impuesto`) REFERENCES `impuesto` (`id_impuesto`),
  CONSTRAINT `impuestofactura_ibfk_2` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`id_factura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `impuestofactura`
--

LOCK TABLES `impuestofactura` WRITE;
/*!40000 ALTER TABLE `impuestofactura` DISABLE KEYS */;
INSERT INTO `impuestofactura` VALUES (1,1),(1,2),(1,3),(1,4),(1,11),(1,15),(1,19);
/*!40000 ALTER TABLE `impuestofactura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(300) NOT NULL,
  `valor_producto` double NOT NULL,
  `id_categoria` int NOT NULL,
  `id_empresa` int NOT NULL,
  `activo` bit(1) NOT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Rodadero infantil 3MX2M plastico con baranda en acero',900000,13,1,_binary ''),(2,'Bolardo de 60cm para exteriores en concreto',150000,5,1,_binary ''),(3,'Baranda de cerramiento por 3mts Acero Inox.',1250000,13,1,_binary ''),(5,'Caneca en acero inox. con tapa ',1200000,13,1,_binary ''),(6,'Caneca acero inox. doble con tapa',2000000,13,1,_binary ''),(7,'Rizadora titanium',135000,4,3,_binary ''),(8,'Alizadora premium con placas sin calor',18500,11,3,_binary '\0'),(9,'Crema rejuvenecedora x350mm',43000,4,4,_binary ''),(10,'Silla madera 1.30m x 0.70m',310000,13,1,_binary ''),(11,'Exfoliante de manos con aguacate y romero x350mm',15000,4,3,_binary ''),(12,'M-123',1000000,5,1,_binary ''),(13,'M-135',90000,5,1,_binary ''),(14,'M-456',400000,5,1,_binary ''),(15,'H-5631',550000,5,1,_binary ''),(16,'RT-341',670000,13,1,_binary ''),(17,'UI-9887',120000,13,1,_binary ''),(18,'OL-2345',1800000,13,1,_binary ''),(19,'UL-9839',1500000,5,1,_binary ''),(20,'JUL-O098',1700000,13,1,_binary ''),(21,'Crema humectante coco x 600mm',19500,4,3,_binary ''),(22,'Colonia frutas baby happy',33800,4,3,_binary ''),(23,'Brillo secante uñas fragiles',6000,11,3,_binary ''),(24,'Set brochas x 12 para pieles rigidas',45700,4,3,_binary '');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_user` varchar(300) NOT NULL,
  `correo_user` varchar(100) NOT NULL,
  `pass_user` varchar(200) NOT NULL,
  `telefono_user` varchar(30) DEFAULT NULL,
  `nivel_user` int NOT NULL,
  `id_empresa` int NOT NULL,
  `activo` bit(1) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `id_empresa` (`id_empresa`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Ricardo Rodriguez','ricardorodriguez23@gmail.com','YibQXT4/FCbslT90hSA6skA3V3tJSkfFt7thtRbKYoNzbftaeEAykZLsEyFEZPoUsm6gCqKhAa7GUvCRkbwnYnu2vDpBZJ6aq7WzLyj6Fcw=','3115268883',0,1,_binary ''),(2,'Natalia Bermudez','nataliabermudez12@gmail.com','jogjPRvr950WttfbD0v9wVWnVhSBKrhugqp/LBa8QjZXxNOhBTlPyKHIxCxctQkjHo7OPYRpmIOwOXa0MZ4U1OZHH3kenx/Cw/+tO4AyM24=','3133452145',1,1,_binary '\0'),(3,'Alejandro Rojas','alejandrorojas09@gmail.com','WWhUFmnWq0OGSx9S1me5S+mRsxvGCOqlyTmXvAYPvpvAwItWnDIIW5m1ewhqFjpPsE+olYj77cD6lGFf+12sGJeajBQZnoxA6HC/HbdAyvY=','3133452345',0,2,_binary ''),(4,'Marianna Roncancio','mariannaroncan34@gmail.com','rGl29KNwU9HcVUM4LlgnnEOO0aH30+xM3VaghPmPvpiMLnx3olFkIFk0PDD1ygey52c0TaTAz9qG0AonhyzobfFgAfPBcQ58LDklmEGkI6g=','3550485',0,1,_binary ''),(5,'Camilo Peña','camilopena56_@hotmail.com','1L8v/lkTsC4XvRy/+eg/5KoQTxRmog1wUtXHGvb+Mr6wI6acxiNC5lOSPIVXyUToh0yye+vTXZnnmAE9i42soIFAInkfeJXWNeK6mBQYEpw=','3067589304',0,1,_binary ''),(8,'Carlos Sanjuan','carlossanjuan32@hotmail.com','cnjm38RSBi6/NJGSMu493MiPJcR7kxQM2eQfNY0zu7nO46bkSrp8hJ6KmhLkK68ZVKBI5tVhHd91/rO/0qgyzYIvYW3VPzF7pvg/5I5hZXY=','3211234523',1,1,_binary ''),(9,'Martha Huertas','marthahuertas23@gmail.com','Ol3aPZfGofKs9aVPIVNI8jtMZs1MO6BVeewMrcZrDw6x/jdYj881zUS/brN5yLGp6wqS57fZnJ0vPO6MTbREEn29glZdB8VGyFKpQWAoKDI=','3045631234',0,1,_binary ''),(10,'Sergio Ballesteros ','sergioballes34@yahoo.es','Efp806opW9NvAfGAHabYbVKlMXno0dcri1dGv6ATKXWONP5vQJTE+N23iK11SOfM1DK1AHPp/h6gsT/wJvh9szxC5tnxTGL56QOZIVzV31k=','3012342121',1,1,_binary ''),(11,'Ana Benjumea','anabenjumeaq@hotmail.com','2v6hz0lNL0v5m8NPCO1gScu+NLH1p2yOX/LM2UHzZ9ny4sGWTX81atz9/0qA54Kcd07xhKXOpD4pnHWGJc+QLhDz34Z3Sa/vIuU7H9g0bds=','3012345212',1,1,_binary ''),(12,'Alejandra Gutierrez ','alejandragut@gmail.com','rSPj/uoDKvAXWLupDTFKmt3p2ifwOQ141+S6ozS2oySRDeoLll4lBo//Tp6ClPYEUvOAV86vRHHfm+UhBcU296+k15YRy37Zn18bBF5D+QQ=','3112342122',0,1,_binary ''),(13,'Juan Pablo Robles','juanrobles25@hotmail.com','rKU13bcBy3Y51wYbo4HovjS9QyfeKW+O1dRHU7X0EzwVyVgDZ5FEfYK/1Z4MmEjmB1mJcE7f2hRr6pHuEsxIDmrLVCtgCHQq6+2hUPX8rlM=','3213657893',0,3,_binary ''),(14,'Juan Pablo Diaz','juanpablodiaz45@gmail.com','2jQ/SOHomhq7siEHNC8RmaUQDIAyv5JIaOM4RHWpVRAoLChRR2/8YMvP7mtU0KhM9cfY3PNHciqwN5m01DHEABrXpx9zP9byGQ83Fp+qmsg=','3221234564',0,4,_binary ''),(15,'Sergio Alejandro Rodriguez','sergioalejandro23@gmail.com','Efp806opW9NvAfGAHabYbVKlMXno0dcri1dGv6ATKXWONP5vQJTE+N23iK11SOfM1DK1AHPp/h6gsT/wJvh9szxC5tnxTGL56QOZIVzV31k=','3144041488',0,5,_binary ''),(16,'Constanza Benavides','constanzab85@yahoo.es','95mUuCpOVuBji3n+me+Abu4jgZ3kn+vbnVGpKvvAfv5jFxaBkepUdYPFlGBQ7DqJ3LYuxjhycamYN/DvTAYb1Os39UcDFd+hh3dFiu/XQWc=','3012545873',0,3,_binary '');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-03 12:20:17
