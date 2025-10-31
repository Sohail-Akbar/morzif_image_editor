-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2024 at 12:28 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `image-editor`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `type` varchar(250) NOT NULL,
  `sub_type` varchar(250) NOT NULL,
  `meta_data` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `uid` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `type`, `sub_type`, `meta_data`, `created_at`, `uid`) VALUES
(1, 'All Shapes', 'shapes', 'shapes', '&quot;&quot;', '2024-01-21 06:40:58', '8LK8Q3T7bdd6iEjDoDJXHDpQprrWaq');

-- --------------------------------------------------------

--
-- Table structure for table `categories_data`
--

CREATE TABLE `categories_data` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `discription` text NOT NULL,
  `editor_data` text NOT NULL,
  `category_id` int(11) NOT NULL,
  `image` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `editor_fonts`
--

CREATE TABLE `editor_fonts` (
  `id` int(11) NOT NULL,
  `url` varchar(250) NOT NULL,
  `style` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `editor_fonts`
--

INSERT INTO `editor_fonts` (`id`, `url`, `style`, `name`, `created_at`) VALUES
(1, 'https://fonts.googleapis.com/css2?family=Alumni+Sans+Collegiate+One:ital@0;1&amp;family=Dancing+Script:wght@500;600&amp;family=Poppins:ital,wght@0,100;0,200;0,600;1,100;1,600;1,700&amp;family=Rubik+Burned&amp;display=swap', '&#039;https&#039;, sans-serif', 'Rubik Burned', '2024-01-21 06:32:57');

-- --------------------------------------------------------

--
-- Table structure for table `editor_resolutions`
--

CREATE TABLE `editor_resolutions` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `icon` varchar(250) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `meta_data`
--

CREATE TABLE `meta_data` (
  `id` int(11) NOT NULL,
  `meta_key` varchar(250) NOT NULL,
  `meta_value` varchar(250) NOT NULL,
  `meta_json` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meta_data`
--

INSERT INTO `meta_data` (`id`, `meta_key`, `meta_value`, `meta_json`, `time`) VALUES
(1, 'tmp_scripts', 'install_db_tables', '', '2024-01-21 06:13:22'),
(2, 'tmp_scripts', 'rename_categories_data_to_templates', '', '2024-01-21 06:13:22'),
(3, 'tmp_scripts', 'categories_meta_data_column', '', '2024-01-21 06:13:22'),
(4, 'tmp_scripts', 'shapes_category_id', '', '2024-01-21 06:13:22'),
(5, 'tmp_scripts', 'templates_editor_data_type_long_text', '', '2024-01-21 06:13:22');

-- --------------------------------------------------------

--
-- Table structure for table `shapes`
--

CREATE TABLE `shapes` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `image` varchar(250) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `discription` text NOT NULL,
  `editor_data` longtext NOT NULL,
  `category_id` int(11) NOT NULL,
  `image` varchar(250) NOT NULL,
  `credits` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fname` varchar(250) NOT NULL,
  `lname` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `image` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `verify_status` int(1) NOT NULL DEFAULT 0,
  `verify_token` varchar(250) NOT NULL,
  `password_forgot_token` varchar(250) NOT NULL,
  `token_expiry_date` timestamp NULL DEFAULT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `uid` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `name`, `email`, `image`, `password`, `is_admin`, `verify_status`, `verify_token`, `password_forgot_token`, `token_expiry_date`, `date_added`, `uid`) VALUES
(1, 'Ali', 'Hamza', 'Ali  Hamza', 'alihamza@naxotop.com', 'avatar.png', '$2y$10$XwdMILmrAeebO0HOK8JDR.rTP89X.am4G4HPRmwhLD6anAvLHOmEm', 1, 1, 'f3fc1197653d41531593b0e59da6b3ef', '', '2024-01-21 02:18:50', '2024-01-21 02:18:44', 'fODDgcuUCDyuSaZW5p6RuDAO8Ji1O0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories_data`
--
ALTER TABLE `categories_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `editor_fonts`
--
ALTER TABLE `editor_fonts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `editor_resolutions`
--
ALTER TABLE `editor_resolutions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meta_data`
--
ALTER TABLE `meta_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shapes`
--
ALTER TABLE `shapes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories_data`
--
ALTER TABLE `categories_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `editor_fonts`
--
ALTER TABLE `editor_fonts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `editor_resolutions`
--
ALTER TABLE `editor_resolutions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meta_data`
--
ALTER TABLE `meta_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `shapes`
--
ALTER TABLE `shapes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
