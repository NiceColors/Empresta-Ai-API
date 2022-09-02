/*
  Warnings:

  - You are about to drop the column `bookFineId` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the `bookfine` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `author` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `rent` DOUBLE NOT NULL DEFAULT 5,
    MODIFY `synopsis` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `pages` INTEGER NOT NULL DEFAULT 0,
    MODIFY `publisher` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `bannerUrl` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `employee` MODIFY `permissions` VARCHAR(191) NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE `loan` DROP COLUMN `bookFineId`,
    DROP COLUMN `value`,
    ADD COLUMN `loanRate` DOUBLE NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `bookfine`;
