import React, { SyntheticEvent, useEffect, useState } from "react";
import styles from "../schedule.module.scss";
import { useRouter } from "next/router";
import { Button, Grid, Typography, Box, useMediaQuery } from "@mui/material";
import Done from "public/done.png";
import Image from "next/image";
import logo_black from "public/logo_black.png";
import Lottie from "lottie-react";
import SuccessAnimation from "public/successAnimation.json";
// import { gapi } from "gapi-script";
import ApiCalendar from "react-google-calendar-api";
import { promises } from "fs";

export default function Success() {
  const router = useRouter();
  const [step, setStep] = useState<any>(1);
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  // const API_KEY = "AIzaSyBTZLXb6EVFNEpqA4ApADUsoXPDg3ggSxU";
  // const ACCESSES_TOKEN =
  //   "4/0AbUR2VNJ_EC3rQhII2yCZkSXZDRIXDSZ5Rz9P1c8Pn1gMBg37ILtm2MKqbgBCNWZEtbOGw";

  // const config = {
  //   clientId:
  //     "468527330864-lrfn5rngtgib8heqgoh23mrltqahru5f.apps.googleusercontent.com",
  //   apiKey: API_KEY,
  //   scope: "https://www.googleapis.com/auth/calendar",
  //   discoveryDocs: [
  //     "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  //   ],
  // };

  // const apiCalendar = new ApiCalendar(config);

  // const handleItemClick = (event: SyntheticEvent<any>, name: string): void => {
  //   if (name === "sign-in") {
  //     apiCalendar.handleAuthClick();
  //   } else if (name === "sign-out") {
  //     apiCalendar.handleSignoutClick();
  //   }
  // };

  // const clickApi = async (): Promise<void> => {
  //   await apiCalendar.handleAuthClick();

  //   const eventFromNow: object = {
  //     summary: "Poc Dev From Now",
  //     time: 480,
  //   };

  //   apiCalendar
  //     .createEventFromNow(eventFromNow)
  //     .then((result: object) => {
  //       console.log(result);
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // };

  function HeaderSchedule() {
    return (
      <Grid xs={12} className={styles.grid}>
        <div className={styles.center}>
          <Image src={logo_black} className={styles.logo} />
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
        {/* <Button
          variant="contained"
          disableElevation
          size="large"
          className={styles.buttonSmall}
          onClick={() => clickApi()}
        >
          Adicionar no calendario
        </Button> */}
      </Box>
    </Grid>
  );
}
