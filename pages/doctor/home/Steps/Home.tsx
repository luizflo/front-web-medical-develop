import React, { useEffect, useState } from "react";
import styles from "../home.module.scss";
import { useRouter } from "next/router";
import { Box, Grid, Typography, Button, CircularProgress } from "@mui/material";
import {
  FeedBackProps,
  IAppointment,
  IAttendance,
  IHistoric,
} from "src/interfaces";
import { DataGrid, GridColumns } from "@pankod/refine-mui";
import EventsList from "src/components/layout/doctor/eventsList/EventsList";
import Image from "next/image";
import { ActionTypesAppointment } from "src/store/appointment/types";
import IconPerson from "public/images/icons/user.svg";
import IconCalendar from "public/images/icons/calendar.svg";
import IconClock from "public/images/icons/clock.svg";
import IconClose from "public/images/icons/close.svg";
import Stethoscope from "public/images/doctor/stethoscope.png";
import { getPatients } from "src/api/patient";
import Computer from "public/images/doctor/computer.png";
import Following from "public/images/doctor/following.png";
import { getProfessionalAppointments } from "src/api/appointment";
import { useSelector, useDispatch } from "react-redux";
import EmptyComponent from "@components/layout/emptyComponent";
import { AppState } from "src/store";
import { AppointmentState } from "src/store/appointment/types";
import {
  formatHour,
  formatHourRange,
  formatDateWithWeekDay,
} from "@components/utils";
import { UserState } from "src/store/user/types";

