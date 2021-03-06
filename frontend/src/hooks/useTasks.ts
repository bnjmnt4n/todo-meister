import { useQuery } from "react-query";

import { Task } from "../types";
import getApiLocation from "../utils/getApiLocation";

function useTasks() {
  const { isLoading, data, error } = useQuery<Task[]>("tasks", () =>
    fetch(getApiLocation("/tasks")).then((res) => res.json())
  );

  return {
    tasks: data,
    isLoading,
    error,
  };
}

export default useTasks;
