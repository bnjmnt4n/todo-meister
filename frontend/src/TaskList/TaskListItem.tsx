import { useHistory } from "react-router-dom";
import { Identifiable, Task } from "../types";
import useToggleTask from "../hooks/useToggleTask";

type TaskListItemProps = Identifiable<Task>;

function TaskListItem({ id, name, description, completed }: TaskListItemProps) {
  const history = useHistory();
  const toggleTaskMutation = useToggleTask(id);

  const handleClick = () => history.push(`/tasks/${id}`);
  const handleChange = () => toggleTaskMutation(completed);

  return (
    <div>
      <input type="checkbox" checked={completed} onChange={handleChange} />
      <div onClick={handleClick}>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TaskListItem;
