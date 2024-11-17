/*
  Warnings:

  - Added the required column `clientId` to the `JobCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobCard" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "JobCard" ADD CONSTRAINT "JobCard_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "AccountReceivable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
