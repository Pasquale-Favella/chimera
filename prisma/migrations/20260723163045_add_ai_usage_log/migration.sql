/*
  Warnings:

  - You are about to drop the column `geminiApiKey` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `geminiPreferences` on the `user` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "llm_api_key" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "provider" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "llm_api_key_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "design_system" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Default System',
    "description" TEXT,
    "colors" JSONB NOT NULL,
    "typography" JSONB NOT NULL,
    "spacing" JSONB NOT NULL,
    "radius" JSONB NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'custom',
    "presetName" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "design_system_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ai_usage_log" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "projectId" TEXT,
    "operation" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "promptTokens" INTEGER,
    "completionTokens" INTEGER,
    "totalTokens" INTEGER,
    "latencyMs" INTEGER NOT NULL,
    "success" BOOLEAN NOT NULL,
    "errorMessage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ai_usage_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ai_usage_log_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "llmPreferences" JSONB
);
INSERT INTO "new_user" ("createdAt", "email", "emailVerified", "id", "image", "name", "updatedAt") SELECT "createdAt", "email", "emailVerified", "id", "image", "name", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "llm_api_key_userId_idx" ON "llm_api_key"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "llm_api_key_userId_provider_key" ON "llm_api_key"("userId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "design_system_projectId_key" ON "design_system"("projectId");

-- CreateIndex
CREATE INDEX "ai_usage_log_userId_createdAt_idx" ON "ai_usage_log"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "ai_usage_log_projectId_createdAt_idx" ON "ai_usage_log"("projectId", "createdAt");

-- CreateIndex
CREATE INDEX "ai_usage_log_provider_createdAt_idx" ON "ai_usage_log"("provider", "createdAt");
