import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

import { Task } from "../types";
import getApiLocation from "../utils/getApiLocation";

function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation<Task, any, Partial<Task>>(
    (data) =>
      axios
        .post(getApiLocation("/tasks"), data)
        .then((response) => response?.data),
    {
      onSettled: () => {
        // Re-fetch the query after the mutation.
        queryClient.invalidateQueries("tasks");
      },
    }
  );
}

export default useCreateTask;
