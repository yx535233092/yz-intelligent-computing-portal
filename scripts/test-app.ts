import { prisma } from '../src/lib/api/prisma';
async function main() {
  try {
    const apps = await prisma.application.findMany();
    console.log('Apps:', apps);
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
