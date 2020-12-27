import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { Task } from "../types";
import getApiLocation from "../utils/getApiLocation";

function useDeleteTask(taskId: number) {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation(
    () => axios.delete(getApiLocation(`/tasks/${taskId}`)),
    {
      onMutate: async () => {
        // On mutation, cancel any outgoing fetches, so they don't overwrite our optimistic update.
        await queryClient.cancelQueries("tasks");

        // Snapshot the previous value.
        const previousTasks = queryClient.getQueryData<Task[]>("tasks");

        // Optimistically update to the new value.
        if (previousTasks) {
          queryClient.setQueryData<Task[]>(
            "tasks",
            // Remove the deleted task.
            previousTasks.filter((task) => task.id !== taskId)
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

  const mutate = () => {
    deleteTaskMutation.mutate();
  };

  return mutate;
}

export default useDeleteTask;
