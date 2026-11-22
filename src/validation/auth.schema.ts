import { z } from "zod";
import { PASSWORD_LENGTH } from "@/components/constants/auth.constants";

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

export const forgotPasswordSchema = z.object({
  email: z.email(),
});

export const resetPasswordSchema = z
  .object({
    email: z.email(),
    rawToken: z.string().min(1, "Token is required."),
    newPassword: z
      .string()
      .min(
        PASSWORD_LENGTH,
        `Password must be at least ${PASSWORD_LENGTH} characters.`,
      ),
    repeatNewPassword: z
      .string()
      .min(
        PASSWORD_LENGTH,
        `Password must be at least ${PASSWORD_LENGTH} characters.`,
      ),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Passwords do not match.",
    path: ["repeatNewPassword"],
  });
