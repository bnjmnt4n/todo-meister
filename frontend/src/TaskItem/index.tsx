import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import useDeleteTask from "../hooks/useDeleteTask";
import useField from "../hooks/useField";
import useTask from "../hooks/useTask";
import useToggleTask from "../hooks/useToggleTask";
import useUpdateTask from "../hooks/useUpdateTask";
import DeleteButton from "./DeleteButton";

type TaskItemProps = {
  taskId: number;
};

function TaskItem({ taskId }: TaskItemProps) {
  const { task, isLoading, error } = useTask(taskId);
  const toggleTask = useToggleTask(taskId);
  const deleteTaskMutation = useDeleteTask(taskId);
  const updateTaskMutation = useUpdateTask(taskId);

  const history = useHistory();

  const handleCheckboxChange = () => task && toggleTask(task.completed);
  const handleDelete = () => deleteTaskMutation.mutate();

  // Used to handle updates to fields.
  const name = useField("name", task?.name);
  const description = useField("description", task?.description);
  const hasChanged = name.hasChanged || description.hasChanged;

  const handleUpdate = () => {
    updateTaskMutation.mutate({
      name: name.value,
      description: description.value,
    });
  };

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
      <h1>
        <input {...name} />
      </h1>

      <DeleteButton key={task.id} onDelete={handleDelete} />
      {deleteMessage && <div>{deleteMessage}</div>}

      {task.due_date && (
        <p>Due date: {new Date(Date.parse(task.due_date)).toDateString()}</p>
      )}

      {task.tags?.length ? (
        <div>
          Tags:
          {task.tags.map((tag) => (
            <p key={tag.id}>{tag.name}</p>
          ))}
        </div>
      ) : null}

      {task.subtasks?.length ? (
        <div>
          Subtasks:
          {task.subtasks.map((subtask) => (
            <p key={subtask.id}>{subtask.name}</p>
          ))}
        </div>
      ) : null}

      <p>
        <textarea {...description} />
      </p>

      {hasChanged && (
        <p>
          <button onClick={handleUpdate}>Update</button>
        </p>
      )}
    </div>
  );
}

export default TaskItem;
