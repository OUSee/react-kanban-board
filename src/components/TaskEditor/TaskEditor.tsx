import { useState } from "react";
import { Task } from "../../types";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { taskSlice } from "../../redux/tasksSlice";

interface iEditor {
  task: Task;
}

export const EditorCMP = ({ task }: iEditor) => {
  const dispatch = useDispatch();
  const moveTo = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [dataToChange, changeData] = useState({
    name: task.name,
    description: task.description,
  });

  const handleUpdateTask = () => {
    const updatedTask: Task = {
      name: dataToChange.name,
      description: dataToChange.description,
      taskId: task.taskId,
      taskType: task.taskType,
    };
    dispatch(taskSlice.actions.updateTask(updatedTask));
  };

  const handleAbort = () => {
    moveTo("/react-kanban-board/");
  };

  return (
    <div className={styles.container}>
      {!editMode && (
        <>
          <h2 className={styles.header}>{task?.name}</h2>
          <p className={styles.description}>
            {task?.description ? task.description : "No description provided"}
          </p>
          <div className={styles.options}>
            <button
              className={styles.optionButton}
              onClick={() => {
                setEditMode(true);
              }}
            >
              edit
            </button>
            <button
              className={styles.optionButton}
              onClick={() => {
                moveTo("/react-kanban-board/");
              }}
            >
              go back
            </button>
          </div>
        </>
      )}
      {editMode && (
        <form
          onSubmit={() => {
            handleUpdateTask();
          }}
          onReset={() => {
            handleAbort();
          }}
          className={styles.editform}
        >
          <input
            className={styles.textInput}
            type="text"
            name="taskName"
            value={dataToChange.name}
            onChange={(e) => {
              changeData({
                name: e.target.value,
                description: dataToChange.description,
              });
            }}
          />
          <textarea
            className={styles.desInput}
            name="description"
            id="edit-desc"
            placeholder="provide some description here"
            value={dataToChange.description}
            onChange={(e) => {
              changeData({
                name: dataToChange.name,
                description: e.target.value,
              });
            }}
          />
          <button type="submit" className={styles.optionButton}>
            save
          </button>
          <button type="reset" className={styles.optionButton}>
            decline changes
          </button>
        </form>
      )}
    </div>
  );
};
