-- DropForeignKey
ALTER TABLE "UsersWatchList" DROP CONSTRAINT "UsersWatchList_userId_fkey";

-- AddForeignKey
ALTER TABLE "UsersWatchList" ADD CONSTRAINT "UsersWatchList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
