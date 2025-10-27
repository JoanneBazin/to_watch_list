/*
  Warnings:

  - You are about to drop the column `categoryName` on the `WatchList` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WatchList" DROP CONSTRAINT "WatchList_categoryName_fkey";

-- AlterTable
ALTER TABLE "WatchList" DROP COLUMN "categoryName";
