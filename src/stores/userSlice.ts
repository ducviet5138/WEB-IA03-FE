import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    email: "",
  },
  reducers: {
    setValue: (state, action: PayloadAction<{ email: string }>
    ) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = "";
    }
  },
});

// Action creators are generated for each case reducer function
export const { setValue, logout } = userSlice.actions;

export default userSlice.reducer;
