import React, { useEffect, useState } from 'react'
import styles from './patient.module.scss'
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
  CircularProgress,
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
  link: string
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})
export default function ModalQuestionaire({
  handleClose,
  open,
  link,
}: ModalProps) {
  const doctors = ['Jonathan Richard', 'Luiz Felipe', 'Bianca Canezin']
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullScreen
      className={styles.dialog}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {isLoading ? (
          <CircularProgress
            color="primary"
            sx={{ marginTop: 5, zIndex: 100 }}
          />
        ) : null}
        <iframe
          src={link}
          width={900}
          height={2914}
          onLoad={() => setIsLoading(false)}
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
        >
          Carregando…
        </iframe>
      </DialogContent>

      <DialogActions
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '20px',
        }}
      >
        <Button
          className={styles.buttonDialog}
          onClick={() => handleClose('confirmation')}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
