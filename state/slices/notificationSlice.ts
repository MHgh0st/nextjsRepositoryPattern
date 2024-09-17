import type INotification from "@/types/public/INotification";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType } from "@/utils/data/NotificationType";

const initialState: INotification[] = [];

// {
//   id: "1",
//       visibility: false,
//     message: "",
//     duration: 0,
//     type: NotificationType.Success,
//     position: "",
//     created: new Date().toISOString(),
// };

const NotificationSlice = createSlice({
  name: "Notification",
  initialState,
  reducers: {
    pushNotification: (state, action: PayloadAction<INotification>) => {
      state.push(action.payload);
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});
export const { pushNotification, deleteNotification } =
  NotificationSlice.actions;
export default NotificationSlice.reducer;
