import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";
import { useMediaQuery, Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  RemoveRedEye,
  VisibilityOff,
  ArrowBackIos,
  Close,
} from "@mui/icons-material";

export default function HeaderNavigation({ widthProgress, goBack }: any) {
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  const router = useRouter();

  return (
    <Box sx={{ width: "100vw" }}>
      <Box
        className={styles.boxHeader}
        sx={{ paddingInline: isSmallScreen ? "8vw" : "20vw" }}
      >
        <ArrowBackIos
          sx={{
            color: "#1E1E1E",
            cursor: "pointer",
          }}
          fontSize="large"
          className={styles.buttonHeader}
          onClick={() => goBack()}
        />
        <Image src="/icon.png" className={styles.logo} width={40} height={40} />
        <Close
          sx={{
            color: "#FFFF",
          }}
          fontSize="large"
        />
      </Box>
      <div className={styles.progressDiv}>
        <div className={styles.progressBar} style={{ width: widthProgress }} />
      </div>
    </Box>
  );
}
