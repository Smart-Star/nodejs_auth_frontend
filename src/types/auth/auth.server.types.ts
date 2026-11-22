import { z } from "zod";

import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
} from "@/validation/auth.schema";

export type LoginPayload = z.infer<typeof loginSchema>;
export type ForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordPayload = z.infer<typeof resetPasswordSchema>;
