-- 为数据服务添加权限
-- 这个文件包含添加数据解析服务权限的 SQL 语句

-- 添加文本解析权限
INSERT INTO `Permission` (`name`, `description`) 
VALUES ('data_service_text_parse', '数据服务 - 文本解析权限（包括常规文档、表格文档、公式、媒体报刊、论文、试卷等）')
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- 添加表格解析权限
INSERT INTO `Permission` (`name`, `description`) 
VALUES ('data_service_table_parse', '数据服务 - 表格解析权限（包括多区域表格、复杂表头解析等）')
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- 添加图片解析权限
INSERT INTO `Permission` (`name`, `description`) 
VALUES ('data_service_image_parse', '数据服务 - 图片解析权限（包括书籍解析、手写识别等）')
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- 添加媒体解析权限
INSERT INTO `Permission` (`name`, `description`) 
VALUES ('data_service_media_parse', '数据服务 - 媒体解析权限（包括音频解析、视频解析等）')
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- 查询新添加的权限
SELECT * FROM `Permission` WHERE `name` LIKE 'data_service_%';

