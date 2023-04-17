import React, { useEffect, useState } from "react";
import styles from "./agenda.module.scss";
import { useRouter } from "next/router";
import { Grid, Typography, TextField, Box } from "@mui/material";
import { formatDate, formatDateWithWeekDay } from "@components/utils";
import { IAppointment } from "src/interfaces";
import EmptyComponent from "../emptyComponent";

type ModalType = "confirmation" | "details" | "payment";
interface EventsProps {
  events: IAppointment[];
  handleOpen: (modal: ModalType, event: any) => void;
  update: () => void;
  isLoading: boolean;
}
export default function EventsList({
  events,
  handleOpen,
  update,
  isLoading,
}: EventsProps) {
  const getHashId = (item: any) => {
    if (item) {
      let id = item.split("-");
      return "#" + id[1];
    }
    return;
  };
  const formatHour = (date: string) => {
    let dateText = date.split("T");
    let dateFormatted = dateText[1].split(":");
    return dateFormatted[0] + ":" + dateFormatted[1];
  };
  return (
    <>
      {events.length > 0 ? (
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
              onClick={() =>
                handleOpen(item.paid ? "confirmation" : "payment", item)
              }
            >
              <Box
                sx={{ display: "flex", alignItems: "center", maxWidth: "70%" }}
              >
                <Typography
                  variant="h3"
                  fontWeight={"medium"}
                  className={styles.textHour}
                >
                  {formatHour(item?.date)}
                </Typography>
                <div className={styles.divider} />
                <div className={styles.column}>
                  <Typography
                    variant="body2"
                    fontWeight={"bold"}
                    className={styles.titleEventCard}
                    sx={{ paddingTop: "2px" }}
                  >
                    Consulta de {item?.specialty.name}
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={"light"}
                    className={styles.subTitleEventCard}
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "...",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                      maxWidth: 270,
                      paddingTop: "2px",
                    }}
                  >
                    Paciente: {item?.patient.name}{" "}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={"regular"}
                    className={styles.status}
                  >
                    {item.paid
                      ? "Aguardando designação"
                      : "Aguardando confirmação de pagamento"}
                  </Typography>
                </div>
              </Box>
              <a
                className={styles.buttonEventList}
                onClick={() =>
                  handleOpen(item.paid ? "confirmation" : "payment", item)
                }
              >
                <Typography
                  variant="body1"
                  fontWeight={"medium"}
                  className={styles.textButtonEventList}
                >
                  {item.paid ? "Designar" : "Confirmar pagamento"}
                </Typography>
              </a>
            </Box>
          </div>
        ))
      ) : (
        <EmptyComponent
          isLoading={isLoading}
          update={update}
          title={"Não há agendamentos sem confirmação"}
          message={`Todos os agendamentos foram designados! Tente novamente mais tarde ou clique no botão "atualizar"`}
        />
      )}
    </>
  );
}
