import React, { useCallback, useEffect, useState } from "react";
import styles from "./home.module.scss";
import { useRouter } from "next/router";
import {
  Grid,
  Paper,
  Typography,
  Box,
  AlertProps,
  CircularProgress,
} from "@mui/material";
import EventsList from "src/components/layout/secretary/EventsList";
import EventsListConfirmed from "src/components/layout/secretary/EventsListConfirmed";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
import ModalPaymentConfirmation from "@components/layout/secretary/ModalPaymentConfirmation";
import ModalConfirmation from "src/components/layout/secretary/ModalConfirmation";
import ModalDetails from "@components/layout/secretary/ModalDetails";
import { DashboardData } from "src/mocks/dashBoard";
import FeedBack from "@components/layout/feedback";

import {
  getAppointmentsDesignated,
  getAppointmentsWithNoProfessional,
} from "src/api/appointment";
import { FeedBackProps, IAppointment } from "src/interfaces";
import { countUniqueValues } from "@components/utils";
import { getProfessionals } from "src/api/professional";
import { getPatients } from "src/api/patient";

function ChartSection(props: any) {
  return (
    <Box
      className={styles.padding}
      style={{
        marginLeft: "30px",
        width: "40%",
      }}
    >
      <Typography
        variant="h3"
        fontWeight={"medium"}
        className={styles.boldTitle}
      >
        Resultados das vendas
      </Typography>

      <ReactEcharts option={props.options} theme="my_theme"></ReactEcharts>
    </Box>
  );
}

