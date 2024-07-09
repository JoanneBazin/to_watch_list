-- AddForeignKey
ALTER TABLE "Suggestion" ADD CONSTRAINT "Suggestion_receiverId_mediaId_fkey" FOREIGN KEY ("receiverId", "mediaId") REFERENCES "UsersWatchList"("userId", "mediaId") ON DELETE CASCADE ON UPDATE CASCADE;
