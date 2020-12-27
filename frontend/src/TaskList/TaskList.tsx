import useTasks from "../hooks/useTasks";
import CreateNewTaskButton from "./CreateNewTaskButton";
import TaskListItem from "./TaskListItem";

function TaskList() {
  const { tasks, isLoading, error } = useTasks();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error || !tasks) {
    return (
      <div>
        Unable to load tasks.
        {error || null}
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskListItem key={task.id} {...task} />
      ))}
      <CreateNewTaskButton />
    </div>
  );
}

export default TaskList;
