-- CreateEnum
CREATE TYPE "Outcome" AS ENUM ('PASSED', 'FAILED', 'CANT_TELL', 'NOT_PRESENT', 'NOT_CHECKED');

-- CreateEnum
CREATE TYPE "ConformanceLevel" AS ENUM ('A', 'AA', 'AAA');

-- CreateEnum
CREATE TYPE "Principle" AS ENUM ('PERCEIVABLE', 'OPERABLE', 'UNDERSTANDABLE', 'ROBUST');

-- CreateTable
CREATE TABLE "WcagCriterion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" "ConformanceLevel" NOT NULL,
    "principle" "Principle" NOT NULL,
    "description" TEXT NOT NULL,
    "understandingUrl" TEXT NOT NULL,
    "howToMeetUrl" TEXT NOT NULL,

    CONSTRAINT "WcagCriterion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditResult" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "criterionId" TEXT NOT NULL,
    "outcome" "Outcome" NOT NULL DEFAULT 'NOT_CHECKED',
    "observations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuditResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuditResult" ADD CONSTRAINT "AuditResult_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "WcagCriterion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditResult" ADD CONSTRAINT "AuditResult_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
