import React, { useEffect, useState } from "react";
import styles from "../createAccount.module.scss";
import { Button, Grid, Typography } from "@mui/material";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import Logo from "../../../../public/logo_black.png";
import Done from "../../../../public/done.png";

export default function VerifiedEmail({ onClick }: any) {
  return (
    <Grid className={styles.rowCollumn}>
      <Grid className={styles.marginTop}>
        <div className={styles.row}>
          <Image alt="no-alt" src={Logo} className={styles.logoCenter} />
        </div>
      </Grid>
      <Grid className={styles.marginTop}>
        <Image alt="no-alt" src={Done} />
      </Grid>
      <Typography variant="subtitle1" className={styles.title}>
        E-mail verificado com sucesso!
      </Typography>
      <Typography variant="h5" className={styles.fontInstructions}>
        Vamos lá! Precisamos de algumas informações básicas para completarmos
        seu cadastro e informá-lo das novidades sobre sua saúde!{" "}
      </Typography>

      <Button
        variant="contained"
        disableElevation
        size="large"
        className={styles.buttonSmall}
        onClick={() => onClick()}
      >
        Continuar
      </Button>
    </Grid>
  );
}
