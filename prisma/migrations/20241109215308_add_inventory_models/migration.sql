/*
  Warnings:

  - You are about to drop the `_ClientAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SupplierAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClientAccount" DROP CONSTRAINT "_ClientAccount_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClientAccount" DROP CONSTRAINT "_ClientAccount_B_fkey";

-- DropForeignKey
ALTER TABLE "_SupplierAccount" DROP CONSTRAINT "_SupplierAccount_A_fkey";

-- DropForeignKey
ALTER TABLE "_SupplierAccount" DROP CONSTRAINT "_SupplierAccount_B_fkey";

-- AlterTable
ALTER TABLE "ChartOfAccount" ADD COLUMN     "addressId" TEXT,
ADD COLUMN     "contactInfoId" TEXT;

-- DropTable
DROP TABLE "_ClientAccount";

-- DropTable
DROP TABLE "_SupplierAccount";

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChartOfAccount" ADD CONSTRAINT "ChartOfAccount_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartOfAccount" ADD CONSTRAINT "ChartOfAccount_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
