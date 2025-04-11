/*
  Warnings:

  - The primary key for the `Redacao` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Redacao" DROP CONSTRAINT "Redacao_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Redacao_pkey" PRIMARY KEY ("id");
