import React, { FunctionComponent } from "react";

interface SnackbarProps {
  message: string;
  open: boolean;
}

const Snackbar: FunctionComponent<SnackbarProps> = ({ open, message }) => {
  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "black",
        padding: 12,
        border: "2px solid grey",
      }}
    >
      <p>{message}</p>
      <button>Close</button>
    </div>
  );
};

export default Snackbar;
