export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in-progress" | "done";

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

export interface Column {
  id: Status | string;
  title: string;
  date?: Date;
  tasks: Task[];
}
