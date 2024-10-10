export enum TaskType {
  "unresolved" = "unresolved",
  "accepted" = "accepted",
  "inProgress" = "inProgress",
  "resolved" = "resolved",
}

export type Task = {
  taskId: string;
  name: string;
  description: string;
  taskType: TaskType;
};
