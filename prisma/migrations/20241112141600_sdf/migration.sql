/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `Board` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Board_companyId_key" ON "Board"("companyId");
