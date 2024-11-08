/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Make` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Model_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Make_name_key" ON "Make"("name");
