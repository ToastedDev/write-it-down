import "dotenv/config";
if (!process.env.POSTGRES_URL)
  throw new SyntaxError("POSTGRES_URL must be provided.");

import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./.drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  },
} satisfies Config;
