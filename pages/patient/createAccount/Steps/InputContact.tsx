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
import Logo from "../../../../public/logo_black.png";
import { useRouter } from "next/router";
import HeaderNavigation from "@components/booking/header";

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
  return (
    <Grid className={styles.container}>
      <HeaderNavigation widthProgress={"60%"} goBack={goBack} />
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
