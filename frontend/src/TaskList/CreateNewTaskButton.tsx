import { Link } from "react-router-dom";

function CreateNewTaskButton() {
  return (
    <div>
      <Link to="/tasks/new">Create new task</Link>
    </div>
  );
}

export default CreateNewTaskButton;
