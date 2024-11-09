-- CreateEnum
CREATE TYPE "Status" AS ENUM ('IN_STOCK', 'OUT_OF_STOCK', 'LOW_STOCK');

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "supplier" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "reorderLevel" INTEGER NOT NULL,
    "lastRestocked" TIMESTAMP(3),
    "location" TEXT,
    "barcode" TEXT,
    "sku" TEXT,
    "unitOfMeasure" TEXT,
    "minOrderQuantity" INTEGER,
    "batchNumber" TEXT,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);
