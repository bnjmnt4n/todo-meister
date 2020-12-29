import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import getApiLocation from "../utils/getApiLocation";

function useDeleteTask(taskId: number) {
  const queryClient = useQueryClient();

  return useMutation(() => axios.delete(getApiLocation(`/tasks/${taskId}`)), {
    // TODO: optimistic updates
    onSettled: () => {
      // Re-fetch the query after the mutation.
      queryClient.invalidateQueries("tasks");
    },
  });
}

export default useDeleteTask;
