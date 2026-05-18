import { PrismaClient } from '../src/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting migration to Internal/External application types...');

  // Map '浩鲸' -> '内部应用', needsAuth: true
  const updateHj = await prisma.application.updateMany({
    where: { type: '浩鲸' },
    data: { type: '内部应用', needsAuth: true }
  });
  console.log(`Updated ${updateHj.count} records from '浩鲸' to '内部应用' (Auth enabled)`);

  // Map 'dify' -> '内部应用', needsAuth: false
  const updateDify = await prisma.application.updateMany({
    where: { type: 'dify' },
    data: { type: '内部应用', needsAuth: false }
  });
  console.log(`Updated ${updateDify.count} records from 'dify' to '内部应用' (Auth disabled)`);

  // Map '其他' -> '内部应用', needsAuth: false
  const updateOther = await prisma.application.updateMany({
    where: { type: '其他' },
    data: { type: '内部应用', needsAuth: false }
  });
  console.log(`Updated ${updateOther.count} records from '其他' to '内部应用' (Auth disabled)`);

  // Any leftover types that might have been missed
  const leftovers = await prisma.application.findMany({
    where: { 
      NOT: {
        type: { in: ['内部应用', '外部应用'] }
      }
    }
  });
  
  for (const app of leftovers) {
    await prisma.application.update({
      where: { id: app.id },
      data: { type: '内部应用' }
    });
  }
  
  console.log('Migration complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });