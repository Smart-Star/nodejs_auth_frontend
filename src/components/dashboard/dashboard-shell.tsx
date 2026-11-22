import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/web/header";
import { getSession } from "@/lib/session";

export default async function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  const isAdmin = user?.role === "ADMIN";

  return (
    <>
      <AppSidebar isAdmin={isAdmin} />
      <SidebarInset>
        <Header user={user} />
        <main className='flex-1 p-6'>{children}</main>
      </SidebarInset>
    </>
  );
}
