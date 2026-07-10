-- CreateTable
CREATE TABLE "ChildProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '🦉',
    "ageBand" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChildProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL,
    "childProfileId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "lessonDone" BOOLEAN NOT NULL DEFAULT false,
    "quizScore" INTEGER NOT NULL DEFAULT 0,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "gameHighScore" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step1Progress" (
    "id" TEXT NOT NULL,
    "childProfileId" TEXT NOT NULL,
    "exerciseKey" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT true,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Step1Progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepStars" (
    "id" TEXT NOT NULL,
    "childProfileId" TEXT NOT NULL,
    "step" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StepStars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChildProfile_userId_idx" ON "ChildProfile"("userId");

-- CreateIndex
CREATE INDEX "Progress_childProfileId_idx" ON "Progress"("childProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Progress_childProfileId_subjectId_level_key" ON "Progress"("childProfileId", "subjectId", "level");

-- CreateIndex
CREATE INDEX "Step1Progress_childProfileId_idx" ON "Step1Progress"("childProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Step1Progress_childProfileId_exerciseKey_key" ON "Step1Progress"("childProfileId", "exerciseKey");

-- CreateIndex
CREATE INDEX "StepStars_childProfileId_idx" ON "StepStars"("childProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "StepStars_childProfileId_step_key" ON "StepStars"("childProfileId", "step");

-- AddForeignKey
ALTER TABLE "ChildProfile" ADD CONSTRAINT "ChildProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_childProfileId_fkey" FOREIGN KEY ("childProfileId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step1Progress" ADD CONSTRAINT "Step1Progress_childProfileId_fkey" FOREIGN KEY ("childProfileId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepStars" ADD CONSTRAINT "StepStars_childProfileId_fkey" FOREIGN KEY ("childProfileId") REFERENCES "ChildProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
