SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
/* Crearea celor 2 tabele pt BAZA DE DATE: MANAGER DE CONTACTE */

CREATE DATABASE `manager_contacte` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `manager_contacte`;

CREATE TABLE `persoana` (
    `persoanaId` int NOT NULL AUTO_INCREMENT,
    `nume` varchar(50) NOT NULL,
    `porecla` varchar(50),
    `domiciliu` varchar(150),
    `data_de_nastere` date,
    
    
    PRIMARY KEY (`persoanaId`)
   
);

CREATE TABLE `contact` (
    `contactId` int NOT NULL  PRIMARY KEY AUTO_INCREMENT,
     `persoanaId` int NOT NULL,
     `telefon` varchar(50),
     `telefon_secundar` varchar(50),
     `e_mail` varchar(50),
    FOREIGN KEY (`persoanaId`) REFERENCES `persoana`(`persoanaId`) );
