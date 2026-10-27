import { clientEnv } from "@/config/client-env";

const apiBaseUrl = clientEnv.apiUrl;

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  accessToken?: string,
): Promise<ApiResponse<T>> {
  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });

  const result = (await response.json()) as ApiResponse<T>;
  if (!response.ok) {
    throw new Error(
      result.message ?? `API request failed (${response.status})`,
    );
  }

  return result;
}
