import React, { useEffect, useState } from 'react'
import styles from './agenda.module.scss'
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
import EmptyComponent from '../emptyComponent'
import { IAppointment } from "src/interfaces";


type ModalType = "confirmation" | "details" | "payment";
interface EventsProps {
  events: IAppointment[];
  handleOpen: (modal: ModalType, event: any) => void;
  update: () => void;
  isLoading: boolean;
}
export default function EventsListConfirmed({
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
        events?.map((item: any) => (
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
              onClick={() => handleOpen("details", item)}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", maxWidth: "80%" }}
              >
                <Typography
                  variant="h3"
                  fontWeight={"medium"}
                  className={styles.textHour}
                >
                  {formatHour(item?.date)}
                </Typography>
                <div className={styles.dividerGreen} />
                <div className={styles.column}>
                  <Typography
                    variant="body2"
                    fontWeight={"bold"}
                    className={styles.titleEventCard}
                    sx={{ textOverflow: "ellipsis", paddingTop: "2px" }}
                  >
                    Consulta de {item?.specialty.name}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={"light"}
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                      maxWidth: 300,
                      paddingTop: "2px",
                    }}
                    className={styles.subTitleEventCard}
                  >
                    Paciente: {item?.patient.name}.
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={"light"}
                    className={styles.subTitleEventCard}
                    sx={{ textOverflow: "ellipsis", paddingTop: "5px" }}
                  >
                    Profissional: {item?.professional.name}
                  </Typography>
                </div>
              </Box>
              <a
                className={styles.buttonEventListConfirmed}
                onClick={() => handleOpen("details", item)}
              >
                Ver detalhes
              </a>
            </Box>
          </div>
        ))
      ) : (
        <EmptyComponent
          isLoading={isLoading}
          update={update}
          title={"Não há agendamentos com profissionais designados"}
          message={
            "Escolha os profissionais nos agendamentos sem confirmação ou clique abaixo para atualizar"
          }
        />
      )}
    </>
  );
}
