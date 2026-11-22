"use client";

import {
  editTaskAction,
  getAllTaskAction,
  createTaskAction,
  getSingleTaskAction,
  deleteTaskAction,
} from "@/actions/task.actions";

import { EditTaskType } from "@/types/tasks.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskTitle }: { taskTitle: string }) => {
      const response = await createTaskAction(taskTitle);
      if (!response.success)
        throw new Error(response.message ?? "Unable to create task.");

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getAllTasks"] });
    },
  });
}

export function useGetAllTasks() {
  return useQuery({
    queryKey: ["getAllTasks"],
    queryFn: async () => {
      const response = await getAllTaskAction();
      if (!response.success)
        throw new Error(response.message ?? "Unable to get all tasks.");

      return response.data;
    },
  });
}

export function useGetSingleTask(taskId: string) {
  return useQuery({
    queryKey: ["getSingleTask", taskId],
    queryFn: async () => {
      const response = await getSingleTaskAction(taskId);
      if (!response.success)
        throw new Error(response.message ?? "Unable to get task.");

      return response.data;
    },
    enabled: !!taskId,
  });
}

export function useEditTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, taskTitle }: EditTaskType) => {
      const response = await editTaskAction(taskId, taskTitle);
      if (!response.success)
        throw new Error(response.message ?? "Unable to edit task.");

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getAllTasks"] });
      await queryClient.invalidateQueries({
        queryKey: ["getSingleTask"],
      });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId }: { taskId: string }) => {
      const response = await deleteTaskAction(taskId);
      if (!response.success)
        throw new Error(response.message ?? "Unable to delete task.");

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getAllTasks"] });
      await queryClient.invalidateQueries({
        queryKey: ["getSingleTask"],
      });
    },
  });
}
