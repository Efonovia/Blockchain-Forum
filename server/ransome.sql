-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2024 at 11:23 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ransome`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminblogs`
--

CREATE TABLE `adminblogs` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `admin_id` int(11) NOT NULL,
  `ref` varchar(25) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `adminblog_likes`
--

CREATE TABLE `adminblog_likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `adminblog_id` int(11) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `admin_id` varchar(30) NOT NULL,
  `password` varchar(70) NOT NULL,
  `roles` varchar(15) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `admin_id`, `password`, `roles`, `updatedAt`, `createdAt`) VALUES
(1, 'brytozeee', '97vgk0uldj0fmdo', '$2a$10$aLagU9/1AVH1lorf3yEM/.31agACa.4vK8nO8UNsAPKCNxT/4esZi', 'SuperAdmin', '2023-01-30 16:13:22', '2023-01-30 16:13:22'),
(8, 'casmir', '97vg1vn6ldm3534h', '$2a$10$7yiq16Z5XNtIvnXkRwh2V.wlk2d/W2e1Wg4rKEkpxO8rdSihL3sta', 'SuperAdmin', '2023-02-01 19:52:28', '2023-02-01 19:52:28');

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `id` int(11) NOT NULL,
  `following_id` int(11) NOT NULL,
  `follower_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `images_users`
--

CREATE TABLE `images_users` (
  `id` int(11) NOT NULL,
  `img_one` varchar(100) NOT NULL,
  `img_two` varchar(100) NOT NULL,
  `img_three` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `img_four` varchar(100) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `userblogs`
--

CREATE TABLE `userblogs` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `images` varchar(100) NOT NULL,
  `comments` varchar(100) NOT NULL,
  `likes` varchar(5) NOT NULL,
  `user_id` int(11) NOT NULL,
  `ref` varchar(60) NOT NULL,
  `comments_count` int(11) NOT NULL,
  `likes_count` int(11) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userblogs`
--

INSERT INTO `userblogs` (`id`, `title`, `content`, `images`, `comments`, `likes`, `user_id`, `ref`, `comments_count`, `likes_count`, `updatedAt`, `createdAt`) VALUES
(2, '', 'hello world right hnowxd', '', '', '', 9, '4wglwld6k70', 2, 1, '2024-05-25 23:28:50', '2024-05-25 00:20:11');

-- --------------------------------------------------------

--
-- Table structure for table `userblog_comments`
--

CREATE TABLE `userblog_comments` (
  `id` int(11) NOT NULL,
  `comments` varchar(5000) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userblog_comments`
--

INSERT INTO `userblog_comments` (`id`, `comments`, `blog_id`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, 'i dont undertand youss', 2, 10, '2024-05-25 23:20:02', '2024-05-25 23:20:02'),
(2, 'pka jd  jsd fd', 2, 10, '2024-05-25 23:20:21', '2024-05-25 23:20:21');

-- --------------------------------------------------------

--
-- Table structure for table `userblog_likes`
--

CREATE TABLE `userblog_likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userblog_likes`
--

INSERT INTO `userblog_likes` (`id`, `user_id`, `blog_id`, `updatedAt`, `createdAt`) VALUES
(5, 10, 2, '2024-05-25 23:28:50', '2024-05-25 23:28:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` varchar(30) NOT NULL,
  `profile_picture` varchar(40) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `bio` varchar(1000) NOT NULL,
  `suspend` tinyint(1) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `following_count` int(11) NOT NULL,
  `follower_count` int(11) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `profile_picture`, `fullname`, `username`, `email`, `password`, `bio`, `suspend`, `verified`, `following_count`, `follower_count`, `updatedAt`, `createdAt`) VALUES
(9, '1yclwl38bln', '', '', 'casmir', 'brytozee@gmail.com', '$2a$10$D6Mqmm/Iy/CSJ2rwz/A2ceyPyO0zQl4uiLF14FUSNcQ5Tc17tTTua', 'Bio has not been set', 0, 0, 0, 0, '2024-05-24 19:41:37', '2024-05-24 19:41:37'),
(10, '28slwmpus60', '', '', 'test', 'brytozsee@gmail.com', '$2a$10$ftPmAw74BkBaiMJguPYHLuBqXIELU0KIoZeDLZPR59iVpuPyZ2QKa', 'Bio has not been set', 0, 0, 0, 0, '2024-05-25 23:02:43', '2024-05-25 23:02:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adminblogs`
--
ALTER TABLE `adminblogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `adminblog_likes`
--
ALTER TABLE `adminblog_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `adminblog_id` (`adminblog_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images_users`
--
ALTER TABLE `images_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `userblogs`
--
ALTER TABLE `userblogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `userblog_comments`
--
ALTER TABLE `userblog_comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userblog_likes`
--
ALTER TABLE `userblog_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `blog_id` (`blog_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adminblogs`
--
ALTER TABLE `adminblogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `adminblog_likes`
--
ALTER TABLE `adminblog_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `follows`
--
ALTER TABLE `follows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images_users`
--
ALTER TABLE `images_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userblogs`
--
ALTER TABLE `userblogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userblog_comments`
--
ALTER TABLE `userblog_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userblog_likes`
--
ALTER TABLE `userblog_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adminblogs`
--
ALTER TABLE `adminblogs`
  ADD CONSTRAINT `adminblogs_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`);

--
-- Constraints for table `adminblog_likes`
--
ALTER TABLE `adminblog_likes`
  ADD CONSTRAINT `adminblog_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `adminblog_likes_ibfk_2` FOREIGN KEY (`adminblog_id`) REFERENCES `adminblogs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userblogs`
--
ALTER TABLE `userblogs`
  ADD CONSTRAINT `userblogs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `userblog_likes`
--
ALTER TABLE `userblog_likes`
  ADD CONSTRAINT `userblog_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `userblog_likes_ibfk_2` FOREIGN KEY (`blog_id`) REFERENCES `userblogs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
