import { useParams } from "react-router-dom";
import TaskItem from "../TaskItem";
import TaskList from "../TaskList";

function TaskItemRoute() {
  const { taskId } = useParams<{ taskId: string }>();

  return (
    <div>
      <TaskList />
      <TaskItem taskId={Number(taskId)} />
    </div>
  );
}

export default TaskItemRoute;
