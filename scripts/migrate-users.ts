
import { Database } from 'sqlite3';
import { PrismaClient } from '../src/generated/prisma';

const backupDb = new Database('data/legacy/backup.sqlite.db');
const prisma = new PrismaClient();

async function migrate() {
  console.log('开始迁移用户数据...');
  
  backupDb.all('SELECT * FROM User', async (err, users: any[]) => {
    if (err) {
      console.error('读取备份数据失败:', err);
      return;
    }

    for (const user of users) {
      try {
        await prisma.user.upsert({
          where: { username: user.username },
          update: {
            password: user.password,
            isActive: !!user.isActive,
            updatedAt: new Date(user.updatedAt),
          },
          create: {
            username: user.username,
            password: user.password,
            isActive: !!user.isActive,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
          },
        });
        console.log(`用户 ${user.username} 迁移成功`);
      } catch (e) {
        console.error(`迁移用户 ${user.username} 失败:`, e);
      }
    }
    
    console.log('用户数据迁移完成');
    await prisma.$disconnect();
    backupDb.close();
  });
}

migrate();
