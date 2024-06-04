-- DropForeignKey
ALTER TABLE "UserFilms" DROP CONSTRAINT "UserFilms_filmId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeries" DROP CONSTRAINT "UserSeries_serieId_fkey";

-- AddForeignKey
ALTER TABLE "UserFilms" ADD CONSTRAINT "UserFilms_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeries" ADD CONSTRAINT "UserSeries_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;
