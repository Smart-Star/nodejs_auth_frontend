import { z } from "zod";
import { loginSchema } from "@/validation/auth.schema";

export type LoginPayload = z.infer<typeof loginSchema>;
