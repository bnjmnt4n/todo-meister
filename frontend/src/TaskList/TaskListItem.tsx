import { useHistory } from "react-router-dom";
import { Identifiable, Task } from "../types";

type TaskListItemProps = Identifiable<Task>;

function TaskListItem({ id, name, description, completed }: TaskListItemProps) {
  const history = useHistory();

  const handleClick = () => history.push(`/tasks/${id}`);

  return (
    <div>
      <input type="checkbox" checked={completed} />
      <div onClick={handleClick}>
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TaskListItem;
