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

  const visibleNavItems = navItems.filter((nav) => {
    // If the category has sub-items, filter out the unauthorized sub-items
    const allowedSubItems = nav.items?.filter(
      (subItem) => !subItem.adminOnly || isAdmin,
    );

    // If sub-items but none are allowed for this user, hide the whole category
    if (nav.items && nav.items.length > 0 && allowedSubItems?.length === 0) {
      return false;
    }

    return true;
  });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Management</SidebarGroupLabel>
      <SidebarMenu>
        {visibleNavItems.map((nav) => {
          const allowedSubItems = nav.items?.filter(
            (subItem) => !subItem.adminOnly || isAdmin,
          );

          const hasSubItems = allowedSubItems && allowedSubItems.length > 0;

          // Check if this link or any of its children match the current URL
          const isCurrentActive =
            (nav.href && pathname === nav.href) ||
            (hasSubItems &&
              allowedSubItems.some((sub) => pathname === sub.href));

          return (
            <SidebarMenuItem key={nav.title}>
              {hasSubItems ? (
                <Collapsible
                  defaultOpen={isCurrentActive}
                  className='group/collapsible'>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton
                        title={nav.title}
                        // isActive={isCurrentActive}
                      />
                    }>
                    {nav.icon && <nav.icon />}
                    <span>{nav.title}</span>
                    <ChevronRight className='ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90' />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {allowedSubItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            render={<a href={subItem.href} />}
                            isActive={pathname === subItem.href}>
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
                  title={nav.title}
                  isActive={isCurrentActive}>
                  {nav.icon && <nav.icon />}
                  <span>{nav.title}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
