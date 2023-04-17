// @ts-nocheck
import React, { useEffect, useState } from 'react'
import Participant from '../Participant'
import styles from './room.module.scss'
import { AppState } from 'src/store'
import { useSelector } from 'react-redux'
import { Grid } from "@mui/material";
import FooterMenu from "../FooterMenu";
import AnamneseWindow from "../AnamneseWindow";
import DiagnosysWindow from "../DiagnosysWindow";
import DialogAlert from "../DialogAlert";

import { AppointmentState } from "src/store/appointment/types";
import { IRoomProps } from "src/interfaces";

const Room = ({
  room,
  isAnamneseOpen,
  isDiagnosysOpen,
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
  anamneseInput,
  postAnamneseText,
  onChangeTextFieldAnamnese,
  isAnamneseLoading,
  saveButtonDisabledAnamnese,
  diagnosysInput,
  isDiagnosysLoading,
  onChangeTextFieldDiagnosys,
  postDiagnosysText,
  saveButtonDisabledDiagnosys,
}: IRoomProps) => {
  const [participants, setParticipants] = useState<any>([]);

  const { appointment } = useSelector<AppState, AppointmentState>(
    (state) => state.appointmentState
  );

  useEffect(() => {
    const participantConnected = (participant: any) => {
      setParticipants((prevParticipants: any) => [
        ...prevParticipants,
        participant,
      ]);
    };

    const participantDisconnected = (participant: any) => {
      setParticipants((prevParticipants: any) =>
        prevParticipants.filter((p: any) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    console.log("Participant Infos", room);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant: any) => (
    <Participant
      key={participant.sid}
      isDiagnosysOpen={isDiagnosysOpen}
      isAnamneseOpen={isAnamneseOpen}
      participant={participant}
      participants={participants}
      type={"remote"}
    />
  ));

  return (
    <Grid
      container
      className={styles.room}
      sx={{ width: isDiagnosysOpen || isAnamneseOpen ? "70vw" : "100vw" }}
    >

      {/* <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Log out</button> */}
      <Grid item md={6} xs={12} className={styles.remoteParcipant}>
        {remoteParticipants}
      </Grid>
      <Grid item md={6} xs={12} className={styles.localParticipant}>
        {room ? (
          <Participant
            isDiagnosysOpen={isDiagnosysOpen}
            isAnamneseOpen={isAnamneseOpen}
            type={"local"}
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            participants={participants}
          />
        ) : (
          ""
        )}
      </Grid>

      <FooterMenu
        showSideWindow={showSideWindow}
        handleLogout={handleLogout}
        disableVideo={disableVideo}
        enableVideo={enableVideo}
        showMemed={showMemed}
        buttonRef={buttonRef}
        openDialogFiles={openDialogFiles}
        isCameraOn={isCameraOn}
        isMicrophoneOn={isMicrophoneOn}
        disableAudio={disableAudio}
        loading={loading}
        memedLoading={memedLoading}
        enableAudio={enableAudio}
        handleClickInputButton={handleClickInputButton}
        handleChangeInputFile={handleChangeInputFile}
        fileInput={fileInput}
        isLoading={isLoading}
      />
      {isDiagnosysOpen && (
        <DiagnosysWindow
          diagnosysInput={diagnosysInput}
          isDiagnosysLoading={isDiagnosysLoading}
          onChangeTextFieldDiagnosys={onChangeTextFieldDiagnosys}
          postDiagnosysText={postDiagnosysText}
          saveButtonDisabledDiagnosys={saveButtonDisabledDiagnosys}
        />
      )}
      {isAnamneseOpen && (
        <AnamneseWindow
          anamneseInput={anamneseInput}
          postAnamneseText={postAnamneseText}
          saveButtonDisabledAnamnese={saveButtonDisabledAnamnese}
          isAnamneseLoading={isAnamneseLoading}
          onChangeTextFieldAnamnese={onChangeTextFieldAnamnese}
        />
      )}
    </Grid>
  );
};

export default Room
