-- DropForeignKey
ALTER TABLE "JobCard" DROP CONSTRAINT "JobCard_clientId_fkey";

-- AlterTable
ALTER TABLE "JobCard" ALTER COLUMN "clientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "JobCard" ADD CONSTRAINT "JobCard_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "AccountReceivable"("id") ON DELETE SET NULL ON UPDATE CASCADE;
