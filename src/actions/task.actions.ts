"use server";

import { revalidatePath } from "next/cache";
import { clientEnv } from "@/config/client-env";
import { SupportTasks } from "@/types/tasks.types";
import { getSession, getAccessToken } from "@/lib/session";

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export async function createTaskAction(taskTitle: string) {
  const token = await getAccessToken();

  try {
    const response = await fetch(`${clientEnv.apiUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: taskTitle }),
      credentials: "include",
    });

    const result = (await response.json()) as ApiResponse<{
      task: SupportTasks;
    }>;

    if (!response.ok || !result.success)
      return {
        success: false,
        message: result.message ?? "Unable to create task.",
      };

    revalidatePath("/");
    revalidatePath("/tasks");

    return {
      success: true,
      message: result.message,
    };
  } catch {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function getAllTaskAction() {
  const user = await getSession();
  const token = await getAccessToken();
  const isAdmin = user?.role === "ADMIN";

  try {
    const url = isAdmin
      ? `${clientEnv.apiUrl}/admin/tasks`
      : `${clientEnv.apiUrl}/tasks`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const result = (await response.json()) as ApiResponse<{
      tasks: SupportTasks[];
    }>;

    if (!response.ok || !result.success)
      return {
        success: false,
        message: result.message ?? "Unable to get tasks.",
      };

    return {
      success: true,
      message: result.message,
      data: result.data?.tasks,
    };
  } catch {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function getSingleTaskAction(taskId: string) {
  const user = await getSession();
  const token = await getAccessToken();
  const isAdmin = user?.role === "ADMIN";

  try {
    const url = isAdmin
      ? `${clientEnv.apiUrl}/admin/tasks/${taskId}/status`
      : `${clientEnv.apiUrl}/tasks/${taskId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const result = (await response.json()) as ApiResponse<{
      task: SupportTasks;
    }>;

    if (!response.ok || !result.success)
      return {
        success: false,
        message: result.message ?? "Unable to get task.",
      };

    return {
      success: true,
      message: result.message,
      data: result.data?.task,
    };
  } catch {
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function editTaskAction(taskId: string, taskTitle: string) {
  const user = await getSession();
  const token = await getAccessToken();
  const isAdmin = user?.role === "ADMIN";

  try {
    const url = isAdmin
      ? `${clientEnv.apiUrl}/admin/tasks/${taskId}/status`
      : `${clientEnv.apiUrl}/tasks/${taskId}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: taskTitle }),
      credentials: "include",
    });

    const result = (await response.json()) as ApiResponse<{
      task: SupportTasks;
    }>;

    if (!response.ok || !result.success)
      return {
        success: false,
        message: result.message ?? "Unable to update task.",
      };

    revalidatePath("/");
    revalidatePath("/tasks");

    return {
      success: true,
      message: result.message,
    };
  } catch {
    return {
      success: false,
      message: "Unable to edit task.",
    };
  }
}

export async function deleteTaskAction(taskId: string) {
  const user = await getSession();
  const token = await getAccessToken();
  const isAdmin = user?.role === "ADMIN";

  try {
    const url = isAdmin
      ? `${clientEnv.apiUrl}/admin/tasks/${taskId}/status`
      : `${clientEnv.apiUrl}/tasks/${taskId}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    const result = (await response.json()) as ApiResponse<{
      tasks: SupportTasks;
    }>;

    if (!response.ok || !result.success)
      return {
        success: false,
        message: result.message ?? "Unable to delete task.",
      };

    revalidatePath("/");
    revalidatePath("/tasks");

    return {
      success: true,
      message: result.message,
    };
  } catch {
    return {
      success: false,
      message: "Unable to delete task.",
    };
  }
}
