-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: rapido_&_seguro
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `cpf` char(11) NOT NULL,
  `email` varchar(120) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Chrisaldo Felix','06678911245','chistafeli@gmail.com'),(2,'jurema da Silva Cruz','54035968512','jujurimeneia@gmail.com'),(3,'Samurai Sato Nipon','54786012348','samuricasatix@gmail.com');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enderecos`
--

DROP TABLE IF EXISTS `enderecos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enderecos` (
  `clientes_id_cliente` int NOT NULL,
  `rua` varchar(150) NOT NULL,
  `bairro` varchar(80) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `uf` char(2) NOT NULL,
  `cep` char(8) NOT NULL,
  `numero` int NOT NULL,
  `complemento` varchar(100) NOT NULL,
  KEY `fk_enderecos_clientes1_idx` (`clientes_id_cliente`),
  CONSTRAINT `fk_enderecos_clientes1` FOREIGN KEY (`clientes_id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enderecos`
--

LOCK TABLES `enderecos` WRITE;
/*!40000 ALTER TABLE `enderecos` DISABLE KEYS */;
INSERT INTO `enderecos` VALUES (1,'Rua Jandira Dell Coli Coelho','Jardim Denadai (Nova Veneza)','Sumaré','SP','13181370',291,'Portão Branco'),(2,'Rua Afonso Legaz Garcia','Jardim Aparecida','Campinas','SP','13068631',335,'Portão amarelo'),(3,'Rua Bernadeta Maria de Oliveira','Jardim Bom Retiro (Nova Veneza)','Sumaré','SP','13181630',87,'Arvore rosa');
/*!40000 ALTER TABLE `enderecos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parametroscalculo`
--

DROP TABLE IF EXISTS `parametroscalculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parametroscalculo` (
  `id_parametro` int NOT NULL AUTO_INCREMENT,
  `valor_distancia` decimal(10,2) NOT NULL,
  `valor_peso` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_parametro`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parametroscalculo`
--

LOCK TABLES `parametroscalculo` WRITE;
/*!40000 ALTER TABLE `parametroscalculo` DISABLE KEYS */;
INSERT INTO `parametroscalculo` VALUES (1,7.00,10.00);
/*!40000 ALTER TABLE `parametroscalculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `data_pedido` date NOT NULL,
  `distancia_km` decimal(10,2) NOT NULL,
  `peso_kg` decimal(10,2) NOT NULL,
  `clientes_id_cliente` int NOT NULL,
  `tipoEntrega_id_tipo` int NOT NULL,
  `id_parametro` int NOT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `fk_Pedidos_clientes1_idx` (`clientes_id_cliente`),
  KEY `fk_Pedidos_tipoEntrega1_idx` (`tipoEntrega_id_tipo`),
  KEY `fk_Pedidos_parametro1_idx` (`id_parametro`),
  CONSTRAINT `fk_Pedidos_clientes1` FOREIGN KEY (`clientes_id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `fk_Pedidos_paramtro1` FOREIGN KEY (`id_parametro`) REFERENCES `parametroscalculo` (`id_parametro`),
  CONSTRAINT `fk_Pedidos_tipoEntrega1` FOREIGN KEY (`tipoEntrega_id_tipo`) REFERENCES `tipoentrega` (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (4,'2025-12-09',10.00,5.00,1,1,1),(8,'2025-12-09',20.00,70.00,1,2,1),(9,'2025-12-09',20.00,3.00,2,2,1);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_calculo_entrega_after_insert` AFTER INSERT ON `pedidos` FOR EACH ROW BEGIN
    DECLARE v_valor_km DECIMAL(10,2);
    DECLARE v_valor_kg DECIMAL(10,2);

    DECLARE v_valor_distancia DECIMAL(10,2);
    DECLARE v_valor_peso DECIMAL(10,2);
    DECLARE v_valor_base DECIMAL(10,2);

    DECLARE v_acrescimo DECIMAL(10,2) DEFAULT 0;
    DECLARE v_desconto DECIMAL(10,2) DEFAULT 0;
    DECLARE v_taxa_extra DECIMAL(10,2) DEFAULT 0;
    DECLARE v_valor_final DECIMAL(10,2);

    DECLARE v_nome_tipo VARCHAR(20);

    -- Buscar parâmetros de preço
    SELECT valor_distancia, valor_peso
    INTO v_valor_km, v_valor_kg
    FROM parametrosCalculo
    WHERE id_parametro = NEW.id_parametro;

    -- Buscar nome do tipo de entrega
    SELECT nome_tipo
    INTO v_nome_tipo
    FROM tipoEntrega
    WHERE id_tipo = NEW.tipoEntrega_id_tipo;

    -- 1) Calcular valor da distância
    SET v_valor_distancia = NEW.distancia_km * v_valor_km;

    -- 2) Calcular valor do peso
    SET v_valor_peso = NEW.peso_kg * v_valor_kg;

    -- 3) Calcular valor base
    SET v_valor_base = v_valor_distancia + v_valor_peso;

    -- 4) Acréscimo se urgente (20%)
    IF v_nome_tipo = 'Urgente' THEN
        SET v_acrescimo = v_valor_base * 0.20;
    END IF;

    -- valor final preliminar
    SET v_valor_final = v_valor_base + v_acrescimo;

    -- 5) Desconto se valor final > 500 (10%)
    IF v_valor_final > 500 THEN
        SET v_desconto = v_valor_final * 0.10;
        SET v_valor_final = v_valor_final - v_desconto;
    END IF;

    -- 6) Taxa extra se peso > 50kg
    IF NEW.peso_kg > 50 THEN
        SET v_taxa_extra = 15.00;
        SET v_valor_final = v_valor_final + v_taxa_extra;
    END IF;

    -- Inserir resultado final na tabela
    INSERT INTO RegistrosCalculo
    (Pedidos_id_pedido, valor_distancia, valor_peso, acrescimo, desconto, taxa_extra, valor_final, statusEntrega_id_status)
    VALUES
    (NEW.id_pedido, v_valor_distancia, v_valor_peso, v_acrescimo, v_desconto, v_taxa_extra, v_valor_final, 9);

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_atualiza_valor_calculo_after_update` AFTER UPDATE ON `pedidos` FOR EACH ROW BEGIN
    DECLARE v_valor_distancia DECIMAL(10,2);
    DECLARE v_valor_peso DECIMAL(10,2);
    DECLARE v_valor_base DECIMAL(10,2);
    DECLARE v_acrescimo DECIMAL(10,2);
    DECLARE v_desconto DECIMAL(10,2);
    DECLARE v_taxa_extra DECIMAL(10,2);
    DECLARE v_valor_final DECIMAL(10,2);
    DECLARE v_valor_km DECIMAL(10,2);
    DECLARE v_valor_kg DECIMAL(10,2);

    -- Buscar valores de parâmetro
    SELECT valor_distancia, valor_peso
    INTO v_valor_km, v_valor_kg
    FROM parametrosCalculo
    WHERE id_parametro = NEW.id_parametro;

    -- Cálculo base
    SET v_valor_distancia = NEW.distancia_km * v_valor_km;
    SET v_valor_peso = NEW.peso_kg * v_valor_kg;
    SET v_valor_base = v_valor_distancia + v_valor_peso;

    -- Acréscimo (urgente = 20%)
    IF NEW.tipoEntrega_id_tipo = 2 THEN
        SET v_acrescimo = v_valor_base * 0.20;
    ELSE
        SET v_acrescimo = 0;
    END IF;

    -- Valor inicial com acréscimo
    SET v_valor_final = v_valor_base + v_acrescimo;

    -- Desconto se > 500
    IF v_valor_final > 500 THEN
        SET v_desconto = v_valor_final * 0.10;
        SET v_valor_final = v_valor_final - v_desconto;
    ELSE
        SET v_desconto = 0;
    END IF;

    -- Taxa extra peso > 50 kg
    IF NEW.peso_kg > 50 THEN
        SET v_taxa_extra = 15.00;
        SET v_valor_final = v_valor_final + v_taxa_extra;
    ELSE
        SET v_taxa_extra = 0;
    END IF;

    -- Atualizar a tabela registrosCalculo
    UPDATE registrosCalculo
    SET valor_distancia = v_valor_distancia,
        valor_peso = v_valor_peso,
        acrescimo = v_acrescimo,
        desconto = v_desconto,
        taxa_extra = v_taxa_extra,
        valor_final = v_valor_final,
        statusEntrega_id_status = 9 
    WHERE Pedidos_id_pedido = NEW.id_pedido;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_pedido_before_delete` BEFORE DELETE ON `pedidos` FOR EACH ROW BEGIN
    UPDATE registroscalculo
    SET statusEntrega_id_status = 12
    WHERE Pedidos_id_pedido = OLD.id_pedido;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `registroscalculo`
--

DROP TABLE IF EXISTS `registroscalculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registroscalculo` (
  `id_calculo` int NOT NULL AUTO_INCREMENT,
  `Pedidos_id_pedido` int DEFAULT NULL,
  `valor_distancia` decimal(10,2) NOT NULL,
  `valor_peso` decimal(10,2) NOT NULL,
  `acrescimo` decimal(10,2) NOT NULL,
  `desconto` decimal(10,2) NOT NULL,
  `taxa_extra` decimal(10,2) NOT NULL,
  `valor_final` decimal(10,2) NOT NULL,
  `statusEntrega_id_status` int NOT NULL,
  PRIMARY KEY (`id_calculo`),
  KEY `fk_RegistrosCalculo_Pedidos1_idx` (`Pedidos_id_pedido`),
  KEY `fk_RegistrosCalculo_statusEntrega1_idx` (`statusEntrega_id_status`),
  CONSTRAINT `fk_RegistrosCalculo_Pedidos1` FOREIGN KEY (`Pedidos_id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_RegistrosCalculo_statusEntrega1` FOREIGN KEY (`statusEntrega_id_status`) REFERENCES `statusentrega` (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registroscalculo`
--

LOCK TABLES `registroscalculo` WRITE;
/*!40000 ALTER TABLE `registroscalculo` DISABLE KEYS */;
INSERT INTO `registroscalculo` VALUES (4,8,140.00,700.00,168.00,100.80,15.00,922.20,9),(5,9,140.00,30.00,34.00,0.00,0.00,204.00,9);
/*!40000 ALTER TABLE `registroscalculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statusentrega`
--

DROP TABLE IF EXISTS `statusentrega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statusentrega` (
  `id_status` int NOT NULL AUTO_INCREMENT,
  `nome_status` varchar(20) NOT NULL DEFAULT 'calculando',
  PRIMARY KEY (`id_status`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statusentrega`
--

LOCK TABLES `statusentrega` WRITE;
/*!40000 ALTER TABLE `statusentrega` DISABLE KEYS */;
INSERT INTO `statusentrega` VALUES (9,'Calculando'),(10,'Em transito'),(11,'Entregue'),(12,'Cancelado');
/*!40000 ALTER TABLE `statusentrega` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefones`
--

DROP TABLE IF EXISTS `telefones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefones` (
  `telefone` varchar(14) NOT NULL,
  `clientes_id_cliente` int NOT NULL,
  KEY `fk_telefones_clientes_idx` (`clientes_id_cliente`),
  CONSTRAINT `fk_telefones_clientes` FOREIGN KEY (`clientes_id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefones`
--

LOCK TABLES `telefones` WRITE;
/*!40000 ALTER TABLE `telefones` DISABLE KEYS */;
INSERT INTO `telefones` VALUES ('1987065469',1),('1934256781',1),('19978605432',2),('1954683261',2),('1967584359',3);
/*!40000 ALTER TABLE `telefones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoentrega`
--

DROP TABLE IF EXISTS `tipoentrega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoentrega` (
  `id_tipo` int NOT NULL AUTO_INCREMENT,
  `nome_tipo` varchar(20) NOT NULL,
  PRIMARY KEY (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoentrega`
--

LOCK TABLES `tipoentrega` WRITE;
/*!40000 ALTER TABLE `tipoentrega` DISABLE KEYS */;
INSERT INTO `tipoentrega` VALUES (1,'Normal'),(2,'Urgente');
/*!40000 ALTER TABLE `tipoentrega` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10  9:58:06
