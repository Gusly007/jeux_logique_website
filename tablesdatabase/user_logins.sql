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
-- Table structure for table `user_logins`
--

CREATE TABLE `user_logins` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `login_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_logins`
--

INSERT INTO `user_logins` (`id`, `user_id`, `ip_address`, `login_time`) VALUES
(1, 6, '172.18.0.1', '2025-06-20 15:08:49'),
(2, 6, '172.18.0.1', '2025-06-20 15:09:43'),
(3, 6, '172.18.0.1', '2025-06-20 15:32:32'),
(4, 6, '172.18.0.1', '2025-06-20 15:33:23'),
(5, 6, '172.18.0.1', '2025-06-20 15:33:37'),
(6, 6, '172.18.0.1', '2025-06-20 15:33:46'),
(7, 6, '172.18.0.1', '2025-06-20 18:37:33'),
(8, 6, '172.18.0.1', '2025-06-20 18:58:40'),
(9, 6, '172.18.0.1', '2025-06-20 19:47:41'),
(10, 6, '172.18.0.1', '2025-06-21 06:29:05'),
(11, 6, '172.18.0.1', '2025-06-21 07:55:22'),
(12, 6, '172.18.0.1', '2025-06-21 07:58:44'),
(13, 6, '172.18.0.1', '2025-06-21 08:15:33'),
(14, 6, '172.18.0.1', '2025-06-21 08:27:01'),
(15, 6, '172.18.0.1', '2025-06-21 08:28:18'),
(16, 6, '172.18.0.1', '2025-06-21 08:31:41'),
(17, 6, '172.18.0.1', '2025-06-21 09:18:34'),
(18, 6, '172.18.0.1', '2025-06-21 09:19:58'),
(19, 6, '172.18.0.1', '2025-06-21 09:34:02'),
(20, 6, '172.18.0.1', '2025-06-21 09:34:17'),
(21, 6, '172.18.0.1', '2025-06-21 09:44:07'),
(22, 6, '172.18.0.1', '2025-06-21 09:44:22'),
(23, 6, '172.18.0.1', '2025-06-21 09:45:04'),
(24, 6, '172.18.0.1', '2025-06-21 09:45:07'),
(25, 6, '172.18.0.1', '2025-06-21 09:45:55'),
(26, 6, '172.18.0.1', '2025-06-21 09:45:58'),
(27, 6, '172.18.0.1', '2025-06-21 09:46:00'),
(28, 6, '172.18.0.1', '2025-06-21 09:46:04'),
(29, 6, '172.18.0.1', '2025-06-21 09:47:53'),
(30, 6, '172.18.0.1', '2025-06-21 10:16:59'),
(31, 6, '172.18.0.1', '2025-06-21 10:21:54'),
(32, 6, '172.18.0.1', '2025-06-21 10:33:56'),
(33, 6, '172.18.0.1', '2025-06-21 10:39:39'),
(34, 6, '172.18.0.1', '2025-06-21 10:41:56'),
(35, 6, '172.18.0.1', '2025-06-21 10:45:07'),
(36, 6, '172.18.0.1', '2025-06-21 14:22:25'),
(37, 6, '172.18.0.1', '2025-06-21 14:26:59'),
(38, 6, '172.18.0.1', '2025-06-21 14:28:13'),
(39, 6, '172.18.0.1', '2025-06-21 14:29:12'),
(40, 6, '172.18.0.1', '2025-06-21 14:32:41'),
(41, 6, '172.18.0.1', '2025-06-21 14:32:58'),
(42, 6, '172.18.0.1', '2025-06-22 18:11:45'),
(43, 6, '172.18.0.1', '2025-06-22 18:13:13'),
(44, 6, '172.18.0.1', '2025-06-22 18:14:10'),
(45, 6, '172.18.0.1', '2025-06-22 18:14:45'),
(46, 6, '172.18.0.1', '2025-06-22 19:00:42'),
(47, 6, '172.18.0.1', '2025-06-22 19:23:09'),
(48, 6, '172.18.0.1', '2025-06-22 20:14:28'),
(49, 6, '172.18.0.1', '2025-06-22 20:35:31'),
(50, 6, '172.18.0.1', '2025-06-22 20:35:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_logins`
--
ALTER TABLE `user_logins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_logins`
--
ALTER TABLE `user_logins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_logins`
--
ALTER TABLE `user_logins`
  ADD CONSTRAINT `user_logins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
