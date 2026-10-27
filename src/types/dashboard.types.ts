import { type LucideIcon } from "lucide-react";

export interface MockDataType {
  id: string;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
}

export interface TableActionsType {
  label: string;
  icon: LucideIcon;
  variant?: "default" | "destructive";
  onclick: () => void;
}
