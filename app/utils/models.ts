export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in-progress" | "done";
export type ModalType = "create" | "edit" | "delete";
export type ViewType = "board" | "list" | "calendar";

export type Action =
  | "task:editing"
  | "task:create"
  | "task:update"
  | "task:delete";
export interface NavItem {
  icon: string;
  label: string;
  active?: boolean;
  badge?: number;
}

export interface Column {
  id: Status | string;
  title: string;
  date?: Date;
  tasks: Task[];
}

export interface Stat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: string;
}

export interface Activity {
  id: string;
  taskId: string;
  userId: string;
  action: Action;
  time: string;
}

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  Tasks: Task[];
}

export interface Task {
  id?: string;
  assignee?: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  position?: number;
}

export interface Toast {
  id: string;
  description: string;
  type: "good" | "bad";
  timestamp: Date;
}
