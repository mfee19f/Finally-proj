-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-11-08 04:30:08
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
-- 資料表結構 `odrer`
--

CREATE TABLE `odrer` (
  `sid` int(11) NOT NULL,
  `order_sid` varchar(255) NOT NULL,
  `member_sid` int(11) NOT NULL COMMENT '會員編號',
  `name` varchar(255) NOT NULL COMMENT '會員姓名',
  `mobile` varchar(255) NOT NULL COMMENT '手機',
  `orderprice` int(11) NOT NULL COMMENT '總價格',
  `delivery` varchar(255) NOT NULL COMMENT '配送及付款方式',
  `receiver` varchar(255) NOT NULL COMMENT '收件人',
  `delivery_address` varchar(255) NOT NULL COMMENT '收貨地址',
  `card` varchar(255) NOT NULL COMMENT '信用卡號',
  `order_date` date NOT NULL DEFAULT current_timestamp() COMMENT '訂單日期'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `odrer`
--

INSERT INTO `odrer` (`sid`, `order_sid`, `member_sid`, `name`, `mobile`, `orderprice`, `delivery`, `receiver`, `delivery_address`, `card`, `order_date`) VALUES
(1, '0', 1, '林玉伯', '0961329533', 1500, '信用卡', '林玉伯', '臺北市北投區竹子湖路33號', '3529118746911607', '2021-10-25'),
(2, '0', 2, '傅邦韻', '0986436405', 2000, '到貨付款', '傅邦韻', '臺北市松山區復興北路35號', '3558731506807551', '2021-10-25'),
(3, '0', 4, '彭豐明', '0970700551', 3000, '信用卡', '彭豐明', '臺北市南港區中坡南路34號', '3569627308823175', '2021-10-25'),
(4, '0', 5, '侯慧君', '0952197685', 4000, '到貨付款', '侯慧君', '臺北市士林區芝玉路28號', '3589372012493421', '2021-10-25'),
(5, '0', 7, '王怡剛', '0915772844', 2500, '信用卡', '王怡剛', '臺北市南港區中坡南路28號', '3589872880671156', '2021-10-25'),
(6, '0', 9, '李京俐', '0929572009', 3000, '信用卡', '李京俐', '臺北市士林區德行西路5號', '4029311488420977', '2021-10-26'),
(10, '20211105144', 10, '彭仁豪', '0956861758', 1540, '到貨付款', '彭仁豪', '臺北市信義區松壽路7號', '4434899517062637', '2021-10-26'),
(11, '20211105143', 10, '彭仁豪', '0956861758', 7140, '信用卡', '彭仁豪', '臺北市信義區松壽路7號', '4964256163387412', '2021-10-26'),
(12, '0', 12, '林政城', '0914875862', 7410, '信用卡', '林政城', ' 臺北市中正區仁愛路4號', '4863675061140130', '2021-10-27'),
(14, '0', 20, '李曉明', '0944555333', 123, '4800', '李曉明', '新北市', '1234456781204', '2021-11-05'),
(17, '0', 25, '李曉明', '0944555333', 123, '4800', '李曉明', '新北市', '1234456781204', '2021-11-05'),
(51, '2021116840', 9, '皮卡皮卡丘', '2786', 51600, '信用卡', 'sdsd', '台北市12312', '456456', '2021-11-06'),
(52, '2021116840', 9, '皮卡皮卡丘', '2786', 51600, '信用卡', 'sdsd', '台北市12312', '456456', '2021-11-06'),
(53, '2021116840', 9, '皮卡皮卡丘', '2786', 82400, '信用卡', 'sdsd', '台北市12312', '456456', '2021-11-06'),
(54, '2021116840', 9, '皮卡皮卡丘', '2786', 82400, '信用卡', 'sdsd', '台北市12312', '456456', '2021-11-06'),
(55, '2021116468', 9, '皮卡皮卡丘', '', 20800, '信用卡', '', '台北市', '', '2021-11-06'),
(56, '2021116494', 10, '李小龍', '0917123456', 20700, '信用卡', '李小龍', '台北市XX路', '4356666699997777', '2021-11-06'),
(57, '2021117475', 10, '李小龍', '0931256789', 27800, '信用卡', '噴火龍', '台北市', '456782345678521', '2021-11-07'),
(58, '202111859', 14, 'Bill', '012', 4800, '信用卡', 'BILL', '台北市012', '435212345785', '2021-11-08');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `odrer`
--
ALTER TABLE `odrer`
  ADD PRIMARY KEY (`sid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `odrer`
--
ALTER TABLE `odrer`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
