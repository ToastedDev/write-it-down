import "dotenv/config";
if (!process.env.DATABASE_URL)
  throw new SyntaxError("Database URL must be provided.");

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
