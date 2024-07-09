/*
  Warnings:

  - A unique constraint covering the columns `[userId,mediaId]` on the table `UsersWatchList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UsersWatchList_userId_mediaId_key" ON "UsersWatchList"("userId", "mediaId");
