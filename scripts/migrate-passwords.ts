/**
 * 密码迁移脚本
 * 将现有用户的明文密码转换为 bcrypt 加密密码
 *
 * 使用方法：
 * npx tsx scripts/migrate-passwords.ts
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function migratePasswords() {
  try {
    console.log('🔄 开始迁移用户密码...\n');

    // 获取所有用户
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    if (users.length === 0) {
      console.log('✅ 数据库中没有用户，无需迁移');
      return;
    }

    console.log(`📊 找到 ${users.length} 个用户需要处理\n`);

    let migratedCount = 0;
    let skippedCount = 0;

    for (const user of users) {
      // 检查密码是否已经是 bcrypt 格式
      // bcrypt 加密后的密码以 $2a$, $2b$, 或 $2y$ 开头
      const isBcryptHash = /^\$2[aby]\$/.test(user.password);

      if (isBcryptHash) {
        console.log(`⏭️  跳过用户: ${user.username} (密码已加密)`);
        skippedCount++;
        continue;
      }

      try {
        // 加密密码
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // 更新数据库
        await prisma.user.update({
          where: { id: user.id },
          data: { password: hashedPassword },
        });

        console.log(`✅ 已迁移用户: ${user.username}`);
        migratedCount++;
      } catch (error) {
        console.error(`❌ 迁移用户 ${user.username} 失败:`, error);
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📈 迁移统计:');
    console.log(`   总用户数: ${users.length}`);
    console.log(`   成功迁移: ${migratedCount}`);
    console.log(`   跳过数量: ${skippedCount}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (migratedCount > 0) {
      console.log('✅ 密码迁移完成！');
      console.log('⚠️  请确保所有用户知道他们的密码没有改变');
      console.log('⚠️  只是存储格式从明文改为了加密格式\n');
    } else {
      console.log('✅ 所有密码已经是加密格式，无需迁移\n');
    }
  } catch (error) {
    console.error('❌ 迁移过程中发生错误:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 执行迁移
migratePasswords()
  .then(() => {
    console.log('🎉 脚本执行完成');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 脚本执行失败:', error);
    process.exit(1);
  });
