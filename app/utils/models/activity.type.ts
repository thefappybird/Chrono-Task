export type Action =
  | "task:editing"
  | "task:create"
  | "task:update"
  | "task:delete";

export interface Activity {
  id: string;
  taskId: string;
  userId: string;
  action: Action;
  time: string;
}
