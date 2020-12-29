import { useFilter } from "../state/Filter";
import { useSortSettings } from "../state/SortSettings";
import filterTasks from "../utils/filterTasks";
import sortTasks from "../utils/sortTasks";
import useTasks from "./useTasks";

// useUserTasks provides a sorted and filtered list of tasks based on the user's
// configuration. TODO: think of a better name.
function useUserTasks() {
  const { isLoading, error, tasks } = useTasks();
  const { filter } = useFilter();
  const { sortBy, sortOrder } = useSortSettings();

  let userTasks = tasks;
  if (userTasks) {
    userTasks = filterTasks(userTasks, filter);
    userTasks = sortTasks(userTasks, sortBy, sortOrder);
  }

  return {
    tasks: userTasks,
    isLoading,
    error,
  };
}

export default useUserTasks;
