/*
  Warnings:

  - You are about to drop the column `rent` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `loanRate` on the `loan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `rent`,
    ADD COLUMN `loanRate` DOUBLE NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE `loan` DROP COLUMN `loanRate`;
