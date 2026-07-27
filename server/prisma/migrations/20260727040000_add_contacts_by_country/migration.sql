-- AlterTable: Add contactsByCountry JSON column to config_footer
ALTER TABLE "config_footer" ADD COLUMN "contactsByCountry" JSONB;