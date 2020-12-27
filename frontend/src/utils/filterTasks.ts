import { Filter } from "../state/Filter";
import { Task } from "../types";

function filterTasks(tasks: Task[], filter: Filter) {
  switch (filter) {
    case Filter.Completed:
      return tasks.filter((task) => task.completed);
    case Filter.Uncompleted:
      return tasks.filter((task) => !task.completed);
    case Filter.All:
    default:
      return tasks;
  }
}

export default filterTasks;
