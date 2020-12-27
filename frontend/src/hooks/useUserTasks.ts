import { useFilter } from "../state/Filter";
import { useSortOrder } from "../state/SortOrder";
import filterTasks from "../utils/filterTasks";
import sortTasks from "../utils/sortTasks";
import useTasks from "./useTasks";

// useUserTasks provides a sorted and filtered list of tasks based on the user's
// configuration. TODO: think of a better name.
function useUserTasks() {
  const { isLoading, error, tasks } = useTasks();
  const { filter } = useFilter();
  const { sortOrder } = useSortOrder();

  let userTasks = tasks;
  if (userTasks) {
    userTasks = filterTasks(userTasks, filter);
    userTasks = sortTasks(userTasks, sortOrder);
  }

  return {
    tasks: userTasks,
    isLoading,
    error,
  };
}

export default useUserTasks;
