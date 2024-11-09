import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Toast from "../components/Toast";
import React, { ReactNode } from "react";
import { ToastProps } from "../props";

interface ToastState extends ToastProps {
  toast: ReactNode | null;
}

const initialState: ToastState = {
  message: null,
  status: null,
  toast: null,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ message: string; status: "success" | "error" }>
    ) => {
      state.message = action.payload.message;
      state.status = action.payload.status;
      state.toast = React.createElement(Toast, {
        message: state.message,
        status: state.status,
      });
    },
    hideToast: (state) => {
      state.message = null;
      state.status = null;
      state.toast = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
