import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import useCreateTask from "../hooks/useCreateTask";
import useField from "../hooks/useField";

function CreateNewTaskItem() {
  const createTaskMutation = useCreateTask();

  const history = useHistory();

  // Used to handle updates to fields.
  const name = useField("name");
  const description = useField("description");
  const hasChanged = name.hasChanged || description.hasChanged;

  const handleCreate = () => {
    createTaskMutation.mutate({
      name: name.value,
      completed: false,
      description: description.value,
    });
  };

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      const newTaskId = createTaskMutation.data?.id;
      console.log(createTaskMutation.data);
      // Redirect to the new task after deletion.
      if (newTaskId !== undefined) {
        history.push(`/tasks/${newTaskId}`);
      }
    }
  }, [history, createTaskMutation.isSuccess, createTaskMutation.data]);

  let errorMessage: string | null = null;
  if (createTaskMutation.isError) {
    errorMessage = "Failed to create task";
  }

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}

      <h1>
        <input {...name} />
      </h1>

      <p>
        <textarea {...description} />
      </p>

      {hasChanged && (
        <p>
          <button onClick={handleCreate}>Create new task</button>
        </p>
      )}
    </div>
  );
}

export default CreateNewTaskItem;
