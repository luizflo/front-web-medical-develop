import React, { useEffect, useState } from 'react'
import styles from '../../../../pages/patient/CheckoutPlans/success.module.scss'

import { useRouter } from 'next/router'
import { Button, Grid, Typography, Box } from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import Done from 'public/done.png'
import { ILoginData } from "src/interfaces";

export default function Success() {
  const router = useRouter()
  const [step, setStep] = useState<any>(1);
  return (
    <Box className={styles.rowCollumn}>
      <Grid className={styles.marginTop}></Grid>
      <Image alt="no-alt" src={Done} />

      <Typography
        variant="caption"
        fontWeight={'medium'}
        className={styles.title}
      >
        Plano contratado com sucesso!
      </Typography>
      <Typography variant="h3" className={styles.fontInstructions}>
        Aproveite os benefícios.
      </Typography>
      <Button
        variant="contained"
        disableElevation
        size="large"
        className={styles.buttonSmall}
        onClick={() => router.replace('/home')}
      >
        Ir para tela inicial
      </Button>
    </Box>
  )
}
