import React, { useEffect } from "react";
import styles from "../../../../pages/patient/CheckoutPlans/checkout.module.scss";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  ExpandMore,
  ArrowForwardIos,
  Check,
  AddCircleOutlineRounded,
} from "@mui/icons-material";
// import { Program } from '../index'
// import Logo from '../../public/logo_black.png'
import { Box } from "@mui/system";
interface ItemPlans {
  id: number;
  title: string;
  name: string;
  description: string;
  value: string;
  tags: string[];
}

interface ResumeProps {
  price: any;
  specialty: any;
  isLoading: boolean;
}

export default function Resume({ price, specialty, isLoading }: ResumeProps) {
  const router = useRouter();
  //Pelo amor de Deus remover isso aqui depois
  const total = () => {
    let valuePlan = 10;
    return valuePlan;
  };

  return (
    <Box className={styles.boxResume}>
      <Typography
        variant="h3"
        fontWeight={"bold"}
        style={{ marginTop: "10px" }}
        className={styles.textBlue}
      >
        Resumo
      </Typography>
      <div
        className={styles.row}
        style={{ justifyContent: "space-between", marginTop: "20px" }}
      >
        <Typography
          variant="body2"
          fontWeight={"regular"}
          className={styles.textGrey}
          style={{ marginBottom: "0px" }}
        >
          Consulta de {specialty}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={"regular"}
          className={styles.textGrey}
        >
          {price}
        </Typography>
      </div>

      <div className={styles.line} />
      <div className={styles.row} style={{ justifyContent: "space-between" }}>
        <Typography
          variant="h3"
          fontWeight={"bold"}
          className={styles.programTotal}
        >
          Total
        </Typography>
        <Typography
          variant="h3"
          fontWeight={"bold"}
          className={styles.programTotal}
        >
          {price}
        </Typography>
      </div>
    </Box>
  );
}
