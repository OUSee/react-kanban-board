import { Task, TaskType } from "../../types";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { taskSlice } from "../../redux/tasksSlice";
import { TaskPillCMP } from "./taskPill";
import { OptionsTooltipCMP } from "./optionsTooltip";

interface iBoard {
  type: TaskType;
  tasks: Task[];
  options: Task[];
}

export const Board = ({ type, tasks, options }: iBoard) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [visible, setVisible] = useState(styles.hidden);
  const [inactive, setInactive] = useState(styles.inactive);

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    if (data.name != "") {
      dispatch(taskSlice.actions.addTask(data.name));
    }
    setEditMode(false);
  };

  const handleMoveClick = (task: Task) => {
    dispatch(taskSlice.actions.moveTo(task));
    setVisible(styles.hidden);
    setEditMode(false);
  };

  const handleAbort = () => {
    setVisible(styles.hidden);
    setEditMode(false);
  };

  useEffect(() => {
    if (options.length > 0 || type == TaskType.unresolved) {
      setInactive(styles.active);
    } else {
      setInactive(styles.inactive);
    }
  }, [options]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{type.toUpperCase()}</h2>
      <ul className={styles.tasksList}>
        {tasks.length > 0 &&
          tasks.map((task) => {
            return <TaskPillCMP key={task.taskId} task={task} />;
          })}
        {tasks.length < 0 && <p className={styles.taskName}>No tasks</p>}
      </ul>
      {!editMode && (
        <button
          className={styles.addTaskBTN + " " + inactive}
          onClick={() => {
            if (options.length > 0 || type == TaskType.unresolved) {
              setEditMode(true);
              setVisible(styles.visible);
            }
          }}
        >
          new task
        </button>
      )}
      {editMode && type == TaskType.unresolved && (
        <form className={styles.addTaskForm} onSubmit={handleAddTask}>
          <input
            autoFocus
            type="text"
            id="name"
            name="name"
            className={styles.addTaskInput}
          />
          <button type="submit" className={styles.submitAddTask}>
            add task
          </button>
        </form>
      )}

      {options.length > 0 && editMode && (
        <OptionsTooltipCMP
          handleMoveClick={handleMoveClick}
          options={options}
          className={visible}
          handleAbort={handleAbort}
        />
      )}
    </div>
  );
};
