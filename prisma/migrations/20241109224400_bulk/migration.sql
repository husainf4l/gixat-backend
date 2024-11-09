/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `AccountReceivable` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `AccountReceivable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `AccountReceivable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccountReceivable" DROP CONSTRAINT "AccountReceivable_chartAccountId_fkey";

-- AlterTable
ALTER TABLE "AccountReceivable" ADD COLUMN     "addressId" TEXT NOT NULL,
ADD COLUMN     "chartOfAccountId" TEXT,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "taxId" TEXT;

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountReceivable_phoneNumber_key" ON "AccountReceivable"("phoneNumber");

-- AddForeignKey
ALTER TABLE "AccountReceivable" ADD CONSTRAINT "AccountReceivable_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountReceivable" ADD CONSTRAINT "AccountReceivable_chartOfAccountId_fkey" FOREIGN KEY ("chartOfAccountId") REFERENCES "ChartOfAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
