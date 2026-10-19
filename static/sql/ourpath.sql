-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 19-10-2026 a las 16:48:07
-- Versión del servidor: 8.0.41
-- Versión de PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ourpath`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administra`
--

CREATE TABLE `administra` (
  `id_administra` int NOT NULL,
  `id_reg` int NOT NULL,
  `id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo`
--

CREATE TABLE `articulo` (
  `id_articulo` int NOT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `descripcion` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `precio` float NOT NULL,
  `stock` int NOT NULL,
  `categoria` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `imagen` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comercia`
--

CREATE TABLE `comercia` (
  `operacion` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_art` int NOT NULL,
  `fecha` date NOT NULL,
  `monto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `escribe`
--

CREATE TABLE `escribe` (
  `id_escribe` int NOT NULL,
  `id_usuario` int NOT NULL,
  `id_pub` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro historico`
--

CREATE TABLE `registro historico` (
  `id_regH` int NOT NULL,
  `titulo` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `año` date NOT NULL,
  `consola` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int NOT NULL,
  `nombre` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `correo` varchar(150) COLLATE utf8mb4_spanish_ci NOT NULL,
  `clave` varchar(200) COLLATE utf8mb4_spanish_ci NOT NULL,
  `perfil` char(1) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT 'U'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administra`
--
ALTER TABLE `administra`
  ADD PRIMARY KEY (`id_administra`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_reg` (`id_reg`);

--
-- Indices de la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD PRIMARY KEY (`id_articulo`);

--
-- Indices de la tabla `comercia`
--
ALTER TABLE `comercia`
  ADD PRIMARY KEY (`operacion`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_art` (`id_art`);

--
-- Indices de la tabla `escribe`
--
ALTER TABLE `escribe`
  ADD PRIMARY KEY (`id_escribe`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_pub` (`id_pub`);

--
-- Indices de la tabla `registro historico`
--
ALTER TABLE `registro historico`
  ADD PRIMARY KEY (`id_regH`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administra`
--
ALTER TABLE `administra`
  MODIFY `id_administra` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `articulo`
--
ALTER TABLE `articulo`
  MODIFY `id_articulo` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comercia`
--
ALTER TABLE `comercia`
  MODIFY `operacion` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `escribe`
--
ALTER TABLE `escribe`
  MODIFY `id_escribe` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `registro historico`
--
ALTER TABLE `registro historico`
  MODIFY `id_regH` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
