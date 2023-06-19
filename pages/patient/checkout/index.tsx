import React, { useEffect, useState } from 'react'
import styles from './checkout.module.scss'
import { useRouter } from 'next/router'
import { Container, Grid, MenuItem, Select, Typography } from '@mui/material'
import { ArrowBackIos, Close, ArrowForwardIos } from '@mui/icons-material'
import Logo from "../../../public/logo_black.png";
import { Box } from '@mui/system'
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
