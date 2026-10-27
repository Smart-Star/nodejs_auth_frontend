"use server";

export async function deleteTask(taskId: string) {
  try {
    // await deleteTaskFromDatabase(taskId);

    return {
      success: true,
      message: `Task id:${taskId} deleted successfully.`,
    };
  } catch {
    return {
      success: false,
      message: "Unable to delete task.",
    };
  }
}

export async function editTask(taskId: string) {
  try {
    // await deleteTaskFromDatabase(taskId);

    return {
      success: true,
      message: `Task id:${taskId} editted successfully.`,
    };
  } catch {
    return {
      success: false,
      message: "Unable to edit task.",
    };
  }
}
