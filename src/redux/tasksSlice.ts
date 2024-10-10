import { createSlice } from "@reduxjs/toolkit";
import { Task, TaskType } from "../types";
import { v4 as uuidv4 } from "uuid";

type TasksState = {
  unresolved: Task[];
  accepted: Task[];
  inProgress: Task[];
  resolved: Task[];
};

const initialState: TasksState = {
  unresolved: localStorage.getItem(TaskType.unresolved)
    ? JSON.parse(localStorage.getItem(TaskType.unresolved)!)
    : [],
  accepted: localStorage.getItem(TaskType.accepted)
    ? JSON.parse(localStorage.getItem(TaskType.accepted)!)
    : [],
  inProgress: localStorage.getItem(TaskType.inProgress)
    ? JSON.parse(localStorage.getItem(TaskType.inProgress)!)
    : [],
  resolved: localStorage.getItem(TaskType.resolved)
    ? JSON.parse(localStorage.getItem(TaskType.resolved)!)
    : [],
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // name as payload
    addTask(state, action) {
      const newTask: Task = {
        taskId: uuidv4(),
        name: action.payload as string,
        taskType: TaskType.unresolved,
        description: "",
      };
      console.log("====================================");
      console.log("added a task", newTask);
      console.log("====================================");
      state.unresolved.push(newTask);
      updateStorage(TaskType.unresolved, state.unresolved);
    },
    // task as payload
    moveTo(state, action) {
      switch (action.payload.taskType) {
        case TaskType.unresolved: {
          const newTask: Task = {
            taskId: action.payload.taskId,
            name: action.payload.name,
            taskType: TaskType.accepted,
            description: action.payload.description,
          };
          state.unresolved = state.unresolved.filter((task: Task) => {
            if (task.taskId != newTask.taskId) return task;
          });
          state.accepted.push(newTask);
          updateStorage(TaskType.unresolved, state.unresolved);
          updateStorage(TaskType.accepted, state.accepted);
          break;
        }
        case TaskType.accepted: {
          const newTask: Task = {
            taskId: action.payload.taskId,
            name: action.payload.name,
            taskType: TaskType.inProgress,
            description: action.payload.description,
          };
          state.accepted = state.accepted.filter((task: Task) => {
            if (task.taskId != newTask.taskId) return task;
          });
          state.inProgress.push(newTask);
          updateStorage(TaskType.accepted, state.accepted);
          updateStorage(TaskType.inProgress, state.inProgress);
          break;
        }
        case TaskType.inProgress: {
          const newTask: Task = {
            taskId: action.payload.taskId,
            name: action.payload.name,
            taskType: TaskType.resolved,
            description: action.payload.description,
          };
          state.inProgress = state.inProgress.filter((task: Task) => {
            if (task.taskId != newTask.taskId) return task;
          });
          state.resolved.push(newTask);
          updateStorage(TaskType.inProgress, state.inProgress);
          updateStorage(TaskType.resolved, state.resolved);
          break;
        }
        default: {
          alert("err in store in move-to");
          break;
        }
      }
    },
    // task as payload
    updateTask(state, action) {
      switch (action.payload.taskType) {
        case TaskType.unresolved: {
          state.unresolved = state.unresolved.map((task: Task) => {
            if (task.taskId == action.payload.taskId) {
              return action.payload;
            } else return task;
          });
          updateStorage(TaskType.unresolved, state.unresolved);
          break;
        }
        case TaskType.accepted: {
          state.accepted = state.accepted.map((task: Task) => {
            if (task.taskId == action.payload.taskId) {
              return action.payload;
            } else return task;
          });
          updateStorage(TaskType.accepted, state.accepted);
          break;
        }
        case TaskType.inProgress: {
          state.inProgress = state.inProgress.map((task: Task) => {
            if (task.taskId == action.payload.taskId) {
              return action.payload;
            } else return task;
          });
          updateStorage(TaskType.inProgress, state.inProgress);
          break;
        }
        case TaskType.resolved: {
          state.resolved = state.resolved.map((task: Task) => {
            if (task.taskId == action.payload.taskId) {
              return action.payload;
            } else return task;
          });
          updateStorage(TaskType.resolved, state.resolved);
          break;
        }
        default: {
          alert("err in store in update-task");
          break;
        }
      }
    },
    // task as payload
    deleteTask(state, action) {
      switch (action.payload.taskType) {
        case TaskType.unresolved: {
          state.unresolved = state.unresolved.filter(
            (task: Task) => task.taskId != action.payload.taskId
          );
          updateStorage(TaskType.unresolved, state.unresolved);
          break;
        }
        case TaskType.accepted: {
          state.accepted = state.accepted.filter((task: Task) => {
            if (task.taskId != action.payload.taskId) return task;
          });
          updateStorage(TaskType.accepted, state.accepted);
          break;
        }
        case TaskType.inProgress: {
          state.inProgress = state.inProgress.filter(
            (task: Task) => task.taskId != action.payload.taskId
          );
          updateStorage(TaskType.inProgress, state.inProgress);
          break;
        }
        case TaskType.resolved: {
          state.resolved = state.resolved.filter(
            (task: Task) => task.taskId != action.payload.taskId
          );
          updateStorage(TaskType.resolved, state.resolved);
          break;
        }
        default: {
          alert("err in store in delete-task");
        }
      }
    },
  },
});

export const updateStorage = (type: TaskType, load: Task[]) => {
  localStorage.setItem(type, JSON.stringify(load));
};
