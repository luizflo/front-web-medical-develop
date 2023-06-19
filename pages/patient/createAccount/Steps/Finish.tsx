import React, { useEffect, useState } from "react";
import styles from "../createAccount.module.scss";
import { Button, Grid, Typography } from "@mui/material";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import Logo from "../../../../public/logo_black.png";
import Done from "../../../../public/done.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Finish() {
  const router = useRouter();

  return (
    <Grid className={styles.rowCollumn}>
      <Grid className={styles.marginTop}>
        <div className={styles.row}>
          <Image alt="no-alt" src={Logo} className={styles.logoCenter} />
        </div>
      </Grid>
      <Image alt="no-alt" src={Done} />

      <Typography variant="subtitle1" className={styles.title}>
        Cadastro finalizado!
      </Typography>
      <Typography variant="h5" className={styles.fontInstructions}>
        Comece a explorar os planos e questionários agora mesmo!
      </Typography>
      <Button
        variant="contained"
        className={styles.buttonSmall}
        onClick={() => router.replace("/welcome")}
      >
        {/* <Link
          href="/home"> */}
        Começar
        {/* </Link> */}
      </Button>
    </Grid>
  );
}
