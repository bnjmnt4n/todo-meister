import React from "react";
import useTasks from "../hooks/useTasks";
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
        <TaskListItem id={task.id} {...task.attributes} />
      ))}
    </div>
  );
}

export default TaskList;
