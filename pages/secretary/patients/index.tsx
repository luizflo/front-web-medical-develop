import React, { useEffect, useState } from 'react'
import styles from './patients.module.scss'
import { useRouter } from 'next/router'
import { AlertProps, Grid } from "@mui/material";
import List from "./Steps/List";
import Historic from "./Steps/Historic";
import { Patient, IPatients } from "src/interfaces";
import { getPatients } from "src/api/patient";

export default function Professionals() {
  const [patientSelected, setPatientSelected] = useState<Patient>();
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const [step, setStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [feedBack, setFeedback] = useState<string>("");
  const [feedbackIsOpen, setFeedbackIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedBackType] = useState<AlertProps["severity"]>();

  const handlerClick = () => {
    setStep(step + 1);
  };

  const setStepFixo = (value: number) => {
    setStep(value);
  };
  const getPatientsList = async () => {
    setIsLoading(true);
    const response = await getPatients();
    if (response.status === "error") {
      setFeedbackIsOpen(true);
      setFeedBackType("error");
      setFeedback(response.message);
      setIsLoading(false);
    } else {
      setPatientsList(response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPatientsList();

    return () => {};
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <List
            loading={isLoading}
            getProfessionalsList={getPatientsList}
            listProfessionals={patientsList!!}
            onClick={handlerClick}
            patientSelected={patientSelected}
            setPatientSelected={setPatientSelected}
          />
        );
      case 2:
        return (
          <Historic
            onClick={handlerClick}
            setStepFixo={setStepFixo}
            patientSelected={patientSelected!!}
          />
        );
    }
  };

  return <Grid className={styles.grid}>{renderStep()}</Grid>;
}
