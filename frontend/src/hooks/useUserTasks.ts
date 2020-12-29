import { useFilter } from "../state/Filter";
import { useSortSettings } from "../state/SortSettings";
import { useTagFilter } from "../state/TagFilter";
import filterTags from "../utils/filterTags";
import filterTasks from "../utils/filterTasks";
import sortTasks from "../utils/sortTasks";
import useTasks from "./useTasks";

// useUserTasks provides a sorted and filtered list of tasks based on the user's
// configuration. TODO: think of a better name.
function useUserTasks() {
  const { isLoading, error, tasks } = useTasks();
  const { filter } = useFilter();
  const { tags } = useTagFilter();
  const { sortBy, sortOrder } = useSortSettings();

  let userTasks = tasks;
  if (userTasks) {
    userTasks = filterTasks(userTasks, filter);
    userTasks = filterTags(userTasks, tags);
    userTasks = sortTasks(userTasks, sortBy, sortOrder);
  }

  return {
    tasks: userTasks,
    isLoading,
    error,
  };
}

export default useUserTasks;
