import useUserTasks from "../hooks/useUserTasks";
import CreateNewTaskButton from "./CreateNewTaskButton";
import FilterMenu from "./FilterMenu";
import SortByMenu from "./SortByMenu";
import SortSettingsMenu from "./SortOrderMenu";
import TaskListItem from "./TaskListItem";

function TaskList() {
  const { tasks, isLoading, error } = useUserTasks();

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
      <FilterMenu />
      <SortByMenu />
      <SortSettingsMenu />
      <CreateNewTaskButton />
      {tasks.map((task) => (
        <TaskListItem key={task.id} {...task} />
      ))}
    </div>
  );
}

export default TaskList;
