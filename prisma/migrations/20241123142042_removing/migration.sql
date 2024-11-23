/*
  Warnings:

  - You are about to drop the column `crcId` on the `Assistido` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assistido" DROP CONSTRAINT "Assistido_crcId_fkey";

-- AlterTable
ALTER TABLE "Assistido" DROP COLUMN "crcId";
