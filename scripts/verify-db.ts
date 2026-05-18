import { PrismaClient } from '../src/generated/prisma';
const prisma = new PrismaClient();
async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log('读取到用户数:', users.length);
    console.log('用户列表:', users);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
