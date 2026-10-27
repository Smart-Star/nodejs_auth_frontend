import {
  signUpSchema,
  loginSchema,
  resetPasswordSchema,
} from "@/validation/auth.schema";

export interface SignupFormType {
  id: keyof typeof signUpSchema.shape;
  type: string;
  title: string;
  placeholder: string;
}

export interface LoginFormType {
  id: keyof typeof loginSchema.shape;
  type: string;
  title: string;
  placeholder: string;
}

export interface ResetPasswordFormType {
  id: keyof typeof resetPasswordSchema.shape;
  type: string;
  title: string;
  placeholder: string;
}
