export type Task = {
  id: number;
  name: string;
  completed: boolean;
  description: string;
  due_date: string | null;

  // TODO: subtasks, tags.
};
