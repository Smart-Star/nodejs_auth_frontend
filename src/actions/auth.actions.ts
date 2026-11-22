"use server";

import {
  LoginPayload,
  ResetPasswordPayload,
  ForgotPasswordPayload,
} from "@/types/auth/auth.server.types";

import { cookies } from "next/headers";
import { clientEnv } from "@/config/client-env";
import { serverEnv } from "@/config/server-env";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export async function registerAction(formData: LoginPayload) {
  if (!formData.email || !formData.password)
    return {
      success: false,
      message: "Email or password is required.",
    };

  try {
    const response = await fetch(`${clientEnv.apiUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      cache: "no-store",
    });

    const result = await response.json();
    if (!result.success)
      return {
        success: false,
        message: result.message,
      };

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.log("Unexpected error. Is the Express server running?", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function loginAction(formData: LoginPayload) {
  if (!formData.email || !formData.password)
    return {
      success: false,
      message: "Email or password is required.",
    };

  try {
    // call Express backend login endpoint
    const response = await fetch(`${clientEnv.apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      cache: "no-store",
    });

    const result = (await response.json()) as ApiResponse<{
      accessToken: string;
    }>;

    if (!result.success || !result.data?.accessToken)
      return {
        success: false,
        message: result.message,
      };

    // store the JWT safely in a cookie
    const accessToken = result.data.accessToken;
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: accessToken,
      httpOnly: true,
      secure: serverEnv.isProduction,
      path: "/",
      maxAge: 60 * 30, // 30 minutes
      sameSite: "lax",
    });

    // return success data back to the client
    return {
      success: true,
      message: "Account logged in successfully.",
    };
  } catch (error) {
    console.log("Unexpected error. Is the Express server running?", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function forgotPasswordAction(formData: ForgotPasswordPayload) {
  if (!formData.email)
    return {
      success: false,
      message: "Email is required.",
    };

  try {
    // call Express backend forgot-password endpoint
    const response = await fetch(`${clientEnv.apiUrl}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: formData.email }),
    });

    const result = (await response.json()) as ApiResponse<{
      rawPasswordResetToken: string;
    }>;

    if (!result.success)
      return {
        success: false,
        message: result.message,
      };

    // in dev mode without real emails, backend returns the resetToken directly
    return {
      success: true,
      message: result.message,
      resetPasswordToken: result.data?.rawPasswordResetToken,
    };
  } catch (error) {
    console.log("Unexpected error. Is the Express server running?", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function resetPasswordAction(formData: ResetPasswordPayload) {
  const { email, rawToken, newPassword, repeatNewPassword } = formData;

  try {
    const response = await fetch(`${clientEnv.apiUrl}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, rawToken, newPassword, repeatNewPassword }),
    });

    const result = await response.json();
    if (!result.success)
      return {
        success: false,
        message: result.message,
      };

    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    console.log("Unexpected error. Is the Express server running?", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();

    // Delete the token cookie
    cookieStore.delete("token");
    return {
      success: true,
      message: "You have successfully logged out.",
    };
  } catch (error) {
    console.log("Unexpected error.", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
