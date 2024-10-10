import { useSelector } from "react-redux";
import { Board } from "../components/Board/Board";
import { TaskType } from "../types";
import { RootState } from "../redux/store";

export const BoardsPage = () => {
  const unresolved = useSelector((state: RootState) => state.tasks.unresolved);
  const accepted = useSelector((state: RootState) => state.tasks.accepted);
  const inProgress = useSelector((state: RootState) => state.tasks.inProgress);
  const resolved = useSelector((state: RootState) => state.tasks.resolved);

  return (
    <div className="page">
      <div className="boardsTable">
        <Board
          key={TaskType.unresolved}
          type={TaskType.unresolved}
          tasks={unresolved}
          options={[]}
        />
        <Board
          key={TaskType.accepted}
          type={TaskType.accepted}
          tasks={accepted}
          options={unresolved}
        />
        <Board
          key={TaskType.inProgress}
          type={TaskType.inProgress}
          tasks={inProgress}
          options={accepted}
        />
        <Board
          key={TaskType.resolved}
          type={TaskType.resolved}
          tasks={resolved}
          options={inProgress}
        />
      </div>
    </div>
  );
};
