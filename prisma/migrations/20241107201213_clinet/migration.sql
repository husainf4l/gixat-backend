/*
  Warnings:

  - The primary key for the `Car` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `barcode` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `licensePlate` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `make` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Car` table. All the data in the column will be lost.
  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Asset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Coupon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InventoryItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LoyaltyProgram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MessageTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Modification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reminder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[addressId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `makeId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transmissionType` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransmissionType" AS ENUM ('Automatic', 'Manual');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('Junior', 'Intermediate', 'Senior');

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_carId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_jobId_fkey";

-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_performedBy_fkey";

-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_jobId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryItem" DROP CONSTRAINT "InventoryItem_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_carId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_couponId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_userId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_assignedTo_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_carId_fkey";

-- DropForeignKey
ALTER TABLE "JobItem" DROP CONSTRAINT "JobItem_inventoryItemId_fkey";

-- DropForeignKey
ALTER TABLE "JobItem" DROP CONSTRAINT "JobItem_jobId_fkey";

-- DropForeignKey
ALTER TABLE "JobService" DROP CONSTRAINT "JobService_jobId_fkey";

-- DropForeignKey
ALTER TABLE "JobService" DROP CONSTRAINT "JobService_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "LoyaltyProgram" DROP CONSTRAINT "LoyaltyProgram_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Modification" DROP CONSTRAINT "Modification_carId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_inventoryItemId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Reminder" DROP CONSTRAINT "Reminder_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_invoiceId_fkey";

-- DropIndex
DROP INDEX "Car_barcode_key";

-- DropIndex
DROP INDEX "Car_licensePlate_key";

-- DropIndex
DROP INDEX "Client_mobile_key";

-- AlterTable
ALTER TABLE "Car" DROP CONSTRAINT "Car_pkey",
DROP COLUMN "barcode",
DROP COLUMN "createdAt",
DROP COLUMN "licensePlate",
DROP COLUMN "make",
DROP COLUMN "model",
DROP COLUMN "updatedAt",
ADD COLUMN     "licenseNumber" TEXT,
ADD COLUMN     "makeId" TEXT NOT NULL,
ADD COLUMN     "modelId" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "transmissionType" "TransmissionType" NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "year" SET DATA TYPE TEXT,
ALTER COLUMN "vin" DROP NOT NULL,
ALTER COLUMN "clientId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Car_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Car_id_seq";

-- AlterTable
ALTER TABLE "Client" DROP CONSTRAINT "Client_pkey",
DROP COLUMN "address",
DROP COLUMN "createdAt",
DROP COLUMN "mobile",
DROP COLUMN "updatedAt",
ADD COLUMN     "addressId" TEXT,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "taxId" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Client_id_seq";

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "Asset";

-- DropTable
DROP TABLE "AuditLog";

-- DropTable
DROP TABLE "Coupon";

-- DropTable
DROP TABLE "Feature";

-- DropTable
DROP TABLE "Feedback";

-- DropTable
DROP TABLE "InventoryItem";

-- DropTable
DROP TABLE "Invoice";

-- DropTable
DROP TABLE "Job";

-- DropTable
DROP TABLE "JobItem";

-- DropTable
DROP TABLE "JobService";

-- DropTable
DROP TABLE "LoyaltyProgram";

-- DropTable
DROP TABLE "MessageTemplate";

-- DropTable
DROP TABLE "Modification";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "Reminder";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "Supplier";

-- DropEnum
DROP TYPE "AppointmentStatus";

-- DropEnum
DROP TYPE "AssetStatus";

-- DropEnum
DROP TYPE "AssetType";

-- DropEnum
DROP TYPE "InvoiceStatus";

-- DropEnum
DROP TYPE "LoyaltyTier";

-- DropEnum
DROP TYPE "MessageType";

-- DropEnum
DROP TYPE "ModificationStatus";

-- DropEnum
DROP TYPE "NotificationType";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "PaymentMethod";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "ReportType";

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "postalCode" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarHistory" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "event" TEXT NOT NULL,
    "details" TEXT,

    CONSTRAINT "CarHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspection" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "odoReading" INTEGER NOT NULL,
    "color" TEXT,
    "imageUrl" TEXT,
    "notes" TEXT,
    "inspectorName" TEXT,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobCard" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL,
    "cost" DOUBLE PRECISION,
    "technicianId" TEXT,

    CONSTRAINT "JobCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Part" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "jobCardId" TEXT NOT NULL,

    CONSTRAINT "Part_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technician" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "experienceLevel" "ExperienceLevel" NOT NULL,

    CONSTRAINT "Technician_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Make" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Make_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "makeId" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_addressId_key" ON "Client"("addressId");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarHistory" ADD CONSTRAINT "CarHistory_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCard" ADD CONSTRAINT "JobCard_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobCard" ADD CONSTRAINT "JobCard_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "Technician"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Part" ADD CONSTRAINT "Part_jobCardId_fkey" FOREIGN KEY ("jobCardId") REFERENCES "JobCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_makeId_fkey" FOREIGN KEY ("makeId") REFERENCES "Make"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
