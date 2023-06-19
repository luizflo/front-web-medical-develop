// @ts-nocheck
import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './login.module.scss'
import { useRouter } from 'next/router'
import { useLogin } from '@pankod/refine-core'
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  AlertProps,
} from '@mui/material'
import Image from 'next/image'
import Logo from "../../../public/logo_black.png";
import { RemoveRedEye, VisibilityOff, Google } from "@mui/icons-material";
import GoogleIcon from "../../../public/GoogleLogo.svg";
import PatientIcon from "@public/images/icons/user.svg";
import SecretaryIcon from "@public/images/icons/secretary.svg";
import { useDispatch } from "react-redux";
import { postLogin } from "src/api/auth";
import { useForm } from "react-hook-form";
import { Action, Dispatch, ActionCreator } from "redux";
import { ActionTypes, UserState } from "src/store/user/types";
import { AppState } from "src/store";
import FeedBack from "@components/layout/feedback";

import { ILoginData } from "src/interfaces";

export default function Login() {
  const [passWordVisible, setPassWordVisible] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [feedBack, setFeedback] = useState<string>("");
  const [feedbackIsOpen, setFeedbackIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedBackType] = useState<AlertProps["severity"]>();
  const { mutate: login } = useLogin();
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  async function sendLogin(data) {
    setIsLoading(true);
    const dataBody: ILoginData = {
      email: data.email,
      password: data.password,
      role: "professional",
    };
    const response = await postLogin(dataBody);
    if (response.status) {
      setFeedBackType("error");
      setFeedbackIsOpen(true);
      setFeedback(response.message);
      setIsLoading(false);
    } else {
      dispatch({
        type: ActionTypes.AUTHENTICATION_PROFESSIONAL_SUCCESS,
        userToken: response?.accessToken,
        role: "professional",
        userLogged: response?.professional,
      });
      localStorage.setItem("@logged:user-token", response?.accessToken);
      setIsLoading(false);
      let body = {
        token: response?.accessToken,
        route: "/home-doctor",
      };
      login(body);
    }
  }
  const handleClose = () => {
    setFeedbackIsOpen(false);
  };

  return (
    <Grid container className={styles.container}>
      <FeedBack
        handleClose={handleClose}
        open={feedbackIsOpen}
        messageType={feedbackType}
        message={feedBack}
      />
      <Grid
        md={6}
        xs={12}
        item
        style={{ backgroundColor: "white" }}
        className={styles.content}
      >
        <Image src={Logo} className={styles.logo} />
        {/* <div className={styles.row}>
          <Image alt="no-alt" src={Logo} className={styles.logo} />
          <Typography className={styles.subtitle}>
            Não tenho uma conta?
            <a style={{ color: '#12CC7E', fontWeight: 600, cursor: 'pointer' }}>
              {' '}
              Crie uma conta
            </a>
          </Typography>
        </div> */}
        <Typography className={styles.title}>
          Faça login para começar
        </Typography>
        <Button
          variant="outlined"
          startIcon={<SecretaryIcon />}
          className={styles.loginGoogleButton}
          onClick={() => router.push("/secretary/login")}
        >
          <span style={{ marginBottom: "0px !important", fontSize: 16 }}>
            Entrar como Secretária
          </span>
        </Button>
        <Button
          variant="outlined"
          startIcon={<PatientIcon />}
          className={styles.loginGoogleButton}
          onClick={() => router.push("/login")}
        >
          <span style={{ marginBottom: "0px !important", fontSize: 16 }}>
            Entrar como paciente
          </span>
        </Button>
        <div className={styles.line} />
        <form
          autoComplete="off"
          onSubmit={handleSubmit(sendLogin)}
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <Typography className={styles.inputTitle}>Email</Typography>
          <input style={{ display: "none" }} autoComplete="off" />
          <input
            {...register("email")}
            placeholder="Digite o seu email..."
            className={styles.inputCupom}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <input style={{ display: "none" }} />
          <Typography className={styles.inputTitle}>Senha</Typography>
          <div className={styles.rowInput}>
            <input
              {...register("password")}
              placeholder="Digite a senha..."
              type={passWordVisible ? "text" : "password"}
              style={{ width: "100%" }}
              className={styles.inputCupom}
              // onChange={(e) => setPassword(e.target.value)}
            />
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
          </div>
          <a className={styles.forgotButton}>
            <Typography className={styles.forgotPassword}>
              Esqueci minha senha
            </Typography>
          </a>
          <Button
            variant="contained"
            disableElevation
            type="submit"
            size="large"
            className={styles.button}
            // onClick={() => sendLogin()}
          >
            {isLoading ? <CircularProgress color="inherit" /> : "Entrar"}
          </Button>
        </form>
      </Grid>

      <Grid md={6} xs={12} item className={styles.imgContainer}>
        {/* <Image alt="no-alt" src={BackGround} /> */}
      </Grid>
    </Grid>
  );
}
