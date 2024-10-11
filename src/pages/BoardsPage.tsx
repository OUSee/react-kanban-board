import { useSelector } from "react-redux";
import { Board } from "../components/Board/Board";
import { TaskType } from "../types";
import { RootState } from "../redux/store";
import { useMemo } from "react";

export const BoardsPage = () => {
  const unresolved = useSelector((state: RootState) => state.tasks.unresolved);
  const accepted = useSelector((state: RootState) => state.tasks.accepted);
  const inProgress = useSelector((state: RootState) => state.tasks.inProgress);
  const resolved = useSelector((state: RootState) => state.tasks.resolved);

  const boardsData = useMemo(() => {
    return [
      {
        key: TaskType.unresolved,
        type: TaskType.unresolved,
        tasks: unresolved,
        options: [],
      },
      {
        key: TaskType.accepted,
        type: TaskType.accepted,
        tasks: accepted,
        options: unresolved,
      },
      {
        key: TaskType.inProgress,
        type: TaskType.inProgress,
        tasks: inProgress,
        options: accepted,
      },
      {
        key: TaskType.resolved,
        type: TaskType.resolved,
        tasks: resolved,
        options: inProgress,
      },
    ];
  }, [unresolved, accepted, inProgress, resolved]);

  return (
    <div className="page">
      <div className="boardsTable">
        {boardsData.map((element) => {
          return (
            <Board
              key={element.key}
              type={element.type}
              tasks={element.tasks}
              options={element.options}
            />
          );
        })}
      </div>
    </div>
  );
};
