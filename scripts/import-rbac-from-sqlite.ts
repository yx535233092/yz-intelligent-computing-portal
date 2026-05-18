import { Database } from 'sqlite3';
import { PrismaClient } from '../src/generated/prisma';

type UserRow = {
  id: number;
  username: string;
  password: string;
  isActive: number | boolean;
  createdAt: string | number;
  updatedAt: string | number;
};

type RoleRow = {
  id: number;
  name: string;
  description: string | null;
};

type PermissionRow = {
  id: number;
  name: string;
  description: string | null;
};

type UserRoleRow = {
  userId: number;
  roleId: number;
};

type RolePermissionRow = {
  roleId: number;
  permissionId: number;
};

const sqliteDb = new Database('prisma/sqlite.db');
const prisma = new PrismaClient();

function all<T>(sql: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    sqliteDb.all(sql, (err, rows: T[]) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function toDate(value: string | number) {
  const num = Number(value);
  return Number.isFinite(num) ? new Date(num) : new Date(value);
}

async function resetSequence(table: string, column = 'id') {
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"${table}"', '${column}'), COALESCE((SELECT MAX("${column}") FROM "${table}"), 1), true);`
  );
}

async function main() {
  console.log('Reading RBAC data from prisma/sqlite.db...');

  const [users, roles, permissions, userRoles, rolePermissions] = await Promise.all([
    all<UserRow>('SELECT * FROM "User" ORDER BY id'),
    all<RoleRow>('SELECT * FROM "Role" ORDER BY id'),
    all<PermissionRow>('SELECT * FROM "Permission" ORDER BY id'),
    all<UserRoleRow>('SELECT * FROM "UserRole" ORDER BY "userId", "roleId"'),
    all<RolePermissionRow>('SELECT * FROM "RolePermission" ORDER BY "roleId", "permissionId"'),
  ]);

  console.log(
    `SQLite counts: users=${users.length}, roles=${roles.length}, permissions=${permissions.length}, userRoles=${userRoles.length}, rolePermissions=${rolePermissions.length}`
  );

  await prisma.$transaction(async (tx) => {
    await tx.userRole.deleteMany({});
    await tx.rolePermission.deleteMany({});
    await tx.user.deleteMany({});
    await tx.permission.deleteMany({});
    await tx.role.deleteMany({});

    for (const row of roles) {
      await tx.role.create({
        data: {
          id: row.id,
          name: row.name,
          description: row.description,
        },
      });
    }

    for (const row of permissions) {
      await tx.permission.create({
        data: {
          id: row.id,
          name: row.name,
          description: row.description,
        },
      });
    }

    for (const row of users) {
      await tx.user.create({
        data: {
          id: row.id,
          username: row.username,
          password: row.password,
          isActive: !!row.isActive,
          createdAt: toDate(row.createdAt),
          updatedAt: toDate(row.updatedAt),
        },
      });
    }

    if (rolePermissions.length > 0) {
      await tx.rolePermission.createMany({ data: rolePermissions });
    }

    if (userRoles.length > 0) {
      await tx.userRole.createMany({ data: userRoles });
    }
  });

  await resetSequence('User');
  await resetSequence('Role');
  await resetSequence('Permission');

  const [pgUsers, pgRoles, pgPermissions, pgUserRoles, pgRolePermissions] = await Promise.all([
    prisma.user.count(),
    prisma.role.count(),
    prisma.permission.count(),
    prisma.userRole.count(),
    prisma.rolePermission.count(),
  ]);

  console.log(
    `Postgres counts: users=${pgUsers}, roles=${pgRoles}, permissions=${pgPermissions}, userRoles=${pgUserRoles}, rolePermissions=${pgRolePermissions}`
  );
}

main()
  .catch((error) => {
    console.error('RBAC import failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    sqliteDb.close();
  });
