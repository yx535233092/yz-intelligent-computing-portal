
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // 创建基础角色
  await prisma.role.upsert({
    where: { id: 1 },
    update: { name: 'User' },
    create: { id: 1, name: 'User', description: '普通用户' },
  });

  await prisma.role.upsert({
    where: { id: 3 },
    update: { name: 'Admin' },
    create: { id: 3, name: 'Admin', description: '管理员' },
  });

  console.log('角色数据初始化完成');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
