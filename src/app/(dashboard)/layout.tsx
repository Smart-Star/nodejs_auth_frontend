import Loading from "./loading";
import { Suspense } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Suspense fallback={<Loading />}>
        <DashboardShell>{children}</DashboardShell>
      </Suspense>
    </SidebarProvider>
  );
}
