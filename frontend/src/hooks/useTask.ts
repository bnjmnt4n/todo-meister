import { useQuery, useQueryClient } from "react-query";

import { Task } from "../types";
import getApiLocation from "../utils/getApiLocation";

function useTask(taskId: number) {
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery<Task>(
    ["tasks", taskId],
    () => fetch(getApiLocation(`/tasks/${taskId}`)).then((res) => res.json()),
    {
      initialData: () =>
        queryClient
          .getQueryData<Task[]>("tasks")
          ?.find?.((task) => task.id === taskId),
      initialDataUpdatedAt: () =>
        queryClient.getQueryState("tasks")?.dataUpdatedAt,
    }
  );

  return {
    task: data,
    isLoading,
    error,
  };
}

export default useTask;
