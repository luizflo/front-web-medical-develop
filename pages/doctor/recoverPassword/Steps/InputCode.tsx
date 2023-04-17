import React, { useEffect, useState } from 'react'
import styles from '../recoverPassword.module.scss'
import {
  Button,
  Grid,
  Typography,
} from '@mui/material'

export default function InputCode({ onClick }: any) {


  return (
    <Grid>
      <Typography className={styles.title}>
        Insira o código
      </Typography>
      <Typography className={styles.subtitle}>Código enviado para o email j********47@gmail.com. </Typography>

      <Typography className={styles.inputTitle}>Código de recuperação</Typography>
      <input
        placeholder="Digite o código"
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
