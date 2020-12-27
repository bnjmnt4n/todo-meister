import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import useDeleteTask from "../hooks/useDeleteTask";
import useTask from "../hooks/useTask";
import useToggleTask from "../hooks/useToggleTask";
import DeleteButton from "./DeleteButton";

type TaskItemProps = {
  taskId: number;
};

function TaskItem({ taskId }: TaskItemProps) {
  const { task, isLoading, error } = useTask(taskId);
  const toggleTask = useToggleTask(taskId);
  const deleteTaskMutation = useDeleteTask(taskId);

  const history = useHistory();

  const handleCheckboxChange = () => task && toggleTask(task.completed);
  const handleDelete = () => deleteTaskMutation.mutate();

  useEffect(() => {
    if (deleteTaskMutation.isSuccess) {
      // Redirect back to the main listing after deletion.
      history.push("/tasks");
    }
  }, [history, deleteTaskMutation.isSuccess]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !task) {
    return (
      <>
        <p>Unable to load task.</p>
        {error && <p>{error as any}</p>}
        <p>
          <Link to="/">Return home?</Link>
        </p>
      </>
    );
  }

  let deleteMessage: string | null = null;
  if (deleteTaskMutation.isLoading) {
    deleteMessage = "Deleting...";
  } else if (deleteTaskMutation.isError) {
    deleteMessage = "Error deleting task";
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleCheckboxChange}
      />
      <h1>{task.name}</h1>

      <DeleteButton key={task.id} onDelete={handleDelete} />
      {deleteMessage && <div>{deleteMessage}</div>}

      <p>{task.description}</p>
    </div>
  );
}

export default TaskItem;
