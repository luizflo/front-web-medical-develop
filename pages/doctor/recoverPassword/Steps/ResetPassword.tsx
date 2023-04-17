import React, { useEffect, useState } from 'react'
import styles from '../recoverPassword.module.scss'
import {
  Button,
  Grid,
  Typography,
} from '@mui/material'
import { RemoveRedEye, VisibilityOff } from '@mui/icons-material'

export default function ResetPassword() {
  const [passWordVisible, setPassWordVisible] = useState<any>(false)


  return (
    <Grid>
      <Typography className={styles.title}>
        Redefina a senha
      </Typography>
      <Typography className={styles.subtitle}>Digite sua nova senha</Typography>

      <Typography className={styles.inputTitle}>Nova senha</Typography>
      <input
        placeholder="Digite a senha"
        type={passWordVisible ? 'text' : 'password'}
        className={styles.inputCupom}
      ></input>
      {passWordVisible ? (
        <VisibilityOff
          className={styles.iconEye}
          onClick={() => setPassWordVisible(!passWordVisible)}
        />
      ) : (
        <RemoveRedEye
          className={styles.iconEye}
          onClick={() => setPassWordVisible(!passWordVisible)}
        />
      )}
      <Typography className={styles.warning}>*A senha deve conter pelo menos 8 caracteres</Typography>

      <Typography className={styles.inputTitle}>Confirmar nova senha</Typography>
      <input
        placeholder="Digite a senha"
        type={passWordVisible ? 'text' : 'password'}
        className={styles.inputCupom}
      ></input>
      {passWordVisible ? (
        <VisibilityOff
          className={styles.iconEye}
          onClick={() => setPassWordVisible(!passWordVisible)}
        />
      ) : (
        <RemoveRedEye
          className={styles.iconEye}
          onClick={() => setPassWordVisible(!passWordVisible)}
        />
      )}

      <Button
        variant="contained"
        disableElevation
        size="large"
        className={styles.button}
      >
        Redefinir senha
      </Button>
    </Grid>
  )
}
