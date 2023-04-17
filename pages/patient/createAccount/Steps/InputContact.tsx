import React, { useEffect, useRef, useState } from "react";
import styles from "../createAccount.module.scss";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
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
import InputMask from "react-input-mask";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import iconCalendary from "../../../../public/iconCalendary.svg";
import arrow from "../../../../public/arrow.png";
import Logo from "../../../../public/hauseyLogo.svg";
import { useRouter } from "next/router";

export default function InputContact({
  onClick,
  phoneNumber,
  setPhoneNumber,
  goBack,
  isLoading,
}: any) {
  const [checked, setChecked] = useState(false);
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
          <div className={styles.progressBar} style={{ width: "90%" }} />
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
            Celular
          </Typography>
          <InputMask
            maskChar={null}
            mask={"(99) 99999-9999"}
            placeholder="Digite o número com DDD"
            name="phoneNumber"
            value={phoneNumber}
            className={styles.inputBlue}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
        <Grid className={styles.rowTerms}>
          <Checkbox checked={checked} onClick={() => setChecked(!checked)} />
          <Typography variant="h4" className={styles.textNotification}>
            Estou de acordo em receber notificações da plataforma por SMS.
          </Typography>
        </Grid>
        <Grid className={styles.alignCircleButton}>
          <Button
            variant="contained"
            disabled={phoneNumber.length === 15 ? false : true}
            disableElevation
            size="large"
            className={isLoading ? styles.buttonCircle : styles.buttonRounded}
            onClick={() => onClick()}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={40} />
            ) : (
              "Finalizar cadastro"
            )}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
