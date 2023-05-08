import React, { useEffect, useState, useRef } from "react";
import styles from "../patients.module.scss";
import { useRouter } from "next/router";
import {
  AlertProps,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Cake from "public/images/patient/cake-birthday.svg";
import FolderAdd from "public/images/patient/folder-add.svg";
import Folder from "public/images/patient/folder.svg";
import Gender from "public/images/patient/venus-mars.svg";
import IconCalendar from "public/IconCalendar.svg";
import IconClock from "public/images/icons/clock.svg";
import IconSteto from "public/images/patient//stethoscopeBlue.svg";
import ClockGrey from "public/images/patient/clock.svg";
import Clip from "public/images/patient/clipBlue.svg";
import Calendar from "public/images/patient/calendarBlue.svg";
import Arrow from "@public/images/secretary/arrow-back.svg";
import {
  formatDateWithWeekDay,
  formatHourRange,
  calculateAge,
} from "@components/utils";

import userLogo from "public/user.png";
import Image from "next/image";
import ArrowRightWhite from "public/images/patient/arrowRightWhite.svg";
import HistoryIcon from "public/images/menu/historicSelected.svg";
import { Home, HomeOutlined } from "@mui/icons-material";
import { IAppointment, Patient } from "src/interfaces";
import { getFiles, postFiles, toogleFinished } from "src/api/appointment";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionTypesAppointment,
  AppointmentState,
} from "src/store/appointment/types";
import FeedBack from "@components/layout/feedback";
import EmptyComponent from "@components/layout/emptyComponent";
import { AppState } from "src/store";
import PlaceHolderAvatar from "@public/placeholderAvatar.png";
import MailIcon from "@public/images/doctor/mail.svg";
import PhoneIcon from "@public/images/doctor/phone.svg";
import Historic from "./Historic";

interface DetailsProps {
  returnStep: () => void;
  onClickHistory: () => void;
  patientSelected?: Patient;
  setStepFixo: (value: number) => void;
}

function ButtonInputFile(props: any) {
  return (
    <Box className={styles.cardItens} onClick={props.handleClick}>
      <Clip />
      <Typography
        variant="body2"
        fontWeight={"medium"}
        className={styles.textRespond}
        style={{
          paddingLeft: "20px",
        }}
      >
        {props.isLoading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          "Anexar arquivos"
        )}
      </Typography>
      <input
        type={"file"}
        ref={props.fileInput}
        accept="image/png, image/jpeg, application/pdf, application/docx"
        hidden
        onChange={props.handleChange}
      />
    </Box>
  );
}

