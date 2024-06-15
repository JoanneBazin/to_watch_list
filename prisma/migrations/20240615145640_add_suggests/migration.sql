-- CreateTable
CREATE TABLE "FilmSuggestion" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "filmId" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "FilmSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SerieSuggestion" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "serieId" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "SerieSuggestion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FilmSuggestion" ADD CONSTRAINT "FilmSuggestion_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Films"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmSuggestion" ADD CONSTRAINT "FilmSuggestion_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FilmSuggestion" ADD CONSTRAINT "FilmSuggestion_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerieSuggestion" ADD CONSTRAINT "SerieSuggestion_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerieSuggestion" ADD CONSTRAINT "SerieSuggestion_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SerieSuggestion" ADD CONSTRAINT "SerieSuggestion_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
