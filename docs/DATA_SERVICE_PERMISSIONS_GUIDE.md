# 数据服务权限控制说明文档

## 概述

本文档说明如何为数据服务的文本解析、表格解析、图片解析、媒体解析功能配置权限控制。

## 权限列表

已为数据服务添加以下四种权限：

| 权限标识                   | 权限名称     | 描述                                                           |
| -------------------------- | ------------ | -------------------------------------------------------------- |
| `data_service_text_parse`  | 文本解析权限 | 包括常规文档、表格文档、公式、媒体报刊、论文、试卷等文本类解析 |
| `data_service_table_parse` | 表格解析权限 | 包括多区域表格、复杂表头解析等表格类解析                       |
| `data_service_image_parse` | 图片解析权限 | 包括书籍解析、手写识别等图片类解析                             |
| `data_service_media_parse` | 媒体解析权限 | 包括音频解析、视频解析等媒体类解析                             |

## 安装步骤

### 1. 添加权限到数据库

在数据库中执行以下 SQL 语句，添加数据服务权限：

```bash
# 方式一：使用 MySQL 客户端执行 SQL 文件
mysql -u your_username -p your_database < prisma/migrations/add_data_service_permissions.sql

# 方式二：直接在 MySQL 命令行中执行
mysql -u your_username -p
use your_database;
source prisma/migrations/add_data_service_permissions.sql;
```

或者直接在数据库管理工具中执行 `prisma/migrations/add_data_service_permissions.sql` 文件中的 SQL 语句。

### 2. 为角色分配权限

在系统管理后台的**角色管理**页面中，为相应的角色分配这些权限：

1. 访问 `/manage/role` 页面
2. 选择需要配置的角色（如"管理员"、"普通用户"等）
3. 点击"配置权限"按钮
4. 勾选需要的数据服务权限
5. 点击"保存"按钮

## 权限效果

### 有权限的用户

- 可以看到完整的服务卡片
- 可以点击"立即体验"按钮访问服务
- 卡片正常显示，透明度为 100%

### 无权限的用户

- 卡片右上角显示"🔒 需要权限"标识
- 卡片透明度降低为 60%
- 按钮显示为"暂无权限"，点击会提示"您没有访问此服务的权限，请联系管理员开通"
- 无法访问具体的解析服务

## 权限管理建议

### 推荐配置方案

#### 方案一：全权限配置（推荐给管理员）

为管理员角色分配所有四种数据服务权限：

- ✅ data_service_text_parse
- ✅ data_service_table_parse
- ✅ data_service_image_parse
- ✅ data_service_media_parse

#### 方案二：基础配置（推荐给普通用户）

为普通用户分配基础的文本和表格解析权限：

- ✅ data_service_text_parse
- ✅ data_service_table_parse
- ❌ data_service_image_parse
- ❌ data_service_media_parse

#### 方案三：高级配置（推荐给高级用户）

为高级用户分配除媒体解析外的所有权限：

- ✅ data_service_text_parse
- ✅ data_service_table_parse
- ✅ data_service_image_parse
- ❌ data_service_media_parse

## 技术实现说明

### 前端权限检查流程

1. 用户访问数据服务页面时，系统自动调用 `getUserPermissionsAPI()` 获取当前用户的权限列表
2. 根据权限列表和服务的 `permissionKey` 进行权限匹配
3. 对于无权限的服务：
   - 显示权限标识
   - 禁用访问按钮
   - 降低卡片透明度
4. 对于有权限的服务：
   - 正常显示和访问

### 涉及的文件

- `src/app/portal/service/service-data/data-process/data-service-common/productData.tsx` - 服务数据配置，包含 permissionKey
- `src/app/portal/service/service-data/data-process/data-service-common/IntelligentProcessSection.tsx` - 权限检查逻辑
- `prisma/migrations/add_data_service_permissions.sql` - 权限数据 SQL 脚本

## 故障排查

### 问题：用户看不到任何服务

**原因**：用户没有分配任何数据服务权限

**解决方案**：

1. 登录管理后台
2. 进入角色管理页面
3. 为用户所属角色分配相应的数据服务权限

### 问题：权限已分配但仍然显示无权限

**原因**：可能是缓存问题或权限未正确同步

**解决方案**：

1. 清除浏览器缓存
2. 重新登录系统
3. 检查数据库中 `RolePermission` 表是否正确关联
4. 检查浏览器控制台是否有错误信息

### 问题：所有用户都能访问所有服务

**原因**：权限数据未正确添加到数据库

**解决方案**：

1. 检查 `Permission` 表中是否存在对应的权限记录
2. 重新执行 SQL 脚本添加权限
3. 检查 `permissionKey` 拼写是否一致

## 联系支持

如有问题，请联系系统管理员或开发团队。
