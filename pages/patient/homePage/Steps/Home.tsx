import React, { useEffect, useState } from "react";
import styles from "../HomePage.module.scss";
import { Router, useRouter } from "next/router";
import {
  Badge,
  Box,
  Button,
  Drawer,
  Grid,
  Popover,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAuthenticated, useNavigation } from "@pankod/refine-core";
import { getPatientAppointments } from "src/api/appointment";
import { Anchor, FeedBackProps, IAppointment } from "src/interfaces";
import { ActionTypesAppointment } from "src/store/appointment/types";
import { ActionTypes } from "src/store/user/types";
import { FormsUrls } from "src/mocks/forms";
import { getPatientInfo } from "src/api/patient";
//components
import ModalQuestionaire from "@components/layout/patient/ModalQuestionaire";
import EmptyComponent from "@components/layout/emptyComponent";
import FeedBack from "@components/layout/feedback";
import CardConsult from "@components/layout/patient/Home/CardConsult";
import Banner from "@components/patients/components/Home/Banner";
import SquareCard from "@components/patients/components/Home/SquareCard";
import WideCard from "@components/patients/components/Home/WideCard";
//assets
import BookIcon from "public/images/patient/book.svg";
import AvaliationIcon from "public/avaliationIcon.svg";
import ProntuarioIcon from "public/digitalProntuarioIcon.svg";
import GeneralHealthIcon from "public/images/patient/generalHealthHome.svg";
import MentalHealthIcon from "public/images/patient/mentalHealthHome.svg";
import HistoryIcon from "public/images/patient/historyHome.svg";
import ArrowRightWhite from "public/images/patient/arrowRightWhite.svg";
import ArrowRightBlue from "public/images/patient/arrowRightBlue.svg";
import BellNotification from "public/bellActivated.svg";
import ProntoIcon from "public/prontoAtendimento.svg";
import ClinicoIcon from "public/agendarClinico.svg";
import EspecialistaIcon from "public/agendarEspecialista.svg";
import NotificationModal from "@components/layout/patient/Home/NotificationModal";

interface HomeProps {
  onClick: (item: IAppointment) => void;
  appointments: IAppointment[] | [];
  setAppointments: any;
}

