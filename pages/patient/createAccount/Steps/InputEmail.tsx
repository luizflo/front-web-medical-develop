import React, { useEffect, useState } from "react";
import styles from "../createAccount.module.scss";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Snackbar,
  Alert,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import GoogleIcon from "../../../../public/GoogleLogo.svg";
import Logo from "../../../../public/hauseyLogo.svg";
import { useForm, Controller } from "react-hook-form";
import { useFormik, Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";

import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import { ICreateAccountData, ILoginData } from "src/interfaces";
import { postCreateAccount } from "src/api/patient";
import { postLogin } from "src/api/auth";
import { useNotification } from "@pankod/refine-core";
import { useDispatch } from "react-redux";
import { ActionTypes } from "src/store/user/types";

export default function InputEmail({ handlerClick }: any) {
  const [checked, setChecked] = React.useState<any>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<any>(false);
  const [passWordVisible, setPassWordVisible] = useState<any>(false);
  const [passWordConfirmVisible, setPassWordConfirmVisible] =
    useState<any>(false);

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    reValidateMode: "onChange",
  });

  const schema = yup.object().shape({
    nome: yup
      .string()
      .min(5, "Digite o seu nome completo")
      .required("Esse campo não pode ficar em branco"),
    email: yup
      .string()
      .email("Digite um email válido")
      .required("Esse campo não pode ficar em branco"),
    password: yup
      .string()
      .min(8, "*A senha deve conter pelo menos 8 caracteres")
      .required("Esse campo não pode ficar em branco"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas precisam ser iguais"),
    termsOfUse: yup
      .bool()
      .oneOf([true], "Você precisa estar de acordo com os termos e condições"),
  });
  const initialValues = {
    nome: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    termsOfUse: false,
  };
  const { open } = useNotification();
  const handleClose = () => {
    setError(false);
  };

  const dispatch = useDispatch();

  async function sendRegister(data: any) {
    setIsLoading(true);
    // alert(JSON.stringify(data, null, 2))
    const dataBody: ICreateAccountData = {
      name: data.nome,
      email: data.email,
      password: data.password,
    };
    const response = await postCreateAccount(dataBody);
    if (response.status === "error") {
      setError(true);
      setErrorMessage(response.message);
      setIsLoading(false);
    } else {
      const dataLogin: ILoginData = {
        email: data.email,
        password: data.password,
        role: "patient",
      };
      const loginResponse = await postLogin(dataLogin);
      localStorage.setItem("@logged:user-token", loginResponse?.accessToken!!);
      dispatch({
        type: ActionTypes.AUTHENTICATION_PACIENT_SUCCESS,
        userToken: loginResponse?.accessToken,
        role: "patient",
        userLogged: loginResponse?.patient,
      });
      setIsLoading(false);
      handlerClick();
    }
  }
  const router = useRouter();
  const renderError = (message: any) => (
    <p className={styles.errorMessage}>{message}</p>
  );

  return (
    <Grid
      container
      direction={isSmallScreen ? "column" : "row"}
      className={
        isSmallScreen ? styles.containerRowMobile : styles.containerRow
      }
    >
      <Snackbar
        open={error}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Grid
        xs={12}
        md={12}
        item
        // className={styles.content}
        sx={{ alignItems: "center", paddingInline: "8vw", paddingTop: "10vh" }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={"bold"}
          className={styles.title}
        >
          Agendar consulta
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, { resetForm }) => {
            await sendRegister(values);
            resetForm();
          }}
        >
          <Form>
            <Field style={{ display: "none" }} autoComplete="off" />
            <Typography className={styles.inputTitle}>
              Seu nome completo
            </Typography>
            <Field
              name="nome"
              className={styles.inputCupom}
              placeholder="Digite seu nome"
            />
            <ErrorMessage name="nome" render={renderError} />
            <Typography className={styles.inputTitle}>Email</Typography>
            <Field style={{ display: "none" }} />
            <Field
              name="email"
              type={"email"}
              placeholder="ex: joao@gmail.com"
              className={styles.inputCupom}
            />
            <ErrorMessage name="email" render={renderError} />
            <Typography className={styles.inputTitle}>Nova senha</Typography>
            <div className={styles.rowInput}>
              <Field
                name="password"
                autoComplete="new-password"
                placeholder="Escreva a sua nova senha"
                type={passWordVisible ? "text" : "password"}
                className={styles.inputCupom}
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
            <ErrorMessage name="password" render={renderError} />
            <Typography
              className={styles.inputTitle}
              style={{ marginTop: "0px" }}
            >
              Confirmar nova senha
            </Typography>
            <div className={styles.rowInput}>
              <Field
                name="passwordConfirmation"
                type={passWordConfirmVisible ? "text" : "password"}
                placeholder="Confirme a sua nova senha"
                className={styles.inputCupom}
              />
              {passWordConfirmVisible ? (
                <VisibilityOff
                  className={styles.iconEye}
                  onClick={() =>
                    setPassWordConfirmVisible(!passWordConfirmVisible)
                  }
                />
              ) : (
                <RemoveRedEye
                  className={styles.iconEye}
                  onClick={() =>
                    setPassWordConfirmVisible(!passWordConfirmVisible)
                  }
                />
              )}
            </div>
            <ErrorMessage name="passwordConfirmation" render={renderError} />
            <div className={styles.rowTerms}>
              <Field type="checkbox" name="termsOfUse" />
              <Typography variant="body1" className={styles.textTerms}>
                Li e estou de acordo com os{" "}
              </Typography>
              <a
                className={styles.linkTerms}
                target={"_blank"}
                href="https://www.hausey.com.br/politicas-de-privacidade.pdf"
              >
                Políticas de Privacidade
              </a>

              <Typography variant="body1" className={styles.textTerms}>
                {" "}
                e{" "}
              </Typography>

              <a
                className={styles.linkTerms}
                target={"_blank"}
                href="https://www.hausey.com.br/termos-de-uso.pdf"
              >
                Termos de Uso.
              </a>
            </div>
            <ErrorMessage name="termsOfUse" render={renderError} />
            <Button
              variant="contained"
              disableElevation
              // type="submit"
              onClick={() => router.replace("/patient/schedule")}
              size="large"
              className={styles.button}
            >
              {isLoading ? <CircularProgress color="inherit" /> : "Próximo"}
            </Button>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
}
