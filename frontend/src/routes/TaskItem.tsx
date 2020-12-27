import { useParams } from "react-router-dom";

import TaskItem from "../TaskItem";
import CreateNewTaskItem from "../TaskItem/CreateNewTaskItem";
import TaskList from "../TaskList";

function TaskItemRoute() {
  const { taskId } = useParams<{ taskId: string }>();
  const isNewTask = taskId === "new";

  return (
    <div>
      <TaskList />
      {isNewTask ? <CreateNewTaskItem /> : <TaskItem taskId={Number(taskId)} />}
    </div>
  );
}

export default TaskItemRoute;
