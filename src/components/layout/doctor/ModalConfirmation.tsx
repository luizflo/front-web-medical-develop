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
import IconPerson from '@public/images/icons/user.svg'
import IconEspeciality from '@public/images/icons/briefcase.svg'
import IconCalendar from '@public/images/icons/calendar.svg'
import IconClock from '@public/images/icons/clock.svg'
import IconClose from '@public/images/icons/close.svg'

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
export default function ModalConfirmation({ handleClose, open }: ModalProps) {
  const doctors = ['Jonathan Richard', 'Luiz Felipe', 'Bianca Canezin']
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        // aria-describedby="alert-dialog-slide-description"
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
            Escolha um profissional
          </DialogTitle>
          <IconClose
            onClick={() => handleClose('confirmation')}
            style={{ cursor: 'pointer', marginTop: 10 }}
          />
        </div>
        <DialogContent style={{ paddingTop: '0px' }}>
          <DialogContentText className={styles.dialogSubtitle}>
            Informações do agendamento:
          </DialogContentText>
          <div className={styles.row}>
            <IconPerson />
            <DialogContentText className={styles.dialogBody}>
              Jonathan Richard
            </DialogContentText>
          </div>
          <div className={styles.row}>
            <IconEspeciality />
            <DialogContentText className={styles.dialogBody}>
              Psiquiatria
            </DialogContentText>
          </div>
          <div className={styles.row}>
            <IconCalendar />
            <DialogContentText className={styles.dialogBody}>
              08/07/2022
            </DialogContentText>
          </div>
          <div className={styles.row}>
            <IconClock />
            <DialogContentText className={styles.dialogBody}>
              09:30
            </DialogContentText>
          </div>
          <DialogContentText className={styles.dialogSelectTitle}>
            Selecione o profissional com escala no horário marcado:
          </DialogContentText>
          <Select className={styles.select}>
            {doctors.map((name) => (
              <MenuItem key={name} value={name} style={{ fontSize: 20 }}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            className={styles.buttonDialog}
            onClick={() => handleClose('confirmation')}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
