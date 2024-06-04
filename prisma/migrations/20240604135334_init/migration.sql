-- AlterTable
ALTER TABLE "User" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "UserFilms" (
    "userId" INTEGER NOT NULL,
    "filmId" INTEGER NOT NULL,

    CONSTRAINT "UserFilms_pkey" PRIMARY KEY ("userId","filmId")
);

-- CreateTable
CREATE TABLE "UserSeries" (
    "userId" INTEGER NOT NULL,
    "serieId" INTEGER NOT NULL,

    CONSTRAINT "UserSeries_pkey" PRIMARY KEY ("userId","serieId")
);

-- CreateTable
CREATE TABLE "_UserFilms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserSeries" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFilms_AB_unique" ON "_UserFilms"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFilms_B_index" ON "_UserFilms"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserSeries_AB_unique" ON "_UserSeries"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSeries_B_index" ON "_UserSeries"("B");

-- AddForeignKey
ALTER TABLE "UserFilms" ADD CONSTRAINT "UserFilms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFilms" ADD CONSTRAINT "UserFilms_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Films"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeries" ADD CONSTRAINT "UserSeries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeries" ADD CONSTRAINT "UserSeries_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFilms" ADD CONSTRAINT "_UserFilms_A_fkey" FOREIGN KEY ("A") REFERENCES "Films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFilms" ADD CONSTRAINT "_UserFilms_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSeries" ADD CONSTRAINT "_UserSeries_A_fkey" FOREIGN KEY ("A") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSeries" ADD CONSTRAINT "_UserSeries_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
