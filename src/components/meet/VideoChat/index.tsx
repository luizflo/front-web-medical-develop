
import React, { useState, useCallback, useEffect } from 'react'
import Video from 'twilio-video'
import Lobby from '../Lobby'
import Room from '../Room'
import { AppState } from 'src/store'
import { useDispatch, useSelector } from "react-redux";
import CallEnded from "../CallEnded";
import { postTwillioToken } from "src/api/videoCall";
import {
  ActionTypesAppointment,
  AppointmentState,
} from "src/store/appointment/types";
import { IVideoChatProps } from "src/interfaces";
const VideoChat = ({
  username,
  setUsername,
  roomName,
  setRoomName,
  room,
  isFinished,
  setRoom,
  openDialogFiles,
  setFeedback,
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
  isLoading,
  anamneseInput,
  postAnamneseText,
  onChangeTextFieldAnamnese,
  isAnamneseLoading,
  saveButtonDisabledAnamnese,
  diagnosysInput,
  postDiagnosysText,
  saveButtonDisabledDiagnosys,
  isDiagnosysLoading,
  onChangeTextFieldDiagnosys,
  isAnamneseOpen,
  isDiagnosysOpen,
}: // appointment,
IVideoChatProps) => {
  const { appointment } = useSelector<AppState, AppointmentState>(
    (state) => state.appointmentState
  );
  const [connecting, setConnecting] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleUsernameChange = useCallback((event: any) => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback((event: any) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = async () => {
    // event.preventDefault()
    setConnecting(true);
    dispatch({
      type: ActionTypesAppointment.SET_CALL_ON_GOING,
      callOnGoing: true,
    });

    const data = await postTwillioToken(username, roomName);
    if (!data.status) {
      Video.connect(data.token, {
        name: roomName,
      })
        .then((room) => {
          setConnecting(false);
          setRoom(room);
        })

        .catch((err) => {
          console.error(err);
          setFeedback({
            feedbackType: "error",
            feedbackIsOpen: true,
            feedBack: err.message,
          });
          setConnecting(false);
        });
    } else {
      setFeedback({
        feedbackType: "error",
        feedbackIsOpen: true,
        feedBack: data.message,
      });
      setConnecting(false);
    }
  };

  const handleLogoutRoom = useCallback(() => {
    dispatch({
      type: ActionTypesAppointment.SET_CALL_ON_GOING,
      callOnGoing: false,
    });
    setRoom((prevRoom: any) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub: any) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
      return null;
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event: any) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogoutRoom();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);
      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;
  if (room) {
    render = (
      <Room
        room={room}
        openDialogFiles={openDialogFiles}
        showSideWindow={showSideWindow}
        handleLogout={handleLogout}
        disableVideo={disableVideo}
        enableVideo={enableVideo}
        showMemed={showMemed}
        buttonRef={buttonRef}
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
        // handleLogout={handleLogout}
        isAnamneseOpen={isAnamneseOpen}
        isDiagnosysOpen={isDiagnosysOpen}
        anamneseInput={anamneseInput}
        postAnamneseText={postAnamneseText}
        onChangeTextFieldAnamnese={onChangeTextFieldAnamnese}
        isAnamneseLoading={isAnamneseLoading}
        saveButtonDisabledAnamnese={saveButtonDisabledAnamnese}
        diagnosysInput={diagnosysInput}
        postDiagnosysText={postDiagnosysText}
        saveButtonDisabledDiagnosys={saveButtonDisabledDiagnosys}
        isDiagnosysLoading={isDiagnosysLoading}
        onChangeTextFieldDiagnosys={onChangeTextFieldDiagnosys}
      />
    );
  } else if (!isFinished) {
    render = (
      <Lobby
        username={username}
        openDialogFiles={openDialogFiles}
        roomName={roomName}
        appointment={appointment}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
        connecting={connecting}
      />
    );
  } else {
    render = (
      <CallEnded
        username={username}
        roomName={roomName}
        appointment={appointment}
        openDialogFiles={openDialogFiles}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
        connecting={connecting}
      />
    );
  }
  return render;
};

export default VideoChat
