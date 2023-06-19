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
  TextField,
} from '@mui/material'
import {
  ArrowBackIos,
  Close,
  ArrowForwardIos,
  Check,
} from '@mui/icons-material'
// import Logo from '../../public/logo_black.png'
import { Box } from '@mui/system'

export default function Cart({ onClick }: any) {
  const t = useTranslate();

  const router = useRouter();

  return (
    <Grid md={4} sm={12} className={styles.cardCart}>
      <Grid className={styles.rowPlan}>
        <Typography className={styles.planCart}>
          Plano Bronze
        </Typography>
        <Typography className={styles.planCart}>
          R$10,00
        </Typography>
      </Grid>
      <Grid className={styles.rowPlan}>
        <Typography className={styles.textCart}>
          Programa de Saúde da Família
        </Typography>
        <Typography className={styles.textCart}>
          R$10,00
        </Typography>
      </Grid>
      <Grid className={styles.rowPlan}>
        <Typography className={styles.textCart}>
          Programa de Saúde da Família
        </Typography>
        <Typography className={styles.textCart}>
          R$10,00
        </Typography>
      </Grid>

      <div className={styles.hr} />

      <Typography className={styles.textblack}>
        Tem um cupom?
      </Typography>
      <Grid className={styles.row}>
        <TextField
          margin="normal"
          label="Cupom"
          className={styles.cupom}
        />
        <Typography className={styles.textLink}>
          Adicionar
        </Typography>
      </Grid>

      <Grid className={styles.rowPlan}>
        <Typography className={styles.textCart}>
          Cupom aplicado: <Typography>MOB50</Typography>
        </Typography>
        <Typography className={styles.textCart}>
          Remover
        </Typography>
      </Grid>
    </Grid>
  )
}
