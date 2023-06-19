import React, { useEffect, useState } from 'react'
import styles from './successConfirmEmail.module.scss'
import {
  Button,
  Grid,
  Typography,
} from '@mui/material'
import { RemoveRedEye, VisibilityOff } from '@mui/icons-material'

export default function SuccessConfirmEmail({ onClick }: any) {
  return (
    <Grid className={styles.rowCollumn}>
      <div className={styles.row}>
        <img src="../logo_black.png" className={styles.logo} />
      </div>

      <img src="../done.png" />
      <Typography className={styles.title}>
        E-mail verificado com sucesso!
      </Typography>
      <Typography className={styles.fontInstructions}>
        Vamos lá! Precisamos de algumas informações básicas para completarmos
        seu cadastro e informá-lo das novidades sobre sua saúde!
      </Typography>

      <Button
        variant="contained"
        disableElevation
        size="large"
        className={styles.buttonSmall}
        onClick={() => onClick()}
      >
        Continuar
      </Button>
    </Grid>
  );
}
