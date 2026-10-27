import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
});

const parsed = serverEnvSchema.parse(process.env);

export const serverEnv = {
  isProduction: parsed.NODE_ENV === "production",
} as const;
