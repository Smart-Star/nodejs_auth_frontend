import { type LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  href?: string;
  icon: LucideIcon;
  isActive: boolean;
  items?: {
    title: string;
    href: string;
    adminOnly?: boolean;
  }[];
}
