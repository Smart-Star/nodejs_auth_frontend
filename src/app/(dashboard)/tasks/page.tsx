import { getAllTaskAction } from "@/actions/task.actions";
import { columns } from "@/components/dashboard/columns";
import { DataTable } from "@/components/dashboard/data-table";
import { CreateTasks } from "@/components/tasks/create-tasks";

export default async function TasksPage() {
  const tasks = await getAllTaskAction();
  const data = tasks.data ?? [];

  return (
    <div className='size-full flex flex-1 flex-col gap-6'>
      <CreateTasks />

      <DataTable columns={columns} data={data} />
    </div>
  );
}
