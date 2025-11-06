/**
 * MySQL 到 SQLite 数据迁移脚本
 * 从 MySQL 数据库 yz_portal 迁移数据到 SQLite
 *
 * 使用方法：
 * npx tsx scripts/migrate-mysql-to-sqlite.ts
 */

import mysql from 'mysql2/promise';
import { PrismaClient } from '@/generated/prisma/client';

// MySQL 连接配置
const MYSQL_CONFIG = {
  host: '39.175.132.230',
  port: 33306,
  user: 'remote_user',
  password: 'remote_user', // 如果需要密码，请添加
  database: 'yz_portal',
};

// SQLite Prisma 客户端
const sqlitePrisma = new PrismaClient();

async function migrateData() {
  let mysqlConnection: mysql.Connection | null = null;

  try {
    console.log('🔄 开始数据迁移...\n');

    // 1. 连接 MySQL
    console.log('📡 正在连接 MySQL 数据库...');
    mysqlConnection = await mysql.createConnection(MYSQL_CONFIG);
    console.log('✅ MySQL 连接成功\n');

    // 2. 迁移 Permission 表
    console.log('📦 迁移 Permission 表...');
    const [permissions] = await mysqlConnection.execute(
      'SELECT * FROM Permission'
    );
    const permissionRows = permissions as any[];
    console.log(`   找到 ${permissionRows.length} 条记录`);

    for (const perm of permissionRows) {
      await sqlitePrisma.permission.upsert({
        where: { id: perm.id },
        update: {
          name: perm.name,
          description: perm.description || null,
        },
        create: {
          id: perm.id,
          name: perm.name,
          description: perm.description || null,
        },
      });
    }
    console.log('✅ Permission 迁移完成\n');

    // 3. 迁移 Role 表
    console.log('📦 迁移 Role 表...');
    const [roles] = await mysqlConnection.execute('SELECT * FROM Role');
    const roleRows = roles as any[];
    console.log(`   找到 ${roleRows.length} 条记录`);

    for (const role of roleRows) {
      await sqlitePrisma.role.upsert({
        where: { id: role.id },
        update: {
          name: role.name,
          description: role.description || null,
        },
        create: {
          id: role.id,
          name: role.name,
          description: role.description || null,
        },
      });
    }
    console.log('✅ Role 迁移完成\n');

    // 4. 迁移 RolePermission 关联表
    console.log('📦 迁移 RolePermission 关联表...');
    const [rolePermissions] = await mysqlConnection.execute(
      'SELECT * FROM RolePermission'
    );
    const rolePermissionRows = rolePermissions as any[];
    console.log(`   找到 ${rolePermissionRows.length} 条记录`);

    for (const rp of rolePermissionRows) {
      await sqlitePrisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: rp.roleId,
            permissionId: rp.permissionId,
          },
        },
        update: {
          roleId: rp.roleId,
          permissionId: rp.permissionId,
        },
        create: {
          roleId: rp.roleId,
          permissionId: rp.permissionId,
        },
      });
    }
    console.log('✅ RolePermission 迁移完成\n');

    // 5. 迁移 User 表
    console.log('📦 迁移 User 表...');
    const [users] = await mysqlConnection.execute('SELECT * FROM User');
    const userRows = users as any[];
    console.log(`   找到 ${userRows.length} 条记录`);

    for (const user of userRows) {
      await sqlitePrisma.user.upsert({
        where: { id: user.id },
        update: {
          username: user.username,
          password: user.password,
          isActive: user.isActive !== undefined ? Boolean(user.isActive) : true,
          createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
          updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
        },
        create: {
          id: user.id,
          username: user.username,
          password: user.password,
          isActive: user.isActive !== undefined ? Boolean(user.isActive) : true,
          createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
          updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
        },
      });
    }
    console.log('✅ User 迁移完成\n');

    // 6. 迁移 UserRole 关联表
    console.log('📦 迁移 UserRole 关联表...');
    const [userRoles] = await mysqlConnection.execute('SELECT * FROM UserRole');
    const userRoleRows = userRoles as any[];
    console.log(`   找到 ${userRoleRows.length} 条记录`);

    for (const ur of userRoleRows) {
      await sqlitePrisma.userRole.upsert({
        where: {
          userId_roleId: {
            userId: ur.userId,
            roleId: ur.roleId,
          },
        },
        update: {
          userId: ur.userId,
          roleId: ur.roleId,
        },
        create: {
          userId: ur.userId,
          roleId: ur.roleId,
        },
      });
    }
    console.log('✅ UserRole 迁移完成\n');

    // 7. 迁移 Application 表
    console.log('📦 迁移 Application 表...');
    const [applications] = await mysqlConnection.execute(
      'SELECT * FROM Application'
    );
    const applicationRows = applications as any[];
    console.log(`   找到 ${applicationRows.length} 条记录`);

    for (const app of applicationRows) {
      await sqlitePrisma.application.upsert({
        where: { id: app.id },
        update: {
          type: app.type,
          name: app.name,
          description: app.description || '',
          route: app.route,
          url: app.url || null,
          sceneCategory: app.sceneCategory,
          industryTag: app.industryTag,
          icon: app.icon,
          permissionKey: app.permissionKey || null,
          createdAt: app.createdAt ? new Date(app.createdAt) : new Date(),
          updatedAt: app.updatedAt ? new Date(app.updatedAt) : new Date(),
        },
        create: {
          id: app.id,
          type: app.type,
          name: app.name,
          description: app.description || '',
          route: app.route,
          url: app.url || null,
          sceneCategory: app.sceneCategory,
          industryTag: app.industryTag,
          icon: app.icon,
          permissionKey: app.permissionKey || null,
          createdAt: app.createdAt ? new Date(app.createdAt) : new Date(),
          updatedAt: app.updatedAt ? new Date(app.updatedAt) : new Date(),
        },
      });
    }
    console.log('✅ Application 迁移完成\n');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ 数据迁移完成！');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // 统计信息
    const stats = {
      permission: await sqlitePrisma.permission.count(),
      role: await sqlitePrisma.role.count(),
      rolePermission: await sqlitePrisma.rolePermission.count(),
      user: await sqlitePrisma.user.count(),
      userRole: await sqlitePrisma.userRole.count(),
      application: await sqlitePrisma.application.count(),
    };

    console.log('📊 SQLite 数据库统计:');
    console.log(`   Permission: ${stats.permission}`);
    console.log(`   Role: ${stats.role}`);
    console.log(`   RolePermission: ${stats.rolePermission}`);
    console.log(`   User: ${stats.user}`);
    console.log(`   UserRole: ${stats.userRole}`);
    console.log(`   Application: ${stats.application}\n`);
  } catch (error) {
    console.error('❌ 迁移过程中发生错误:', error);
    throw error;
  } finally {
    // 关闭连接
    if (mysqlConnection) {
      await mysqlConnection.end();
      console.log('🔌 MySQL 连接已关闭');
    }
    await sqlitePrisma.$disconnect();
    console.log('🔌 SQLite 连接已关闭');
  }
}

// 执行迁移
migrateData()
  .then(() => {
    console.log('🎉 脚本执行完成');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 脚本执行失败:', error);
    process.exit(1);
  });
