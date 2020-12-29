import { orderBy } from "lodash-es";

import { SortBy, SortOrder } from "../state/SortSettings";
import { Task } from "../types";

function sortTasks(tasks: Task[], sortBy: SortBy, sortOrder: SortOrder) {
  const order = sortOrder === SortOrder.Ascending ? "asc" : "desc";

  switch (sortBy) {
    case SortBy.DueDate:
      return orderBy(
        tasks,
        [
          // Sort by due date first, followed by updated date for tasks without due date.
          (task) => {
            if (task.due_date) {
              return Date.parse(task.due_date);
            } else {
              // Always place tasks without due date at the bottom.
              return sortOrder === SortOrder.Ascending ? Infinity : -Infinity;
            }
          },
          (task) => Date.parse(task.updated_at),
        ],
        [order, order]
      );
    case SortBy.UpdatedAt:
      return orderBy(tasks, (task) => Date.parse(task.updated_at), order);
    // Data returned from the backend API is already sorted by creation date by default.
    case SortBy.CreatedAt:
    default:
      return sortOrder === SortOrder.Ascending
        ? tasks
        : orderBy(tasks, (task) => Date.parse(task.created_at), order);
  }
}

export default sortTasks;
