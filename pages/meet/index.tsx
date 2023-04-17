import * as React from 'react'
import FooterMenu from '../../src/components/meet/FooterMenu'
import DiagnosysWindow from '../../src/components/meet/DiagnosysWindow'
import AnamneseWindow from '../../src/components/meet/AnamneseWindow'
import styles from './meetStyles.module.scss'
import { useCallback, useEffect, useRef, useState } from 'react'
import VideoChat from '../../src/components/meet/VideoChat'
import { useMemed } from 'src/hooks'
import { UserState } from 'src/store/user/types'
import { AlertProps, Grid } from "@mui/material";
import { AppState } from "src/store";
import { useSelector, useDispatch } from "react-redux";
import { pacient as pacientMock } from "src/mocks/pacient";
import {
  AppointmentState,
  ActionTypesAppointment,
} from "src/store/appointment/types";
import {
  postAnamnese,
  getFiles,
  postFiles,
  postPrimaryDiagnosis,
  toogleFinished,
} from "src/api/appointment";
import { FeedBackProps, IAnamnesePost } from "src/interfaces";
import {
  deletePrescriptionData,
  getMemedToken,
  postPrescriptionData,
} from "src/api/memed";
import FeedBack from "@components/layout/feedback";
import FilesDialog from "@components/meet/FilesDialog";
import { GetUserInterface } from "src/interfaces/user";
import {
  PacientInterface,
  PrescriptionDataInterface,
} from "src/interfaces/pacient";
import DialogAlert from "@components/meet/DialogAlert";

