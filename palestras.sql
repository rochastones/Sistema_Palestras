-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 04-Jun-2026 às 09:00
-- Versão do servidor: 5.7.36
-- versão do PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `palestras`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `inscricoes`
--

DROP TABLE IF EXISTS `inscricoes`;
CREATE TABLE IF NOT EXISTS `inscricoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) DEFAULT NULL,
  `idPalestra` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idUsuario` (`idUsuario`,`idPalestra`),
  KEY `idPalestra` (`idPalestra`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `inscricoes`
--

INSERT INTO `inscricoes` (`id`, `idUsuario`, `idPalestra`) VALUES
(1, 11, 1),
(2, 11, 2),
(3, 11, 3),
(4, 11, 4),
(5, 19, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `palestra`
--

DROP TABLE IF EXISTS `palestra`;
CREATE TABLE IF NOT EXISTS `palestra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `nomePalestrante` varchar(255) DEFAULT NULL,
  `localEvento` varchar(255) DEFAULT NULL,
  `dataEvento` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `palestra`
--

INSERT INTO `palestra` (`id`, `titulo`, `descricao`, `nomePalestrante`, `localEvento`, `dataEvento`) VALUES
(1, 'Angular', 'Introdução ao Framework Angular', 'Severino Rocha', 'IFSP Capivari', '2026-05-28 21:30:00'),
(2, 'Projeto em Angular ', 'Desenvolvimento com Angular e banco de dados SQL', 'Rocha', 'UFSP - Capivari', '2026-06-04 19:00:00'),
(3, 'Programação Estruturada', 'Curso prático de lógica de programação', 'Pedro Martins', 'UFSP Campos Capivari', '2026-06-10 19:00:00'),
(4, 'Letras', 'Aula de Inglês', 'Claudia Rocha', 'Recife', '2026-09-07 22:00:00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`ID`, `email`, `nome`, `senha`, `admin`) VALUES
(20, 'joao@gmail.com', 'Joao Carlos', '$2b$10$8/W/IuXk0namksmdGXRul.Sz/ASvz7xqleDSZEZaEVvfgGXa0l63G', 0),
(12, 'teste@gmail.com', 'teste', '$2b$10$eA1T5HNxq3XmbzlWVyk9I.nWa5aqHmKecLk7Cze3bsFPsLZZnUhS.', 1),
(11, 'raul@hotmail.com', 'Raul Castro', '$2b$10$dS.OO.mzllvA/fN.w9IGVeFkuZdcJLfeYfDwdf7uSAMvGAiBG/t52', 0),
(19, 'Ana@gmail.com', 'Ana Claudia', '$2b$10$o2zqC.JGQTN0WPRkdXyHRu/Bel6ne6k5ZRsD3YoU9lsjB73EJyyIq', 0),
(17, 'rocha@gmail.com', 'Severino Rocha', '$2b$10$v57ZShFWdZC4ItRC7Z4pleQR1DUdkBYUVT/ot5aKfUP7U19n0UAG2', 1),
(21, 'claudia@hotmail.com', 'Claudia Rocha', '$2b$10$plqkWuYLcnfcB7JDzLTc2u8MaNDmeg.NwjRsWIT7te4js.zsYRQqS', 1),
(24, 'beatriz@hotmail.com', 'Beatriz Rocha', '$2b$10$8shyrAa5yrdPwdcNE1qapebpxoxYYoXlk3o//tj7SqZIQ8zHRW74.', 0),
(23, 'sandra@hotmail.com', 'Sandra Cristina', '$2b$10$wUjUFiP8jYpC7/o4TKtb6eulglNLQ2MjagWWStE5Ej9dyQylvi2Ni', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
