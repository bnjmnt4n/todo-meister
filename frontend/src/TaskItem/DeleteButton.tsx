import { useState } from "react";
import { useHistory } from "react-router-dom";

import useDeleteTask from "../hooks/useDeleteTask";

type DeleteButtonProps = {
  taskId: number;
};

function DeleteButton({ taskId }: DeleteButtonProps) {
  const deleteTask = useDeleteTask(taskId);
  const history = useHistory();
  const [shouldShowConfirmation, setShouldShowConfirmation] = useState(false);

  // TODO: add better error handling logic in case of deletion errors.
  const handleClick = () => {
    if (!shouldShowConfirmation) {
      setShouldShowConfirmation(true);
    } else {
      deleteTask();
      // Redirect back to the main listing after deletion.
      history.push(`/tasks`);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>
        {shouldShowConfirmation ? "Confirm?" : "Delete task"}
      </button>
    </div>
  );
}

export default DeleteButton;
