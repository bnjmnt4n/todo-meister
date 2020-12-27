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
            data as Task,
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
    }
  );
}

export default useCreateTask;
