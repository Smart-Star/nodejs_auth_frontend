"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { SiteLogo } from "../web/site-logo";
import { LogoutButton } from "../auth/logout-button";
import { sidebar_nav_links } from "../constants/dashboard.constants";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isAdmin?: boolean;
}

export function AppSidebar({ isAdmin, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <div className='px-4 bg-card size-full'>
        <SidebarHeader className='py-3.5 border-b-2 border-primary'>
          <SiteLogo />
        </SidebarHeader>
        <SidebarContent>
          <NavMain navItems={sidebar_nav_links} isAdmin={isAdmin} />
        </SidebarContent>
      </div>

      <SidebarFooter className='bg-card pb-7 px-3'>
        <LogoutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