type DashboardData = {
  totalPatients: number | string;
  noConsults: number | string;
  noProfessionals: number | string;
  plansSold: number | string;
};
export default function HomeScreen({ onClick }: any) {
  const router = useRouter();
  const [eventClicked, setEventClicked] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dashLoading, setDashLoading] = useState<boolean>(false);
  const [feedBack, setFeedback] = useState<FeedBackProps>({
    feedBack: "",
    feedbackIsOpen: false,
    feedbackType: undefined,
  });
  const [dashBoardData, setDashboardData] = useState<DashboardData>({
    totalPatients: "--",
    noConsults: "--",
    noProfessionals: "--",
    plansSold: "--",
  });
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [modalDetailsIsOpen, setModalDetailsIsOpen] = useState(false);
  const { cameFromCall, appointment, callOnGoing } = useSelector<
    AppState,
    AppointmentState
  >((state) => state.appointmentState);
  const { userLogged, role } = useSelector<AppState, UserState>(
    (state: any) => state.userState
  );
  const [futureAppointments, setFutureAppointments] = useState<IAppointment[]>(
    []
  );
  const validateAppointmentFuture = () => {
    let arrayFutureAppointments: IAppointment[] = [];
    if (appointments.length > 0) {
      appointments.map((item: IAppointment) => {
        let dateNow = new Date();
        let dateConsult = new Date(item.date);
        dateConsult.setHours(dateConsult.getHours() + 3);
        dateNow.setMinutes(dateNow.getMinutes() - 40);
        if (dateConsult >= dateNow) {
          arrayFutureAppointments.push(item);
        }
      });
      setFutureAppointments(arrayFutureAppointments);
    }
  };
  const getDashboardList = async () => {
    setDashLoading(true);
    getApppointmentsFinished();
    const patients = await getPatients(userLogged.id);
    if (patients.status === "error") {
      setFeedback({
        feedbackType: "error",
        feedbackIsOpen: true,
        feedBack: patients.message,
      });
      setDashLoading(false);
    } else {
      setDashboardData({
        ...dashBoardData,
        totalPatients: patients.length,
      });
      setDashLoading(false);
    }
  };
  const getApppointmentsFinished = async () => {
    setIsLoading(true);
    const response = await getProfessionalAppointments(userLogged?.id, true);
    setDashboardData({ ...dashBoardData, noConsults: response.length });
    // setAppointments(response)
  };
  const getApppointmentsList = async () => {
    setIsLoading(true);
    const response = await getProfessionalAppointments(userLogged?.id, false);
    setAppointments(response);
    setIsLoading(false);
  };
  const handleClose = (modal: string) => {
    modal === "confirmation"
      ? setModalIsOpen(false)
      : setModalDetailsIsOpen(false);
  };

  const clickEnterAppointment = (appointment: IAppointment) => {
    dispatch({
      type: ActionTypesAppointment.SAVE_APPOINTMENT,
      appointment: appointment,
    });
    router.push("/meet");
  };
  const clickSeeDetails = (appointment: IAppointment) => {
    dispatch({
      type: ActionTypesAppointment.SAVE_APPOINTMENT,
      appointment: appointment,
    });
    onClick(appointment);
  };
  const updateAfterDesignation = () => {
    getApppointmentsList();
  };

  useEffect(() => {
    getApppointmentsList();
    getDashboardList();
  }, []);

  useEffect(() => {
    validateAppointmentFuture();
  }, [appointments]);
  function Dashboard() {
    return (
      <Grid container className={styles.cardBlack}>
        <Grid item xs={6} md={4} className={styles.row}>
          <div className={styles.circleIcon}>
            <img
              src="../images/doctor/following.png"
              className={styles.logoCalendar}
            />
          </div>
          <div className={styles.space}>
            <Typography
              variant="h4"
              fontWeight={"regular"}
              className={styles.textWhite}
            >
              Total de pacientes
            </Typography>
            {dashLoading ? (
              <CircularProgress sx={{ color: "white" }} size={25} />
            ) : (
              <Typography
                variant="h1"
                fontWeight={"medium"}
                className={styles.textBigWhite}
              >
                {dashBoardData.totalPatients}
              </Typography>
            )}
          </div>
        </Grid>

        <Grid item xs={6} md={4} className={styles.row}>
          <Box className={styles.circleIcon}>
            <img
              src="../images/doctor/computer.png"
              className={styles.logoCalendar}
            />
          </Box>
          <div className={styles.space}>
            <Typography
              variant="h4"
              fontWeight={"regular"}
              className={styles.textWhite}
            >
              Consultas realizadas
            </Typography>
            {dashLoading ? (
              <CircularProgress sx={{ color: "white" }} size={25} />
            ) : (
              <Typography
                variant="h1"
                fontWeight={"medium"}
                className={styles.textBigWhite}
              >
                {dashBoardData.noConsults}
              </Typography>
            )}
          </div>
        </Grid>

        <Grid item xs={6} md={4} className={styles.row}>
          <div className={styles.circleIcon}>
            <img
              src="../images/doctor/stethoscope.png"
              className={styles.logoCalendar}
            />
          </div>
          <div className={styles.space}>
            <Typography
              variant="h4"
              fontWeight={"regular"}
              className={styles.textWhite}
            >
              Consultas agendadas
            </Typography>
            {dashLoading ? (
              <CircularProgress sx={{ color: "white" }} size={25} />
            ) : (
              <Typography
                variant="h1"
                fontWeight={"medium"}
                className={styles.textBigWhite}
              >
                {futureAppointments.length}
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    );
  }
  function NextConsultCard() {
    return (
      <Grid md={5} xs={12} item>
        <Typography variant="h3" className={styles.titleSection}>
          Próxima consulta
        </Typography>
        {futureAppointments?.length > 0 ? (
          <Box
            className={styles.cardConsult}
            sx={{ paddingBlock: "25px", paddingInline: "25px" }}
          >
            <Typography
              variant="h3"
              fontWeight={"bold"}
              className={styles.textConsult}
            >
              Consulta de {futureAppointments[0]?.specialty.name}
            </Typography>
            <div
              className={styles.row}
              style={{
                marginBottom: "20px",
                marginTop: "15px",
              }}
            >
              <IconPerson />
              <Typography
                variant="h4"
                fontWeight={"medium"}
                className={styles.cardBody}
              >
                {futureAppointments[0]?.patient.name}
              </Typography>
            </div>
            <div className={styles.row}>
              <IconCalendar />
              <Typography
                variant="h4"
                fontWeight={"medium"}
                className={styles.cardBody}
              >
                {formatDateWithWeekDay(futureAppointments[0]?.date)}
              </Typography>
            </div>
            <div className={styles.hr} />
            <div className={styles.row}>
              <IconClock />
              <Typography
                variant="h4"
                fontWeight={"medium"}
                className={styles.cardBody}
              >
                {formatHourRange(futureAppointments[0]?.date)}
              </Typography>
            </div>
            <div onClick={() => clickSeeDetails(futureAppointments[0])}>
              <Typography className={styles.textLinkDetails}>
                Ver detalhes...
              </Typography>
            </div>
            <Button
              variant="contained"
              disabled={callOnGoing}
              className={styles.buttonConfirm}
              sx={{
                backgroundColor: callOnGoing ? "#848d9f !important" : "#12CC7E",
              }}
              onClick={() => clickEnterAppointment(futureAppointments[0])}
            >
              {callOnGoing ? "Em andamento..." : "Entrar"}
            </Button>
            <Grid className={styles.alignCenter}>
              <Typography variant="body1" className={styles.textInfo}>
                Esse botão estará disponível 15 minutos antes do horário marcado
              </Typography>
            </Grid>
          </Box>
        ) : (
          <EmptyComponent
            isLoading={isLoading}
            update={getApppointmentsList}
            title={"Não há agendamentos futuros"}
            message={
              "Se acredita que isso seja um erro clique abaixo para atualizar"
            }
          />
        )}
      </Grid>
    );
  }
  function BookedConsultsList() {
    return (
      <Grid xs={12} md={7} item>
        <Box
          className={styles.row}
          style={{
            width: "95%",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              className={styles.titleSection}
              style={{ padding: "0px 20px" }}
            >
              Consultas agendadas
            </Typography>
            <Typography
              variant="body1"
              className={styles.subtitleSection}
              style={{ padding: "0px 20px" }}
            >
              {futureAppointments?.length} agendamentos
            </Typography>
          </Box>
          <Typography
            variant="h4"
            fontWeight={"medium"}
            style={{
              cursor: "pointer",
              color: "#12CC7E",
            }}
            onClick={() => updateAfterDesignation()}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={15} />
            ) : (
              "Atualizar"
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            maxHeight: "75vh",
            overflow: "auto",
            paddingInline: "20px",
            paddingBottom: 20,
            width: "100%",
          }}
        >
          <EventsList
            events={futureAppointments!!}
            update={getApppointmentsList}
            isLoading={isLoading}
            handleOpen={clickSeeDetails}
          />
        </Box>
      </Grid>
    );
  }
  return (
    <Grid container className={styles.containerHome}>
      <Box className={styles.row}>
        <Typography className={styles.title}>
          Olá, seja bem vindo(a) {userLogged.name}
        </Typography>
        <Typography variant="h4" className={styles.tag}>
          Profissional de Saúde
        </Typography>
      </Box>
      <Grid container>
        <Grid xs={12} md={12} item>
          <Dashboard />
          <Grid container sx={{ marginTop: "30px" }}>
            <NextConsultCard />
            <BookedConsultsList />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
