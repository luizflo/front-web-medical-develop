import React, { useEffect, useState } from "react";
import styles from "../createAccount.module.scss";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowBackIos,
  Close,
  RemoveRedEye,
  VisibilityOff,
} from "@mui/icons-material";
import Logo from "../../../../public/hauseyLogo.svg";
import { sexType } from "src/interfaces";

import genderMars from "../../../../public/genderMars.png";
import genderVenus from "../../../../public/genderVenus.png";
import arrow from "../../../../public/arrow.png";

import Image from "next/image";
import { useRouter } from "next/router";
interface Props {
  onClick: () => void;
  setGender: any;
  gender: sexType | "";
  goBack: () => void;
}
export default function InputGender({
  onClick,
  setGender,
  gender,
  goBack,
}: Props) {
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
          <div className={styles.progressBar} style={{ width: "70%" }} />
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
        <Grid className={styles.marginTopFirsty}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            className={styles.title}
          >
            Sexo
          </Typography>
          <Box
            onClick={() => setGender("Feminino")}
            className={styles.buttonGroupItem}
            style={{
              border:
                gender === "Feminino"
                  ? "2px solid #12CC7E"
                  : "1.5px solid #dadee6",
            }}
          >
            <Image
              alt="no-alt"
              src={genderVenus}
              className={styles.logoGender}
              style={{ marginRight: 20 }}
            />
            <Typography
              variant="body2"
              fontWeight={"medium"}
              className={styles.textButton}
              style={{
                color: gender === "Feminino" ? "#12CC7E " : "#848d9f",
              }}
            >
              Feminino
            </Typography>
          </Box>
          <Box
            onClick={() => setGender("Masculino")}
            className={styles.buttonGroupItem}
            style={{
              border:
                gender === "Masculino"
                  ? "2px solid #12CC7E"
                  : "1.5px solid #dadee6",
            }}
          >
            <Image
              alt="no-alt"
              src={genderMars}
              className={styles.logoGender}
            />
            <Typography
              variant="body2"
              fontWeight={"medium"}
              className={styles.textButton}
              style={{
                color: gender === "Masculino" ? "#12CC7E " : "#848d9f",
              }}
            >
              Masculino
            </Typography>
          </Box>
        </Grid>
        <Grid className={styles.alignCircleButton}>
          <Button
            variant="contained"
            disableElevation
            disabled={gender === "" ? true : false}
            size="large"
            className={styles.buttonCircle}
            onClick={() => onClick()}
          >
            <Image alt="no-alt" src={arrow} />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
