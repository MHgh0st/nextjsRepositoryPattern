import type INotification from "@/types/public/INotification";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "@/utils/data/NotificationType";

const initialState: INotification = {
  id: "1",
  visibility: false,
  message: "",
  duration: 0,
  type: NotificationType.Success,
  position: "",
  created: new Date(),
};

const NotificationSlice = createSlice({
  name: "Notification",
  initialState,
  reducers: {
    assign: (state, action: PayloadAction<INotification>) => {
      state.id = action.payload.id;
      state.visibility = action.payload.visibility;
      state.message = action.payload.message;
      state.duration = action.payload.duration;
      state.type = action.payload.type;
      state.position = action.payload.position;
      state.created = action.payload.created;
    },
    setVisibility: (state, action: PayloadAction<boolean>) => {
      state.visibility = action.payload;
    },
  },
});
export const { assign, setVisibility } = NotificationSlice.actions;
export default NotificationSlice.reducer;
