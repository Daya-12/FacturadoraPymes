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
