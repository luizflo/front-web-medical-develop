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
import HeaderNavigation from "@components/booking/header";

import Image from "next/image";
import { useRouter } from "next/router";

export default function Document({
  setCpf,
  onClick,
  cpf,
  goBack,
  setBirthdate,
  phoneNumber,
  setPhoneNumber,
}: any) {
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );
  const router = useRouter();

  const handleDataClick = (date: string) => {
    // setStartDate(date)
    const splittedDate = date.split("/");
    const [day, month, year] = splittedDate;
    const dateOfBirth = year + "-" + month + "-" + day;
    setBirthdate(dateOfBirth);
  };
  return (
    <Grid className={styles.container}>
      <HeaderNavigation widthProgress={"20%"} goBack={goBack} />
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
            Informações do usuário
          </Typography>
          <Typography className={styles.inputTitle}>CPF</Typography>
          <InputMask
            maskChar={null}
            mask={"999.999.999-99"}
            placeholder="Digite seu cpf"
            name="cpf"
            value={cpf}
            className={styles.inputCupom}
            onChange={(e) => setCpf(e.target.value)}
          />
          <Typography className={styles.inputTitle}>
            Data de nascimento:
          </Typography>
          <InputMask
            mask={"99/99/9999"}
            maskChar={null}
            placeholder="dd/mm/aaaa"
            className={styles.inputCupom}
            style={{ paddingLeft: "20px" }}
            onChange={(e) => handleDataClick(e.target.value)}
            type={"text"}
          />
          <Typography className={styles.inputTitle}>Celular:</Typography>
          <InputMask
            maskChar={null}
            mask={"(99) 99999-9999"}
            placeholder="Digite o número com DDD"
            name="phoneNumber"
            value={phoneNumber}
            className={styles.inputCupom}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Grid>
        <Box className={styles.alignCircleButton}>
          <Button
            variant="contained"
            disableElevation
            disabled={cpf.length === 14 ? false : true}
            size="large"
            style={{
              backgroundColor: cpf.length === 14 ? "#12CC7E" : "#848d9f",
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
