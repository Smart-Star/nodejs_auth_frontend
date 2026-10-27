import {
  Image,
  LayoutDashboard,
  ListTodo,
  Settings2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { SidebarItem } from "@/types/sidebar.types";

export const section_cards = [
  {
    title: "Total Revenue",
    value: "$1,250.00",
    trend: "+12.5%",
    trendIcon: TrendingUp,
    summary: "Trending up this month",
    description: "Visitors for the last 6 months",
  },
  {
    title: "New Customers",
    value: "1,234",
    trend: "-20%",
    trendIcon: TrendingDown,
    summary: "Down 20% this period",
    description: "Acquisition needs attention",
  },
  {
    title: "Active Accounts",
    value: "45,678",
    trend: "+12.5%",
    trendIcon: TrendingUp,
    summary: "Strong user retention",
    description: "Engagement exceed targets",
  },
  {
    title: "Growth Rate",
    value: "4.5%",
    trend: "+4.5%",
    trendIcon: TrendingUp,
    summary: "Steady performance increase",
    description: "Meets growth projections",
  },
];

export const carousel_images = ["c-1.jpg", "c-2.jpg", "c-3.jpg", "c-4.jpg"];

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
