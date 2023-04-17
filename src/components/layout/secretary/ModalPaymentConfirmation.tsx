import React, { useEffect, useState } from "react";
import styles from "./agenda.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Grid,
  Typography,
  TextField,
  Box,
  MenuItem,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
  SelectChangeEvent,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import IconPerson from "@public/images/icons/user.svg";
import IconEspeciality from "@public/images/icons/briefcase.svg";
import IconCalendar from "@public/images/icons/calendar.svg";
import IconClock from "@public/images/icons/clock.svg";
import IconClose from "@public/images/icons/close.svg";
import { formatDate, formatHour } from "@components/utils";
import {
  getProfessionals,
  setProfessional,
  tooglePaid,
} from "src/api/appointment";

interface ModalProps {
  handleClose: (modal: string) => void;
  open: any;
  event: any;
  updateList: () => void;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ModalPaymentConfirmation({
  handleClose,
  open,
  event,
  updateList,
}: ModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paid, setPaid] = useState<boolean>(false);

  const handleTogglePaid = async () => {
    setIsLoading(true);
    const response = await tooglePaid(event.id);
    setIsLoading(false);
    updateList();
    handleClose("payment");
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose("payment")}
        // aria-describedby="alert-dialog-slide-description"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: "20px",
            marginBottom: "0px",
          }}
        >
          <DialogTitle className={styles.dialogTitle}>
            Confirmar Pagamento
          </DialogTitle>
          <IconClose
            onClick={() => handleClose("payment")}
            style={{ cursor: "pointer", marginTop: 10 }}
          />
        </div>
        <DialogContent style={{ paddingTop: "0px" }}>
          <DialogContentText className={styles.dialogSubtitle}>
            Confirme o pagamento para designar um profissional
          </DialogContentText>
          <Box className={styles.row}>
            <Checkbox
              checked={paid}
              onClick={() => setPaid(!paid)}
              size="medium"
            />
            <Typography variant="h4" className={styles.textNotification}>
              Comprovante de pagamento por pix recebido.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            disabled={!paid}
            className={styles.buttonDialog}
            onClick={() => handleTogglePaid()}
          >
            {isLoading ? <CircularProgress color="inherit" /> : "Confirmar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
