# 数据服务权限控制 - 快速开始

## 快速配置（5分钟）

### 步骤 1: 执行 SQL 脚本 (1分钟)

```bash
# 在项目根目录执行
mysql -u your_username -p your_database < prisma/migrations/add_data_service_permissions.sql
```

或者手动在数据库中执行以下 SQL：

```sql
-- 添加四种数据服务权限
INSERT INTO `Permission` (`name`, `description`) VALUES
('data_service_text_parse', '数据服务 - 文本解析权限'),
('data_service_table_parse', '数据服务 - 表格解析权限'),
('data_service_image_parse', '数据服务 - 图片解析权限'),
('data_service_media_parse', '数据服务 - 媒体解析权限')
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);
```

### 步骤 2: 配置角色权限 (2分钟)

1. 访问 `http://your-domain/manage/role`
2. 选择"管理员"角色，点击"配置权限"
3. 勾选全部4个数据服务权限
4. 点击"保存"

### 步骤 3: 测试验证 (2分钟)

1. 访问 `http://your-domain/portal/service/service-data`
2. 滚动到"智能文档处理"部分
3. 验证：
   - ✅ 管理员用户可以看到所有服务的"立即体验"按钮
   - ✅ 无权限用户看到"🔒 需要权限"标识和"暂无权限"按钮

## 权限说明

| 权限                         | 覆盖服务                                                 |
| ---------------------------- | -------------------------------------------------------- |
| **data_service_text_parse**  | 常规文档、表格文档、公式、媒体报刊、论文、试卷 (6个服务) |
| **data_service_table_parse** | 多区域表格、复杂表头 (2个服务)                           |
| **data_service_image_parse** | 书籍解析、手写识别 (2个服务)                             |
| **data_service_media_parse** | 音频解析、视频解析 (2个服务)                             |

## 完成 ✅

权限控制已生效！用户现在需要对应权限才能访问数据解析服务。

详细文档请参考：[数据服务权限控制说明文档](./DATA_SERVICE_PERMISSIONS_GUIDE.md)
