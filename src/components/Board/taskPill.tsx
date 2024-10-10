import { useNavigate } from "react-router-dom";
import { Task } from "../../types";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";
import { taskSlice } from "../../redux/tasksSlice";

interface iTaskPill {
  task: Task;
}

export const TaskPillCMP = ({ task }: iTaskPill) => {
  const moveTo = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (task: Task) => {
    dispatch(taskSlice.actions.deleteTask(task));
  };
  return (
    <li className={styles.taskPill}>
      <p
        onClick={() => {
          moveTo(`/react-kanban-board/Task/${task.taskType}/${task.taskId}`);
        }}
        className={styles.taskName}
      >
        {task.name}
      </p>
      <button
        className={styles.delBtn}
        onClick={() => {
          handleDelete(task);
        }}
      >
        X
      </button>
    </li>
  );
};
