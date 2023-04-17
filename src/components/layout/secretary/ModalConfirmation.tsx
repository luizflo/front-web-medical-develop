import React, { useEffect, useState } from 'react'
import styles from './agenda.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
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
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import IconPerson from '@public/images/icons/user.svg'
import IconEspeciality from '@public/images/icons/briefcase.svg'
import IconCalendar from '@public/images/icons/calendar.svg'
import IconClock from '@public/images/icons/clock.svg'
import IconClose from '@public/images/icons/close.svg'
import { formatDate, formatHour } from '@components/utils'
import { getProfessionals, setProfessional } from 'src/api/appointment'
import { FeedBackProps, IAppointment } from "src/interfaces";

interface ModalProps {
  handleClose: (modal: string) => void;
  open: any;
  event: IAppointment;
  updateList: () => void;
  setFeedback: React.Dispatch<React.SetStateAction<FeedBackProps>>
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ModalConfirmation({
  handleClose,
  open,
  event,
  updateList,
  setFeedback,
}: ModalProps) {
  const doctors = ["Jonathan Richard", "Luiz Felipe", "Bianca Canezin"];
  const [professionalList, setProfessionalList] = useState<any>([]);
  const [professionalSelected, setProfessionalSelected] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProfessionalsList = async () => {
    if (event) {
      const response = await getProfessionals(event?.specialtyId);
      setProfessionalList(response);
    }
  };

  const handleSelect = (event: SelectChangeEvent) => {
    setProfessionalSelected(event.target.value);
  };

  const handleConfirmation = async () => {
    setIsLoading(true);
    const response = await setProfessional(event.id, professionalSelected);
    if (response.status) {
      setFeedback({
        feedbackType: "error",
        feedbackIsOpen: true,
        feedBack: response.message,
      });
      setIsLoading(true);
    }else {
      setFeedback({
        feedbackType: "success",
        feedbackIsOpen: true,
        feedBack: "Profissional designado com sucesso!",
      });
      setIsLoading(false);
      updateList();
      handleClose("confirmation");

    }
  };

  useEffect(() => {
    getProfessionalsList();
  }, [event]);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose("confirmation")}
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
            Escolha um profissional
          </DialogTitle>
          <IconClose
            onClick={() => handleClose("confirmation")}
            style={{ cursor: "pointer", marginTop: 10 }}
          />
        </div>
        <DialogContent style={{ paddingTop: "0px" }}>
          <DialogContentText className={styles.dialogSubtitle}>
            Informações do agendamento:
          </DialogContentText>
          <div className={styles.row}>
            <IconPerson />
            <DialogContentText className={styles.dialogBody}>
              {event?.patient.name}
            </DialogContentText>
          </div>
          <div className={styles.row}>
            <IconEspeciality />
            <DialogContentText className={styles.dialogBody}>
              {event?.specialty.name}
            </DialogContentText>
          </div>
          <div className={styles.row}>
            <IconCalendar />
            <DialogContentText className={styles.dialogBody}>
              {formatDate(event?.date)}
            </DialogContentText>
          </div>
          <div className={styles.row}>
            <IconClock />
            <DialogContentText className={styles.dialogBody}>
              {formatHour(event?.date)}
            </DialogContentText>
          </div>
          <DialogContentText className={styles.dialogSelectTitle}>
            Selecione o profissional com escala no horário marcado:
          </DialogContentText>
          <Select
            value={professionalSelected}
            className={styles.select}
            onChange={handleSelect}
          >
            {professionalList.map((professional: any) => (
              <MenuItem
                key={professional.id}
                value={professional.id}
                style={{ fontSize: 20 }}
              >
                {professional?.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            disabled={professionalSelected === "" ? true : false}
            className={styles.buttonDialog}
            onClick={() => handleConfirmation()}
          >
            {isLoading ? <CircularProgress color="inherit" /> : "Confirmar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
