/*
  Warnings:

  - The values [CLIENT] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `approvedBy` on the `Modification` table. All the data in the column will be lost.
  - You are about to drop the column `proposedBy` on the `Modification` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Modification` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Reminder` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'EMPLOYEE');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_clientId_fkey";

-- DropForeignKey
ALTER TABLE "LoyaltyProgram" DROP CONSTRAINT "LoyaltyProgram_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Modification" DROP CONSTRAINT "Modification_approvedBy_fkey";

-- DropForeignKey
ALTER TABLE "Modification" DROP CONSTRAINT "Modification_proposedBy_fkey";

-- DropForeignKey
ALTER TABLE "Modification" DROP CONSTRAINT "Modification_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_userId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Modification" DROP COLUMN "approvedBy",
DROP COLUMN "proposedBy",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Reminder" DROP COLUMN "userId",
ADD COLUMN     "clientId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "mobile" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_mobile_key" ON "Client"("mobile");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoyaltyProgram" ADD CONSTRAINT "LoyaltyProgram_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
