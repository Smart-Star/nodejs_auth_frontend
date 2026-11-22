import { Gallery } from "@/components/dashboard/gallery";
import { columns } from "@/components/dashboard/columns";
import { getAllTaskAction } from "@/actions/task.actions";
import { DataTable } from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/dashboard/section-cards";

export default async function DashboardPage() {
  const tasks = await getAllTaskAction();
  const data = tasks.data ?? [];

  return (
    <div className='size-full flex flex-1 flex-col gap-6'>
      <SectionCards />
      <Gallery />

      <DataTable columns={columns} data={data} />
    </div>
  );
}
