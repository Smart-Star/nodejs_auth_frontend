import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='size-full flex flex-1 flex-col gap-6'>
      <Skeleton className='min-h-0 flex-1 rounded-xl bg-card border border-muted/70 shadow-xs' />
    </div>
  );
}
