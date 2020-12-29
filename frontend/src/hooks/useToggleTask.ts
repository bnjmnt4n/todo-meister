import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { Task } from "../types";
import getApiLocation from "../utils/getApiLocation";

function useToggleTask(taskId: number) {
  const queryClient = useQueryClient();

  const toggleTaskMutation = useMutation(
    (completed) => axios.put(getApiLocation(`/tasks/${taskId}`), { completed }),
    {
      onMutate: async (completed: boolean) => {
        // On mutation, cancel any outgoing fetches, so they don't overwrite our optimistic update.
        await queryClient.cancelQueries("tasks");
        await queryClient.cancelQueries(["tasks", taskId]);

        // Snapshot the previous values.
        const previousTasks = queryClient.getQueryData<Task[]>("tasks");
        const previousTask = queryClient.getQueryData<Task>(["tasks", taskId]);

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
        if (previousTask) {
          queryClient.setQueryData<Task>(["tasks", taskId], {
            ...previousTask,
            completed,
          });
        }

        // Callback function to roll back the optimistic update if the mutation fails.
        return () => {
          if (previousTasks) {
            queryClient.setQueryData<Task[]>("tasks", previousTasks);
          }
          if (previousTask) {
            queryClient.setQueryData<Task>(["tasks", taskId], previousTask);
          }
        };
      },
      onError: (_err, _variables, rollback) => rollback?.(),
    }
  );

  return (currState: boolean) => toggleTaskMutation.mutate(!currState);
}

export default useToggleTask;
