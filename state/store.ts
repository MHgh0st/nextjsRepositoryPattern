import { configureStore } from "@reduxjs/toolkit";
import NotificationReducer from "@/state/slices/notificationSlice";
import loadingReducer from "@/state/slices/loadingSlice";
export const store = configureStore({
  reducer: {
    notification: NotificationReducer,
    isLoading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
