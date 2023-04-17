import React, { useEffect, useState } from 'react'
import styles from './historic.module.scss'
import {
  AlertProps,
  alpha,
  Box,
  Button,
  Drawer,
  Grid,
  InputBase,
  styled,
  Typography,
} from '@mui/material'
import {
  GridEventListener,
} from '@pankod/refine-mui'
import { IAppointment, IHistoric} from 'src/interfaces'
import { AppState } from 'src/store'
import Calendar from 'public/images/patient/calendarBlue.svg'
import {
  getSpecialties,
  getPatientAppointments,
  getProfessionalAppointments,
} from 'src/api/appointment'

import SearchIcon from '@mui/icons-material/Search'
import FeedBack from '@components/layout/feedback'
import EmptyComponent from '@components/layout/emptyComponent'
import { formatDate, formatHour } from '@components/utils'
import { useSelector } from 'react-redux'
import { UserState } from 'src/store/user/types'

type Anchor = 'top' | 'left' | 'bottom' | 'right'



function Header() {
  return (<Grid className={styles.row}>
    <Grid className={styles.marginLeft}>
      <Typography variant="subtitle2" className={styles.title}>
        Histórico de atendimentos
      </Typography>
      <Typography variant='h4' className={styles.textGrey}>
        Veja aqui todo o seu histórico de consultas
      </Typography>
    </Grid>
  </Grid>);
}


function TableHeader() {
  return (<Grid container className={styles.row} style={{
    marginTop: '20px',
    marginBottom: '10px'
  }}>
    <Grid item xs={2} style={{
      marginLeft: '0px'
    }}>
      <Typography variant="h4" className={styles.textGrey}>
        Especialidade{' '}
      </Typography>
    </Grid>
    <Grid item xs={3} style={{
      marginLeft: '20px'
    }}>
      <Typography variant="h4" className={styles.textGrey}>
        Nome do paciente{' '}
      </Typography>
    </Grid>
    <Grid item xs={3} style={{
      marginLeft: '20px'
    }}>
      <Typography variant="h4" className={styles.textGrey}>
        Data do atendimento{' '}
      </Typography>
    </Grid>
  </Grid>);
}



function TableHistory(props: any) {
  return (
    <Box className={styles.historyList}>
      {props.appointments?.length > 0 ? (
        props.appointments?.map((item: IAppointment) => (
          <Grid
            key={item.id}
            container
            className={styles.historyListItem}
            onClick={() => props.handleClick(item)}
          >
            <Grid
              item
              xs={2}
              style={{
                marginLeft: "0px",
              }}
            >
              <Typography variant="h4" className={styles.textBlack}>
                Consulta de {item.specialty.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                marginLeft: "20px",
              }}
            >
              <Typography variant="h4" className={styles.textBlue}>
                {item.patient?.name}
              </Typography>
            </Grid>

            <Grid
              item
              xs={3}
              style={{
                marginLeft: "20px",
              }}
            >
              <Typography variant="h4" className={styles.textBlack}>
                {formatDate(item.date)} às {formatHour(item.date)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                marginLeft: "20px",
              }}
            >
              <Typography variant="h4" className={styles.textBlue}>
                Ver registros da consulta
              </Typography>
            </Grid>
          </Grid>
        ))
      ) : (
        <EmptyComponent
          isLoading={props.isListLoading}
          update={props.getApppointmentsList}
          type={"files"}
          title={"Ainda não há arquivos anexados"}
          message={
            "Anexe arquivos à consulta e atualize a lista no botão abaixo para vê-los aqui"
          }
        />
      )}
    </Box>
  );
}

