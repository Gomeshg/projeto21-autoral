/*
  Warnings:

  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_userId_fkey";

-- DropTable
DROP TABLE "Card";

-- CreateTable
CREATE TABLE "card" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "dateValid" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
