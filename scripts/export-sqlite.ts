import { PrismaClient } from '../src/generated/prisma';
import fs from 'fs';
import path from 'path';

// 指定备份文件的路径
const BACKUP_DB_PATH = path.join(__dirname, '../data/legacy/backup.sqlite.db');
process.env.DATABASE_URL = `file:${BACKUP_DB_PATH}`;

const prisma = new PrismaClient();

async function main() {
  console.log(`Connecting to SQLite at ${process.env.DATABASE_URL}...`);
  
  const data: any = {};
  
  // 导出主要业务数据
  // 注意：不再导出 User/Role/Permission，因为这些现在由认证系统管理
  // 但为了保留历史关联，我们可能需要先导出来看看，或者只导出 Application
  
  console.log('Exporting Applications...');
  data.applications = await prisma.application.findMany();
  
  // 如果还有其他业务表，请在这里添加
  // data.tasks = await prisma.task.findMany(); 

  const outputPath = path.join(__dirname, '../data-dump.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`✅ Data exported to ${outputPath}`);
  console.log(`Total Applications: ${data.applications.length}`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
