/*
  Warnings:

  - You are about to drop the column `message404` on the `Site` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Site" DROP COLUMN "message404",
ADD COLUMN     "siteData" JSONB;

-- AlterTable
ALTER TABLE "Transcription" ADD COLUMN     "seconds" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT DEFAULT 'This user has not updated their description...';
