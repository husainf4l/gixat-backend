-- CreateEnum
CREATE TYPE "InventoryStatus" AS ENUM ('IN_STOCK', 'OUT_OF_STOCK', 'LOW_STOCK');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('PURCHASE', 'SALE', 'ADJUSTMENT');

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "sellingPrice" DOUBLE PRECISION NOT NULL,
    "status" "InventoryStatus" NOT NULL,
    "reorderLevel" INTEGER NOT NULL,
    "lastRestocked" TIMESTAMP(3),
    "location" TEXT,
    "barcode" TEXT,
    "sku" TEXT,
    "unitOfMeasure" TEXT,
    "minOrderQuantity" INTEGER,
    "batchNumber" TEXT,
    "categoryId" INTEGER NOT NULL,
    "supplierAccountId" TEXT NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryTransaction" (
    "id" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionType" "TransactionType" NOT NULL,
    "quantityChanged" INTEGER NOT NULL,
    "newQuantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "InventoryTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parentCategoryId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InventoryPurchases" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InventoryPurchases_AB_unique" ON "_InventoryPurchases"("A", "B");

-- CreateIndex
CREATE INDEX "_InventoryPurchases_B_index" ON "_InventoryPurchases"("B");

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_supplierAccountId_fkey" FOREIGN KEY ("supplierAccountId") REFERENCES "AccountPayable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryTransaction" ADD CONSTRAINT "InventoryTransaction_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryPurchases" ADD CONSTRAINT "_InventoryPurchases_A_fkey" FOREIGN KEY ("A") REFERENCES "InventoryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InventoryPurchases" ADD CONSTRAINT "_InventoryPurchases_B_fkey" FOREIGN KEY ("B") REFERENCES "PurchaseOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
