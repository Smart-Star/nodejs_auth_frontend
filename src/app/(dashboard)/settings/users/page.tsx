import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function UsersSettingsPage() {
  const user = await getSession();

  if (user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className='size-full flex flex-1 flex-col gap-6'>
      <div className='h-full rounded-xl bg-card border border-muted/70 shadow-xs' />
      <div className='h-full rounded-xl bg-card border border-muted/70 shadow-xs' />
    </div>
  );
}
