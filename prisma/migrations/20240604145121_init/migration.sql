/*
  Warnings:

  - You are about to drop the `_UserFilms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserSeries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserFilms" DROP CONSTRAINT "_UserFilms_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFilms" DROP CONSTRAINT "_UserFilms_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserSeries" DROP CONSTRAINT "_UserSeries_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserSeries" DROP CONSTRAINT "_UserSeries_B_fkey";

-- DropTable
DROP TABLE "_UserFilms";

-- DropTable
DROP TABLE "_UserSeries";
