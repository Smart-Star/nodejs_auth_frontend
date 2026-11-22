import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { UserJwtPayload } from "@/types/user.types";

export async function getSession(): Promise<UserJwtPayload | null> {
  // return {
  //   userId: "mock-admin-id",
  //   email: "admin@test.com",
  //   role: "ADMIN",
  // };

  // return {
  //   userId: "mock-user-id",
  //   email: "user@test.com",
  //   role: "USER",
  // };

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decodedToken = jwtDecode<UserJwtPayload>(token);

    return decodedToken;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
}

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();

  const rawToken = cookieStore.get("token")?.value;
  if (!rawToken) return null;

  return rawToken;
}
