import useTasks from "./useTasks";
import { Identifiable, Task } from "../types";

function useTask(taskId: string) {
  const { isLoading, error, tasks } = useTasks();

  let task: Identifiable<Task> | undefined;
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
