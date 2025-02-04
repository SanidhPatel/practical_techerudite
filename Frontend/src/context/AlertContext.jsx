import React, { createContext, useState, useContext } from "react";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: "",
    severity: "success",
  });

  const openSnackbar = (message, severity = "success") => {
    setSnackbar({ isOpen: true, message, severity });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, isOpen: false });
  };

  return (
    <SnackbarContext.Provider value={{ snackbar, openSnackbar, closeSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
