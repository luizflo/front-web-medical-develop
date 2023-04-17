import React, { useEffect, useState } from 'react'
import styles from './components.module.scss'
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
import IconPerson from 'public/images/icons/user.svg'
import IconEspeciality from '@public/images/icons/briefcase.svg'
import IconCalendar from '@public/images/icons/calendar.svg'
import IconClock from '@public/images/icons/clock.svg'
import IconClose from '@public/images/icons/close.svg'
import Link from 'next/link'

interface ModalProps {
  handleClose: (modal: string) => void
  open: any
  event: any
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
  const doctors = ['Jonathan Richard', 'Luiz Felipe', 'Bianca Canezin']
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
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: '20px',
              marginBottom: '0px',
            }}
          >
            <DialogTitle className={styles.dialogTitle}>
              Detalhes da consulta
            </DialogTitle>
            <IconClose
              onClick={() => handleClose('details')}
              style={{ cursor: 'pointer', marginTop: 10 }}
            />
          </div>
          <DialogContent style={{ paddingTop: '0px', paddingRight: '140px' }}>
            <DialogContentText className={styles.dialogSubtitle}>
              Informações do agendamento:
            </DialogContentText>
            <div className={styles.row}>
              <IconPerson />
              <DialogContentText
                className={styles.dialogBody}
                style={{ marginRight: 20 }}
              >
                {event.pacient}
              </DialogContentText>
            </div>
            <div className={styles.row}>
              <IconPerson />
              <DialogContentText
                className={styles.dialogBody}
                style={{ marginRight: 20 }}
              >
                {event.professional}
              </DialogContentText>
            </div>

            <div className={styles.row}>
              <IconEspeciality />
              <DialogContentText className={styles.dialogBody}>
                {event.body}
              </DialogContentText>
            </div>
            <div className={styles.row}>
              <IconCalendar />
              <DialogContentText className={styles.dialogBody}>
                {event.date}
              </DialogContentText>
            </div>
            <div className={styles.row}>
              <IconClock />
              <DialogContentText className={styles.dialogBody}>
                {event.hour}
              </DialogContentText>
            </div>
          </DialogContent>
          <DialogActions
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: '20px',
            }}
          >
            <Button
              variant="text"
              className={styles.buttonDialog}
              onClick={() => handleClose('details')}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  )
}
