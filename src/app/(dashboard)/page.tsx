import { MockDataType } from "@/types/dashboard.types";
import { Gallery } from "@/components/dashboard/gallery";
import { columns } from "@/components/dashboard/columns";
import { DataTable } from "@/components/dashboard/data-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import { mock_data } from "@/components/constants/dashboard.constants";

async function getData(): Promise<MockDataType[]> {
  // Fetch data from your API here.

  const data = mock_data;
  return data;
}

export default async function DashboardPage() {
  const data = await getData();

  return (
    <div className='size-full flex flex-1 flex-col gap-6'>
      <SectionCards />
      <Gallery />

      <DataTable columns={columns} data={data} />
    </div>
  );
}
