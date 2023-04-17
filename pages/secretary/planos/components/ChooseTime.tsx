import React, { useEffect } from 'react'
import styles from '../programs.module.scss'
import { useRouter } from 'next/router'
import {
  Grid,
  Typography,
  Button,
} from '@mui/material'

import Edit from '../../public/images/programs/pencil.svg'
import { Box } from '@mui/system'
import Image from 'next/image'

export default function ChooseTime({ onClick }: any) {
  const router = useRouter()
  const programs = [
    {
      id: 0,
      name: 'Saúde Mental',
      description: 'Lorem ipsum et sol',
      value: '10',
      benefits: [
        'Consultas com psicólogos por R$50,00',
        'Resultados individuais dos questionários',
        'Clube de beneficios',
      ],
      questionnaires: [
        'Avaliação - Depressão',
        'Avaliação - Ansiedade',
      ],
    },
    {
      id: 1,
      name: 'Combate à obesidade',
      description: 'Lorem ipsum et sol',
      value: '10',
      benefits: [
        'Consultas com psicólogos por R$30,00',
        'Resultados individuais dos questionários',
        'Clube de beneficios',
      ],
      questionnaires: [
        'Avaliação - Depressão',
        'Avaliação - Ansiedade',
      ],
    },
    {
      id: 2,
      name: 'Autismo',
      description: 'Lorem ipsum et sol',
      value: '10',
      benefits: [
        'Consultas com psicólogos por R$30,00',
        'Resultados individuais dos questionários',
        'Clube de beneficios',
      ],
      questionnaires: [
        'Avaliação - Depressão',
        'Avaliação - Ansiedade',
      ],
    },
  ]

  return (
    <Grid container className={styles.content}>
      <Grid xs={12} className={styles.gridContent}>
        <Typography variant="h2" className={styles.title}>
          Planos
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          Escolha o plano que melhor atende às suas necessidades
        </Typography>
        <div style={{ height: 2, backgroundColor: '#AAAFB9', opacity: 0.6 }} />
        <Grid xs={12} className={styles.row} style={{ marginTop: 30 }}>
          {programs.map((item, index) => (
            <Box className={styles.boxProgram}>
              <Grid className={styles.row2}>
                <Typography variant="body1" className={styles.cardTitle}>
                  {item.name}
                </Typography>
                <Typography className={styles.link}>
                  Editar
                </Typography>
              </Grid>
              <Grid className={styles.row2}>
                <Typography variant="body1" className={styles.cardSubtitle}>
                  {item.description}
                </Typography>
                <Typography className={styles.link}>
                  Editar
                </Typography>
              </Grid>
              <Grid className={styles.row2}>
                <Typography variant="body1" className={styles.link}>
                  Selecionar imagem
                </Typography>
                <Typography className={styles.link}>
                  <img className={styles.imgCam} src="/images/programs/camera.png" />
                </Typography>
              </Grid>
              <Grid className={styles.row2}>
                <Grid className={styles.row}>
                  <Typography variant="body1" className={styles.cardValue}>
                    {item.value}
                  </Typography>
                  <Typography variant="body1" className={styles.textMoney}>
                    R$ por mês
                  </Typography>
                </Grid>
                <Typography className={styles.link}>
                  Editar
                </Typography>
              </Grid>
              <Typography className={styles.bold}>Esse programa inclui</Typography>
              {item.benefits.map((i) => (
                <div className={styles.rowBenefits}>
                  <img className={styles.imgMore} src="/images/programs/pencil.png" />
                  <Typography variant="body1" className={styles.cardBenefits}>
                    {i}
                  </Typography>
                </div>
              ))}
              <Typography className={styles.cardQuestionnaires}>Questionários</Typography>
              {item.questionnaires.map((i) => (
                <Grid className={styles.row2}>
                  <Typography variant="body1" className={styles.questionnairesText}>
                    {i}
                  </Typography>
                  <Typography className={styles.link}>
                    Editar
                  </Typography>
                </Grid>
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
    </Grid >
  )
}
