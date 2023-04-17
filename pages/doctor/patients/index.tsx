import React, { useEffect, useState } from 'react'
import styles from './patients.module.scss'
import { useRouter } from 'next/router'
import {
  AlertProps,
  alpha,
  Box,
  Grid,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCell,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
  GridToolbar,
  useDataGrid,
} from "@pankod/refine-mui";
import { PatientsList } from "src/mocks/patientsList";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import logoStethoscope from "../../../public/images/secretary/stethoscope.png";
import logoDocument from "../../../public/images/secretary/document.png";
import userLogo from "../../../public/placeholderAvatar.png";
import badge from "../../../public/images/secretary/badge.png";

import Image from "next/image";
import Link from "next/link";
import List from "./Steps/List";
import Historic from "./Steps/Historic";
import { Patient } from "src/interfaces";
import { getPatients } from "src/api/patient";
import { UserState } from "src/store/user/types";
import { useSelector } from "react-redux";
import { AppState } from "src/store";
import Details from "./Steps/Details";

export default function Patients() {
  const [step, setStep] = useState<number>(1);
  const [patientSelected, setPatientSelected] = useState<Patient>();
  const [patientsList, setPatientsList] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const { userLogged } = useSelector<AppState, UserState>(
    (state) => state.userState
  );

  const handlerClick = () => {
    setStep(step + 1);
  };

  const setStepFixo = (value: number) => {
    setStep(value);
  };
  const returnStep = () => {
    setStep(step - 1);
  };
  const getPatientsList = async () => {
    setIsLoading(true);
    const response = await getPatients(userLogged.id);
    if (response.status === "error") {
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
            onClick={handlerClick}
            loading={isLoading}
            getPatientsList={getPatientsList}
            listPatients={patientsList!!}
            patientSelected={patientSelected}
            setPatientSelected={setPatientSelected}
          />
        );
      case 2:
        return (
          <Details
            onClickHistory={handlerClick}
            returnStep={returnStep}
            setStepFixo={setStepFixo}
            patientSelected={patientSelected!!}
          />
        );
      case 3:
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
