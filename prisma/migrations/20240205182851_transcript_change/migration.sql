/*
  Warnings:

  - The primary key for the `Transcription` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Transcription" DROP CONSTRAINT "Transcription_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transcription_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transcription_id_seq";
