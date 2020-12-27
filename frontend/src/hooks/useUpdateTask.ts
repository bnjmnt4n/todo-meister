import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { Task } from "../types";
import getApiLocation from "../utils/getApiLocation";

function useUpdateTask(taskId: number) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: Partial<Task>) =>
      axios.put(getApiLocation(`/tasks/${taskId}`), data),
    {
      onSettled: () => {
        // Re-fetch the query after the mutation.
        queryClient.invalidateQueries("tasks");
      },
    }
  );
}

export default useUpdateTask;
