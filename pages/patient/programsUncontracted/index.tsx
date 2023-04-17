import React, { useEffect } from "react";
import styles from "./programsUncontracted.module.scss";
import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
export default function programsUncontracted() {
  const router = useRouter();
  const myPrograms = [
    {
      id: 0,
      name: 'Autismo',
      image: '/images/programs/mental.png'
    }
  ];


  return (
    <Grid >
      <Grid className={styles.container}>
        <Typography className={styles.title}>
          Programas não contratados
        </Typography>
        <Typography className={styles.subtitle}>
          Contrate programas e tenha ainda mais benefícios para cuidar da sua saúde
        </Typography>
      </Grid>

      <div className={styles.hr}></div>

      <Grid className={styles.row}>
        {myPrograms.map((item, index) => (
          <Grid className={styles.cardProgram}>
            <img src={item.image} />
            <Typography className={styles.textCard}>{item.name}</Typography>
            <Typography className={styles.textLink}>Ver detalhes</Typography>

          </Grid>
        ))}
        <Grid className={styles.cardProgram}>
          <img className={styles.imgMore} src="/images/programs/more.png" />
          <Typography className={styles.textMore}>Ver Outros Programas</Typography>

        </Grid>
      </Grid>
    </Grid>
  );
}
