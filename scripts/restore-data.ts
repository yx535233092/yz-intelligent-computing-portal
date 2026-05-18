
import { Database } from 'sqlite3';
import { PrismaClient } from '../src/generated/prisma';

// 读取刚刚重命名的备份文件
const sqliteDb = new Database('backup/sqlite_restored.db');
const prisma = new PrismaClient();

async function restore() {
  console.log('开始从 SQLite 恢复数据到 PostgreSQL...');
  
  sqliteDb.all('SELECT * FROM User', async (err, users: any[]) => {
    if (err) {
      console.error('读取 SQLite 失败:', err);
      return;
    }

    for (const user of users) {
      try {
        await prisma.user.create({
          data: {
            username: user.username,
            password: user.password,
            isActive: !!user.isActive,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
          },
        });
        console.log(`用户 ${user.username} 恢复成功`);
      } catch (e) {
        console.error(`恢复用户 ${user.username} 失败:`, e);
      }
    }
    
    console.log('数据恢复完成');
    await prisma.$disconnect();
    sqliteDb.close();
  });
}

restore();