type DashboardData = {
  totalPatients: number | string;
  noConsults: number | string;
  noProfessionals: number | string;
  plansSold: number | string;
};
type ModalType = "confirmation" | "details" | "payment";
export default function homeSecretary() {
  const router = useRouter();
  const [feedBack, setFeedback] = useState<FeedBackProps>({
    feedBack: "",
    feedbackIsOpen: false,
    feedbackType: undefined,
  });
  const [eventClicked, setEventClicked] = useState<IAppointment>();
  const [dashBoardData, setDashboardData] = useState<DashboardData>({
    totalPatients: "--",
    noConsults: "--",
    noProfessionals: "--",
    plansSold: "--",
  });
  const [dashLoading, setDashLoading] = useState<boolean>(false);
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [allAppointments, setAllAppointments] = useState<IAppointment[]>([]);
  const [futureAppointments, setFutureAppointments] = useState<IAppointment[]>(
    []
  );
  const [futureAppointmentsConfirmed, setFutureAppointmentsConfirmed] =
    useState<IAppointment[]>([]);
  const [modalConfirmationIsOpen, setModalConfirmationIsOpen] = useState(false);
  const [modalDetailsIsOpen, setModalDetailsIsOpen] = useState(false);
  const [modalPaymentIsOpen, setModalPaymentIsOpen] = useState(false);

  const handleClickOpen = (modal: ModalType, event: any) => {
    setEventClicked(event);
    switch (modal) {
      case "confirmation":
        setModalConfirmationIsOpen(true);
        break;
      case "details":
        setModalDetailsIsOpen(true);
        break;
      case "payment":
        setModalPaymentIsOpen(true);
      default:
        break;
    }
  };
  const getAppointmentsList = async () => {
    const dataDesignated = await getAppointmentsDesignated(false);
    const responseList: IAppointment[] = dataDesignated;
    const dataNoProfessional = await getAppointmentsWithNoProfessional(false);
    const responseListNoProfessional: IAppointment[] = dataNoProfessional;
    if (dataDesignated.status) {
      setFeedback({
        feedbackType: "error",
        feedbackIsOpen: true,
        feedBack: dataDesignated.message,
      });
    } else {
      const allAppointmentsArray: IAppointment[] = responseList.concat(
        responseListNoProfessional
      );
      setAllAppointments(allAppointmentsArray);
      pushFutureAppointments(responseList, "confirmed");
      pushFutureAppointments(responseListNoProfessional, "all");
    }
  };
  const getDashboardList = async () => {
    setDashLoading(true);
    const response = await getProfessionals();
    const patients = await getPatients();
    if (response.status || patients.status === "error") {
      setFeedback({
        feedbackType: "error",
        feedbackIsOpen: true,
        feedBack: response.message,
      });
      setDashLoading(false);
    } else {
      setDashboardData({
        ...dashBoardData,
        noProfessionals: response.length,
        totalPatients: patients.length,
      });
      setDashLoading(false);
    }
  };

  const pushFutureAppointments = (list: IAppointment[], type: string) => {
    let arrayFutureAppointments: IAppointment[] = [];
    if (list.length > 0) {
      list.map((item: IAppointment) => {
        let dateNow = new Date();
        let dateConsult = new Date(item.date);
        dateConsult.setHours(dateConsult.getHours() + 3);
        dateNow.setMinutes(dateNow.getMinutes() - 40);
        if (dateConsult >= dateNow) {
          arrayFutureAppointments.push(item);
        }
      });
      type === "confirmed"
        ? setFutureAppointmentsConfirmed(arrayFutureAppointments)
        : setFutureAppointments(arrayFutureAppointments);
    }
  };

  const updateListConfirmed = async () => {
    setIsListLoading(true);
    const responseList = await getAppointmentsDesignated(false);
    if (responseList.status) {
      setFeedback({
        feedbackType: "error",
        feedbackIsOpen: true,
        feedBack: responseList.message,
      });
      setIsListLoading(true);
    } else {
      pushFutureAppointments(responseList, "confirmed");
      setIsListLoading(false);
    }
  };
  const updateListNoProfessional = async () => {
    setIsListLoading(true);
    const responseList = await getAppointmentsWithNoProfessional(false);
    const responseListNoProfessional: IAppointment[] = responseList;
    if (responseList.status) {
      setFeedback({
        feedbackType: "error",
        feedbackIsOpen: true,
        feedBack: responseList.message,
      });
      setIsListLoading(true);
    } else {
      pushFutureAppointments(responseListNoProfessional, "all");
      setIsListLoading(false);
    }
  };
  const updateAfterDesignation = () => {
    updateListConfirmed();
    updateListNoProfessional();
  };
  const handleCloseFeedback = () => {
    setFeedback({ ...feedBack, feedbackIsOpen: false });
  };

  const handleClose = (modal: string) => {
    switch (modal) {
      case "confirmation":
        setModalConfirmationIsOpen(false);
        break;
      case "details":
        setModalDetailsIsOpen(false);
        break;
      case "payment":
        setModalPaymentIsOpen(false);
        break;
      default:
        break;
    }
  };

  const options = {
    grid: { top: 20, right: 40, bottom: 20, left: 40 },
    xAxis: {
      type: "category",
      data: ["Planos", "Consultas"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [0, 0],
        type: "bar",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
    color: ["#0DB564"],
  };

  useEffect(() => {
    getAppointmentsList();
    getDashboardList();
  }, []);

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
              N° de consultas
            </Typography>
            {dashLoading ? (
              <CircularProgress sx={{ color: "white" }} size={25} />
            ) : (
              <Typography
                variant="h1"
                fontWeight={"medium"}
                className={styles.textBigWhite}
              >
                {allAppointments.length}
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
              Nº de profissionais
            </Typography>
            {dashLoading ? (
              <CircularProgress sx={{ color: "white" }} size={25} />
            ) : (
              <Typography
                variant="h1"
                fontWeight={"medium"}
                className={styles.textBigWhite}
              >
                {dashBoardData.noProfessionals}
              </Typography>
            )}
          </div>
        </Grid>

        {/* <Grid item xs={6} md={3} className={styles.row}>
          <div className={styles.circleIcon}>
            <img
              src="../images/doctor/computer.png"
              className={styles.logoCalendar}
            />
          </div>
           <div className={styles.space}>
            <Typography
              variant="h4"
              fontWeight={"regular"}
              className={styles.textWhite}
            >
              Planos vendidos
            </Typography>
            {dashLoading ? (
              <CircularProgress sx={{ color: "white" }} size={25} />
            ) : (
              <Typography
                variant="h1"
                fontWeight={"medium"}
                className={styles.textBigWhite}
              >
                {dashBoardData.plansSold}
              </Typography>
            )}
          </div> 
        </Grid> */}
      </Grid>
    );
  }
  function AppointmentsListSection() {
    return (
      <Grid item md={6} xs={12}>
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
              fontWeight={"medium"}
              style={{
                padding: "0px 20px",
              }}
              className={styles.boldTitle}
            >
              Novos agendamentos
            </Typography>
            <Typography
              className={styles.subtitleText}
              style={{
                padding: "0px 20px",
              }}
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
            Atualizar
          </Typography>
        </Box>
        <Box
          sx={{
            maxHeight: "75vh",
            overflow: "auto",
            paddingInline: "20px",
            paddingBottom: 10,
          }}
        >
          <EventsList
            update={updateAfterDesignation}
            isLoading={isListLoading}
            events={futureAppointments!!}
            handleOpen={handleClickOpen}
          />
        </Box>
      </Grid>
    );
  }
  function ConfirmedAppointmentsSection() {
    return (
      <Grid item md={6} xs={12}>
        <div
          className={styles.row}
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="h3"
              fontWeight={"medium"}
              className={styles.boldTitle}
            >
              Próximas consultas
            </Typography>
            <Typography className={styles.subtitleText}>
              {futureAppointmentsConfirmed?.length} eventos
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
            Atualizar
          </Typography>
        </div>
        <Box
          sx={{
            maxHeight: "55vh",
            overflow: "auto",
            paddingInline: "5px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <EventsListConfirmed
            events={futureAppointmentsConfirmed}
            update={updateAfterDesignation}
            isLoading={isListLoading}
            handleOpen={handleClickOpen}
          />
        </Box>
      </Grid>
    );
  }

  return (
    <Grid className={styles.container}>
      <FeedBack
        handleClose={handleCloseFeedback}
        open={feedBack.feedbackIsOpen}
        messageType={feedBack.feedbackType}
        message={feedBack.feedBack}
      />
      <Grid className={styles.rowSpace} sx={{ marginBottom: "20px" }}>
        <Typography variant="h1" fontWeight={"medium"} className={styles.title}>
          Olá, bem vinda novamente
        </Typography>
        <Typography variant="h4" className={styles.tag}>
          Manager
        </Typography>
      </Grid>
      <Grid container className={styles.row}>
        <Grid xs={12} item>
          <Dashboard />
          <Box className={styles.row} style={{ marginTop: "30px" }}>
            <AppointmentsListSection />
            {/* <ChartSection options={options} /> */}
            <ConfirmedAppointmentsSection />
          </Box>
        </Grid>
      </Grid>
      <ModalConfirmation
        open={modalConfirmationIsOpen}
        handleClose={handleClose}
        event={eventClicked!!}
        updateList={updateAfterDesignation}
        setFeedback={setFeedback}
      />
      <ModalPaymentConfirmation
        open={modalPaymentIsOpen}
        handleClose={handleClose}
        event={eventClicked}
        updateList={updateListNoProfessional}
      />
      <ModalDetails
        open={modalDetailsIsOpen}
        handleClose={handleClose}
        event={eventClicked!!}
      />
    </Grid>
  );
}
