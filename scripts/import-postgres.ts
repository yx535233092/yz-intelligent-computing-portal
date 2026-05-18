import { PrismaClient } from '../src/generated/prisma';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Connecting to PostgreSQL...');
  
  const dumpPath = path.join(__dirname, '../data-dump.json');
  const data = JSON.parse(fs.readFileSync(dumpPath, 'utf-8'));
  
  if (!data.applications || data.applications.length === 0) {
    console.log('No applications to import.');
    return;
  }

  console.log(`Importing ${data.applications.length} applications...`);

  for (const app of data.applications) {
    // 移除 ID 以允许自增（或者保留 ID 如果需要保持一致性）
    // 通常保留 ID 比较好，防止引用断裂
    // 但 PG 的自增序列可能需要手动调整
    const { id, ...appData } = app;
    
    // 使用 upsert 防止重复
    await prisma.application.upsert({
      where: { id: app.id },
      update: {
        ...appData,
        // 处理日期格式 (JSON 中是字符串)
        createdAt: new Date(app.createdAt),
        updatedAt: new Date(app.updatedAt),
      },
      create: {
        id: app.id, // 强制使用原 ID
        ...appData,
        createdAt: new Date(app.createdAt),
        updatedAt: new Date(app.updatedAt),
      },
    });
  }

  console.log('✅ Applications imported successfully.');
  
  // 如果 ID 是强制指定的，可能需要重置 Sequence
  try {
     // 仅适用于 Postgres
     // 找到当前最大 ID
     const maxId = data.applications.reduce((max: number, p: any) => p.id > max ? p.id : max, 0);
     await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"Application"', 'id'), ${maxId + 1});`);
     console.log('✅ Sequence reset.');
  } catch (e) {
     console.warn('⚠️ Could not reset sequence (might be expected if table name casing differs):', e);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
