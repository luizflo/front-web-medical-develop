import React, { useEffect, useState } from 'react'
import styles from '../home.module.scss'
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
  DataGrid,
  GridColumns,
  GridEventListener,
  GridToolbar,
  useDataGrid,
} from '@pankod/refine-mui'
import { IAppointment, IHistoric} from 'src/interfaces'
import { Home, HomeOutlined } from '@mui/icons-material'
import Calendar from 'public/images/patient/calendarBlue.svg'
import Image from 'next/image'
import Arrow from '@public/images/secretary/arrow-back.svg'
import Graduate from '@public/images/menu/doctor.svg'
import user from '@public/images/menu/user.png'
import badge from '../../../../public/images/secretary/badge.png'
import {
  getSpecialties,
  getPatientAppointments,
  getAppointmentsDesignated,
} from 'src/api/appointment'

import SearchIcon from '@mui/icons-material/Search'
import FeedBack from '@components/layout/feedback'
import EmptyComponent from '@components/layout/emptyComponent'
import { formatDate, formatHour } from '@components/utils'

type Anchor = 'top' | 'left' | 'bottom' | 'right'

interface HistoricProps {
  returnStep: () => void
  selectedAppointment: IAppointment
}


function NavHeader(props: any) {
  return (<Box className={styles.rowButtonBack} onClick={() => props.returnStep()}>
    <Arrow />
    <HomeOutlined className={styles.spaceIcon} />
    <Typography variant="body1" className={styles.textPages}>
      Home /
    </Typography>
    <Typography variant="body1" className={styles.boldBlue}>
      Detalhes /{' '}
    </Typography>
    <Typography variant="body1" className={styles.boldBlue}>
      Histórico de atendimentos
    </Typography>
  </Box>);
}





export default function Historic({
  returnStep,
  selectedAppointment,
}: HistoricProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = React.useState<any>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const handleClose = () => setOpen(false);
  const [isListLoading, setIsListLoading] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [appointmentClicked, setAppointmentClicked] = useState<IAppointment>();
  const [feedBack, setFeedback] = useState<string>("");
  const [textShownId, setTextShownId] = useState<string>("");
  const [feedbackIsOpen, setFeedbackIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedBackType] = useState<AlertProps["severity"]>();

  const handleClick = (item: IAppointment) => {
    toggleDrawer("right", true);
    setAppointmentClicked(item);
  };
  const getApppointmentsList = async () => {
    const response = await getPatientAppointments(
      selectedAppointment.patientId,
      true
    );
    // setAppointments(response)
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
            Paciente: {selectedAppointment?.patient.name}
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
        <Box sx={{ height: "20px", marginTop: "20px" }} />
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
      <NavHeader returnStep={returnStep}></NavHeader>
      <Grid className={styles.row}>
        <Grid className={styles.marginLeft}>
          <Typography variant="subtitle2" className={styles.titleName}>
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
            type={"files"}
            title={"Ainda não há arquivos anexados"}
            message={
              "Anexe arquivos à consulta e atualize a lista no botão abaixo para vê-los aqui"
            }
          />
        )}
      </Box>
      <div>
        <React.Fragment key={"right"}>
          {/* <Button onClick={toggleDrawer(anchor, true)}></Button> */}
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={() => toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
      {/* <DataGrid
        className={styles.grid}
        rows={appointments!!}
        columns={columns}
        hideFooter
        // onRowClick={handleEvent}
        autoHeight
      /> */}
    </Grid>
  );
}