export default function Home({
  onClick,
  appointments,
  setAppointments,
}: HomeProps) {
  const router = useRouter();
  const { replace } = useNavigation();
  const [dateNow, setDateNow] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAppointmentTime, setIsAppointmentTime] = useState(false);
  const [notificationModal, setNotificationModal] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [futureAppointments, setFutureAppointments] = useState<IAppointment[]>(
    []
  );
  const [feedBack, setFeedback] = useState<FeedBackProps>({
    feedBack: "",
    feedbackIsOpen: false,
    feedbackType: undefined,
  });
  const { isError, isLoading, isSuccess } = useAuthenticated();
  const [link, setLink] = useState<string>("");
  const { userLogged, role } = useSelector((state: any) => state.userState);
  const dispatch = useDispatch();
  const getApppointmentsList = async () => {
    const response = await getPatientAppointments(userLogged.id, false);
    setAppointments(response);
  };
  const getUserInfo = async () => {
    try {
      const response = await getPatientInfo(userLogged.id);
      dispatch({
        type: ActionTypes.UPDATE_USER,
        userLogged: response,
      });
    } catch (error) {
      if (error instanceof Error) {
        setFeedback({
          feedbackType: "error",
          feedbackIsOpen: true,
          feedBack: error.message,
        });
      }
    }
  };
  const handleClickOpen = (modal: string, link: string) => {
    setLink(link);
    setModalIsOpen(true);
  };
  const handleClickBookCard = (step: string, specialtyId?: string) => {
    router.push(
      {
        pathname: "/patient/schedule",
        query: {
          stepProps: step,
          specialtyId: specialtyId,
        },
      },
      "agendar-consulta"
    );
  };
  const toggleDrawerNotification =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setNotificationModal({ ...notificationModal, [anchor]: open });
    };

  const handleClose = (modal: string) => {
    setModalIsOpen(false);
  };

  const validateAppointmentFuture = () => {
    let arrayFutureAppointments: IAppointment[] = [];
    if (appointments.length > 0) {
      appointments?.map((item: IAppointment) => {
        let dateNow = new Date();

        let dateConsult = new Date(item.date);
        dateConsult.setHours(dateConsult.getHours() + 3);
        dateNow.setMinutes(dateNow.getMinutes() - 40);
        if (dateConsult <= dateNow) {
          arrayFutureAppointments.push(item);
        }
      });
      setFutureAppointments(arrayFutureAppointments);
    }
  };
  const clickEnterAppointment = (appointment: IAppointment) => {
    dispatch({
      type: ActionTypesAppointment.SAVE_APPOINTMENT,
      appointment: appointment,
    });
    router.push("/meet");
  };

  function NextBookings() {
    return (
      <Grid item xs={12} md={4}>
        <Typography
          variant="body2"
          fontWeight={"bold"}
          className={styles.textBlack}
          sx={{ marginLeft: "10px" }}
        >
          Próximas consultas
        </Typography>
        <Box
          sx={{
            maxHeight: "75vh",
            overflow: "auto",
            overflowX: "hidden",
            // paddingInline: 20,
            paddingBottom: 20,
          }}
        >
          {futureAppointments?.length > 0 ? (
            futureAppointments?.map((item: IAppointment, index) => {
              return (
                <CardConsult
                  key={item.id}
                  appointment={item}
                  isAppointmentTime={isAppointmentTime}
                  onClick={onClick}
                  clickEnterAppointment={clickEnterAppointment}
                />
              );
            })
          ) : (
            <EmptyComponent
              isLoading={isLoading}
              type="files"
              update={getApppointmentsList}
              title={
                "Não há agendamentos com profissionais designados na sua conta"
              }
              message={
                "Agende agora uma consulta, ou tente novamente mais tarde clicando no botão Atualizar"
              }
            />
          )}
        </Box>
      </Grid>
    );
  }

  function CardsSecondRow() {
    return (
      <Grid
        className={styles.gridCard}
        sx={{ flexDirection: { xs: "column", md: "row" } }}
      >
        <SquareCard
          link={FormsUrls.anxietyGeneralDisorder}
          first
          handleClick={() =>
            handleClickBookCard("5", "922f1b3d-d833-46b1-a544-193103860dd5")
          }
          title="Pronto Atendimento 24h"
          CardIcon={ProntoIcon}
          body="Solicite um atendimento de emergência por e seja atendido(a) em até 24h"
          textAction="Preciso de atendimento agora"
        />
        <SquareCard
          link={FormsUrls.basicHealth}
          handleClick={() =>
            handleClickBookCard("3", "922f1b3d-d833-46b1-a544-193103860dd5")
          }
          title="Agendar consulta com Clínico Geral"
          CardIcon={ClinicoIcon}
          body="Agende uma teleconsulta com um Clínico Geral no melhor dia e horário para você"
          textAction="Agendar consulta"
        />
        <SquareCard
          link={FormsUrls.basicHealth}
          handleClick={() => handleClickBookCard("1")}
          title="Agendar consulta com Especialista"
          CardIcon={EspecialistaIcon}
          body="Escolha entre diversos médicos especialistas e profissionais de saúde e agende no melhor dia e horário para você"
          textAction="Agendar consulta"
        />
      </Grid>
    );
  }

  function CardsFirstRow() {
    return (
      <Grid
        sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
      >
        <WideCard
          color="#12CC7E"
          handleClick={() => console.log("Clicked")}
          first
          title="Avalie sua saúde gratuitamente"
          body="Clique aqui para fazer uma avaliação inicial da sua saúde com a Hausey"
          textAction=""
          CardIcon={AvaliationIcon}
        />
        <WideCard
          type="progress"
          color="white"
          handleClick={() => console.log("Clicked")}
          badge
          title="Prontuário digital"
          body="Faça upload dos seus exames, responda questionários de saúde e nos ajude a personalizar seus atendimentos"
          textAction=""
          CardIcon={ProntuarioIcon}
        />
      </Grid>
    );
  }

  function HeaderHome() {
    return (
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "flex-end",
          // backgroundColor: "yellow",
          height: "60px",
        }}
      >
        <div onClick={toggleDrawerNotification("right", true)}>
          <Badge badgeContent={2} color="error" overlap="circular">
            <BellNotification className={styles.notificationIcon} />
          </Badge>
        </div>
      </Grid>
    );
  }

  useEffect(() => {
    getApppointmentsList();
    getUserInfo();
  }, []);
  const handleCloseFeedback = () =>
    setFeedback({ ...feedBack, feedbackIsOpen: false });

  useEffect(() => {
    validateAppointmentFuture();
  }, [appointments]);

  return (
    <Grid container className={styles.container}>
      <Drawer
        anchor={"right"}
        open={notificationModal["right"]}
        onClose={toggleDrawerNotification("right", false)}
      >
        <NotificationModal
          anchor="right"
          toggleDrawer={toggleDrawerNotification}
        />
      </Drawer>
      <HeaderHome />
      <FeedBack
        handleClose={handleCloseFeedback}
        open={feedBack.feedbackIsOpen}
        messageType={feedBack.feedbackType}
        message={feedBack.feedBack}
      />
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBlock: "15px",
            marginLeft: "10px",
          }}
        >
          <Typography variant="h3" className={styles.title}>
            Olá, {userLogged.name}
          </Typography>
          {userLogged.planId && (
            <Typography variant="h4" className={styles.tag}>
              Plano de Saúde Básica
            </Typography>
          )}
        </Box>
        <CardsFirstRow />
        <CardsSecondRow />
      </Grid>

      <NextBookings />

      <ModalQuestionaire
        open={modalIsOpen}
        handleClose={handleClose}
        link={link}
      />
    </Grid>
  );
}


