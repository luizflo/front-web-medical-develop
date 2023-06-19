import React, { useEffect, useState } from 'react'
import styles from './confirmEmail.module.scss'
import { Button, Grid, Typography } from '@mui/material'
import { RemoveRedEye, VisibilityOff } from '@mui/icons-material'

export default function ConfirmEmail() {
  return (
    <Grid className={styles.rowCollumn}>
      <div className={styles.row}>
        <img src="/logo_black.png" className={styles.logo} />
      </div>

      <img src="/done.png" />
      <Typography className={styles.title}>
        Confirme seu e-mail para continuar
      </Typography>
      <Typography className={styles.fontInstructions}>
        Mas antes de começar a explorar a plataforma precisamos que você
        confirme seu e-mail.
      </Typography>
      <Grid className={styles.rowSimple}>
        <Typography className={styles.fontInstructions}>
          Basta acessar o e-mail enviado para luiz.luiz@luiz.com e clicar em
        </Typography>
        <Typography className={styles.link}>Confirmar.</Typography>
      </Grid>

      <Grid className={styles.marginTop}>
        <Typography className={styles.link}>
          Não recebi o e-mail de confirmação
        </Typography>
      </Grid>
    </Grid>
  );
}
