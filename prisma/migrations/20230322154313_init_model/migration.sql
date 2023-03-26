-- CreateEnum
CREATE TYPE "TypeCut" AS ENUM ('MAQUINA', 'TESOURA', 'MAQUINA_E_TESOURA', 'NAVALHA');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "numberPhone" TEXT NOT NULL,
    "isBanished" BOOLEAN NOT NULL DEFAULT false,
    "inLine" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cut" (
    "id" SERIAL NOT NULL,
    "type" "TypeCut" NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cut_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_numberPhone_key" ON "user"("numberPhone");

-- CreateIndex
CREATE UNIQUE INDEX "session_userId_key" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "cut_userId_key" ON "cut"("userId");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cut" ADD CONSTRAINT "cut_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
