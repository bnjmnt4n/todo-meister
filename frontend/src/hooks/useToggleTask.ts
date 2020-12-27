import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import { Task } from "../types";
import getApiLocation from "../utils/getApiLocation";
import useTask from "./useTask";

function useToggleTask(taskId: number) {
  const queryClient = useQueryClient();
  const { task: originalTask, isLoading, error } = useTask(taskId);

  const toggleTaskMutation = useMutation(
    (completed) => axios.put(getApiLocation(`/tasks/${taskId}`), { completed }),
    {
      onMutate: async (completed: boolean) => {
        // On mutation, cancel any outgoing fetches, so they don't overwrite our optimistic update.
        await queryClient.cancelQueries("tasks");

        // Snapshot the previous value.
        const previousTasks = queryClient.getQueryData<Task[]>("tasks");

        // Optimistically update to the new value.
        if (previousTasks) {
          queryClient.setQueryData<Task[]>(
            "tasks",
            previousTasks.map((task) => {
              if (task.id === taskId) {
                return {
                  ...task,
                  completed,
                };
              }

              return task;
            })
          );
        }

        return { previousTasks };
      },
      onError: (_err, _variables, context) => {
        // Roll back the optimistic update if the mutation fails.
        if (context?.previousTasks) {
          queryClient.setQueryData<Task[]>("tasks", context.previousTasks);
        }
      },
      onSettled: () => {
        // Re-fetch the query after the mutation, since toggling todos is a very common task.
        queryClient.invalidateQueries("tasks");
      },
    }
  );

  const mutate = (currState: boolean) => {
    if (!isLoading && !error && originalTask) {
      toggleTaskMutation.mutate(!currState);
    }
  };

  return mutate;
}

export default useToggleTask;
