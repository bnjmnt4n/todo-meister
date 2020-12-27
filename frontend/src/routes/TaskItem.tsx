import { useParams } from "react-router-dom";

import TaskItem from "../TaskItem";
import CreateNewTaskItem from "../TaskItem/CreateNewTaskItem";

function TaskItemRoute() {
  const { taskId } = useParams<{ taskId: string }>();
  const isNewTask = taskId === "new";

  return (
    <div>
      {isNewTask ? <CreateNewTaskItem /> : <TaskItem taskId={Number(taskId)} />}
    </div>
  );
}

export default TaskItemRoute;
