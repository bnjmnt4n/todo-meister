import useTasks from "./useTasks";

function useTask(taskId: number) {
  const { isLoading, error, tasks } = useTasks();

  const task = tasks && tasks.find((task) => task.id === taskId);
  console.log(tasks);
  console.log(task);

  return {
    task,
    isLoading,
    error,
  };
}

export default useTask;
