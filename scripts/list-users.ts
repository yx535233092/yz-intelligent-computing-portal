
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('当前数据库中的用户列表:');
  console.log(users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
