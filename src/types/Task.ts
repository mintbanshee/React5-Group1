// src/types/Task.ts

export type Task = {
  id?: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  imageUrl: string;
  isCompleted: boolean;
};

