/*
  Warnings:

  - A unique constraint covering the columns `[permissionKey]` on the table `Application` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Application` ADD COLUMN `permissionKey` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Application_permissionKey_key` ON `Application`(`permissionKey`);
