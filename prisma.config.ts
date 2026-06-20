import "dotenv/config";
import { defineConfig } from "prisma/config";

const databaseUrl = process.env.DATABASE_URL?.trim();
const fallbackDatabaseUrl = "postgresql://postgres:postgres@localhost:5432/postgres";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Keep generate working even when DATABASE_URL is unset or blank in CI.
    url: databaseUrl && databaseUrl.length > 0 ? databaseUrl : fallbackDatabaseUrl,
  },
});
