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
import {
  FeedBackProps,
  IAppointment,
  IHistoric,
  IPatients,
} from "src/interfaces";
import { AppState } from 'src/store'
import {
  getSpecialties,
  getPatientAppointments,
} from 'src/api/appointment'

import SearchIcon from '@mui/icons-material/Search'
import FeedBack from '@components/layout/feedback'
import EmptyComponent from '@components/layout/emptyComponent'
import { formatDate, formatHour } from '@components/utils'
import { useSelector } from 'react-redux'
import { UserState } from 'src/store/user/types'

type Anchor = 'top' | 'left' | 'bottom' | 'right'


export default function Historic() {

  const [isListLoading, setIsListLoading] = useState<boolean>(false)
  const [appointments, setAppointments] = useState<IAppointment[]>([])
  const { userLogged } = useSelector<AppState, UserState>((state: any) => state.userState)
  const [feedBack, setFeedback] = useState<FeedBackProps>({
    feedBack: "",
    feedbackIsOpen: false,
    feedbackType: undefined,
  });
  const handleClose = () => setFeedback({ ...feedBack, feedbackIsOpen: false });

  const handleClick = (item: IAppointment) => {};
  const getApppointmentsList = async () => {
    setIsListLoading(true);
    const response = await getPatientAppointments(userLogged.id, true);
    if (response.status) {
      setFeedback({
        feedbackType: "error",
        feedbackIsOpen: true,
        feedBack: response.message,
      });
      setIsListLoading(false);
    } else {
      setAppointments(
        response.filter((appointment: any) => appointment.professional !== null)
      );
      setIsListLoading(false);
    }
    // setAppointments(response)
  };

  useEffect(() => {
    getApppointmentsList();
  }, []);

  return (
    <Grid className={styles.container}>
      <FeedBack
        handleClose={handleClose}
        open={feedBack.feedbackIsOpen}
        messageType={feedBack.feedbackType}
        message={feedBack.feedBack}
      />
      <Grid className={styles.row}>
        <Grid className={styles.marginLeft}>
          <Typography variant="subtitle2" className={styles.title}>
            Histórico de atendimentos
          </Typography>
          <Typography variant="h4" className={styles.textGrey}>
            Veja aqui todo o seu histórico de consultas
          </Typography>
        </Grid>
      </Grid>

      <div className={styles.spaceTop} />
      <Grid
        container
        className={styles.row}
        style={{ marginTop: "20px", marginBottom: "10px" }}
      >
        <Grid item xs={3} style={{ marginLeft: "0px" }}>
          <Typography variant="h4" className={styles.textGrey}>
            Especialidade{" "}
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ marginLeft: "20px" }}>
          <Typography variant="h4" className={styles.textGrey}>
            Nome do profissional{" "}
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ marginLeft: "20px" }}>
          <Typography variant="h4" className={styles.textGrey}>
            Data do atendimento{" "}
          </Typography>
        </Grid>
      </Grid>
      <Box className={styles.historyList}>
        {appointments?.length > 0 ? (
          appointments?.map((item: IAppointment) => (
            <Grid
              container
              key={item.id}
              className={styles.historyListItem}
              onClick={() => handleClick(item)}
            >
              {/* <Folder /> */}
              <Grid item xs={3} style={{ marginLeft: "0px" }}>
                <Typography variant="h4" className={styles.textBlack}>
                  Consulta de {item.specialty.name}
                </Typography>
              </Grid>
              <Grid item xs={3} style={{ marginLeft: "20px" }}>
                <Typography variant="h4" className={styles.textBlue}>
                  Dr(a) {item.professional?.name}
                </Typography>
              </Grid>

              <Grid item xs={3} style={{ marginLeft: "20px" }}>
                <Typography variant="h4" className={styles.textBlack}>
                  {formatDate(item.date)} às {formatHour(item.date)}
                </Typography>
              </Grid>

              {/* <Typography className={styles.textGrey}>
                    {item.date}
                  </Typography> */}
            </Grid>
          ))
        ) : (
          <Grid
            item
            xs={12}
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <EmptyComponent
              isLoading={isListLoading}
              update={getApppointmentsList}
              type={"files"}
              title={"Ainda não há atendimentos realizados"}
              message={
                "Comece agora agendando na página inicial ou atualize para ver atendimentos já finalizados"
              }
            />
          </Grid>
        )}
      </Box>
    </Grid>
  );
}
