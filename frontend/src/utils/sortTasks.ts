import { orderBy } from "lodash-es";

import { SortOrder } from "../state/SortOrder";
import { Task } from "../types";

function sortTasks(tasks: Task[], sortOrder: SortOrder) {
  switch (sortOrder) {
    case SortOrder.DueDate:
      return orderBy(
        tasks,
        (task) => (task.due_date ? Date.parse(task.due_date) : 0),
        "asc"
      );
    case SortOrder.UpdatedAt:
      return orderBy(tasks, (task) => Date.parse(task.updated_at), "asc");
    // Data returned from the backend API is already sorted by creation date by default.
    case SortOrder.CreatedAt:
    default:
      return tasks;
  }
}

export default sortTasks;
