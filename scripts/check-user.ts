import { PrismaClient } from '../src/generated/prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: {
      roles: {
        include: {
          role: true
        }
      }
    }
  });
  console.log('Current users:', JSON.stringify(users, null, 2));

  if (users.length === 0) {
    console.log('No users found. Creating default admin...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Ensure admin role exists
    let adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
    if (!adminRole) {
      adminRole = await prisma.role.create({
        data: {
          name: 'admin',
          description: 'Administrator'
        }
      });
    }

    const admin = await prisma.user.create({
      data: {
        username: 'admin',
        password: hashedPassword,
        roles: {
          create: {
            roleId: adminRole.id
          }
        }
      }
    });
    console.log('Admin created:', admin.username);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
