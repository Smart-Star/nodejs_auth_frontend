"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "@/types/sidebar.types";

type Props = {
  isAdmin?: boolean;
  navItems: SidebarItem[];
};

export function NavMain({ isAdmin, navItems }: Props) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Management</SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((nav) => (
          <SidebarMenuItem key={nav.title}>
            {nav.items && nav.items.length > 0 ? (
              <Collapsible
                defaultOpen={nav.isActive}
                className='group/collapsible'>
                <CollapsibleTrigger
                  render={<SidebarMenuButton title={nav.title} />}>
                  {nav.icon && <nav.icon />}
                  <span>{nav.title}</span>
                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {nav.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          render={<a href={subItem.href} />}>
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuButton
                render={<a href={nav.href} />}
                title={nav.title}>
                {nav.icon && <nav.icon />}
                <span>{nav.title}</span>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
