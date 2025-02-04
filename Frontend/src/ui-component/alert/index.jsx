import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSnackbar } from "../../context/AlertContext";

export default function SnackbarNotification() {
  const { snackbar, closeSnackbar } = useSnackbar();

  return (
    <Snackbar open={snackbar.isOpen} autoHideDuration={6000} onClose={closeSnackbar}>
      <Alert
        onClose={closeSnackbar}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
