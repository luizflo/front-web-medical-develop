import React, { useEffect, useState } from 'react'
import styles from '../createAccount.module.scss'
import {
  Button,
  Grid,
  Typography,
} from '@mui/material'
import { RemoveRedEye, VisibilityOff } from '@mui/icons-material'
import Image from 'next/image'
import Logo from "../../../../public/logo_black.png";
import Done from '../../../../public/done.png'


export default function Success({ onClick }: any) {
  return (
    <Grid className={styles.rowCollumn}>
      <Grid className={styles.marginTop}>
        <div className={styles.row}>
          <Image alt="no-alt" src={Logo} className={styles.logoCenter} />
        </div>
      </Grid>
      <Grid className={styles.marginTop}>
        <Image alt="no-alt" src={Done} />

      </Grid>
      <Typography className={styles.title}>
        Conta criada com sucesso!
      </Typography>
      <Typography className={styles.fontInstructions}>
        Mas antes de começar a explorar a plataforma precisamos que você confirme seu e-mail.
      </Typography>
      <Grid className={styles.rowSimple}>
        <Typography className={styles.fontInstructions}>
          Basta acessar o e-mail enviado para luiz.luiz@luiz.com e clicar em
        </Typography>
        <Typography className={styles.link}>Confirmar.</Typography>

      </Grid>
      <Grid className={styles.marginTop}>
        <Typography className={styles.link}>Não recebi o e-mail de confirmação</Typography>
      </Grid>
    </Grid >
  )
}
