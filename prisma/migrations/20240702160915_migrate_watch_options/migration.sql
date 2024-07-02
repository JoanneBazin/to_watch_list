/*
  Warnings:

  - You are about to drop the column `addedAt` on the `WatchList` table. All the data in the column will be lost.
  - You are about to drop the column `watched` on the `WatchList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UsersWatchList" ADD COLUMN     "addedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "watched" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WatchList" DROP COLUMN "addedAt",
DROP COLUMN "watched";
