-- DropIndex
DROP INDEX "User_stripeCustomerId_key";

-- DropIndex
DROP INDEX "Subscription_stripeSubscriptionId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeCustomerId";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "priceId",
DROP COLUMN "stripeSubscriptionId",
ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "cardSuffix" TEXT,
ADD COLUMN     "cardToken" TEXT,
ADD COLUMN     "failedAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "nextChargeAt" TIMESTAMP(3),
ADD COLUMN     "pricePerSeat" INTEGER NOT NULL DEFAULT 5000,
ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'grow',
ADD COLUMN     "recurringDebitId" TEXT;

-- CreateTable
CREATE TABLE "BillingTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subscriptionId" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'grow',
    "kind" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "seats" INTEGER NOT NULL,
    "processId" TEXT,
    "providerTxnId" TEXT,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillingTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BillingTransaction_processId_key" ON "BillingTransaction"("processId");

-- CreateIndex
CREATE UNIQUE INDEX "BillingTransaction_providerTxnId_key" ON "BillingTransaction"("providerTxnId");

-- CreateIndex
CREATE INDEX "BillingTransaction_userId_idx" ON "BillingTransaction"("userId");

-- CreateIndex
CREATE INDEX "Subscription_nextChargeAt_idx" ON "Subscription"("nextChargeAt");

-- AddForeignKey
ALTER TABLE "BillingTransaction" ADD CONSTRAINT "BillingTransaction_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

