import React, { useEffect, useState } from 'react'
import styles from './recoverPassword.module.scss'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'
import InputEmail from './Steps/InputEmail'
import InputCode from './Steps/InputCode'
import ResetPassword from './Steps/ResetPassword'


export default function recoverPassword() {
  const [step, setStep] = useState<any>(1)

  const handlerClick = () => {
    setStep(step + 1)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <InputEmail onClick={handlerClick} />
      case 2:
        return <InputCode onClick={handlerClick} />
      case 3:
        return <ResetPassword />
    }
  }

  return (
    <Grid container className={styles.container}>
      <Grid
        xs={6}
        item
        style={{ backgroundColor: "white" }}
        className={styles.content}
      >
        <div className={styles.row}>
          <img src="../logo_black.png" className={styles.logo} />
        </div>
        <Grid className={styles.iconReturn}>
          <img src="../return.png" />
        </Grid>
        {renderStep()}
      </Grid>

      <Grid xs={6} item className={styles.imgContainer}>
        {/* <Image alt="no-alt" src={BackGround} /> */}
      </Grid>
    </Grid>
  );
}
