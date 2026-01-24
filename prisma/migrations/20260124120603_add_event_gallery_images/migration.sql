/*
  Warnings:

  - You are about to drop the column `galleryImageUrls` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "galleryImageUrls",
ADD COLUMN     "galleryPublicIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "galleryUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "imagePublicId" TEXT;
