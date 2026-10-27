import {
  LoginFormType,
  ResetPasswordFormType,
  SignupFormType,
} from "@/types/auth/auth.types";

export const PASSWORD_LENGTH = 6;

export const signup_form_control: SignupFormType[] = [
  {
    id: "email",
    type: "email",
    title: "Email",
    placeholder: "yourmail@example.com",
  },
  {
    id: "password",
    type: "password",
    title: "Password",
    placeholder: "Enter your password",
  },
];

export const login_form_control: LoginFormType[] = [
  {
    id: "email",
    type: "email",
    title: "Email",
    placeholder: "yourmail@example.com",
  },
  {
    id: "password",
    type: "password",
    title: "Password",
    placeholder: "Enter your password",
  },
];

export const reset_password_form_control: ResetPasswordFormType[] = [
  {
    id: "oldPassword",
    type: "old_password",
    title: "Old password",
    placeholder: "Enter your old password",
  },
  {
    id: "newPassword",
    type: "password",
    title: "New password",
    placeholder: "Create a new password",
  },
  {
    id: "confirmPassword",
    type: "password",
    title: "Confirm password",
    placeholder: "Retype new password",
  },
];
