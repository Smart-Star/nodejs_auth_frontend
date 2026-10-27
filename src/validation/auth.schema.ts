import { PASSWORD_LENGTH } from "@/components/constants/auth.constants";
import * as z from "zod";

export const signUpSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(
      PASSWORD_LENGTH,
      `Password must be at least ${PASSWORD_LENGTH} characters.`,
    ),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(
      PASSWORD_LENGTH,
      `Password must be at least ${PASSWORD_LENGTH} characters.`,
    ),
});

export const resetPasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(
      PASSWORD_LENGTH,
      `Password must be at least ${PASSWORD_LENGTH} characters.`,
    ),
  newPassword: z
    .string()
    .min(
      PASSWORD_LENGTH,
      `Password must be at least ${PASSWORD_LENGTH} characters.`,
    ),
  confirmPassword: z
    .string()
    .min(
      PASSWORD_LENGTH,
      `Password must be at least ${PASSWORD_LENGTH} characters.`,
    ),
});
