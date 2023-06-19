import React, { useEffect } from 'react'
import styles from '../checkout.module.scss'
import { useRouter } from 'next/router'
import { useTranslate } from "@pankod/refine-core";
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

export default function ChoosePlan({ onClick }: any) {
  const t = useTranslate();

  const router = useRouter();
  const colors = [
    '#B9FFDD',
    '#C19AF880',
    '#F79E1B45'
  ];
  const colorsfont = [
    '#0DB564',
    '#8000E5',
    '#F79E1B'
  ];


  const plans = [
    {
      id: 0,
      name: 'Bronze',
      description: 'Lorem ipsum et sol',
      value: '10',
      tags: [
        '1ª Consulta grátis*'
      ],
    },
    {
      id: 1,
      name: 'Prata',
      description: 'Lorem ipsum et sol',
      value: '25',
      tags: [
        '1ª Consulta grátis*',
        'Plano de Saúde Mental'
      ],
    },
    {
      id: 2,
      name: 'Ouro',
      description: 'Lorem ipsum et sol',
      value: '40',
      tags: [
        '1ª Consulta grátis*',
        'Plano de Saúde Mental'
      ],
    },
  ]

  return (
    <Grid md={8} container className={styles.content}>
      <Typography variant="h2" className={styles.title}>
        Checkout
      </Typography>
      <Typography variant="h3" className={styles.subtitle}>
        Plano Selecionado
      </Typography>
      {/* <div style={{ height: 2, backgroundColor: '#AAAFB9', opacity: 0.6 }} /> */}
      <Typography variant="body1" className={styles.text}>
        Forma de cobrança
      </Typography>


      {plans.map((item, index) => (
        <Grid className={styles.card}>
          <Typography className={styles.text}>
            Plano
          </Typography>
          <Typography variant="h3" className={styles.titlePlan}>
            {item.name}
          </Typography>

          <Grid className={styles.row}>
            {item.tags.map((i, index) => (
              <div className={styles.row}>
                <Typography className={styles.tag} style={{ backgroundColor: colors[index], color: colorsfont[index] }}>{i}</Typography>
              </div>
            ))}
          </Grid>

          <Typography className={styles.body}>Lorem ipsum dolor sit amet consectetur adipiscing elit.
          </Typography>
          <Typography className={styles.seeMore}>Ver mais</Typography>

        </Grid>
      ))}

    </Grid>
  )
}
