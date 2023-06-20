import React, { useEffect, useRef, useState } from "react";
import styles from "../HomePage.module.scss";
import { useRouter } from "next/router";
import {
  AlertProps,
  Box,
  Button,
  CircularProgress,
  filledInputClasses,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import Cake from "public/images/patient/cake-birthday.svg";
import FolderAdd from "public/images/patient/folder-add.svg";
import Folder from "public/images/patient/folder.svg";
import Gender from "public/images/patient/venus-mars.svg";
import HistoryIcon from "public/images/menu/historicSelected.svg";
import ArrowRightWhite from "public/images/patient/arrowRightWhite.svg";
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
  formatHour,
} from "@components/utils";
import FeedBack from "@components/layout/feedback";
import { useDispatch } from "react-redux";

import userLogo from "public/user.png";
import Image from "next/image";
import {
  Home,
  HomeOutlined,
  Troubleshoot,
  SupportAgent,
} from "@mui/icons-material";
import { IAppointment } from "src/interfaces";
import { getFiles, postFiles } from "src/api/appointment";
import EmptyComponent from "@components/layout/emptyComponent";
import { ActionTypesAppointment } from "src/store/appointment/types";

interface DetailsProps {
  returnStep: () => void;
  selectedAppointment: IAppointment;
}

function Header(props: any) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box className={styles.rowButtonBack} onClick={() => props.returnStep()}>
        <Arrow />
        <HomeOutlined className={styles.spaceIcon} />
        <Typography className={styles.textPages}>Home /</Typography>
        <Typography className={styles.boldBlue}>Detalhes</Typography>
      </Box>
      <Typography variant="h1" className={styles.title2}>
        Detalhes da consulta
      </Typography>
      <Typography variant="body2" className={styles.subtitle}>
        Fique por dentro das especifidades de sua próxima consulta
      </Typography>
    </Box>
  );
}

export default function Details({
  returnStep,
  selectedAppointment,
}: DetailsProps) {
  const router = useRouter();
  const fileInput = useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [feedBack, setFeedback] = useState<string>("");
  const [feedbackIsOpen, setFeedbackIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedBackType] = useState<AlertProps["severity"]>();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [filesList, setFilesList] = useState<any[]>([]);
  const dispatch = useDispatch();

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

  useEffect(() => {
    getFilesList();
  }, []);
  function CardDetailsDoctor() {
    return (
      <Grid className={styles.cardConsult2} sx={{ marginRight: "20px" }}>
        <Box>
          <Typography
            variant="h2"
            fontWeight={"bold"}
            className={styles.textCard}
            style={{
              marginTop: "10px",
            }}
          >
            {selectedAppointment.paid
              ? selectedAppointment.professional
                ? `Dr. ${selectedAppointment.professional?.name}`
                : `🕔Aguardando alocação do Médico pela secretária`
              : `🕑Aguardando confirmação de pagamento`}
          </Typography>
          <div
            className={styles.rowSpacing}
            style={{
              marginTop: "15px",
            }}
          >
            <IconSteto className={styles.IconBlue} />
            <Typography className={styles.textRespond}>
              {selectedAppointment.specialty.name}
            </Typography>
          </div>
          <div className={styles.rowSpacing}>
            <Calendar className={styles.IconBlue} />
            <Typography className={styles.textRespond}>
              {formatDateWithWeekDay(selectedAppointment.date)}
            </Typography>
          </div>
          <div className={styles.rowSpacing}>
            <IconClock className={styles.IconBlue} />
            <Typography className={styles.textRespond}>
              {formatHourRange(selectedAppointment.date)}
            </Typography>
          </div>
        </Box>
        <Box
          style={{
            marginLeft: "50px",
          }}
        >
          <Button
            variant="text"
            LinkComponent={"a"}
            target="_blank"
            href={`https://wa.me/554398824-2838`}
            style={{
              fontSize: "14px",
            }}
            onClick={() => {}}
          >
            <SupportAgent
              style={{
                marginRight: "10px",
              }}
            />
            Entrar em contato com o suporte
          </Button>
        </Box>
      </Grid>
    );
  }
  return (
    <Box className={styles.containerDetails}>
      <FeedBack
        handleClose={handleClose}
        open={feedbackIsOpen}
        messageType={feedbackType}
        message={feedBack}
      />
      <Header returnStep={returnStep} />
      <Grid container style={{ marginTop: "20px" }}>
        <Grid md={8} xs={12} item>
          <CardDetailsDoctor />
          <Grid container>
            <Grid md={6} xs={12} item>
              <Box className={styles.cardItens} onClick={handleClick}>
                <Clip />
                <Typography
                  variant="body2"
                  fontWeight={"medium"}
                  className={styles.textRespond}
                  style={{ paddingLeft: "20px" }}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size={24} />
                  ) : (
                    "Anexar exames"
                  )}
                </Typography>
                <input
                  type={"file"}
                  ref={fileInput}
                  accept="image/png, image/jpeg, application/pdf, application/docx"
                  hidden
                  onChange={handleChange}
                />
              </Box>
            </Grid>
            {selectedAppointment.paid ? (
              <Grid md={6} xs={12} item>
                <Box
                  className={styles.cardItensBlue}
                  onClick={() => clickEnterAppointment()}
                  sx={{ marginRight: "20px" }}
                >
                  <Typography className={styles.textWhite}>
                    {formatHour(selectedAppointment.date)}
                  </Typography>
                  <Typography variant="body2" className={styles.textWhiteMin}>
                    Entrar
                  </Typography>
                  <ArrowRightWhite />
                </Box>
                <Typography className={styles.centerGrey}>
                  Este botão estará disponível 15 minutos antes do horário
                  marcado
                </Typography>
              </Grid>
            ) : (
              <Grid md={6} xs={12} item>
                <Box className={styles.cardItensBlue} onClick={() => {}}>
                  <Typography variant="body2" className={styles.textWhiteMin}>
                    Enviar comprovante
                  </Typography>
                  <ArrowRightWhite />
                </Box>
                <Typography className={styles.centerGrey}>
                  Este botão estará disponível 15 minutos antes do horário
                  marcado
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid md={4} xs={12} item>
          <Typography variant="body2" className={styles.subtitle}>
            Arquivos
          </Typography>
          {filesList?.length > 0 ? (
            filesList?.map((item: any) => (
              <Box className={styles.cardFiles}>
                <Box className={styles.centralize}>
                  <Folder />
                  <div style={{ marginLeft: "20px" }}>
                    <Typography
                      className={styles.textConsult}
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical",
                        maxWidth: 250,
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
