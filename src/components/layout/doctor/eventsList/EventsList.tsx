import React, { useEffect, useState } from 'react'
import styles from '../components.module.scss'
import { useRouter } from 'next/router'
import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  CircularProgress,
} from '@mui/material'
import Image from 'next/image'
import { formatDate, formatDateWithWeekDay } from '@components/utils'

import ListEmptyIcon from 'public/EmptyInbox.png'
import { IAppointment } from 'src/interfaces'
import EmptyComponent from "@components/layout/emptyComponent";

interface EventsProps {
  events: IAppointment[];
  handleOpen: (item: IAppointment) => void;
  update: () => void;
  isLoading: boolean;
}
export default function EventsList({
  events,
  handleOpen,
  update,
  isLoading,
}: EventsProps) {
  // const formatDate = (date: string) => {
  //   let dateText = date.split('T')
  //   let dateFormatted = dateText[0]
  //   return dateFormatted
  // }
  const formatHour = (date: string) => {
    let dateText = date.split("T");
    let dateFormatted = dateText[1].split(":");
    return dateFormatted[0] + ":" + dateFormatted[1];
  };

  return (
    <>
      {events?.length > 0 ? (
        events?.map((item: IAppointment) => (
          <div key={item.id}>
            <Typography
              variant="h4"
              fontWeight={"medium"}
              className={styles.textDate}
            >
              {formatDateWithWeekDay(item?.date)}
            </Typography>
            <Box
              className={styles.cardBooking}
              onClick={() => handleOpen(item)}
            >
              <Typography
                variant="h3"
                fontWeight={"medium"}
                className={styles.textHour}
              >
                {formatHour(item?.date)}
              </Typography>
              <div className={styles.divider} />
              <div className={styles.column} style={{ marginRight: "10px" }}>
                <Typography
                  variant="h4"
                  fontWeight={"bold"}
                  className={styles.titleEventCard}
                >
                  Consulta de {item?.specialty.name}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={"light"}
                  className={styles.subTitleEventCard}
                >
                  Paciente: {item?.patient.name}
                </Typography>
              </div>
              <a
                className={styles.buttonEventList}
                onClick={() => handleOpen(item)}
              >
                <Typography
                  variant="body1"
                  fontWeight={"medium"}
                  className={styles.textButtonEventList}
                >
                  Detalhes
                </Typography>
              </a>
            </Box>
          </div>
        ))
      ) : (
        <EmptyComponent
          isLoading={isLoading}
          update={update}
          title={"Não há consultas agendadas por enquanto"}
          message={`Todos os agendamentos foram concluídos! Tente novamente mais tarde ou clique no botão "atualizar"`}
        />
      )}
    </>
  );
}
