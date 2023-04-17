import React, { useEffect, useState } from 'react'
import styles from './planos.module.scss'
import { useRouter } from 'next/router'
import { Grid, } from '@mui/material'
import ChooseTime from './components/ChooseTime'

export default function planos() {
  const router = useRouter()
  const [step, setStep] = useState<any>(1)
  const especialidades = [
    'Clínica médica',
    'Psiquiatria',
    'Acupuntura',
    'Cardiologia',
  ]
  const renderStep = () => {
    switch (step) {
      case 1:
        return <ChooseTime onClick={() => setStep(step + 1)} />
    }
  }

  return (
    <Grid container className={styles.content}>
      {renderStep()}
    </Grid>
  )
}
