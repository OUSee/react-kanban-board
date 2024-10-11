import { useParams } from "react-router-dom";
import { Task, TaskType } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { EditorCMP } from "../components/TaskEditor/TaskEditor";
import { useEffect, useState } from "react";

export const TaskPage = () => {
  const data = useParams();
  const taskID: string = data.taskId!;
  const taskType: string = data.type!;
  const accepted = useSelector((state: RootState) => state.tasks.accepted);
  const unresolved = useSelector((state: RootState) => state.tasks.unresolved);
  const inProgress = useSelector((state: RootState) => state.tasks.inProgress);
  const resolved = useSelector((state: RootState) => state.tasks.resolved);
  const [task, setTask] = useState<Task>();

  const figureTask = (arr: Task[]) => {
    setTask(arr.find((task: Task) => task.taskId === taskID));
  };

  useEffect(() => {
    switch (taskType) {
      case TaskType.unresolved: {
        figureTask(unresolved);
        break;
      }
      case TaskType.accepted: {
        figureTask(accepted);
        break;
      }
      case TaskType.inProgress: {
        figureTask(inProgress);
        break;
      }
      case TaskType.resolved: {
        figureTask(resolved);
      }
    }
  }, []);

  return (
    <div className="page">{task != undefined && <EditorCMP task={task} />}</div>
  );
};
