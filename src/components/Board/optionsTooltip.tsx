import { Task } from "../../types";
import styles from "./styles.module.css";

interface iOptionsTooltip {
  className: string;
  options: Task[];
  handleMoveClick(task: Task): void;
  handleAbort(): void;
}

export const OptionsTooltipCMP = ({
  className,
  options,
  handleMoveClick,
  handleAbort,
}: iOptionsTooltip) => {
  return (
    <div className={styles.tooltip + " " + className}>
      <ul className={styles.optionsList}>
        {options.map((element: Task) => {
          return (
            <li
              onClick={() => {
                handleMoveClick(element);
              }}
              key={`op${element.taskId}`}
              className={styles.option}
            >
              {element.name}
            </li>
          );
        })}
      </ul>
      <button className={styles.abortBtn} onClick={handleAbort}>
        cancel
      </button>
    </div>
  );
};
