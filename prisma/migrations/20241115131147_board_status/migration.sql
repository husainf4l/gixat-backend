/*
  Warnings:

  - You are about to drop the column `status` on the `JobCard` table. All the data in the column will be lost.
  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_boardId_fkey";

-- AlterTable
ALTER TABLE "JobCard" DROP COLUMN "status",
ADD COLUMN     "boardId" TEXT;

-- DropTable
DROP TABLE "Board";

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "BoardStatus" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" SERIAL NOT NULL,

    CONSTRAINT "BoardStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobCard" ADD CONSTRAINT "JobCard_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "BoardStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
