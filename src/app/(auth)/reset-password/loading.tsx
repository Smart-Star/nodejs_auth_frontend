import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <Skeleton className='overflow-hidden rounded-xl bg-card' />
      <Skeleton className='w-aut min-h-0 rounded-xl bg-card border border-muted/70 shadow-xs' />
    </div>
  );
}
