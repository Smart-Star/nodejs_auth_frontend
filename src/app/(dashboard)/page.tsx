import { Gallery } from "@/components/dashboard/gallery";
import { SectionCards } from "@/components/dashboard/section-cards";

export default function DashboardPage() {
  return (
    <div className='size-full flex flex-1 flex-col gap-6'>
      <SectionCards />

      <Gallery />

      <div className='min-h-0 flex-1 rounded-xl bg-card border border-muted/70 shadow-xs' />
    </div>
  );
}
