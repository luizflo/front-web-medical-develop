import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DialogAlertProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
  title: string;
  message: string;
}
export default function DialogAlert({
  open,
  handleClose,
  handleLogout,
  title,
  message,
}: DialogAlertProps) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose(false)}
            sx={{ fontSize: "14px", color: "#848d9f" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => handleLogout()}
            autoFocus
            sx={{ fontSize: "14px" }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
