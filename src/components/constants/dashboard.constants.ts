import {
  Image,
  LayoutDashboard,
  ListTodo,
  Settings2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { SidebarItem } from "@/types/sidebar.types";
import { MockDataType } from "@/types/dashboard.types";

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

export const mock_data: MockDataType[] = [
  {
    id: 1,
    header: "Executive Summary & Objectives",
    type: "Executive Summary",
    status: "Done",
    target: "5",
    limit: "10",
    reviewer: "Eddie Lake",
  },
  {
    id: 2,
    header: "Technical Architecture Overview",
    type: "Technical Approach",
    status: "In Progress",
    target: "12",
    limit: "20",
    reviewer: "Assign reviewer",
  },
  {
    id: 3,
    header: "System Design & UI Wireframes",
    type: "Design",
    status: "Done",
    target: "8",
    limit: "15",
    reviewer: "Jamik Tashpulatov",
  },
  {
    id: 4,
    header: "Key Core Capabilities & Features",
    type: "Capabilities",
    status: "Not Started",
    target: "3",
    limit: "10",
    reviewer: "Assign reviewer",
  },
  {
    id: 5,
    header: "Compliance & Security Narrative",
    type: "Narrative",
    status: "In Progress",
    target: "6",
    limit: "12",
    reviewer: "Eddie Lake",
  },
];

/* 
{
  id: "728ed52f",
  amount: 100,
  status: "pending",
  email: "m@example.com",
},
*/
