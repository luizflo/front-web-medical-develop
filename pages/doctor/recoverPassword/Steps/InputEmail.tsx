import React, { useEffect, useState } from 'react'
import styles from '../recoverPassword.module.scss'
import {
  Button,
  Grid,
  Typography,
} from '@mui/material'

export default function InputEmail({ onClick }: any) {


  return (
    <Grid >
      <Typography className={styles.title}>
        Recuperar senha
      </Typography>
      <Typography className={styles.subtitle}>Digite o email cadastrado que enviaremos um código de recuperação da sua senha</Typography>

      <Typography className={styles.inputTitle}>Email</Typography>
      <input
        placeholder="Digite o seu email..."
        className={styles.inputCupom}
      ></input>

      <Button
        variant="contained"
        disableElevation
        size="large"
        className={styles.button}
        onClick={() => onClick()}
      >
        Enviar código
      </Button>
    </Grid>
  )
}
