import React, { useEffect } from 'react'
import styles from '../../../../pages/patient/CheckoutPlans/checkout.module.scss'
import { useRouter } from 'next/router'
import {
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material'
import {
  ExpandMore,
  ArrowForwardIos,
  Check,
  AddCircleOutlineRounded,
} from '@mui/icons-material'
// import { Program } from '../index'
// import Logo from '../../public/logo_black.png'
import { Box } from '@mui/system'
import { IPlan } from "src/interfaces";
interface ItemPlans {
  id: number;
  title: string;
  name: string;
  description: string;
  value: string;
  tags: string[];
}

interface ResumeProps {
  onClick(): any;
  programs: any;
  plan: IPlan;
  step: any;
  isLoading: boolean;
}

export default function Resume({ onClick, programs, step, plan, isLoading }: ResumeProps) {
  const router = useRouter();

  const total = () => {
    if (plan) {
      let valuePlan = plan.price;
      if (programs.selected) {
        return valuePlan + 10;
      } else {
        return valuePlan;
      }
    } else {
      let valuePlan = "00";
      return valuePlan;
    }
  };

  return (
    <Grid xs={4} className={styles.gridContent}>
      <Box className={styles.boxResume}>
        <Typography
          variant="h2"
          fontWeight={"bold"}
          className={styles.resumeTitle}
        >
          Resumo
        </Typography>
        {plan && (
          <div
            className={styles.row}
            style={{ justifyContent: "space-between", marginTop: "20px" }}
          >
            <Typography
              variant="h3"
              fontWeight={"medium"}
              className={styles.planTitle}
            >
              Plano de {plan.name}
            </Typography>
            <Typography
              variant="h3"
              fontWeight={"medium"}
              className={styles.textGrey}
            >
              R$ {plan.price}/mês
            </Typography>
          </div>
        )}
        {programs.selected && (
          <div
            className={styles.row}
            style={{ justifyContent: "space-between" }}
          >
            <Typography variant="body2" className={styles.programTitle}>
              {programs.title}
            </Typography>
            <Typography variant="body2" className={styles.textGrey}>
              {programs.value}/mês
            </Typography>
          </div>
        )}

        <div className={styles.line} />
        <div className={styles.row} style={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            className={styles.programTotal}
          >
            Total
          </Typography>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            className={styles.programTotal}
          >
            R${total()},00/mês
          </Typography>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            disableElevation
            disabled={plan === undefined}
            size="large"
            className={styles.button}
            onClick={() => onClick()}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : step === 1 ? (
              "Ir para pagamento"
            ) : (
              "Confirmar"
            )}
          </Button>
        </div>
      </Box>
    </Grid>
  );
}
