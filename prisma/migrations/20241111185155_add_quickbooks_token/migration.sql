-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "quickbooksRefreshToken" TEXT,
ADD COLUMN     "quickbooksTokenExpiry" TIMESTAMP(3);
