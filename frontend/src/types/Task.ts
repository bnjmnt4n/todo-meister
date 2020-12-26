export type Task = {
  name: string;
  completed: boolean;
  description: string;
  ["due-date"]: string;

  // TODO: subtasks, tags.
};
