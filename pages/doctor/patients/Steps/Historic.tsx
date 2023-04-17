import React, { useEffect, useState } from 'react'
import styles from '../patients.module.scss'
import {
  alpha,
  Box,
  Button,
  Drawer,
  Grid,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColumns,
  GridEventListener,
  GridToolbar,
  useDataGrid,
} from "@pankod/refine-mui";
import {
  FeedBackProps,
  IAppointment,
  IHistoric,
  IPatients,
  Patient,
} from "src/interfaces";
import Image from "next/image";
import { Home, HomeOutlined } from "@mui/icons-material";
import Arrow from "@public/images/secretary/arrow-back.svg";
import Calendar from "public/images/patient/calendarBlue.svg";
import Graduate from "@public/images/menu/doctor.svg";
import user from "@public/images/menu/user.png";
import Badge from "@public/images/secretary/badgeBlue.svg";

import SearchIcon from "@mui/icons-material/Search";
import { getPatientAppointments } from "src/api/appointment";
import { formatDate, formatHour } from "@components/utils";
import FeedBack from "@components/layout/feedback";
import EmptyComponent from "@components/layout/emptyComponent";

type Anchor = "top" | "left" | "bottom" | "right";

interface HistoricProps {
  onClick: () => void;
  setStepFixo: (value: number) => void;
  patientSelected: Patient;
}
function NavHeader(props: any) {
  return (
    <Box className={styles.rowButtonBack} onClick={() => props.returnStep(2)}>
      <Arrow />
      <Typography variant="body1" className={styles.textPages}>
        Meus pacientes /
      </Typography>
      <Typography variant="body1" className={styles.textBlue}>
        Detalhes /{" "}
      </Typography>
      <Typography variant="body1" className={styles.textBlue}>
        Histórico de atendimentos
      </Typography>
    </Box>
  );
}

export default function Historic({
  onClick,
  setStepFixo,
  patientSelected,
}: HistoricProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [feedBack, setFeedback] = useState<FeedBackProps>({
    feedBack: "",
    feedbackIsOpen: false,
    feedbackType: undefined,
  });

  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [textShownId, setTextShownId] = useState<string>("");
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [appointmentClicked, setAppointmentClicked] = useState<IAppointment>();
  const [state, setState] = React.useState<any>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor: Anchor, open: boolean) => {
    setState({ ...state, [anchor]: open });
  };
  const handleClick = (item: IAppointment) => {
    toggleDrawer("right", true);
    setAppointmentClicked(item);
  };
  const getApppointmentsList = async () => {
    const response = await getPatientAppointments(patientSelected.id, true);
    // setAppointments(response).
    console.log("Appointments", response);
    setAppointments(
      response.filter((appointment: any) => appointment.professional !== null)
    );
  };

  const longTextHandler = (text: string, id: string) => {
    if (text) {
      const textChopped = text.slice(0, 200);
      if (id === textShownId) {
        return text;
      } else {
        return textChopped + "...";
      }
    } else {
      return "Não há anamnese registrada nessa consulta";
    }
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
            Paciente: {patientSelected?.name}
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
              Nenhuma anotação salva durante a consulta encontrada
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
          <Typography variant="h4" className={styles.textGrey}>
            {appointmentClicked?.primaryDiagnosis}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          className={styles.textBlack}
          style={{ marginTop: "15px" }}
        >
          Prescrições:
        </Typography>
        {appointmentClicked?.prescriptions.map((item) => (
          <Typography
            variant="h4"
            component={"a"}
            target="_blank"
            href={item.pdfUrl}
            sx={{ marginTop: "20px" }}
            className={styles.textBlue}
          >
            {item.pdfUrl}
          </Typography>
        ))}
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
        open={feedBack.feedbackIsOpen}
        messageType={feedBack.feedbackType}
        message={feedBack.feedBack}
      />
      <NavHeader returnStep={setStepFixo}></NavHeader>
      <Grid className={styles.row}>
        <Grid className={styles.marginLeft}>
          <Typography
            variant="h5"
            fontWeight={"bold"}
            className={styles.titleName}
          >
            Histórico de atendimentos
          </Typography>
        </Grid>
      </Grid>

      <div className={styles.spaceTop} />
      <Box className={styles.historyList}>
        {appointments?.length > 0 ? (
          appointments?.map((item: IAppointment) => (
            <Grid container className={styles.historyListItem}>
              <Grid item xs={10} style={{ marginLeft: "10px" }}>
                <Typography
                  variant="h4"
                  fontWeight={"light"}
                  className={styles.textBlue}
                >
                  {formatDate(item.date)} às {formatHour(item.date)}
                </Typography>
                <Box style={{ marginLeft: "0px", display: "flex" }}>
                  <Typography
                    variant="body2"
                    fontWeight={"medium"}
                    className={styles.textBlack}
                  >
                    Consulta de {item.specialty.name} •
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={"medium"}
                    className={styles.textBlack}
                    sx={{ marginLeft: "5px" }}
                  >
                    Dr(a) {item.professional?.name}
                  </Typography>
                </Box>
                <Typography
                  variant="h4"
                  fontWeight={"light"}
                  sx={{ marginTop: "5px" }}
                  className={styles.textBlack}
                >
                  Anamnese:
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={"light"}
                  className={styles.textGrey}
                  sx={{ maxWidth: "80%" }}
                >
                  {longTextHandler(item.anamnesis!!, item.id)}
                </Typography>
                {item.anamnesis && item.anamnesis?.length >= 200 && (
                  <Typography
                    variant="h4"
                    fontWeight={"regular"}
                    className={styles.textRespond}
                    onClick={() =>
                      setTextShownId((textShownId) =>
                        textShownId === item.id ? "0" : item.id
                      )
                    }
                    sx={{ maxWidth: "80%" }}
                  >
                    {textShownId === item.id ? "Ver menos" : "Ver mais"}
                  </Typography>
                )}
              </Grid>
              <Grid style={{ marginLeft: "5vw" }}>
                <Typography
                  variant="h4"
                  className={styles.textRespond}
                  onClick={() => handleClick(item)}
                >
                  Ver detalhes
                </Typography>
              </Grid>
            </Grid>
          ))
        ) : (
          <EmptyComponent
            isLoading={isListLoading}
            update={getApppointmentsList}
            type={"other"}
            title={"Nenhum atendimento encontrado para esse paciente"}
            message={
              "Atualize a lista no botão abaixo se acredita que isso é um erro, ou tente novamente mais tarde."
            }
          />
        )}
      </Box>
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
