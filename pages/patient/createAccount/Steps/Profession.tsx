import React, { useEffect, useState } from 'react'
import styles from '../createAccount.module.scss'
import { Button, Grid, Typography } from '@mui/material'
import {
  ArrowBackIos,
  Close,
  RemoveRedEye,
  VisibilityOff,
} from '@mui/icons-material'
import Image from 'next/image'
import Logo from "../../../../public/logo_black.png";
import arrow from "../../../../public/arrow.png";

export default function Profession({ onClick }: any) {
  return (
    <Grid className={styles.container}>
      <Grid
        xs={12}
        className={styles.grid}
        style={{ justifyContent: "space-between" }}
      >
        <Close sx={{ color: "#0074E5" }} fontSize="large" />
        <Image src={Logo} className={styles.logoCenter} />
        <div></div>
      </Grid>
      <div className={styles.progressDiv}>
        <div className={styles.progressBar} style={{ width: "32%" }} />
      </div>
      <Grid container className={styles.content2}>
        <Grid className={styles.marginTopFirsty}>
          <Typography className={styles.title}>
            Qual a sua profissão?
          </Typography>
          <input
            className={styles.inputBlue}
            placeholder="Selecione a sua profissão"
          ></input>
        </Grid>
        <Grid className={styles.alignCircleButton}>
          <Button
            variant="contained"
            disableElevation
            size="large"
            className={styles.buttonCircle}
            onClick={() => onClick()}
          >
            <Image alt="no-alt" src={arrow} className={styles.logo} />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
