// @ts-nocheck
import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import ClipIcon from "@public/images/icons/clip.png";
import RedPhoneIcon from "@public/images/icons/red-phone.png";
import MicrophoneIcon from "@public/images/icons/microphone.svg";
import MicrophoneOff from "@public/images/icons/micOff.png";
import CameraIcon from "@public/images/icons/camera.svg";
import CameraOff from "@public/images/icons/cameraOff.png";
import DiagnosysIcon from "@public/images/icons/diagnosys.svg";
import AnamneseIcon from "@public/images/icons/anamnese.svg";
import ProntuarioIcon from "@public/images/icons/prontuario.svg";
import DetailsIcon from "@public/images/icons/user.svg";
import {
  ActionTypesAppointment,
  AppointmentState,
} from "src/store/appointment/types";
import Timer from "../Timer";
import { useDispatch, useSelector } from "react-redux";
import ClockIcon from "@public/images/icons/clock.png";
import { IFooterProps } from "src/interfaces";

import { Box, Button, Typography, CircularProgress, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

function FooterPatient(props: any) {
  return (
    <Grid
      container
      className={styles.footerMenuContainer}
      sx={{
        paddingLeft: { xs: "0px", md: "20vw" },
        height: { xs: "15vh", md: "89px" },
      }}
    >
      <Grid
        item
        xs={12}
        md={9}
        sx={{
          display: "flex",
          // backgroundColor: "yellow",
          justifyContent: "center",
        }}
      >
        <button
          className={`${styles.interactionButton} ${styles.circularButton}`}
          variant="outlined"
          onClick={() =>
            props.isCameraOn ? props.disableVideo() : props.enableVideo()
          }
        >
          {!props.isCameraOn ? (
            <Image alt="no-alt" src={CameraOff} className={styles.iconImage} />
          ) : (
            <CameraIcon className={styles.iconImage} />
          )}
        </button>
        <button
          className={`${styles.circularButton} ${styles.interactionButton} `}
          variant="outlined"
          onClick={() => props.handleLogout()}
        >
          <Image alt="no-alt" src={RedPhoneIcon} className={styles.iconImage} />
        </button>
        <button
          className={`${styles.interactionButton} ${styles.circularButton}`}
          variant="outlined"
          onClick={() =>
            props.isMicrophoneOn ? props.disableAudio() : props.enableAudio()
          }
        >
          {props.isMicrophoneOn ? (
            <MicrophoneIcon className={styles.iconImage} />
          ) : (
            <Image
              alt="no-alt"
              src={MicrophoneOff}
              className={styles.iconImage}
            />
          )}
        </button>
        <button
          className={`${styles.interactionButton} ${styles.circularButton}`}
          style={{
            paddingLeft: 40,
          }}
          onClick={() => props.handleClickInputButton()}
        >
          {props.isLoading ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            <Image
              alt="no-alt"
              src={ClipIcon}
              height="23.96px"
              width="23.14px"
            />
          )}
        </button>
        <input
          type={"file"}
          ref={props.fileInput}
          accept="image/png, image/jpeg, application/pdf, application/docx"
          hidden
          onChange={props.handleChangeInputFile}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={3}
        sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}
      >
        <Timer />
      </Grid>
    </Grid>
  );
}

