import React, { useEffect, useState } from "react";
import styles from "./createAccount.module.scss";
import { AlertProps, Grid } from "@mui/material";
import Document from "./Steps/Document";
import InputDate from "./Steps/InputDate";
import InputGender from "./Steps/InputGender";
import Finish from "./Steps/Finish";
import InputContact from "./Steps/InputContact";
import VerifiedEmail from "./Steps/VerifiedEmail";
import InputEmail from "./Steps/InputEmail";
import { useNotification } from "@pankod/refine-core";
import { ICreateAccountData, IUpdateAccountData } from "src/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { patchCreateAccount, postCreateAccount } from "src/api/patient";
import { ActionTypes, UserState } from "src/store/user/types";
import { sexType } from "src/interfaces";
import FeedBack from "@components/layout/feedback";
import { AppState } from "src/store";
import { useRouter } from "next/router";

export default function createAccount() {
  const [step, setStep] = useState<number>(1);
  const [feedBack, setFeedback] = useState<string>("");
  const [feedbackIsOpen, setFeedbackIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedBackType] = useState<AlertProps["severity"]>();
  const [cpf, setCpf] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const { userLogged, role } = useSelector<AppState, UserState>(
    (state: any) => state.userState
  );
  const router = useRouter();
  const [gender, setGender] = useState<sexType | "">("");
  const [birthdate, setBirthdate] = useState<string>("");
  const dispatch = useDispatch();
  const handleCloseFeedback = () => setFeedbackIsOpen(false);
  const handlerClick = () => {
    setStep(step + 1);
  };

  const goBack = () => {
    setStep(step - 1);
  };

  const patchUser = async () => {
    setIsLoading(true);
    let sex = "M";
    let phoneNumberOnly = phoneNumber.replace(/[^\d]/g, "");
    // let phoneNumberOnly = phoneNumber;
    const dataBody: IUpdateAccountData = {
      document: cpf,
      birthdate: birthdate,
      phoneNumber: phoneNumberOnly,
      sex: sex,
    };
    const response = await patchCreateAccount(dataBody, userLogged.id);
    if (response.status === "error") {
      setFeedbackIsOpen(true);
      setFeedBackType("error");
      setFeedback(response.message);
      setIsLoading(false);
    } else {
      setFeedBackType("success");
      setFeedbackIsOpen(true);
      setFeedback("Cadastrado concluído com sucesso!");
      setIsLoading(false);
      router.push("/patient/schedule");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <InputEmail handlerClick={handlerClick} goBack={goBack} />;
      case 2:
        return (
          <Document
            onClick={patchUser}
            setCpf={setCpf}
            cpf={cpf}
            goBack={goBack}
            phoneNumber={phoneNumber}
            isLoading={isLoading}
            setPhoneNumber={setPhoneNumber}
            setBirthdate={setBirthdate}
          />
        );
      case 3:
        return (
          <InputDate
            onClick={handlerClick}
            setBirthdate={setBirthdate}
            goBack={goBack}
          />
        );
      case 4:
        return (
          <InputGender
            onClick={handlerClick}
            setGender={setGender}
            gender={gender}
            goBack={goBack}
          />
        );
      case 5:
        return (
          <InputContact
            onClick={patchUser}
            phoneNumber={phoneNumber}
            isLoading={isLoading}
            setPhoneNumber={setPhoneNumber}
            goBack={goBack}
          />
        );
      case 6:
        return <Finish />;
    }
  };

  return (
    <Grid container className={styles.container}>
      <FeedBack
        handleClose={handleCloseFeedback}
        open={feedbackIsOpen}
        messageType={feedbackType}
        message={feedBack}
      />
      {renderStep()}
    </Grid>
  );
}
