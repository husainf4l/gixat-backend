/*
  Warnings:

  - You are about to drop the column `clientId` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChartOfAccountToInventoryItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientAccountId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Made the column `accountId` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `supplierAccountId` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_addressId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_accountId_fkey";

-- DropForeignKey
ALTER TABLE "_ChartOfAccountToInventoryItem" DROP CONSTRAINT "_ChartOfAccountToInventoryItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_ChartOfAccountToInventoryItem" DROP CONSTRAINT "_ChartOfAccountToInventoryItem_B_fkey";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "clientId",
ADD COLUMN     "clientAccountId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "accountId" SET NOT NULL;

-- AlterTable
ALTER TABLE "InventoryItem" DROP COLUMN "supplierId",
ADD COLUMN     "supplierAccountId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Supplier";

-- DropTable
DROP TABLE "_ChartOfAccountToInventoryItem";

-- CreateTable
CREATE TABLE "_ClientAccount" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SupplierAccount" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClientAccount_AB_unique" ON "_ClientAccount"("A", "B");

-- CreateIndex
CREATE INDEX "_ClientAccount_B_index" ON "_ClientAccount"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SupplierAccount_AB_unique" ON "_SupplierAccount"("A", "B");

-- CreateIndex
CREATE INDEX "_SupplierAccount_B_index" ON "_SupplierAccount"("B");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_clientAccountId_fkey" FOREIGN KEY ("clientAccountId") REFERENCES "ChartOfAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "ChartOfAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_supplierAccountId_fkey" FOREIGN KEY ("supplierAccountId") REFERENCES "ChartOfAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientAccount" ADD CONSTRAINT "_ClientAccount_A_fkey" FOREIGN KEY ("A") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClientAccount" ADD CONSTRAINT "_ClientAccount_B_fkey" FOREIGN KEY ("B") REFERENCES "ChartOfAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupplierAccount" ADD CONSTRAINT "_SupplierAccount_A_fkey" FOREIGN KEY ("A") REFERENCES "ChartOfAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SupplierAccount" ADD CONSTRAINT "_SupplierAccount_B_fkey" FOREIGN KEY ("B") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
