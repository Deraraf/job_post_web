/*
  Warnings:

  - You are about to drop the column `campany` on the `Job` table. All the data in the column will be lost.
  - Added the required column `company` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "campany",
ADD COLUMN     "company" TEXT NOT NULL;
