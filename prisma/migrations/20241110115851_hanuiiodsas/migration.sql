/*
  Warnings:

  - You are about to drop the column `chartOfAccountId` on the `AccountReceivable` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccountReceivable" DROP CONSTRAINT "AccountReceivable_chartOfAccountId_fkey";

-- AlterTable
ALTER TABLE "AccountReceivable" DROP COLUMN "chartOfAccountId";

-- AddForeignKey
ALTER TABLE "AccountReceivable" ADD CONSTRAINT "AccountReceivable_chartAccountId_fkey" FOREIGN KEY ("chartAccountId") REFERENCES "ChartOfAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
