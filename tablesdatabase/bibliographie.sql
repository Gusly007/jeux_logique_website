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
-- Table structure for table `bibliographie`
--

CREATE TABLE `bibliographie` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `auteur` varchar(255) NOT NULL,
  `annee` int(11) DEFAULT NULL,
  `editeur` varchar(255) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `resume` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bibliographie`
--

INSERT INTO `bibliographie` (`id`, `titre`, `auteur`, `annee`, `editeur`, `isbn`, `resume`, `created_at`) VALUES
(1, 'On Computable Numbers', 'Alan Turing', 1936, 'Proceedings of the London Mathematical Society', 'N/A', 'Travail fondateur de l’informatique théorique, introduisant la machine de Turing.', '2025-06-21 10:39:14'),
(2, 'A Mathematician\'s Apology', 'G. H. Hardy', 1940, 'Cambridge University Press', '9780521427067', 'Réflexion philosophique sur les mathématiques pures par l’un des plus grands mathématiciens britanniques.', '2025-06-21 10:39:14'),
(3, 'The Art of Computer Programming', 'Donald Knuth', 1968, 'Addison-Wesley', '9780201896831', 'Référence monumentale sur les algorithmes et la programmation.', '2025-06-21 10:39:14'),
(4, 'Gödel, Escher, Bach: An Eternal Golden Braid', 'Douglas Hofstadter', 1979, 'Basic Books', '9780465026562', 'Exploration des systèmes logiques, de la conscience et de l’auto-référence, avec Gödel en figure centrale.', '2025-06-21 10:39:14'),
(5, 'Introduction to Algorithms', 'Thomas H. Cormen et al.', 1990, 'MIT Press', '9780262033848', 'Manuel de référence sur les algorithmes utilisé dans le monde entier.', '2025-06-21 10:39:14'),
(6, 'Structure and Interpretation of Computer Programs', 'Harold Abelson et Gerald Jay Sussman', 1985, 'MIT Press', '9780262510875', 'Classique sur la programmation fonctionnelle, utilisé au MIT.', '2025-06-21 10:39:14'),
(7, 'Principia Mathematica', 'Bertrand Russell et Alfred North Whitehead', 1910, 'Cambridge University Press', '9780521626064', 'Tentative monumentale de fonder toutes les mathématiques sur la logique.', '2025-06-21 10:39:14'),
(8, 'Collected Papers', 'John von Neumann', 1961, 'Macmillan', 'N/A', 'Recueil des travaux d’un des pionniers des ordinateurs et de la théorie des jeux.', '2025-06-21 10:39:14'),
(9, 'Cybernetics: Or Control and Communication in the Animal and the Machine', 'Norbert Wiener', 1948, 'MIT Press', '9780262730099', 'Naissance de la cybernétique, unifiant contrôle, systèmes et feedback.', '2025-06-21 10:39:14'),
(10, 'Computer Machinery and Intelligence', 'Alan Turing', 1950, 'Mind Journal', 'N/A', 'Article fondateur posant la question \"les machines peuvent-elles penser ?\", introduisant le test de Turing.', '2025-06-21 10:39:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bibliographie`
--
ALTER TABLE `bibliographie`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bibliographie`
--
ALTER TABLE `bibliographie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
