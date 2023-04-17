import React, { useEffect, useState } from "react";
import styles from "../schedule.module.scss";
import { useRouter } from "next/router";
import { Button, Grid, Typography, Box, useMediaQuery } from "@mui/material";
import Done from "public/done.png";
import Image from "next/image";
import LogoHausey from "public/hauseyLogo.svg";
import Lottie from "lottie-react";
import SuccessAnimation from "public/successAnimation.json";

export default function Success() {
  const router = useRouter();
  const [step, setStep] = useState<any>(1);
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  function HeaderSchedule() {
    return (
      <Grid xs={12} className={styles.grid}>
        <div className={styles.center}>
          <LogoHausey className={styles.logo} />
        </div>
      </Grid>
    );
  }

  return (
    <Grid container>
      <HeaderSchedule />

      <Box className={styles.rowCollumn}>
        {/* <Grid className={styles.marginTop}></Grid> */}
        {/* <Image alt="no-alt" src={Done} /> */}

        <Lottie
          animationData={SuccessAnimation}
          loop={false}
          style={{ height: 300 }}
        />

        <Typography
          variant="subtitle1"
          fontWeight={"medium"}
          className={styles.title}
        >
          Consulta agendada!
        </Typography>
        <Typography
          variant="h3"
          className={styles.fontInstructions}
          sx={{ maxWidth: isSmallScreen ? "90vw" : "50vw" }}
        >
          No card do agendamento na Tela inicial você pode ver todos os detalhes
          da sua consulta, anexar exames e acompanhar o status do agendamento no
          sistema. Obrigado por usar a Hausey!
        </Typography>
        <Button
          variant="contained"
          disableElevation
          size="large"
          className={styles.buttonSmall}
          onClick={() => router.replace("/home")}
        >
          Ir para tela inicial
        </Button>
      </Box>
    </Grid>
  );
}
