import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { Task } from "../types";
import getApiLocation from "../utils/getApiLocation";

function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation<Task, any, Partial<Task>, { previousTasks?: Task[] }>(
    (data) =>
      axios
        .post(getApiLocation("/tasks"), data)
        .then((response) => response?.data),
    {
      onMutate: async (data) => {
        // On mutation, cancel any outgoing fetches, so they don't overwrite our optimistic update.
        await queryClient.cancelQueries("tasks");

        // Snapshot the previous value.
        const previousTasks = queryClient.getQueryData<Task[]>("tasks");

        // Optimistically update to add the new task to our lists of tasks.
        if (previousTasks) {
          queryClient.setQueryData<Task[]>("tasks", [
            ...previousTasks,
            {
              ...data,
              id: Infinity,
              created_at: String(new Date),
              updated_at: String(new Date),
            } as Task
          ]);
        }

        return { previousTasks };
      },
      onError: (_err, _variables, context) => {
        // Roll back the optimistic update if the mutation fails.
        if (context?.previousTasks) {
          queryClient.setQueryData<Task[]>("tasks", context.previousTasks);
        }
      },
      onSuccess: async (data) => {
        const previousTasks = queryClient.getQueryData<Task[]>("tasks");

        // Add the task with the fresh data since previously there wasn't an ID.
        if (previousTasks) {
          queryClient.setQueryData<Task[]>("tasks", [
            ...previousTasks.filter((task) => !task.id),
            data as Task,
          ]);
        }
      },
    }
  );
}

export default useCreateTask;
