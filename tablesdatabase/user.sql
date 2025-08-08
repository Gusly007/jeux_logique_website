-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Jun 23, 2025 at 09:06 AM
-- Server version: 10.9.8-MariaDB-1:10.9.8+maria~ubu2204
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `base`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `is_administrator` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `is_administrator`, `created_at`) VALUES
(1, 'gusly', '373395', 'jngusly@gmail.com', 1, '2025-06-20 07:28:00'),
(2, 'hjjsjs', '$2y$10$DziZrguckhEUPtwwRmv69OjR9GY6O6Cpup7GjH4boNl8IkVEQuYGy', 'jvf@gmail.com', 0, '2025-06-20 09:52:42'),
(4, 'jo', '$2y$10$7cQL9gBCYx98OJDsvj4ZeeUvrSd69UgxFO.LOwnkDFX8QDs0p0r96', 'jngdddusly@gmail.com', 0, '2025-06-20 12:13:32'),
(5, 'jack', '$2y$10$cPzB.GtA1i7qcWwY2teUH.kIHdQPRQvOGeKDoeXczdMykxqygmnmS', 'jack@lebeau.fr', 0, '2025-06-20 12:43:41'),
(6, 'polo', '$2y$10$z1YK.eOQZHssbLTOF8/8jufaOC6eluxNHqHCkoCY9vUJToesYrAJK', 'polo@gmail.com', 0, '2025-06-20 14:40:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
