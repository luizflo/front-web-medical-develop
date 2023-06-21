// @ts-nocheck
import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "./login.module.scss";
import { Router, useRouter } from "next/router";
import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  AlertProps,
  SupportAgent,
} from "@mui/material";
import Image from "next/image";
import Logo from "../../../public/logo_black.png";
import { useForm } from "react-hook-form";
import { useLogin } from "@pankod/refine-core";
import { RemoveRedEye, VisibilityOff, Google } from "@mui/icons-material";
import GoogleIcon from "../../../public/GoogleLogo.svg";
import DoctorIcon from "@public/images/icons/doctor.svg";
import PatientIcon from "@public/images/icons/user.svg";
import { ILoginData } from "src/interfaces";
import { useDispatch } from "react-redux";
import { postLogin } from "src/api/auth";
import { ActionTypes } from "src/store/user/types";
import FeedBack from "@components/layout/feedback";

export default function login() {
  const router = useRouter();
  const [passWordVisible, setPassWordVisible] = useState<any>(false);
  const [feedBack, setFeedback] = useState<string>("");
  const [feedbackIsOpen, setFeedbackIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedBackType] = useState<AlertProps["severity"]>();
  const [isLoading, setIsLoading] = useState<any>(false);
  const { register, handleSubmit } = useForm();
  const { mutate: login } = useLogin();

  const dispatch = useDispatch();

  async function sendLogin(data) {
    setIsLoading(true);
    const dataBody: ILoginData = {
      email: data.email,
      password: data.password,
      role: "manager",
    };
    const response = await postLogin(dataBody);
    if (response.status) {
      setFeedBackType("error");
      setFeedbackIsOpen(true);
      setFeedback(response.message);
      setIsLoading(false);
    } else {
      dispatch({
        type: ActionTypes.AUTHENTICATION_MANAGER_SUCCESS,
        userToken: response?.accessToken,
        role: "manager",
        userLogged: response?.patient,
      });
      localStorage.setItem("@logged:user-token", response?.accessToken);
      setIsLoading(false);
      let body = {
        token: response?.accessToken,
        route: "/home-manager",
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
        <div className={styles.row}>
          <Image src={Logo} className={styles.logo} />
        </div>
        <Typography className={styles.title}>
          Faça login para começar
        </Typography>
        {/* <Button
          variant="outlined"
          startIcon={<DoctorIcon />}
          className={styles.loginGoogleButton}
          onClick={() => router.push("/doctor/login")}
        >
          <span style={{ marginBottom: "0px !important", fontSize: 16 }}>
            Entrar como profissional da saúde
          </span>
        </Button>
        <Button
          variant="outlined"
          startIcon={<PatientIcon />}
          className={styles.loginGoogleButton}
          onClick={() => router.push("/")}
        >
          <span style={{ marginBottom: "0px !important", fontSize: 16 }}>
            Entrar como paciente
          </span>
        </Button> */}
        {/* <div className={styles.line} />
        <div className={styles.line} /> */}
        <form
          autoComplete="off"
          onSubmit={handleSubmit(sendLogin)}
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <Typography className={styles.inputTitle}>Email</Typography>
          <input
            {...register("email")}
            placeholder="Digite o seu email..."
            className={styles.inputCupom}
            // onChange={(e) => setEmail(e.target.value)}
          ></input>
          <Typography className={styles.inputTitle}>Senha</Typography>
          <div className={styles.rowInput}>
            <input
              {...register("password")}
              placeholder="Digite a senha..."
              type={passWordVisible ? "text" : "password"}
              style={{ width: "100%" }}
              className={styles.inputCupom}
              // onChange={(e) => setPassword(e.target.value)}
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
          </div>
          {/* <a className={styles.forgotButton}>
            <Typography className={styles.forgotPassword}>
              Esqueci minha senha
            </Typography>
          </a> */}
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
        <Button
          variant="text"
          LinkComponent={"a"}
          target="_blank"
          href={`https://wa.me/554398824-2838`}
          style={{
            marginTop: "20px",
            fontSize: "12px",
            color: "grey",
          }}
          onClick={() => {}}
        >
          Entrar em contato com o suporte
        </Button>
      </Grid>

      <Grid md={6} xs={12} item className={styles.imgContainer}>
        {/* <Image alt="no-alt" src={BackGround} /> */}
      </Grid>
    </Grid>
  );
}
