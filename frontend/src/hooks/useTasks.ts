import { useQuery } from "react-query";
import { JsonApi, Task } from "../types";
import getApiLocation from "../utils/getApiLocation";

function useTasks() {
  const { isLoading, data, error } = useQuery<JsonApi<Task>>("tasks", () =>
    fetch(getApiLocation("/tasks")).then((res) => res.json())
  );

  const tasks = data?.data;

  return {
    tasks,
    isLoading,
    error,
  };
}

export default useTasks;
