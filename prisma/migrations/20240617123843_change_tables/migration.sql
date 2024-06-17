/*
  Warnings:

  - You are about to drop the `FilmSuggestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Films` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SerieSuggestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Series` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFilms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSeries` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('FILM', 'SERIE');

-- DropForeignKey
ALTER TABLE "FilmSuggestion" DROP CONSTRAINT "FilmSuggestion_filmId_fkey";

-- DropForeignKey
ALTER TABLE "FilmSuggestion" DROP CONSTRAINT "FilmSuggestion_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "FilmSuggestion" DROP CONSTRAINT "FilmSuggestion_senderId_fkey";

-- DropForeignKey
ALTER TABLE "Films" DROP CONSTRAINT "Films_categoryName_fkey";

-- DropForeignKey
ALTER TABLE "SerieSuggestion" DROP CONSTRAINT "SerieSuggestion_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "SerieSuggestion" DROP CONSTRAINT "SerieSuggestion_senderId_fkey";

-- DropForeignKey
ALTER TABLE "SerieSuggestion" DROP CONSTRAINT "SerieSuggestion_serieId_fkey";

-- DropForeignKey
ALTER TABLE "Series" DROP CONSTRAINT "Series_categoryName_fkey";

-- DropForeignKey
ALTER TABLE "UserFilms" DROP CONSTRAINT "UserFilms_filmId_fkey";

-- DropForeignKey
ALTER TABLE "UserFilms" DROP CONSTRAINT "UserFilms_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeries" DROP CONSTRAINT "UserSeries_serieId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeries" DROP CONSTRAINT "UserSeries_userId_fkey";

-- DropTable
DROP TABLE "FilmSuggestion";

-- DropTable
DROP TABLE "Films";

-- DropTable
DROP TABLE "SerieSuggestion";

-- DropTable
DROP TABLE "Series";

-- DropTable
DROP TABLE "UserFilms";

-- DropTable
DROP TABLE "UserSeries";

-- CreateTable
CREATE TABLE "WatchList" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "synopsis" TEXT,
    "year" INTEGER,
    "real" TEXT,
    "platform" TEXT,
    "categoryName" TEXT NOT NULL,
    "addedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "watched" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WatchList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suggestion" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "senderComment" TEXT,
    "receiverComment" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersWatchList" (
    "userId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "UsersWatchList_pkey" PRIMARY KEY ("userId","mediaId")
);

-- AddForeignKey
ALTER TABLE "WatchList" ADD CONSTRAINT "WatchList_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "WatchList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersWatchList" ADD CONSTRAINT "UsersWatchList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersWatchList" ADD CONSTRAINT "UsersWatchList_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "WatchList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
