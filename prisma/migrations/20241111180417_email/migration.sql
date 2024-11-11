/*
  Warnings:

  - The values [Junior,Intermediate,Senior] on the enum `ExperienceLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [Automatic,Manual] on the enum `TransmissionType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `chartAccountId` on the `AccountPayable` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `AccountReceivable` table. All the data in the column will be lost.
  - You are about to drop the column `streetAddress` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `quickbooksId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the `Quickbooks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accountId` to the `AccountPayable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `companyId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExperienceLevel_new" AS ENUM ('JUNIOR', 'INTERMEDIATE', 'SENIOR');
ALTER TABLE "Technician" ALTER COLUMN "experienceLevel" TYPE "ExperienceLevel_new" USING ("experienceLevel"::text::"ExperienceLevel_new");
ALTER TYPE "ExperienceLevel" RENAME TO "ExperienceLevel_old";
ALTER TYPE "ExperienceLevel_new" RENAME TO "ExperienceLevel";
DROP TYPE "ExperienceLevel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TransmissionType_new" AS ENUM ('AUTOMATIC', 'MANUAL');
ALTER TABLE "Car" ALTER COLUMN "transmissionType" TYPE "TransmissionType_new" USING ("transmissionType"::text::"TransmissionType_new");
ALTER TYPE "TransmissionType" RENAME TO "TransmissionType_old";
ALTER TYPE "TransmissionType_new" RENAME TO "TransmissionType";
DROP TYPE "TransmissionType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "AccountPayable" DROP CONSTRAINT "AccountPayable_chartAccountId_fkey";

-- DropForeignKey
ALTER TABLE "AccountReceivable" DROP CONSTRAINT "AccountReceivable_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_quickbooksId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companyId_fkey";

-- DropIndex
DROP INDEX "Company_quickbooksId_key";

-- AlterTable
ALTER TABLE "AccountPayable" DROP COLUMN "chartAccountId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AccountReceivable" DROP COLUMN "addressId";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "streetAddress",
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zipCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "companyName",
DROP COLUMN "quickbooksId",
ADD COLUMN     "addressId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InventoryItem" ALTER COLUMN "status" SET DEFAULT 'IN_STOCK';

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "paidDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "JobCard" ADD COLUMN     "totalCost" DOUBLE PRECISION,
ADD COLUMN     "totalLabor" DOUBLE PRECISION,
ADD COLUMN     "totalParts" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "PurchaseOrder" ADD COLUMN     "paymentDate" TIMESTAMP(3),
ADD COLUMN     "receivedDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "companyId" SET NOT NULL;

-- DropTable
DROP TABLE "Quickbooks";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountPayable" ADD CONSTRAINT "AccountPayable_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "ChartOfAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
