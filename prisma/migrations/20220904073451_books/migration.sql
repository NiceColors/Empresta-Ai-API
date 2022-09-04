/*
  Warnings:

  - You are about to alter the column `publisher` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `isbn` on the `Book` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `Book` MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `author` VARCHAR(200) NOT NULL DEFAULT '',
    MODIFY `synopsis` TEXT NOT NULL DEFAULT '',
    MODIFY `publisher` VARCHAR(100) NOT NULL DEFAULT '',
    MODIFY `isbn` VARCHAR(100) NOT NULL DEFAULT '',
    MODIFY `bannerUrl` TEXT NOT NULL DEFAULT '';
