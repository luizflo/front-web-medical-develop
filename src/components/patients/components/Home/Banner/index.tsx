import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import ArrowRightBlue from "public/images/patient/arrowRightBlue.svg";
import { FormsUrls } from "src/mocks/forms";

type Props = {
  CardIcon: any;
  title: string;
  body: string;
  textAction: string;
};
export default function Banner() {
  return (
    <Box
      className={styles.boxImg}
      sx={{
        paddingBottom: { xs: "10px", md: "10px" },
        borderRadius: "14px",
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        className={styles.titleCard}
        fontWeight={"bold"}
        style={{
          marginTop: 15,
          color: "white",
          paddingLeft: "40px",
          paddingTop: "30px",
          maxWidth: "50%",
        }}
      >
        É mulher? Comece a cuidar da sua saúde com ainda mais cuidado
      </Typography>
      <Typography
        variant="body1"
        fontWeight={"light"}
        style={{
          fontSize: 14,
          color: "white",
          paddingLeft: "40px",
          marginTop: "10px",
        }}
      >
        Conheça o programa saúde da mulher
      </Typography>
    </Box>
  );
}
