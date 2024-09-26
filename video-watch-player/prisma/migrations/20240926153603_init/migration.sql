/*
  Warnings:

  - You are about to drop the column `videocollectionId` on the `Video` table. All the data in the column will be lost.
  - Added the required column `videoCollectionId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "videoCollectionId" INTEGER NOT NULL,
    CONSTRAINT "Video_videoCollectionId_fkey" FOREIGN KEY ("videoCollectionId") REFERENCES "VideoCollection" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("createdAt", "description", "id", "likes", "title", "updatedAt", "url", "views") SELECT "createdAt", "description", "id", "likes", "title", "updatedAt", "url", "views" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
