/*
 Navicat Premium Data Transfer

 Source Server         : nodesql
 Source Server Type    : MySQL
 Source Server Version : 80035
 Source Host           : localhost:3306
 Source Schema         : nodesql

 Target Server Type    : MySQL
 Target Server Version : 80035
 File Encoding         : 65001

 Date: 05/01/2024 18:00:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for stu_award
-- ----------------------------
DROP TABLE IF EXISTS `stu_award`;
CREATE TABLE `stu_award`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `school` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '学校',
  `college` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '学院',
  `speciality` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '专业',
  `grade` year DEFAULT NULL COMMENT '年级',
  `student_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '学生学号',
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '学生姓名',
  `award_time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '获奖时间',
  `activity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '获奖活动，比赛等名称',
  `encourage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '获奖等级',
  `Instructor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '指导老师',
  `org` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '主办机构、单位',
  `approver` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '审批人',
  `approval_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '审批状态',
  `submit_user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '提交人',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stu_award
-- ----------------------------
INSERT INTO `stu_award` VALUES (3, '学校', '4325', '235124', 2020, '124124', '124124', '2024-01-11', '4124', '12414634', '4444', '465346', NULL, NULL, NULL);
INSERT INTO `stu_award` VALUES (4, '学校', '111111111111', '11111111111', 2018, '111111111', '1111111', '2024-01-24', '111111111', '111111111', '11111111111', '11111111111111', NULL, NULL, NULL);
INSERT INTO `stu_award` VALUES (6, '学校', '2222222', '22222222', 2018, '2222222222', '2222222', '2024-01-05', '22222222', '2222222222', '22222222222', '222222222222', NULL, NULL, NULL);
INSERT INTO `stu_award` VALUES (7, '学校', '333', '333', 2018, '333', '333', '2024-01-03', '333', '333', '333', '333', NULL, NULL, NULL);

-- ----------------------------
-- Table structure for stu_user
-- ----------------------------
DROP TABLE IF EXISTS `stu_user`;
CREATE TABLE `stu_user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `identity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `salt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`, `username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stu_user
-- ----------------------------
INSERT INTO `stu_user` VALUES (3, 'test03', '0a077082ec1cf7c3ba0ccaedfd6958e0b5b714431b9edc2a3be6e494d5402be7', '1', '777876');
INSERT INTO `stu_user` VALUES (4, 'test01', '8f5bccb16f9aeb68ca59fa3c2a4c1eddf8b594326aa9ce3d923c4cc009da39f4', '1', '702791');

SET FOREIGN_KEY_CHECKS = 1;