export default function Details({
  returnStep,
  onClickHistory,
  patientSelected,
  setStepFixo,
}: // selectedAppointment,
DetailsProps) {
  const router = useRouter();
  const fileInput = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [feedBack, setFeedback] = useState<string>("");
  const [feedbackIsOpen, setFeedbackIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedBackType] = useState<AlertProps["severity"]>();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [filesList, setFilesList] = useState<any[]>([]);
  const [dialogAlertOpen, setDialogAlertOpen] = useState<boolean>(false);
  const { appointment, cameFromCall, callOnGoing } = useSelector<
    AppState,
    AppointmentState
  >((state) => state.appointmentState);
  const dispatch = useDispatch();
  const selectedAppointment = appointment;
  const handleClose = () => {
    setFeedbackIsOpen(false);
  };

  const getFilesList = async () => {
    setIsListLoading(true);
    const filesResponse = await getFiles(selectedAppointment.id);
    if (filesResponse.status) {
      setFeedBackType("error");
      setFeedbackIsOpen(true);
      setFeedback(filesResponse.message);
    }
    setFilesList(filesResponse);
    setIsListLoading(false);
  };
  function NavHeader(props: any) {
    return (
      <Box className={styles.rowButtonBack} onClick={() => props.returnStep()}>
        <Arrow />
        <Typography className={styles.textPages}>Meus pacientes /</Typography>
        <Typography variant="body1" className={styles.textBlue}>
          {props.patientSelected.name}
        </Typography>
      </Box>
    );
  }
  function CardPatientDetails(props: any) {
    return (
      <Box className={styles.card}>
        <Box sx={{ display: "flex" }}>
          <Box>
            <Image
              alt="no-alt"
              src={PlaceHolderAvatar}
              placeholder="blur"
              blurDataURL={
                "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkOPu/HgAE7gJNy/1riwAAAABJRU5ErkJggg=="
              }
              className={styles.userRound}
              width={80}
              height={80}
            />
          </Box>
          <Box sx={{ marginLeft: "20px" }}>
            <Typography
              variant="h5"
              fontWeight={"bold"}
              className={styles.titleCardDetailsConsult}
              style={{
                marginTop: "20px",
              }}
            >
              {patientSelected?.name}
            </Typography>
            <Box className={styles.row}>
              <Box className={styles.row}>
                <Cake className={styles.textGrey} />
                <Typography className={styles.textGrey}>
                  {" "}
                  {calculateAge(patientSelected?.birthdate!!)} anos
                </Typography>
              </Box>
              <Box
                className={styles.row}
                style={{
                  marginLeft: "15px",
                }}
              >
                <Gender className={styles.textGrey} />
                <Typography className={styles.textGrey}>
                  {" "}
                  {patientSelected?.sex === "M" ? "Masculino" : "Feminino"}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              marginLeft: "100px",
            }}
          >
            <Typography
              variant="h4"
              className={styles.textGrey}
              sx={{
                marginTop: "10px",
              }}
            >
              Contatos
            </Typography>
            <div
              className={styles.row}
              style={{
                marginTop: "5px",
              }}
            >
              <MailIcon />
              <Typography
                variant="body2"
                className={styles.textRespond}
                sx={{ marginLeft: "10px" }}
              >
                {patientSelected?.email}
              </Typography>
            </div>
            <div
              className={styles.row}
              style={{
                marginTop: "5px",
              }}
            >
              <PhoneIcon />
              <Typography
                variant="body2"
                className={styles.textRespond}
                sx={{ marginLeft: "10px" }}
              >
                +55{patientSelected?.phoneNumber}
              </Typography>
            </div>
          </Box>
        </Box>
        <Box sx={{ marginTop: "10px" }}>
          <Button
            variant="text"
            style={{
              fontSize: "14px",
            }}
            onClick={() => props.onClickHistory()}
          >
            <HistoryIcon
              style={{
                marginRight: "10px",
              }}
            />
            Ver histórico do paciente
          </Button>
        </Box>
      </Box>
    );
  }
  function Header(props: any) {
    return (
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!callOnGoing && (
            <NavHeader
              returnStep={props.returnStep}
              patientSelected={patientSelected}
            />
          )}
          <Typography
            variant="h2"
            fontWeight={"bold"}
            className={styles.title2}
          >
            Detalhes do paciente
          </Typography>
          <Typography
            variant="body2"
            fontWeight={"regular"}
            className={styles.subtitle}
          >
            Dados e histórico do paciente
          </Typography>
        </Box>
      </Grid>
    );
  }
  useEffect(() => {
    // getFilesList()
    // getDiagnosys()
    // getAnamneses()
  }, []);
  return (
    <Box className={styles.container}>
      <FeedBack
        handleClose={handleClose}
        open={feedbackIsOpen}
        messageType={feedbackType}
        message={feedBack}
      />

      <Header returnStep={returnStep} />

      <Grid container style={{ marginTop: "20px" }}>
        <Grid md={7} xs={7} item>
          <CardPatientDetails
            onClickHistory={onClickHistory}
            selectedAppointment={selectedAppointment}
          />
          {/* <Historic
            onClick={onClickHistory}
            setStepFixo={setStepFixo}
            patientSelected={patientSelected!!}
          /> */}
        </Grid>

        <Grid md={5} xs={5} item>
          <Typography
            variant="h4"
            className={styles.textGrey}
            style={{ marginLeft: "20px" }}
          >
            Linha do tempo
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
