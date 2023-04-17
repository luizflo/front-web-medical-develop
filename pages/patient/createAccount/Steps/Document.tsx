import React, { useEffect, useState } from "react";
import styles from "../createAccount.module.scss";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import InputMask from "react-input-mask";
import {
  ArrowBackIos,
  Close,
  RemoveRedEye,
  VisibilityOff,
} from "@mui/icons-material";
import Logo from "../../../../public/hauseyLogo.svg";
import arrow from "../../../../public/arrow.png";

import Image from "next/image";
import { useRouter } from "next/router";

export default function Document({ setCpf, onClick, cpf, goBack }: any) {
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );
  const router = useRouter();

  function HeaderNavigation() {
    return (
      <Box>
        <Box
          className={styles.boxHeader}
          sx={{ paddingInline: isSmallScreen ? "10vw" : "25vw" }}
        >
          <ArrowBackIos
            sx={{
              color: "#0074E5",
              cursor: "pointer",
            }}
            fontSize="large"
            className={styles.buttonHeader}
            onClick={() => goBack()}
          />
          <Logo className={styles.logo} />
          <Close
            sx={{
              color: "#0074E5",
            }}
            fontSize="large"
            className={styles.buttonHeader}
            onClick={() => router.replace("/patient/login")}
          />
        </Box>
        <div className={styles.progressDiv}>
          <div className={styles.progressBar} style={{ width: "20%" }} />
        </div>
      </Box>
    );
  }
  return (
    <Grid className={styles.container}>
      <HeaderNavigation />
      <Grid
        container
        className={styles.content2}
        sx={{ paddingInline: isSmallScreen ? "10vw" : "25vw" }}
      >
        <Grid>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ marginTop: "50px !important" }}
            className={styles.title}
          >
            Qual o seu CPF?
          </Typography>
          <InputMask
            maskChar={null}
            mask={"999.999.999-99"}
            placeholder="Digite seu cpf"
            name="cpf"
            value={cpf}
            className={styles.inputBlue}
            onChange={(e) => setCpf(e.target.value)}
          />
        </Grid>
        <Box className={styles.alignCircleButton}>
          <Button
            variant="contained"
            disableElevation
            disabled={cpf.length === 14 ? false : true}
            size="large"
            style={{
              backgroundColor: cpf.length === 14 ? "#0074e5" : "#848d9f",
            }}
            className={styles.buttonCircle}
            onClick={() => onClick()}
          >
            <Image alt="no-alt" src={arrow} />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
