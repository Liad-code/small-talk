-- Safety: the old Stripe Subscription table must be empty (Stripe was never used).
DO $$ BEGIN
  IF (SELECT COUNT(*) FROM "Subscription") > 0 THEN
    RAISE EXCEPTION 'Subscription table is not empty - check it before migrating';
  END IF;
END $$;

-- DropIndex
DROP INDEX "User_stripeCustomerId_key";

-- DropIndex
DROP INDEX "Subscription_stripeSubscriptionId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeCustomerId",
ADD COLUMN     "familyWeeklyGoal" INTEGER;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "priceId",
DROP COLUMN "stripeSubscriptionId",
DROP COLUMN "trialEnd",
ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "cardSuffix" TEXT,
ADD COLUMN     "discountedSeats" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "failedAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "growAsmachta" TEXT,
ADD COLUMN     "growDirectDebitId" TEXT,
ADD COLUMN     "growTransactionId" TEXT,
ADD COLUMN     "growTransactionToken" TEXT,
ADD COLUMN     "monthlyAmount" INTEGER NOT NULL,
ADD COLUMN     "payerEmail" TEXT,
ADD COLUMN     "payerName" TEXT,
ADD COLUMN     "payerPhone" TEXT,
ADD COLUMN     "plan" TEXT NOT NULL,
ADD COLUMN     "tierChosen" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "BillingCheckout" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "tierChosen" INTEGER NOT NULL DEFAULT 0,
    "seats" INTEGER NOT NULL,
    "discountedSeats" INTEGER NOT NULL DEFAULT 0,
    "firstAmount" INTEGER NOT NULL,
    "monthlyAmount" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BillingCheckout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "subscriptionId" TEXT,
    "kind" TEXT NOT NULL,
    "amount" INTEGER,
    "providerTxnId" TEXT,
    "raw" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BillingEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingTask" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "subscriptionId" TEXT,
    "kind" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doneAt" TIMESTAMP(3),

    CONSTRAINT "BillingTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classroom" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassMember" (
    "id" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,
    "childProfileId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StarDay" (
    "id" TEXT NOT NULL,
    "childProfileId" TEXT NOT NULL,
    "day" DATE NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StarDay_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BillingCheckout_userId_idx" ON "BillingCheckout"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BillingEvent_providerTxnId_key" ON "BillingEvent"("providerTxnId");

-- CreateIndex
CREATE INDEX "BillingEvent_userId_idx" ON "BillingEvent"("userId");

-- CreateIndex
CREATE INDEX "BillingEvent_createdAt_idx" ON "BillingEvent"("createdAt");

-- CreateIndex
CREATE INDEX "BillingTask_status_idx" ON "BillingTask"("status");

-- CreateIndex
CREATE INDEX "BillingTask_subscriptionId_idx" ON "BillingTask"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_teacherId_key" ON "Classroom"("teacherId");

-- CreateIndex
CREATE UNIQUE INDEX "Classroom_code_key" ON "Classroom"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ClassMember_childProfileId_key" ON "ClassMember"("childProfileId");

-- CreateIndex
CREATE INDEX "ClassMember_classroomId_idx" ON "ClassMember"("classroomId");

-- CreateIndex
CREATE INDEX "StarDay_childProfileId_day_idx" ON "StarDay"("childProfileId", "day");

-- CreateIndex
CREATE UNIQUE INDEX "StarDay_childProfileId_day_key" ON "StarDay"("childProfileId", "day");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_growDirectDebitId_key" ON "Subscription"("growDirectDebitId");

-- AddForeignKey
ALTER TABLE "Classroom" ADD CONSTRAINT "Classroom_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassMember" ADD CONSTRAINT "ClassMember_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassMember" ADD CONSTRAINT "ClassMember_childProfileId_fkey" FOREIGN KEY ("childProfileId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarDay" ADD CONSTRAINT "StarDay_childProfileId_fkey" FOREIGN KEY ("childProfileId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

