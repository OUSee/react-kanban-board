import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/LayOutCMP/Layout";
import { BoardsPage } from "./pages/BoardsPage";
import { TaskPage } from "./pages/TaskPage";
import { NotFoundPage } from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/react-kanban-board/" element={<Layout />}>
        <Route index element={<BoardsPage />} />
        <Route
          path="/react-kanban-board/Task/:type/:taskId"
          element={<TaskPage />}
        />
        <Route path="/react-kanban-board/*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
