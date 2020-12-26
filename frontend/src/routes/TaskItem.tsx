import React from "react";
import { useParams } from "react-router-dom";

function TaskItemRoute() {
  const { taskId } = useParams<{ taskId: string }>();

  return <div>Task Item page. Task ID: {taskId}</div>;
}

export default TaskItemRoute;
