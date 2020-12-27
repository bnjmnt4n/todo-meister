import useTask from "./hooks/useTask";

type TaskItemRouteProps = {
  taskId: number;
};

function TaskItem({ taskId }: TaskItemRouteProps) {
  const { task, isLoading, error } = useTask(taskId);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error || !task) {
    return (
      <div>
        Unable to load task.
        {error || null}
      </div>
    );
  }

  return (
    <div>
      <input type="checkbox" checked={task.completed} />
      <h1>{task.name}</h1>
      <p>{task.description}</p>
    </div>
  );
}

export default TaskItem;
