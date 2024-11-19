-- DropForeignKey
ALTER TABLE "AccountReceivable" DROP CONSTRAINT "AccountReceivable_addressId_fkey";

-- AlterTable
ALTER TABLE "AccountReceivable" ALTER COLUMN "addressId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "jobRequest" (
    "id" TEXT NOT NULL,
    "jobCardId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedCost" INTEGER,
    "IsChecked" BOOLEAN NOT NULL,

    CONSTRAINT "jobRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountReceivable" ADD CONSTRAINT "AccountReceivable_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobRequest" ADD CONSTRAINT "jobRequest_jobCardId_fkey" FOREIGN KEY ("jobCardId") REFERENCES "JobCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
