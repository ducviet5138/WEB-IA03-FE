import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../stores/toastSlice";
import { ToastProps } from "../props";
import { RootState } from "../stores";

const Toast: React.FC<ToastProps> = () => {
  const dispatch = useDispatch();
  const { message, status } = useSelector((state: RootState) => state.toast);
  const onClose = () => {
    dispatch(hideToast());
  };

  const severity = status || "success";

  return (
    <Snackbar open={true} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