export default function Historic() {
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = React.useState<any>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [appointmentClicked, setAppointmentClicked] = useState<IAppointment>();
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const { userLogged } = useSelector<AppState, UserState>(
    (state: any) => state.userState
  );
  const [feedBack, setFeedback] = useState<string>("");
  const [feedbackIsOpen, setFeedbackIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedBackType] = useState<AlertProps["severity"]>();
  const handleClose = () => setFeedbackIsOpen(false);

  const handleClick = (item: IAppointment) => {
    toggleDrawer("right", true);
    setAppointmentClicked(item);
  };
  const getApppointmentsList = async () => {
    setIsListLoading(true);
    const response = await getProfessionalAppointments(userLogged?.id, true);
    if (response.status) {
      setFeedBackType("error");
      setFeedbackIsOpen(true);
      setFeedback(response.message);
      setIsListLoading(false);
    } else {
      setAppointments(response);
      setIsListLoading(false);
    }
    // setAppointments(response)
  };

  const toggleDrawer = (anchor: Anchor, open: boolean) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 550 }}
      role="presentation"
      onClick={() => toggleDrawer(anchor, false)}
      onKeyDown={() => toggleDrawer(anchor, false)}
    >
      <Box className={styles.bgTop}></Box>
      <Box className={styles.containerModal}>
        <Typography
          variant="h2"
          fontWeight={"medium"}
          className={styles.textBlue}
        >
          Anotações do atendimento
        </Typography>
        <Typography
          variant="h3"
          fontWeight={"medium"}
          style={{ marginTop: "10px" }}
          className={styles.textBlack}
        >
          Consulta de {appointmentClicked?.specialty.name}
        </Typography>
        <Box className={styles.row}>
          <Typography
            variant="body2"
            fontWeight={"regular"}
            style={{ marginTop: "5px" }}
            className={styles.textGrey}
          >
            Paciente: {appointmentClicked?.patient.name}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={"regular"}
            style={{ marginTop: "5px", marginLeft: "20px" }}
            className={styles.textGrey}
          >
            Profissional: Dr(a) {appointmentClicked?.professional?.name}
          </Typography>
        </Box>
        <div className={styles.row} style={{ marginTop: "15px" }}>
          <Typography
            variant="body2"
            className={styles.textGrey}
            style={{ marginRight: "15px" }}
          >
            Data do atendimento:
          </Typography>
          <Calendar className={styles.IconBlue} />
          <Typography variant="body2" className={styles.textBlue}>
            {formatDate(appointmentClicked?.date!!)}
          </Typography>
        </div>

        <Typography
          variant="body2"
          className={styles.textBlack}
          style={{ marginTop: "15px" }}
        >
          Anamnese:
        </Typography>
        <Box className={styles.boxNotes}>
          {appointmentClicked?.anamnesis ? (
            <Typography variant="h4" className={styles.textGrey}>
              {appointmentClicked?.anamnesis}
            </Typography>
          ) : (
            <Typography variant="h4" className={styles.textGrey}>
              Nenhuma anotação de anamnese da consulta encontrada
            </Typography>
          )}
        </Box>
        <Typography
          variant="body2"
          className={styles.textBlack}
          style={{ marginTop: "15px" }}
        >
          Diagnósticos primários
        </Typography>
        <Box className={styles.boxNotes}>
          {appointmentClicked?.primaryDiagnosis ? (
            <Typography variant="h4" className={styles.textGrey}>
              {appointmentClicked?.primaryDiagnosis}
            </Typography>
          ) : (
            <Typography variant="h4" className={styles.textGrey}>
              Nenhuma anotação de diagnósticos primários da consulta encontrada
            </Typography>
          )}
        </Box>
        <Box className={styles.marginTop} />

        <Box className={styles.marginTop} />
      </Box>
    </Box>
  );

  useEffect(() => {
    getApppointmentsList();
  }, []);

  return (
    <Grid className={styles.container}>
      <FeedBack
        handleClose={handleClose}
        open={feedbackIsOpen}
        messageType={feedbackType}
        message={feedBack}
      />
      <Header />

      <div className={styles.spaceTop} />
      <TableHeader />
      <TableHistory
        isListLoading={isListLoading}
        appointments={appointments}
        handleClick={handleClick}
        getApppointmentsList={getApppointmentsList}
      />
      <div>
        <React.Fragment key={"right"}>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={() => toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
    </Grid>
  );
}
