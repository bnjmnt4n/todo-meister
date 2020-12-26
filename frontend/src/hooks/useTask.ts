import { Task } from "../types";
import useTasks from "./useTasks";

function useTask(taskId: string) {
  const { isLoading, error, tasks } = useTasks();

  let task: ({ id: string } & Task) | undefined;
  let rawTask = tasks && tasks.find((task) => task.id === taskId);
  if (rawTask) {
    task = { ...rawTask.attributes, id: taskId };
  }

  return {
    task,
    isLoading,
    error,
  };
}

export default useTask;
