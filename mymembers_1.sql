-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-11-07 20:59:45
-- 伺服器版本： 10.4.20-MariaDB
-- PHP 版本： 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `test`
--

-- --------------------------------------------------------

--
-- 資料表結構 `mymembers`
--

CREATE TABLE `mymembers` (
  `sid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `gender` varchar(10) NOT NULL,
  `birthday` date DEFAULT NULL,
  `avatar` varchar(255) NOT NULL,
  `products` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `mymembers`
--

INSERT INTO `mymembers` (`sid`, `name`, `account`, `password`, `mobile`, `gender`, `birthday`, `avatar`, `products`) VALUES
(1, 'admin', 'admin', '1234', '955685421', 'male', '2021-10-13', '', ''),
(2, 'PIZZA', 'user1', '1111', NULL, '', NULL, '', ''),
(3, 'YO5', 'ad123', '1234', NULL, '', NULL, '', ''),
(4, 'test2', 'test2', '1111', NULL, '', NULL, '', ''),
(5, 'test8', 'test5', '1111', NULL, '', NULL, '', '');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `mymembers`
--
ALTER TABLE `mymembers`
  ADD PRIMARY KEY (`sid`),
  ADD UNIQUE KEY `account` (`account`),
  ADD UNIQUE KEY `phone` (`mobile`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `mymembers`
--
ALTER TABLE `mymembers`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
