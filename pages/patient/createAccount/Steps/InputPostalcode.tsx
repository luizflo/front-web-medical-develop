import React, { useEffect, useState } from 'react'
import styles from '../createAccount.module.scss'
import {
  Button,
  Grid,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form';
import { ArrowBackIos, Close, RemoveRedEye, VisibilityOff } from '@mui/icons-material'
import Image from 'next/image';
import Logo from "../../../../public/logo_black.png";
import arrow from '../../../../public/arrow.png'


export default function InputPostalcode({ onClick }: any) {
  const { register, handleSubmit, setValue, setFocus } = useForm();

  const onSubmit = (e: any) => {
  }

  const checkCEP = (e: any) => {
    const cep = e.target.value.replace(/\D/g, "");
    // const cep = e.target.value;
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("address", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("uf", data.uf);
        setFocus("addressNumber");
      });
  }

  return (
    <Grid className={styles.container}>
      <Grid xs={12} className={styles.grid} style={{ justifyContent: 'space-between' }}>
        <Close sx={{ color: '#0074E5' }} fontSize="large" />
        <Image alt="no-alt" src={Logo} className={styles.logoCenter} />
        <div></div>
      </Grid>
      <div className={styles.progressDiv}>
        <div className={styles.progressBar} style={{ width: '80%' }} />
      </div>
      <Grid container className={styles.content2}>
        <Grid className={styles.marginTopFirsty}>
          <Typography className={styles.title}>Endereço</Typography>
          <Typography className={styles.inputTitle}>Digite o seu CEP</Typography>
          <input  {...register("cep")} onBlur={checkCEP}
            className={styles.inputBlue}
            placeholder='Digite seu cpf'
          ></input>

          <Typography className={styles.inputTitle}>Logradouro</Typography>
          <input  {...register("address")}
            className={styles.inputBlue}
            placeholder='Nome da rua'
          ></input>

          <Grid className={styles.rowInputAdress}>
            <Grid md={4}>
              <Typography className={styles.inputTitle}>Número</Typography>
              <input  {...register("addressNumber")}
                className={styles.inputBlue}
                placeholder='XXX'
              ></input>
            </Grid>
            <Grid md={4}>
              <Typography className={styles.inputTitle}>Complemento</Typography>
              <input
                className={styles.inputBlue}
                placeholder='Ex: Apto 01'
              ></input>
            </Grid>
            <Grid md={6}>
              <Typography className={styles.inputTitle}>Bairro</Typography>
              <input  {...register("neighborhood")}
                className={styles.inputBlue}
                placeholder='Ex: Centro'
              ></input>
            </Grid>
          </Grid>
          <Grid className={styles.rowInputAdress}>
            <Grid md={6}>
              <Typography className={styles.inputTitle}>Cidade</Typography>
              <input  {...register("city")}
                className={styles.inputBlue}
                placeholder='XXXXXX'
              ></input>
            </Grid>
            <Grid md={3}>
              <Typography className={styles.inputTitle}>UF</Typography>
              <input type="text" {...register("uf")}
                className={styles.inputBlue}
                placeholder='Ex: Apto 01'
              ></input>
            </Grid>

          </Grid>
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
    </Grid >
  )
}
