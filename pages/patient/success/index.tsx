import React, { useEffect, useState } from 'react'
import styles from './success.module.scss'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'

export default function success() {

  const router = useRouter()
  const [step, setStep] = useState<any>(1)
  const especialidades = [
    'Clínica médica',
    'Psiquiatria',
    'Acupuntura',
    'Cardiologia',
  ]

  return (
    <Grid container className={styles.container}>
      sad
    </Grid>

  )
}
