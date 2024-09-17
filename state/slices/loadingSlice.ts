import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "isLoading",
  initialState: false,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return action.payload; // Return the new state for a primitive value like boolean
    },
  },
});

export const { setIsLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