export interface Appointment {
  pacientName: string;
  speciality: string;
  hour: string;
  files: Array<File>;
}
export interface File {
  name: string;
}
export default function App() {
  const [pacient, setPacient] = useState<PacientInterface>();
  const [memedToken, setMemedToken] = useState<string>("");
  const [isDiagnosysOpen, setIsDiagnosysOpen] = useState<boolean>(false);
  const [isAnamneseOpen, setIsAnamneseOpen] = useState<boolean>(false);
  const [anamneseInput, setAnamneseInput] = useState<string>("");
  const [diagnosysInput, setDiagnosysInput] = useState<string>("");
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
  const [dialogFilesOpen, setDialogFilesOpen] = useState<boolean>(false);
  const [filesList, setFilesList] = useState<any[]>([]);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState<any>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [dialogAlertOpen, setDialogAlertOpen] = useState<boolean>(false);
  const [anamneseButtonDisabled, setAnamneseButtonDisabled] =
    useState<boolean>(true);
  const [diagnosysButtonDisabled, setDiagnosysButtonDisabled] =
    useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [room, setRoom] = useState<any>(null);
  const [isMemedLoading, setIsMemedLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInput = useRef(null);

  const buttonRef = React.useRef(null);
  const [feedBack, setFeedback] = useState<FeedBackProps>({
    feedBack: "",
    feedbackIsOpen: false,
    feedbackType: undefined,
  });
  const { userLogged, role } = useSelector<AppState, UserState>(
    (state) => state.userState
  );
  const { appointment } = useSelector<AppState, AppointmentState>(
    (state) => state.appointmentState
  );
  const onPrescriptionPrinted = async (prescriptionData: unknown) => {
    if (checkPrescriptionType(prescriptionData)) {
      return await postPrescriptionData(
        prescriptionData.prescricao.id,
        appointment.id
      );
    }
  };
  const onPrescriptionExclude = async (prescriptionId: number) => {
    return await deletePrescriptionData(prescriptionId);
  };
  function checkPrescriptionType(
    object: unknown
  ): object is PrescriptionDataInterface {
    if (object !== null && typeof object === "object") {
      return "prescricao" in object;
    }
    return false;
  }
  const { setPatient, setDoctorToken, showPrescription } = useMemed({
    onPrescriptionPrinted,
    onPrescriptionExclude,
  });

  const handleClickInputFile = () => {
    //@ts-ignore
    fileInput.current.click();
  };
  const dispatch = useDispatch();

  const onChangeTextFieldAnamnese = (event: any) => {
    setAnamneseInput(event.target.value);
  };
  const onChangeTextFieldDiagnosys = (event: any) => {
    setDiagnosysInput(event.target.value);
  };
  const showSideWindow = (type: any) => {
    if (type === "diagnosys") {
      setIsAnamneseOpen(false);
      setIsDiagnosysOpen(!isDiagnosysOpen);
    } else {
      setIsAnamneseOpen(!isAnamneseOpen);
      setIsDiagnosysOpen(false);
    }
  };
  const disableVideo = () => {
    if (room) {
      setIsCameraOn(false);
      room.localParticipant.videoTracks.forEach((track: any) => {
        track.track.disable();
        // track.track.unpublish()
      });
    }
  };
  const enableVideo = () => {
    if (room) {
      setIsCameraOn(true);
      room.localParticipant.videoTracks.forEach((track: any) => {
        track.track.enable();
        // track.track.unpublish()
      });
    }
  };
  const disableAudio = () => {
    if (room) {
      setIsMicrophoneOn(false);
      room.localParticipant.audioTracks.forEach((track: any) => {
        track.track.disable();
        // track.track.unpublish()
      });
    }
  };
  const enableAudio = () => {
    if (room) {
      setIsMicrophoneOn(true);
      room.localParticipant.audioTracks.forEach((track: any) => {
        track.track.enable();
        // track.track.unpublish()
      });
    }
  };
  const getMemed = async () => {
    const search = userLogged?.document;
    const response = await getMemedToken(search!!);
    const data: GetUserInterface = response;
    if (response.status && role !== "patient") {
      setFeedback({
        feedbackType: "error",
        feedbackIsOpen: true,
        feedBack: response.message,
      });
    } else {
      setMemedToken(data?.userToken);
      // initMemed(data?.userToken);
      setDoctorToken(data?.userToken);
      setFeedback({
        feedbackType: "success",
        feedbackIsOpen: true,
        feedBack: "Módulo Memed iniciado!",
      });
      localStorage.setItem("@Memed:user-token", data?.userToken);
    }
  };

  const handleUploadFile = async (event: any) => {
    setIsLoading(true);
    const fileUploaded = event.target.files[0];
    const formData = new FormData();
    formData.append("file", fileUploaded);
    const response = await postFiles(formData, appointment.id);
    if (response.status) {
      setFeedback({
        feedbackType: "error",
        feedbackIsOpen: true,
        feedBack: response.message,
      });
    } else {
      setFeedback({
        feedbackType: "success",
        feedbackIsOpen: true,
        feedBack: response.message,
      });
    }
    setIsLoading(false);
  };
  const handleCloseDialog = () => {
    setDialogFilesOpen(!dialogFilesOpen);
  };
  const showMemed = () => {
    setIsMemedLoading(true);
    // open();
    showPrescription();
    setIsMemedLoading(false);
  };
  const handleClose = () => {
    setFeedback({
      ...feedBack,
      feedbackIsOpen: false,
    });
  };

  useEffect(() => {
    if (memedToken) setDoctorToken(memedToken);
    // initMemed("dfdfdefef");
  }, [memedToken]);

  const getFilesList = async () => {
    setIsListLoading(true);
    const filesResponse = await getFiles(appointment.id);
    if (filesResponse.status) {
      setFeedback({
        feedbackType: "error",
        feedbackIsOpen: true,
        feedBack: filesResponse.message,
      });
      setIsListLoading(false);
    }
    setFilesList(filesResponse);
    setIsListLoading(false);
  };

  useEffect(() => {
    const pacient = {
      idExterno: appointment.patient.id,
      nome: appointment.patient.name,
      telefone: appointment.patient.phoneNumber,
      cpf: appointment.patient.document,
    };
    setPacient(pacient);
    getFilesList();
    getMemed();
  }, []);

  useEffect(() => {
    if (pacient) {
      // definePacient(pacient);
      setPatient(pacient);
    }
  }, [pacient]);

  const handleLogout = useCallback(() => {
    setDialogAlertOpen(true);
  }, []);
  const confirmLogout = useCallback(async () => {
    setDialogAlertOpen(false);
    dispatch({
      type: ActionTypesAppointment.SEE_DETAILS_FROM_CALL,
      cameFromCall: false,
    });
    dispatch({
      type: ActionTypesAppointment.SET_CALL_ON_GOING,
      callOnGoing: false,
    });
    setIsFinished(true);
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

  const postAnamneseText = async () => {
    setLoading(true);
    if (appointment && anamneseInput !== "") {
      const data: IAnamnesePost = {
        appointmentId: appointment.id,
        description: anamneseInput,
      };
      const response = await postAnamnese(data);
      if (response.status) {
        setFeedback({
          feedbackType: "error",
          feedbackIsOpen: true,
          feedBack: response.message,
        });
      } else {
        setFeedback({
          feedbackType: "success",
          feedbackIsOpen: true,
          feedBack: "Anotações salvas com sucesso!",
        });
      }
    }
    setLoading(false);
  };

  const postDiagnosyText = async () => {
    setLoading(true);
    if (appointment && diagnosysInput !== "") {
      const data: IAnamnesePost = {
        appointmentId: appointment.id,
        description: diagnosysInput,
      };
      const response = await postPrimaryDiagnosis(data);
      if (response.status) {
        setFeedback({
          feedbackType: "error",
          feedbackIsOpen: true,
          feedBack: response.message,
        });
      } else {
        setFeedback({
          feedbackType: "success",
          feedbackIsOpen: true,
          feedBack: "Anotações salvas com sucesso!",
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (appointment && anamneseInput !== "") {
      setAnamneseButtonDisabled(false);
    } else {
      setAnamneseButtonDisabled(true);
    }
    if (appointment && diagnosysInput !== "") {
      setDiagnosysButtonDisabled(false);
    } else {
      setDiagnosysButtonDisabled(true);
    }
  }, [anamneseInput, diagnosysInput]);

  return (
    <Grid container className={styles.container}>
      <FeedBack
        handleClose={handleClose}
        open={feedBack.feedbackIsOpen}
        messageType={feedBack.feedbackType}
        message={feedBack.feedBack}
      />
      <DialogAlert
        open={dialogAlertOpen}
        title="Tem certeza que deseja sair do atendimento?"
        message='Isso não encerrará o atendimento no sistema. Para finalizar este
        atendimento, clique no botão na tela de detalhes da consulta.'
        handleLogout={confirmLogout}
        handleClose={setDialogAlertOpen}
      />
      <VideoChat
        username={userLogged ? userLogged.name : "Default"}
        setUsername={setUsername}
        setFeedback={setFeedback}
        openDialogFiles={setDialogFilesOpen}
        roomName={appointment ? appointment.id : ""}
        setRoomName={setRoomName}
        room={room}
        setRoom={setRoom}
        isFinished={isFinished}
        isDiagnosysOpen={isDiagnosysOpen}
        isAnamneseOpen={isAnamneseOpen}
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
        memedLoading={isMemedLoading}
        enableAudio={enableAudio}
        handleClickInputButton={handleClickInputFile}
        handleChangeInputFile={handleUploadFile}
        fileInput={fileInput}
        isLoading={isLoading}
        diagnosysInput={diagnosysInput}
        postDiagnosysText={postDiagnosyText}
        saveButtonDisabledDiagnosys={diagnosysButtonDisabled}
        isDiagnosysLoading={isLoading}
        onChangeTextFieldDiagnosys={onChangeTextFieldDiagnosys}
        anamneseInput={anamneseInput}
        postAnamneseText={postAnamneseText}
        saveButtonDisabledAnamnese={anamneseButtonDisabled}
        isAnamneseLoading={loading}
        onChangeTextFieldAnamnese={onChangeTextFieldAnamnese}
      />

      <FilesDialog
        open={dialogFilesOpen}
        filesList={filesList}
        handleClose={handleCloseDialog}
        update={getFilesList}
        isListLoading={isListLoading}
      />
      {/* </Box> */}
    </Grid>
  );
}
