/*
  Warnings:

  - You are about to drop the column `uid` on the `Board` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "uid",
ADD COLUMN     "userId" TEXT NOT NULL;
