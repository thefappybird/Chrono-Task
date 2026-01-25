export type ModalType = "create" | "edit" | "delete";
export type ViewType = "board" | "list" | "calendar";

export interface NavItem {
  icon: string;
  label: string;
  active?: boolean;
  badge?: number;
}

export interface Stat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
}

export interface Toast {
  id: string;
  description: string;
  type: "good" | "bad";
  timestamp: Date;
}
