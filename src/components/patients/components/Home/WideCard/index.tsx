import React, { useEffect, useState } from "react";
import { Badge, Box, Button, Grid, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import ArrowRightBlue from "public/images/patient/arrowRightBlue.svg";
import { FormsUrls } from "src/mocks/forms";

type Props = {
  CardIcon: any;
  title: string;
  body: string;
  textAction: string;
  color: string;
  first?: boolean;
  badge?: boolean;
  handleClick: () => void;
  type?: string;
};
export default function WideCard({
  CardIcon,
  title,
  body,
  textAction,
  color,
  badge,
  first,
  handleClick,
  type,
}: Props) {
  return (
    <Grid
      item
      xs={12}
      md={6}
      className={styles.boxCard}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        marginTop: { xs: "20px", md: "0px" },
        marginRight: first ? "20px" : "0px",
        // paddingBlock: { xs: "15px", md: "20px" },
        backgroundColor: color,
      }}
    >
      <Box>
        <Badge badgeContent={""} color="error" invisible={!badge}>
          <CardIcon className={styles.cardIcon} />
        </Badge>
      </Box>
      <Box sx={{ paddingInline: "20px", paddingBottom: "10px" }}>
        <Typography
          variant="h3"
          fontWeight={"bold"}
          className={
            color === "white" ? styles.titleCardBlack : styles.titleCard
          }
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          fontWeight={"light"}
          className={color === "white" ? styles.bodyCardBlack : styles.bodyCard}
        >
          {body}
        </Typography>
        {type === "progress" && (
          <div>
            <Box className={styles.progressBar}>
              <Box className={styles.progressThumb} />
            </Box>
            <Typography
              variant="h4"
              fontWeight={"medium"}
              className={styles.textGreen}
            >
              10% concluído
            </Typography>
          </div>
        )}
      </Box>
    </Grid>
  );
}
