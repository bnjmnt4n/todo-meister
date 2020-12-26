import React from "react";

type TaskItemRouteProps = {
  taskId: string;
};

function TaskItem({ taskId }: TaskItemRouteProps) {
  return <div>Task ID: {taskId}</div>;
}

export default TaskItem;
