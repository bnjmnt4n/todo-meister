export type Subtask = {
  id: number;
  name: string;
  completed: boolean;
  description: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};
