import React, { useContext } from 'react'
import {
  Alert,
  AlertProps,
  Box,
  Button,
  Snackbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useRouter } from 'next/router'
import styles from '../../../../../pages/patient/homePage/HomePage.module.scss'
import { formatDate, formatHour } from '@components/utils'
import IconCalendar from '@public/images/icons/calendar.svg'
import IconClock from 'public/images/icons/clock.svg'
import { IAppointment } from 'src/interfaces'
import InputEmail from 'pages/doctor/recoverPassword/Steps/InputEmail'
interface FeedBackProps {
  onClick: (item: any) => void;
  clickEnterAppointment: (appointment: IAppointment) => void;
  isAppointmentTime: boolean;
  appointment: IAppointment;
}
export default function CardConsult({
  onClick,
  clickEnterAppointment,
  isAppointmentTime,
  appointment,
}: FeedBackProps) {
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down('lg'),
  )
  return (
    <Box
      className={styles.cardConsult}
      key={appointment?.id}
      sx={{ width: { xs: "80vw", md: "25vw" } }}
    >
      {appointment.professional ? (
        <Typography
          variant="h3"
          fontWeight={"bold"}
          className={styles.textConsult}
        >
          Dr. {appointment?.professional?.name}
        </Typography>
      ) : appointment.paid ? (
        <div>
          <Typography
            variant="h3"
            fontWeight={"bold"}
            className={styles.textConsult}
          >
            Consulta de {appointment?.specialty?.name}
          </Typography>
          <Typography variant="body1" className={styles.textStatus}>
            Aguardando alocação do médico pela secretária
          </Typography>
        </div>
      ) : (
        <div>
          <Typography
            variant="h3"
            fontWeight={"bold"}
            className={styles.textConsult}
          >
            Consulta de {appointment?.specialty?.name}
          </Typography>
          <Typography variant="body1" className={styles.textStatus}>
            🕑Aguardando confirmação de pagamento
          </Typography>
        </div>
      )}
      <Typography variant="h4" fontWeight={"light"} className={styles.textGrey}>
        Consulta de {appointment?.specialty?.name}
      </Typography>

      <Typography
        variant="h4"
        fontWeight={"regular"}
        className={styles.textGrey}
        sx={{ marginTop: "15px" }}
      >
        Data agendada:
      </Typography>
      <div
        className={styles.row}
        style={{
          marginTop: "5px",
          alignItems: "center",
          // paddingLeft: "15px",
          paddingRight: "25px",
          // justifyContent: "space-between",
        }}
      >
        <div className={styles.row}>
          <IconCalendar />
          <Typography
            variant="body2"
            fontWeight={"medium"}
            className={styles.textBlue}
            sx={{ marginLeft: "5px" }}
          >
            {formatDate(appointment?.date)}
          </Typography>
        </div>
        <div className={styles.row}>
          {/* <IconClock /> */}
          <Typography
            variant="body2"
            fontWeight={"medium"}
            className={styles.textBlue}
            sx={{ marginLeft: "5px" }}
          >
            às {formatHour(appointment?.date)}
          </Typography>
        </div>
      </div>
      <div
        className={isSmallScreen ? styles.column : styles.row}
        style={{
          justifyContent: appointment.professional ? "space-between" : "center",
          marginTop: "5px",
          maxWidth: "100%",
        }}
      >
        <div onClick={() => onClick(appointment)}>
          <Typography className={styles.textLinkDetails}>
            Ver detalhes...
          </Typography>
        </div>
        {/* <div className={styles.buttonConfirm}> */}
        {appointment.professional ? (
          <Button
            className={styles.buttonConfirm}
            variant="contained"
            disabled={isAppointmentTime}
            onClick={() => clickEnterAppointment(appointment)}
          >
            Entrar
          </Button>
        ) : null}
        {/* </div> */}
      </div>
      {/* <Box className={styles.alignCenter}>
        <Typography
          variant="body1"
          fontWeight={"regular"}
          className={styles.textInfo}
        >
          Esse botão estará disponível 15 minutos antes do horário marcado
        </Typography>
      </Box> */}
    </Box>
  );
}
