import { useParams } from "react-router-dom";
import { Task, TaskType } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { EditorCMP } from "../components/TaskEditor/TaskEditor";
import { useEffect, useState } from "react";

export const TaskPage = () => {
  const data = useParams();
  const taskID: string = data.taskId!;
  const type: string = data.type!;
  const accepted = useSelector((state: RootState) => state.tasks.accepted);
  const unresolved = useSelector((state: RootState) => state.tasks.unresolved);
  const inProgress = useSelector((state: RootState) => state.tasks.inProgress);
  const resolved = useSelector((state: RootState) => state.tasks.resolved);
  const [task, setTask] = useState<Task>();

  const figureTask = () => {
    switch (type) {
      case TaskType.accepted: {
        setTask(accepted.find((task: Task) => task.taskId === taskID));
        break;
      }
      case TaskType.unresolved: {
        setTask(unresolved.find((task: Task) => task.taskId === taskID));
        break;
      }
      case TaskType.inProgress: {
        setTask(inProgress.find((task: Task) => task.taskId === taskID));
        break;
      }
      case TaskType.resolved: {
        setTask(resolved.find((task: Task) => task.taskId === taskID));
        break;
      }
      default: {
        console.log("task not found");
        break;
      }
    }
  };

  useEffect(() => {
    figureTask();
  }, []);
  return (
    <div className="page">{task != undefined && <EditorCMP task={task} />}</div>
  );
};
