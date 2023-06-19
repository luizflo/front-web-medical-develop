import React, { useEffect } from 'react'
import styles from '../checkout.module.scss'
import { useRouter } from 'next/router'
import {
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
  Button,
} from '@mui/material'
import {
  ArrowBackIos,
  Close,
  ArrowForwardIos,
  Check,
} from '@mui/icons-material'
// import Logo from '../../public/logo_black.png'
import { Box } from '@mui/system'

export default function ChooseTime({ onClick }: any) {
  const router = useRouter()
  const plans = [
    {
      id: 0,
      name: 'Bronze',
      description: 'Lorem ipsum et sol',
      value: '10',
      benefits: [
        'Consultas por R$50,00',
        'Assistência funerária por mais R$5,00',
        'Clube de beneficios',
      ],
    },
    {
      id: 1,
      name: 'Prata',
      description: 'Lorem ipsum et sol',
      value: '25',
      benefits: [
        'Consultas por R$40,00',
        'Assistência funerária por mais R$5,00',
        'Clube de beneficios',
      ],
    },
    {
      id: 2,
      name: 'Ouro',
      description: 'Lorem ipsum et sol',
      value: '40',
      benefits: [
        'Consultas por R$30,00',
        'Assistência funerária por mais R$5,00',
        'Clube de beneficios',
      ],
    },
  ]

  return (
    <Grid container className={styles.content}>
      <Grid xs={12} item className={styles.gridContent}>
        <Typography variant="h2" className={styles.title}>
          Planos
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          Escolha o plano que melhor atende às suas necessidades
        </Typography>
        <div style={{ height: 2, backgroundColor: '#AAAFB9', opacity: 0.6 }} />
        <Grid xs={12} className={styles.row} style={{ marginTop: 30 }}>
          {plans.map((item, index) => (
            <Box className={styles.boxPlan}>
              <Typography variant="body1" className={styles.cardTitle}>
                {item.name}
              </Typography>
              <Typography variant="body1" className={styles.cardSubtitle}>
                {item.description}
              </Typography>
              <div className={styles.row}>
                <Typography variant="body1" className={styles.cardValue}>
                  {item.value}
                </Typography>
                <Typography variant="body1" className={styles.textMoney}>
                  R$ por mês
                </Typography>
              </div>
              {item.benefits.map((i) => (
                <div className={styles.row}>
                  <Check sx={{ color: '#0074E5' }} fontSize="large" />
                  <Typography variant="body1" className={styles.cardBenefits}>
                    {i}
                  </Typography>
                </div>
              ))}
              <Button
                variant="contained"
                disableElevation
                size="large"
                className={styles.button}
              >
                Escolher
              </Button>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
