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
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import IconPerson from '@public/images/icons/user.png'
import IconEspeciality from '@public/images/icons/briefcase.png'
import IconCalendar from '@public/images/icons/calendar.png'
import IconClock from '@public/images/icons/clock.png'
import IconClose from '@public/images/icons/close.png'
import Link from 'next/link'
import { IAppointment } from 'src/interfaces'
import { formatDate, formatHour } from '@components/utils'

interface ModalProps {
  handleClose: (modal: string) => void
  open: any
  event: IAppointment
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})
export default function ModalDetails({ handleClose, open, event }: ModalProps) {
  const dateEvent = formatDate(event?.date) + " às " + formatHour(event?.date);
  return (
    <div>
      {event ? (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
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
              Detalhes da consulta
            </DialogTitle>
            <Image
              alt="no-alt"
              src={IconClose}
              onClick={() => handleClose("details")}
              className={styles.close}
              style={{ cursor: "pointer" }}
            />
          </div>
          <DialogContent style={{ paddingTop: "0px", paddingRight: "100px" }}>
            <DialogContentText className={styles.dialogSubtitle}>
              Informações do agendamento:
            </DialogContentText>
            <div className={styles.row}>
              <Image alt="no-alt" src={IconPerson} />
              <DialogContentText
                className={styles.dialogBody}
                style={{ marginRight: 20 }}
                sx={{
                  maxWidth: 250,
                }}
              >
                {event?.patient.name}
              </DialogContentText>
              <a
                target="_blank"
                href={`https://api.whatsapp.com/send?phone=${event?.patient.phoneNumber}&text=Lembrete:%20Voce%20tem%20uma%20consulta%20com%20Dr.${event?.professional?.name}%20agendada%20para%20${dateEvent}`}
              >
                <Typography className={styles.buttonSend}>
                  Enviar lembrete p/ o paciente
                </Typography>
              </a>
            </div>
            <div className={styles.row}>
              <Image alt="no-alt" src={IconPerson} />
              <DialogContentText
                className={styles.dialogBody}
                style={{ marginRight: 20 }}
              >
                {event?.professional?.name}
              </DialogContentText>
              <a
                target="_blank"
                href={`https://api.whatsapp.com/send?phone=${event?.professional?.phoneNumber}&text=Lembrete:%20Voce%20tem%20uma%20consulta%20com%20paciente%20${event?.patient.name}%20agendada%20para%20${dateEvent}`}
              >
                <Typography className={styles.buttonSend}>
                  Enviar lembrete p/ o profissional
                </Typography>
              </a>
            </div>

            <div className={styles.row}>
              <Image alt="no-alt" src={IconEspeciality} />
              <DialogContentText className={styles.dialogBody}>
                {event?.specialty.name}
              </DialogContentText>
            </div>
            <div className={styles.row}>
              <Image alt="no-alt" src={IconCalendar} />
              <DialogContentText className={styles.dialogBody}>
                {formatDate(event?.date)}
              </DialogContentText>
            </div>
            <div className={styles.row}>
              <Image alt="no-alt" src={IconClock} />
              <DialogContentText className={styles.dialogBody}>
                {formatHour(event?.date)}
              </DialogContentText>
            </div>
          </DialogContent>
          <DialogActions
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "20px",
            }}
          >
            <Button
              variant="text"
              className={styles.buttonDialog}
              onClick={() => handleClose("details")}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  );
}
