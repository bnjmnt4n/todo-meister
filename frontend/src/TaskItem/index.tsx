import useTask from "../hooks/useTask";
import DeleteButton from "./DeleteButton";

type TaskItemProps = {
  taskId: number;
};

function TaskItem({ taskId }: TaskItemProps) {
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
      <DeleteButton taskId={task.id} />
      <h1>{task.name}</h1>
      <p>{task.description}</p>
    </div>
  );
}

export default TaskItem;
