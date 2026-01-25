export interface OptimisticError extends Error {
  optimistic?: boolean;
  id?: string;
  action?: "create" | "update" | "delete";
  reason?: string;
}
