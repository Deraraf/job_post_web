/*
  Warnings:

  - You are about to drop the column `postedAt` on the `Application` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "postedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
