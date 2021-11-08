-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-11-08 04:30:34
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
-- 資料庫: `test111`
--

-- --------------------------------------------------------

--
-- 資料表結構 `order_detail`
--

CREATE TABLE `order_detail` (
  `sid` int(11) NOT NULL,
  `order_sid` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `productname` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `order_detail`
--

INSERT INTO `order_detail` (`sid`, `order_sid`, `product_id`, `productname`, `size`, `price`, `quantity`) VALUES
(1, 8, 1, 'PRODUCT1', '100*100', 500, 5),
(2, 8, 1, '商品2', '200*200', 500, 5),
(7, 10, 1, '商品1', '200*200', 120, 3),
(8, 10, 2, '商品2', '200*200', 120, 3),
(9, 8, 3, '商品3', '200*200', 120, 3),
(10, 201, 33, '', '', 0, 1),
(11, 2021116308, 2021116308, '', '', 0, 0),
(28, 0, 5, '', '', 0, 1),
(68, 2021116840, 3, '', '', 0, 2),
(69, 2021116840, 5, '', '', 0, 2),
(70, 2021116840, 4, '', '', 0, 2),
(71, 2021116840, 1, '', '', 0, 1),
(72, 2021116840, 2, '', '', 0, 1),
(73, 2021116840, 3, '', '', 0, 3),
(74, 2021116840, 2, '', '', 0, 2),
(75, 2021116840, 5, '', '', 0, 3),
(76, 2021116840, 4, '', '', 0, 3),
(77, 2021116840, 1, '', '', 0, 2),
(78, 2021116840, 3, '', '', 0, 3),
(79, 2021116840, 1, '', '', 0, 2),
(80, 2021116840, 5, '', '', 0, 3),
(81, 2021116840, 2, '', '', 0, 2),
(82, 2021116840, 4, '', '', 0, 3),
(83, 2021116468, 3, '', '', 0, 1),
(84, 2021116468, 4, '', '', 0, 1),
(85, 2021116468, 5, '', '', 0, 1),
(86, 2021116730, 5, '', '', 0, 1),
(87, 2021116730, 9, '', '', 0, 1),
(88, 2021116730, 20, '', '', 0, 1),
(89, 2021116494, 6, '', '', 0, 1),
(90, 2021116494, 3, '', '', 0, 1),
(91, 2021116494, 9, '', '', 0, 1),
(92, 2021116494, 28, '', '', 0, 1),
(93, 2021117475, 2, '', '', 0, 3),
(94, 2021117475, 6, '', '', 0, 1),
(95, 2021117475, 3, '', '', 0, 2),
(96, 2021118106, 1, '', '', 0, 1),
(97, 2021118106, 3, '', '', 0, 1),
(98, 202111859, 1, '', '', 0, 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
