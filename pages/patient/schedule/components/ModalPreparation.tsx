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
import IconPerson from '@public/images/icons/user.svg'
import IconEspeciality from '@public/images/icons/briefcase.svg'
import IconCalendar from '@public/images/icons/calendar.svg'
import IconClock from '@public/images/icons/clock.svg'
import IconClose from '@public/images/icons/close.svg'

interface ModalProps {
  handleClose(): any
  open: any
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})
export default function ModalPreparation({ handleClose, open }: ModalProps) {
  const doctors = ['Jonathan Richard', 'Luiz Felipe', 'Bianca Canezin']
  return (
    <div>
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
            Preparação da consulta
          </DialogTitle>
          <Image alt="no-alt" src={IconClose} />
        </div>
        <DialogContent style={{ paddingTop: '0px' }}>
          <DialogContentText className={styles.dialogSubtitle}>
            Informações para a sua consulta:
          </DialogContentText>
          <div className={styles.row}>
            <DialogContentText className={styles.dialogBody}>
              Certifique-se de ter uma conexão estável com a internet para realização da consulta online.
              <br />
              Busque estar em um ambiente tranquilo e particular, para que possa conversar sem interrupções com o médico durante a consulta.
            </DialogContentText>
          </div>
        </DialogContent>
        <DialogActions
          style={{ alignItems: 'center', justifyContent: 'center' }}
        >
          <Button className={styles.buttonDialog} onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
