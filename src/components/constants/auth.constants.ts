import {
  LoginFormType,
  SignupFormType,
  ResetPasswordFormType,
  ForgotPasswordFormType,
} from "@/types/auth/auth.types";

export const PASSWORD_LENGTH = 6;
export const COUNTDOWN_TIMER_LENGTH = 60;

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

export const forgot_password_form_control: ForgotPasswordFormType[] = [
  {
    id: "email",
    type: "email",
    title: "Email",
    placeholder: "yourmail@example.com",
  },
];

export const reset_password_form_control: ResetPasswordFormType[] = [
  {
    id: "newPassword",
    type: "password",
    title: "New password",
    placeholder: "Create a new password",
  },
  {
    id: "repeatNewPassword",
    type: "password",
    title: "Repeat new password",
    placeholder: "Retype new password",
  },
];
