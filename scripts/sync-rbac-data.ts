import { PrismaClient } from '../src/generated/prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// 简单的 CSV 解析器，处理引号
function parseCSV(content: string) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  return lines.slice(1).map(line => {
    // 处理带引号的逗号
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') inQuotes = !inQuotes;
      else if (line[i] === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += line[i];
      }
    }
    values.push(current.trim());
    
    const obj: any = {};
    headers.forEach((h, i) => {
      let val = values[i];
      if (val === 'true') val = true as any;
      else if (val === 'false') val = false as any;
      else if (!isNaN(Number(val)) && val !== '') val = Number(val) as any;
      obj[h] = val;
    });
    return obj;
  });
}

async function main() {
  const backupDir = path.join(process.cwd(), 'remote-pgsql-backup');
  
  console.log('--- 开始同步 RBAC 数据 ---');

  // 1. 导入权限
  console.log('正在导入权限...');
  const permissionsData = parseCSV(fs.readFileSync(path.join(backupDir, 'permissions_202605141500.csv'), 'utf-8'));
  for (const p of permissionsData) {
    await prisma.permission.upsert({
      where: { id: p.id },
      update: { name: p.name, description: p.description },
      create: { id: p.id, name: p.name, description: p.description },
    });
  }

  // 2. 导入角色
  console.log('正在导入角色...');
  const rolesData = parseCSV(fs.readFileSync(path.join(backupDir, 'roles_202605141500.csv'), 'utf-8'));
  for (const r of rolesData) {
    await prisma.role.upsert({
      where: { id: r.id },
      update: { name: r.name, description: r.description },
      create: { id: r.id, name: r.name, description: r.description },
    });
  }

  // 3. 导入角色权限关联
  console.log('正在导入角色权限关联...');
  const rpData = parseCSV(fs.readFileSync(path.join(backupDir, 'role_permissions_202605141500.csv'), 'utf-8'));
  // 先清理旧的关联以保证一致性
  await prisma.rolePermission.deleteMany({});
  for (const rp of rpData) {
    await prisma.rolePermission.create({
      data: {
        roleId: rp.role_id,
        permissionId: rp.permission_id
      }
    });
  }

  // 4. 导入用户并加密密码
  console.log('正在导入用户并进行 Bcrypt 加密...');
  const usersData = parseCSV(fs.readFileSync(path.join(backupDir, 'users_202605141500.csv'), 'utf-8'));
  for (const u of usersData) {
    const hashedPassword = await bcrypt.hash(u.password.toString(), 10);
    
    const user = await prisma.user.upsert({
      where: { id: u.id },
      update: { 
        username: u.username, 
        password: hashedPassword, 
        isActive: u.is_active === true || u.is_active === 'true' 
      },
      create: { 
        id: u.id, 
        username: u.username, 
        password: hashedPassword, 
        isActive: u.is_active === true || u.is_active === 'true' 
      },
    });

    // 处理用户角色关联
    // 先清理该用户旧的角色关联
    await prisma.userRole.deleteMany({ where: { userId: user.id } });
    if (u.role_id) {
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: u.role_id
        }
      });
    }
  }

  console.log('--- RBAC 数据同步完成 ---');
}

main()
  .catch(e => {
    console.error('同步失败:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
