import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ToastProps {
  status?: "success" | "error";
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ status, message, onClose }) => {
    if (!status) status = "success";

  return (
    <Snackbar open={true} autoHideDuration={3000} onClose={onClose}>
      <Alert onClose={onClose} severity={status} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
