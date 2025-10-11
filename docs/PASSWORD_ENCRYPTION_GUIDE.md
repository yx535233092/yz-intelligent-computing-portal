# 密码加密实现指南

## 📋 概述

本项目已实现用户密码的加密存储，使用 **bcrypt** 算法对所有用户密码进行加密处理，确保密码安全。

## 🔐 技术实现

### 使用的加密算法

- **bcrypt** (通过 bcryptjs 库)
- **加密强度**: 10 rounds (salt rounds)
- **密码长度**: 加密后固定为 60 个字符

### 实现的功能

#### 1. 用户注册/创建

- 新用户密码自动使用 bcrypt 加密
- 密码验证（长度、格式等）
- 加密后存储到数据库

#### 2. 用户登录

- 使用 `bcrypt.compare()` 验证密码
- 不在数据库中存储明文密码
- 登录失败统一返回"用户名或密码错误"

#### 3. 密码修改

- 更新密码时自动加密
- 支持留空不修改密码

#### 4. 安全特性

- 所有 API 返回时移除密码字段
- 禁用账号登录检查
- 密码验证失败不泄露具体原因

## 📁 相关文件

### API 路由

- `src/app/api/auth/users/route.ts` - 用户 CRUD API
- `src/app/api/auth/login/route.ts` - 登录验证 API

### 迁移脚本

- `scripts/migrate-passwords.ts` - 密码迁移脚本
- `prisma/migrations/update_passwords_to_bcrypt.sql` - 迁移说明

## 🚀 使用指南

### 新项目部署

如果是全新的项目，无需任何额外操作。所有新创建的用户密码都会自动加密。

### 已有用户数据迁移

如果数据库中已经存在使用明文密码的用户，需要运行密码迁移脚本：

#### 步骤 1：备份数据库

```bash
# 导出数据库备份（根据实际数据库类型调整命令）
mysqldump -u username -p database_name > backup_before_migration.sql
```

#### 步骤 2：运行迁移脚本

```bash
npm run migrate:passwords
```

或者直接运行：

```bash
npx tsx scripts/migrate-passwords.ts
```

#### 步骤 3：验证迁移结果

脚本会输出详细的迁移报告：

- 总用户数
- 成功迁移数量
- 跳过数量（已加密的密码）

### 迁移脚本特性

✅ **安全检测**: 自动识别已加密的密码，避免重复加密  
✅ **详细日志**: 显示每个用户的迁移状态  
✅ **错误处理**: 单个用户失败不影响其他用户  
✅ **幂等性**: 可以安全地多次运行

## 🔍 验证加密是否生效

### 1. 检查数据库中的密码格式

加密后的密码应该类似这样：

```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

特征：

- 以 `$2a$`, `$2b$`, 或 `$2y$` 开头
- 长度为 60 个字符
- 包含随机盐值和加密哈希

### 2. 测试登录功能

1. 创建一个测试用户
2. 使用正确的密码登录 - 应该成功
3. 使用错误的密码登录 - 应该失败
4. 检查数据库中该用户的密码是否是加密格式

### 3. 检查 API 响应

确保所有 API 响应中都不包含 `password` 字段：

```bash
# 测试获取用户列表
curl -X GET http://localhost:3000/api/auth/users

# 响应中不应包含 password 字段
```

## ⚠️ 注意事项

### 密码不可逆

bcrypt 是单向加密算法，**密码一旦加密就无法解密**。如果用户忘记密码，只能重置，不能找回原密码。

### 迁移前确认

- ✅ 备份数据库
- ✅ 在测试环境先测试
- ✅ 确保所有用户知道他们的当前密码
- ✅ 迁移过程中密码本身不会改变，只是存储格式改变

### 性能考虑

bcrypt 加密是 CPU 密集型操作：

- 注册/修改密码时会有轻微延迟（通常 < 100ms）
- 登录验证时会有轻微延迟（通常 < 100ms）
- 这是正常的，也是必要的安全措施

## 🛠️ 开发者参考

### 创建用户时加密密码

```typescript
import bcrypt from 'bcryptjs';

// 加密密码
const hashedPassword = await bcrypt.hash(password, 10);

// 存储到数据库
await prisma.user.create({
  data: {
    username,
    password: hashedPassword,
  },
});
```

### 验证密码

```typescript
import bcrypt from 'bcryptjs';

// 从数据库获取用户
const user = await prisma.user.findUnique({
  where: { username },
});

// 验证密码
const isValid = await bcrypt.compare(inputPassword, user.password);
```

### 更新密码

```typescript
import bcrypt from 'bcryptjs';

// 只在提供新密码时才更新
if (newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });
}
```

## 🔒 安全最佳实践

### 已实现的安全措施

✅ 使用 bcrypt 加密密码  
✅ API 响应不返回密码  
✅ 密码验证失败不泄露具体原因  
✅ 支持账号禁用功能  
✅ 密码长度验证（最少 6 位）

### 建议的额外安全措施

🔲 实现密码复杂度要求  
🔲 添加登录失败次数限制  
🔲 实现两步验证（2FA）  
🔲 添加密码过期策略  
🔲 实现会话管理和自动登出  
🔲 使用 HTTPS 传输  
🔲 定期更新依赖包

## 📞 常见问题

### Q: 用户忘记密码怎么办？

A: 需要实现密码重置功能（发送重置链接到邮箱等）。bcrypt 加密的密码无法解密找回。

### Q: 迁移脚本可以多次运行吗？

A: 可以。脚本会自动检测已加密的密码并跳过，不会重复加密。

### Q: 如何修改加密强度？

A: 修改 `bcrypt.hash(password, 10)` 中的第二个参数。建议值为 10-12。数字越大越安全但越慢。

### Q: 为什么不使用 MD5 或 SHA256？

A: MD5/SHA256 太快，容易被暴力破解。bcrypt 专为密码设计，包含盐值和慢速计算。

### Q: 已有用户的密码会失效吗？

A: 不会。迁移脚本会将明文密码加密，但密码本身不变。用户使用原密码仍可登录。

## 📚 相关资源

- [bcrypt 官方文档](https://www.npmjs.com/package/bcryptjs)
- [OWASP 密码存储指南](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [bcrypt 工作原理](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/)

---

**最后更新**: 2025-10-11  
**维护者**: 开发团队
