import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
