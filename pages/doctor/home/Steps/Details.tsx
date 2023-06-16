import React, { useEffect, useState, useRef } from 'react'
import styles from '../home.module.scss'
import { useRouter } from 'next/router'
import {
  AlertProps,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material'
import Cake from 'public/images/patient/cake-birthday.svg'
import FolderAdd from 'public/images/patient/folder-add.svg'
import Folder from 'public/images/patient/folder.svg'
import Gender from 'public/images/patient/venus-mars.svg'
import IconCalendar from 'public/IconCalendar.svg'
import IconClock from 'public/images/icons/clock.svg'
import IconSteto from 'public/images/patient//stethoscopeBlue.svg'
import ClockGrey from 'public/images/patient/clock.svg'
import Clip from 'public/images/patient/clipBlue.svg'
import Calendar from 'public/images/patient/calendarBlue.svg'
import Arrow from '@public/images/secretary/arrow-back.svg'
import {
  formatDateWithWeekDay,
  formatHourRange,
  calculateAge,
} from '@components/utils'

import userLogo from "public/user.png";
import ArrowRightWhite from "public/images/patient/arrowRightWhite.svg";
import HistoryIcon from "public/images/menu/historicSelected.svg";
import {
  Home,
  HomeOutlined,
  PowerSettingsNew,
  ExitToApp,
} from "@mui/icons-material";
import { IAppointment } from "src/interfaces";
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
import Image from "next/image";

interface DetailsProps {
  returnStep: () => void;
  onClickHistory: () => void;
  selectedAppointment?: IAppointment;
}

function NavHeader(props: any) {
  return (
    <Box className={styles.rowButtonBack} onClick={() => props.returnStep()}>
      <Arrow />
      <HomeOutlined className={styles.spaceIcon} />
      <Typography className={styles.textPages}>Home /</Typography>
      <Typography className={styles.boldBlue}>Detalhes</Typography>
    </Box>
  );
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
  const clickEnterAppointment = () => {
    dispatch({
      type: ActionTypesAppointment.SAVE_APPOINTMENT,
      appointment: selectedAppointment,
    });
    router.push("/meet");
  };
  const handleClick = () => {
    //@ts-ignore
    fileInput.current.click();
  };
  const handleClose = () => {
    setFeedbackIsOpen(false);
  };
  const finishConsult = async () => {
    setDialogAlertOpen(false);
    const response = await toogleFinished(selectedAppointment.id);
    if (response.status) {
      setFeedBackType("error");
      setFeedbackIsOpen(true);
      setFeedback(response.message);
    } else {
      setFeedBackType("success");
      setFeedbackIsOpen(true);
      setFeedback("Consulta Finalizada!");
      returnStep();
    }
  };
  const handleClickFinish = () => {
    setDialogAlertOpen(true);
  };
  const handleClickReturnToConsult = () => {
    window.close();
  };
  const handleChange = async (event: any) => {
    setIsLoading(true);
    const fileUploaded = event.target.files[0];
    setSelectedFile(fileUploaded);
    const formData = new FormData();
    formData.append("file", fileUploaded);
    const response = await postFiles(formData, selectedAppointment.id);
    if (response.status) {
      setFeedBackType("error");
      setFeedbackIsOpen(true);
      setFeedback(response.message);
    } else {
      setFeedBackType("success");
      setFeedbackIsOpen(true);
      setFeedback(response.message);
    }
    getFilesList();
    setIsLoading(false);
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
  function CardPatientDetails(props: any) {
    return (
      <Box className={styles.cardConsult2}>
        <Typography variant="body1" className={styles.textGrey}>
          Detalhes do paciente
        </Typography>
        <Box sx={{ display: "flex", marginTop: "5px" }}>
          <Box>
            <Image
              alt="no-alt"
              src={PlaceHolderAvatar}
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
              {props.selectedAppointment.patient?.name}
            </Typography>
            <Box className={styles.row}>
              <Box className={styles.row}>
                <Cake className={styles.textGrey} />
                <Typography className={styles.textGrey}>
                  {" "}
                  {calculateAge(
                    props.selectedAppointment.patient?.birthdate!!
                  )}{" "}
                  anos
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
                  {props.selectedAppointment.patient?.sex === "M"
                    ? "Masculino"
                    : "Feminino"}
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
                {props.selectedAppointment.patient?.email}
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
                +55{props.selectedAppointment.patient?.phoneNumber}
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
          {!callOnGoing && <NavHeader returnStep={props.returnStep} />}
          <Typography className={styles.title2}>
            Detalhes da consulta
          </Typography>
          <Typography variant="body2" className={styles.subtitle}>
            Fique por dentro dos detalhes de sua próxima consulta
          </Typography>
          {callOnGoing && (
            <Button
              variant="contained"
              sx={{ color: "#ffff" }}
              className={styles.buttonFinishConsult}
              onClick={() => handleClickReturnToConsult()}
            >
              <ExitToApp
                sx={{ color: "#ffff", marginRight: "10px" }}
                fontSize={"medium"}
              />
              Retornar a consulta
            </Button>
          )}
        </Box>
        {!selectedAppointment.finished && (
          <Button
            disabled={callOnGoing}
            variant="text"
            sx={{ color: "#ff4545" }}
            className={styles.buttonFinishConsult}
            onClick={() => handleClickFinish()}
          >
            <PowerSettingsNew
              sx={{ color: "##ff4545", marginRight: "10px" }}
              fontSize={"medium"}
            />
            Finalizar atendimento
          </Button>
        )}
      </Grid>
    );
  }
  useEffect(() => {
    getFilesList();
    // getDiagnosys()
    // getAnamneses()
  }, []);
  function CardConsultDetails() {
    return (
      <Box className={styles.cardConsultDetails}>
        <div>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            className={styles.titleCardDetailsConsult}
            style={{
              marginTop: "10px",
            }}
          >
            Consulta de {selectedAppointment.specialty?.name}
          </Typography>
          <div className={styles.rowSpacing}>
            <Calendar className={styles.IconBlue} />
            <Typography
              variant="h4"
              fontWeight={"regular"}
              style={{
                marginLeft: 10,
              }}
              className={styles.textGrey}
            >
              {formatDateWithWeekDay(selectedAppointment.date)}
            </Typography>
          </div>
          <div className={styles.rowSpacing}>
            <IconClock className={styles.IconBlue} />
            <Typography
              variant="h4"
              fontWeight={"regular"}
              style={{
                marginLeft: 10,
              }}
              className={styles.textGrey}
            >
              {formatHourRange(selectedAppointment.date)}
            </Typography>
          </div>
          <Typography className={styles.textGrey}>
            *O botão de ENTRAR estará disponível 15 minutos antes do horário da
            consulta
          </Typography>
        </div>
        <Box>
          <Button
            disabled={callOnGoing}
            variant="contained"
            sx={{
              backgroundColor: callOnGoing ? "#848d9f !important" : "#12CC7E",
            }}
            className={styles.buttonEnterDetailsConsult}
            onClick={() => clickEnterAppointment()}
          >
            {callOnGoing ? "Em andamento..." : "Entrar"}
            {!callOnGoing && (
              <ArrowRightWhite
                style={{
                  marginLeft: 10,
                }}
              />
            )}
          </Button>
        </Box>
      </Box>
    );
  }
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
        <Grid md={8} xs={7} item>
          <CardPatientDetails
            onClickHistory={onClickHistory}
            selectedAppointment={selectedAppointment}
          />

          <CardConsultDetails />
        </Grid>

        <Grid md={4} xs={5} item>
          <Typography
            variant="h4"
            className={styles.textGrey}
            style={{ marginLeft: "20px" }}
          >
            Arquivos
          </Typography>
          <ButtonInputFile
            fileInput={fileInput}
            isLoading={isLoading}
            handleClick={handleClick}
            handleChange={handleChange}
          />
          {filesList?.length > 0 ? (
            filesList?.map((item: any) => (
              <Box className={styles.cardFiles} key={item.name}>
                <Box className={styles.centralize}>
                  <Folder />
                  <div style={{ marginLeft: "20px", paddingRight: "10px" }}>
                    <Typography
                      className={styles.textConsult}
                      variant="body2"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        maxWidth: 180,
                      }}
                    >
                      {item.name}
                    </Typography>
                    {/* <Typography className={styles.textGrey}>
                    {item.date}
                  </Typography> */}
                  </div>
                </Box>
                <Box className={styles.centralize}>
                  <a
                    className={styles.buttonBlue}
                    href={item.url}
                    target="_blank"
                  >
                    <Typography
                      variant="h4"
                      className={styles.textButtonConfirm}
                    >
                      Download
                    </Typography>
                  </a>
                </Box>
              </Box>
            ))
          ) : (
            <EmptyComponent
              isLoading={isListLoading}
              update={getFilesList}
              type={"files"}
              title={"Ainda não há arquivos anexados"}
              message={
                "Anexe arquivos à consulta e atualize a lista no botão abaixo para vê-los aqui"
              }
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
