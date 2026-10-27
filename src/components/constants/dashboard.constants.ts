import { SidebarItem } from "@/types/sidebar.types";
import { Image, LayoutDashboard, ListTodo, Settings2 } from "lucide-react";

export const sidebar_nav_links: SidebarItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Tasks",
    icon: ListTodo,
    isActive: false,
    items: [
      {
        title: "My Tasks",
        href: "/tasks",
      },
      {
        title: "Users Tasks",
        href: "/admin/users-tasks",
        adminOnly: true,
      },
    ],
  },
  {
    title: "Banners",
    icon: Image,
    isActive: false,
    items: [
      {
        title: "Manage Banners",
        href: "/admin/banners",
        adminOnly: true,
      },
    ],
  },
  {
    title: "Settings",
    icon: Settings2,
    isActive: false,
    items: [
      {
        title: "General",
        href: "/settings",
      },
      {
        title: "Users",
        href: "/settings/users",
        adminOnly: true,
      },
      {
        title: "Changelog",
        href: "/settings/changelog",
        adminOnly: true,
      },
    ],
  },
];
