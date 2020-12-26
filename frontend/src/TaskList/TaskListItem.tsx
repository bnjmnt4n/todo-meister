import React from "react";
import { Task } from "../types";

type TaskListItemProps = { id: string } & Task;

function TaskListItem({ id, name, description, completed }: TaskListItemProps) {
  return (
    <div>
      <input type="checkbox" checked={completed} />
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
}

export default TaskListItem;
