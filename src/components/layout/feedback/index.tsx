import React, { useContext } from 'react'
import { Alert, AlertProps, Snackbar } from '@mui/material'
import { useRouter } from 'next/router'
interface FeedBackProps {
  open: boolean
  messageType: AlertProps['severity']
  message: string
  handleClose: () => void
}
export default function FeedBack({
  open,
  messageType,
  message,
  handleClose,
}: FeedBackProps) {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={messageType}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}
