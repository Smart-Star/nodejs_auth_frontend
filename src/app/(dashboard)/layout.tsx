import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { UserProfile } from "@/components/web/user-profile";
import { Header } from "@/components/web/header";
import { getSession } from "@/lib/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  const isAdmin = user?.role === "ADMIN";

  return (
    <SidebarProvider>
      <AppSidebar isAdmin={isAdmin} />
      <SidebarInset>
        <Header userProfile={<UserProfile />} />
        <main className='flex-1 p-6'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
