// @ts-nocheck
import React, { useContext, useEffect, useState } from "react";
import styles from "./login.module.scss";
import { useRouter } from "next/router";
import { useLogin } from "@pankod/refine-core";
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  AlertProps,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/logo_black.png";
import { RemoveRedEye, VisibilityOff, Google } from "@mui/icons-material";
import DoctorIcon from "@public/images/icons/doctor.svg";
import SecretaryIcon from "@public/images/icons/secretary.svg";
import { postLogin } from "src/api/auth";
import { ILoginData } from "src/interfaces";
import { Action, Dispatch, ActionCreator } from "redux";
import { ActionTypes, UserState } from "src/store/user/types";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/store";
import { useForm } from "react-hook-form";
import FeedBack from "@components/layout/feedback";

export default function Login() {
  const router = useRouter();
  const [passWordVisible, setPassWordVisible] = useState<any>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [feedBack, setFeedback] = useState<string>("");
  const [feedbackIsOpen, setFeedbackIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedBackType] = useState<AlertProps["severity"]>();
  const [isLoading, setIsLoading] = useState<any>(false);
  const { register, handleSubmit } = useForm();
  const { mutate: login } = useLogin();

  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );
  async function sendLogin(data) {
    setIsLoading(true);
    const dataBody: ILoginData = {
      email: data.email,
      password: data.password,
      role: "patient",
    };
    const response = await postLogin(dataBody);
    if (response.status) {
      setFeedBackType("error");
      setFeedbackIsOpen(true);
      setFeedback(response.message);
      setIsLoading(false);
    } else {
      dispatch({
        type: ActionTypes.AUTHENTICATION_PACIENT_SUCCESS,
        userToken: response?.accessToken,
        role: "patient",
        userLogged: response?.patient,
      });
      localStorage.setItem("@logged:user-token", response?.accessToken);
      setIsLoading(false);
      let body = {
        token: response?.accessToken,
        route: "/home",
      };
      login(body);
    }
  }
  const handleLoginDoctor = () => {
    router.push("/doctor/login");
  };
  const handleClose = () => {
    setFeedbackIsOpen(false);
  };

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, []);

  return (
    <Grid container className={styles.container}>
      <FeedBack
        handleClose={handleClose}
        open={feedbackIsOpen}
        messageType={feedbackType}
        message={feedBack}
      />
      <Grid
        xs={12}
        md={6}
        item
        style={{ backgroundColor: "white" }}
        className={isSmallScreen ? styles.contentMobile : styles.content}
      >
        <div className={isSmallScreen ? "" : styles.row}>
          <Image src={Logo} className={styles.logo} />
          {/* <div
            style={{
              display: isSmallScreen ? "block" : "flex",
              alignItens: "center",
            }}
          >
            <Typography className={styles.subtitle}>
              <a
                // href="/patient/createAccount"
                onClick={() => router.push("/secretary/login")}
                style={{
                  color: "#12CC7E",
                  fontWeight: 600,
                  cursor: "pointer",
                  paddingLeft: 5,
                  marginBottom: 0,
                }}
              >
                Entrar como secretária
              </a>
            </Typography>
            <Typography className={styles.subtitle}>
              <a
                // href="/patient/createAccount"
                onClick={() => handleLoginDoctor()}
                style={{
                  color: "#12CC7E",
                  fontWeight: 600,
                  cursor: "pointer",
                  paddingLeft: 5,
                }}
              >
                Entrar como médico
              </a>
            </Typography>
          </div> */}
        </div>
        <Typography
          className={styles.title}
          sx={{
            marginTop: isSmallScreen ? "20px !important" : "50px !important",
          }}
        >
          Faça login para começar
        </Typography>
        {/* <Button
          variant="outlined"
          startIcon={<DoctorIcon />}
          className={styles.loginGoogleButton}
          onClick={() => handleLoginDoctor()}
        >
          <span
            style={{
              marginBottom: '0px !important',
              fontSize: 16,
              textTransform: 'none !important',
            }}
          >
            Entrar como profissional da saúde
          </span>
        </Button> */}
        <Typography className={styles.inputTitle}>
          Ainda não tem uma conta?{" "}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<SecretaryIcon />}
          className={styles.loginGoogleButton}
          onClick={() => router.push("/patient/createAccount")}
        >
          <span
            style={{
              marginBottom: "0px !important",
              fontSize: 16,
              textTransform: "none !important",
            }}
          >
            Criar uma conta
          </span>
        </Button>
        <div className={styles.line} />
        <form
          autoComplete="off"
          onSubmit={handleSubmit(sendLogin)}
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <Typography className={styles.inputTitle}>Email</Typography>
          {/* <input style={{ display: "none" }} autoComplete="off" /> */}
          <input
            {...register("email")}
            // autoComplete="nope"
            type={"email"}
            placeholder="Digite o seu email..."
            className={styles.inputCupom}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input style={{ display: "none" }} />
          <Typography className={styles.inputTitle}>Senha</Typography>
          <div className={styles.rowInput}>
            <input
              {...register("password")}
              placeholder="Digite a senha..."
              autoComplete="new-password"
              type={passWordVisible ? "text" : "password"}
              style={{ width: "100%" }}
              className={styles.inputCupom}
              onChange={(e) => setPassword(e.target.value)}
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
          <Button
            variant="contained"
            disableElevation
            type="submit"
            size="large"
            className={styles.button}
            // onClick={() => submitForm()}
          >
            {isLoading ? <CircularProgress color="inherit" /> : "Entrar"}
          </Button>
        </form>
        {/* <a className={styles.forgotButton}>
          <Typography className={styles.forgotPassword}>
            Esqueci minha senha
          </Typography>
        </a> */}
      </Grid>

      <Grid xs={12} md={6} item className={styles.imgContainer}>
        {/* <Image alt="no-alt" src={BackGround} /> */}
      </Grid>
    </Grid>
  );
}