function FooterDoctor(props: any) {
  return (
    <Grid
      container
      className={styles.footerMenuContainer}
      sx={{
        height: { xs: "15vh", md: "89px" },
        paddingInline: { xs: "0px", md: "50px" },
      }}
    >
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
        }}
      >
        <Timer />
        <Box
          className={styles.interactionButton}
          sx={{
            paddingLeft: "20px",
            display: { xs: "none", md: "flex" },
          }}
          onClick={() => props.openDialogFiles(true)}
        >
          <Image alt="no-alt" src={ClipIcon} height="23.96px" width="23.14px" />
          <Typography variant="body1" className={styles.body1}>
            Ver exames anexados
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
          }}
          className={styles.interactionButton}
          onClick={() => props.openDetails()}
        >
          {props.loading ? (
            <CircularProgress color="primary" size={24} />
          ) : (
            <DetailsIcon height="23.96px" width="23.14px" />
          )}

          <Typography variant="body1" className={styles.body1}>
            Ver detalhes do paciente
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          className={`${styles.interactionButton} ${styles.circularButton}`}
          variant="outlined"
          onClick={() =>
            props.isCameraOn ? props.disableVideo() : props.enableVideo()
          }
        >
          {!props.isCameraOn ? (
            <Image alt="no-alt" src={CameraOff} className={styles.iconImage} />
          ) : (
            <CameraIcon className={styles.iconImage} />
          )}
        </button>
        <button
          className={`${styles.circularButton} ${styles.interactionButton} `}
          variant="outlined"
          onClick={() => props.handleLogout()}
        >
          <Image alt="no-alt" src={RedPhoneIcon} className={styles.iconImage} />
        </button>
        <button
          className={`${styles.interactionButton} ${styles.circularButton}`}
          variant="outlined"
          onClick={() =>
            props.isMicrophoneOn ? props.disableAudio() : props.enableAudio()
          }
        >
          {props.isMicrophoneOn ? (
            <MicrophoneIcon className={styles.iconImage} />
          ) : (
            <Image
              alt="no-alt"
              src={MicrophoneOff}
              className={styles.iconImage}
            />
          )}
        </button>
      </Grid>

      <Grid
        item
        md={4}
        xs={12}
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        <button
          className={styles.interactionButton}
          onClick={() => props.showMemed()}
        >
          {props.memedLoading ? (
            <CircularProgress color="primary" size={24} />
          ) : (
            <ProntuarioIcon height="23.96px" width="23.14px" />
          )}

          <Typography variant="body1" className={styles.body1}>
            Prescrições e exames
          </Typography>
        </button>
        <button
          className={styles.interactionButton}
          onClick={() => props.showSideWindow("diagnosys")}
        >
          <DiagnosysIcon height="23.96px" width="23.14px" />
          <Typography variant="body1" className={styles.body1}>
            Diagnósticos primários
          </Typography>
        </button>
        <button
          className={styles.interactionButton}
          onClick={() => props.showSideWindow("anamnese")}
        >
          <AnamneseIcon height="23.96px" width="23.14px" />
          <Typography variant="body1" className={styles.body1}>
            Anamnese
          </Typography>
        </button>
      </Grid>
    </Grid>
  );
}

export default function FooterMenu({
  showSideWindow,
  handleLogout,
  disableVideo,
  enableVideo,
  showMemed,
  isCameraOn,
  disableAudio,
  enableAudio,
  isMicrophoneOn,
  handleClickInputButton,
  fileInput,
  loading,
  buttonRef,
  memedLoading,
  handleChangeInputFile,
  openDialogFiles,
  isLoading,
}: IFooterProps) {
  const { userLogged, role } = useSelector((state: any) => state.userState);
  const dispatch = useDispatch();
  const openDetails = () => {
    dispatch({
      type: ActionTypesAppointment.SEE_DETAILS_FROM_CALL,
      cameFromCall: true,
    });
    window.open("/home-doctor", "_blank");
  };
  return role === "patient" ? (
    <FooterPatient
      handleLogout={handleLogout}
      disableVideo={disableVideo}
      enableVideo={enableVideo}
      isCameraOn={isCameraOn}
      disableAudio={disableAudio}
      enableAudio={enableAudio}
      isMicrophoneOn={isMicrophoneOn}
      handleClickInputButton={handleClickInputButton}
      fileInput={fileInput}
      handleChangeInputFile={handleChangeInputFile}
      isLoading={isLoading}
    ></FooterPatient>
  ) : (
    <FooterDoctor
      showSideWindow={showSideWindow}
      handleLogout={handleLogout}
      disableVideo={disableVideo}
      enableVideo={enableVideo}
      showMemed={showMemed}
      isCameraOn={isCameraOn}
      disableAudio={disableAudio}
      enableAudio={enableAudio}
      isMicrophoneOn={isMicrophoneOn}
      loading={loading}
      memedLoading={memedLoading}
      openDialogFiles={openDialogFiles}
      openDetails={openDetails}
    ></FooterDoctor>
  );
}
