import { Tag } from "./Tag";

export type Task = {
  id: number;
  name: string;
  completed: boolean;
  description: string;
  due_date: string | null;
  tags: Tag[];
  created_at: string;
  updated_at: string;

  // TODO: subtasks.
};
