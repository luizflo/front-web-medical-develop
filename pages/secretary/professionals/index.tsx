import React, { useEffect, useState } from 'react'
import styles from './professionals.module.scss'
import { useRouter } from 'next/router'
import {
  AlertProps,
  alpha,
  Box,
  Button,
  Drawer,
  Grid,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColumns,
  GridEventListener,
  GridToolbar,
  useDataGrid,
} from "@pankod/refine-mui";
import { Professional } from "src/interfaces";
import List from "./Steps/List";
import { Search } from "@mui/icons-material";
import Details from "./Steps/Details";
import Historic from "./Steps/Historic";
import { getProfessionals } from "src/api/professional";

export default function Professionals() {
  const [step, setStep] = useState<number>(1);
  const [listProfessionals, setListProfessionals] = useState<Professional[]>(
    []
  );
  const [professionalSelected, setProfessionalSelected] =
    useState<Professional>();
  const [feedBack, setFeedback] = useState<string>("");
  const [feedbackIsOpen, setFeedbackIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedBackType] = useState<AlertProps["severity"]>();
  const [isLoading, setIsLoading] = useState<any>(false);

  const handlerClick = (professional: Professional) => {
    setProfessionalSelected(professional);
    setStep(step + 1);
  };

  const getProfessionalsList = async () => {
    setIsLoading(true);
    const response = await getProfessionals();
    if (response.status === "error") {
      setFeedbackIsOpen(true);
      setFeedBackType("error");
      setFeedback(response.message);
      setIsLoading(false);
    } else {
      setListProfessionals(response);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfessionalsList();

    return () => {};
  }, []);

  const setStepFixo = (value: number) => {
    setStep(value);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <List
            onClick={handlerClick}
            listProfessionals={listProfessionals}
            loading={isLoading}
            getProfessionalsList={getProfessionalsList}
          />
        );
      case 2:
        return (
          <Details
            professionalSelected={professionalSelected!!}
            setStepFixo={setStepFixo}
          />
        );
      case 3:
        return (
          <Historic
            professionalSelected={professionalSelected!!}
            setStepFixo={setStepFixo}
          />
        );
    }
  };

  return <Grid className={styles.grid}>{renderStep()}</Grid>;
}
