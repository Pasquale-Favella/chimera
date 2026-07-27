/*
  Warnings:

  - You are about to alter the column `schema` on the `design` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_design" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "html" TEXT NOT NULL DEFAULT '',
    "schema" JSONB,
    "position" JSONB,
    "size" JSONB,
    "viewMode" TEXT NOT NULL DEFAULT 'DESKTOP',
    "history" JSONB,
    "tokens" JSONB,
    "data" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "design_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "design_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_design" ("createdAt", "createdById", "data", "description", "history", "html", "id", "name", "position", "projectId", "schema", "size", "tokens", "updatedAt", "version", "viewMode") SELECT "createdAt", "createdById", "data", "description", "history", "html", "id", "name", "position", "projectId", "schema", "size", "tokens", "updatedAt", "version", "viewMode" FROM "design";
DROP TABLE "design";
ALTER TABLE "new_design" RENAME TO "design";
CREATE INDEX "design_projectId_idx" ON "design"("projectId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
