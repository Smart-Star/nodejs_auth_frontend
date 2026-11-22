export interface SupportTasks {
  id: string;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface EditTaskType {
  taskId: string;
  taskTitle: string;
}
