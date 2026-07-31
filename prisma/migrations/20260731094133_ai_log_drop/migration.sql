/*
  Warnings:

  - You are about to drop the `ai_usage_log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ai_usage_log";
PRAGMA foreign_keys=on;
