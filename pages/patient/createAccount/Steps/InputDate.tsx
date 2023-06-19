import React, { useEffect, useState } from "react";
import styles from "../createAccount.module.scss";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import {
  ArrowBackIos,
  Close,
  RemoveRedEye,
  VisibilityOff,
} from "@mui/icons-material";
import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import iconCalendary from "../../../../public/iconCalendary.svg";
import Logo from "../../../../public/logo_black.png";
import arrow from "../../../../public/arrow.png";
import { useRouter } from "next/router";
import HeaderNavigation from "@components/booking/header";

export default function InputDate({ onClick, goBack, setBirthdate }: any) {
  const [startDate, setStartDate] = useState<any>(new Date(1999, 0, 1));
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
      <HeaderNavigation widthProgress={"40%"} goBack={goBack} />
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
            Qual a sua data de nascimento?
          </Typography>
          <InputMask
            mask={"99/99/9999"}
            maskChar={null}
            placeholder="dd/mm/aaaa"
            className={styles.inputBlue}
            style={{ paddingLeft: "20px" }}
            onChange={(e) => handleDataClick(e.target.value)}
            type={"text"}
          />
          {/* <DatePicker
            selected={startDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date: Date) => handleDataClick(date)}
            className={styles.inputBlue}
          ></DatePicker> */}
        </Grid>
        <Grid className={styles.alignCircleButton}>
          <Button
            variant="contained"
            disableElevation
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
