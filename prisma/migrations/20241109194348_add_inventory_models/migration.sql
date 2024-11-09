/*
  Warnings:

  - You are about to drop the column `category` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `supplier` on the `InventoryItem` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellingPrice` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierId` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `InventoryItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "InventoryStatus" AS ENUM ('IN_STOCK', 'OUT_OF_STOCK', 'LOW_STOCK');

-- AlterTable
ALTER TABLE "InventoryItem" DROP COLUMN "category",
DROP COLUMN "supplier",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sellingPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "supplierId" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "InventoryStatus" NOT NULL;

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parentCategoryId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supplier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contactInfo" TEXT,
    "address" TEXT,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
