import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import ArrowRightBlue from "public/images/patient/arrowRightBlue.svg";
import { FormsUrls } from "src/mocks/forms";
import Image from "next/image";

type Props = {
  CardIcon: any;
  handleClick: () => void;
  title: string;
  body: string;
  textAction: string;
  link: string;
  imgSrc?: any;
  first?: boolean;
};
export default function SquareCard({
  CardIcon,
  handleClick,
  title,
  body,
  textAction,
  link,
  imgSrc,
  first,
}: Props) {
  return (
    <Grid
      item
      xs={12}
      md={4}
      className={styles.boxCard}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: { xs: "0px", md: first ? "0px" : "10px" },
        marginTop: { xs: "20px", md: "0px" },
        paddingBlock: { xs: "15px", md: "20px" },
      }}
      onClick={handleClick}
    >
      <Box sx={{ display: "flex" }}>
        <Box>
          {/* <Image src={imgSrc} className={styles.cardIcon} /> */}
          <CardIcon className={styles.cardIcon} />
        </Box>
        <Box sx={{ paddingLeft: "10px" }}>
          <Typography
            variant="h4"
            fontWeight={"bold"}
            className={styles.titleCard}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="body1"
        fontWeight={"light"}
        className={styles.bodyCard}
      >
        {body}
      </Typography>
      <div className={styles.row}>
        <Typography
          variant="h4"
          fontWeight={"medium"}
          className={styles.textBlue}
        >
          {textAction}
        </Typography>
        <ArrowRightBlue className={styles.arrowBlue} />
      </div>
    </Grid>
  );
}
