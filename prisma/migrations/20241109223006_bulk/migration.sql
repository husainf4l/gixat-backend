/*
  Warnings:

  - The values [ASSET,LIABILITY] on the enum `AccountType` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `ChartOfAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accountCode` on the `ChartOfAccount` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `ChartOfAccount` table. All the data in the column will be lost.
  - You are about to drop the column `contactInfoId` on the `ChartOfAccount` table. All the data in the column will be lost.
  - You are about to drop the column `journalEntryId` on the `JobCard` table. All the data in the column will be lost.
  - The primary key for the `JournalEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `JournalEntry` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContactInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventoryItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JournalLineItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `ChartOfAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountNumber]` on the table `ChartOfAccount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classification` to the `ChartOfAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ChartOfAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionDate` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountClassification" AS ENUM ('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE');

-- CreateEnum
CREATE TYPE "PurchaseOrderStatus" AS ENUM ('ORDERED', 'RECEIVED', 'PENDING_PAYMENT');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE');

-- AlterEnum
BEGIN;
CREATE TYPE "AccountType_new" AS ENUM ('CURRENT_ASSET', 'FIXED_ASSET', 'CURRENT_LIABILITY', 'LONG_TERM_LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE', 'COST_OF_GOODS_SOLD', 'OTHER_INCOME', 'OTHER_EXPENSE');
ALTER TABLE "ChartOfAccount" ALTER COLUMN "accountType" TYPE "AccountType_new" USING ("accountType"::text::"AccountType_new");
ALTER TYPE "AccountType" RENAME TO "AccountType_old";
ALTER TYPE "AccountType_new" RENAME TO "AccountType";
DROP TYPE "AccountType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_clientAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "ChartOfAccount" DROP CONSTRAINT "ChartOfAccount_addressId_fkey";

-- DropForeignKey
ALTER TABLE "ChartOfAccount" DROP CONSTRAINT "ChartOfAccount_contactInfoId_fkey";

-- DropForeignKey
ALTER TABLE "ChartOfAccount" DROP CONSTRAINT "ChartOfAccount_parentAccountId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_supplierAccountId_fkey";

-- DropForeignKey
ALTER TABLE "JobCard" DROP CONSTRAINT "JobCard_journalEntryId_fkey";

-- DropForeignKey
ALTER TABLE "JournalLineItem" DROP CONSTRAINT "JournalLineItem_accountId_fkey";

-- DropForeignKey
ALTER TABLE "JournalLineItem" DROP CONSTRAINT "JournalLineItem_entryId_fkey";

-- DropIndex
DROP INDEX "ChartOfAccount_accountCode_key";

-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "clientAccountId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ChartOfAccount" DROP CONSTRAINT "ChartOfAccount_pkey",
DROP COLUMN "accountCode",
DROP COLUMN "addressId",
DROP COLUMN "contactInfoId",
ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "classification" "AccountClassification" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "parentAccountId" SET DATA TYPE VARCHAR(36),
ADD CONSTRAINT "ChartOfAccount_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ChartOfAccount_id_seq";

-- AlterTable
ALTER TABLE "JobCard" DROP COLUMN "journalEntryId";

-- AlterTable
ALTER TABLE "JournalEntry" DROP CONSTRAINT "JournalEntry_pkey",
DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transactionDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "JournalEntry_id_seq";

-- DropTable
DROP TABLE "Address";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "ContactInfo";

-- DropTable
DROP TABLE "InventoryItem";

-- DropTable
DROP TABLE "JournalLineItem";

-- DropEnum
DROP TYPE "InventoryStatus";

-- CreateTable
CREATE TABLE "JournalLine" (
    "id" TEXT NOT NULL,
    "entryId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "debit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "credit" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountReceivable" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "chartAccountId" TEXT NOT NULL,

    CONSTRAINT "AccountReceivable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountPayable" (
    "id" TEXT NOT NULL,
    "supplierName" TEXT NOT NULL,
    "chartAccountId" TEXT NOT NULL,

    CONSTRAINT "AccountPayable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "status" "PurchaseOrderStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountTransactions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AccountTransactions_AB_unique" ON "_AccountTransactions"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountTransactions_B_index" ON "_AccountTransactions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ChartOfAccount_name_key" ON "ChartOfAccount"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ChartOfAccount_accountNumber_key" ON "ChartOfAccount"("accountNumber");

-- AddForeignKey
ALTER TABLE "ChartOfAccount" ADD CONSTRAINT "ChartOfAccount_parentAccountId_fkey" FOREIGN KEY ("parentAccountId") REFERENCES "ChartOfAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalLine" ADD CONSTRAINT "JournalLine_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "JournalEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalLine" ADD CONSTRAINT "JournalLine_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "ChartOfAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountReceivable" ADD CONSTRAINT "AccountReceivable_chartAccountId_fkey" FOREIGN KEY ("chartAccountId") REFERENCES "ChartOfAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountPayable" ADD CONSTRAINT "AccountPayable_chartAccountId_fkey" FOREIGN KEY ("chartAccountId") REFERENCES "ChartOfAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "AccountReceivable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "AccountPayable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_clientAccountId_fkey" FOREIGN KEY ("clientAccountId") REFERENCES "AccountReceivable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountTransactions" ADD CONSTRAINT "_AccountTransactions_A_fkey" FOREIGN KEY ("A") REFERENCES "ChartOfAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountTransactions" ADD CONSTRAINT "_AccountTransactions_B_fkey" FOREIGN KEY ("B") REFERENCES "JournalEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
