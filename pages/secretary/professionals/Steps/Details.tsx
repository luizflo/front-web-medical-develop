import React, { useEffect, useMemo, useState } from "react";
import {
  alpha,
  Box,
  Button,
  Grid,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import styles from "../professionals.module.scss";
import Arrow from "@public/images/secretary/arrow-left.svg";
import ArrowBack from "@public/images/secretary/arrow-back.svg";
import Image from "next/image";
import Graduate from "@public/images/menu/doctor.svg";

import Document from "@public/images/secretary/document.svg";
import Prev from "@public/images/secretary/document.svg";
import Next from "@public/images/secretary/document.svg";

import user from "@public/images/menu/profileDoctor.png";
import { typography } from "@pankod/refine-mui";
import Modal from "@mui/material/Modal";

import logoExit from "@public/exit.png";
import { IScale, Professional } from "src/interfaces";
import {
  ArrowBackIos,
  ArrowForwardIos,
  GifBoxOutlined,
} from "@mui/icons-material";

interface DetailsProps {
  setStepFixo: (number: number) => void;
  professionalSelected: Professional;
}

function NavBarHeader(props: any) {
  return (
    <Grid className={styles.rowButtonBack} onClick={() => props.setStepFixo(1)}>
      <ArrowBack />
      <Graduate />
      <Typography
        variant="body1"
        fontWeight={"light"}
        className={styles.textPages}
      >
        Profissionais /{" "}
      </Typography>
      <Typography
        variant="body1"
        fontWeight={"medium"}
        className={styles.boldBlue}
      >
        Dr(a). {props.name}
      </Typography>
    </Grid>
  );
}

export default function Details({
  setStepFixo,
  professionalSelected,
}: DetailsProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [actual, setActual] = useState<boolean>(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [now, setNow] = useState<Date>(new Date());

  const [scale, setScale] = useState<IScale[]>();
  const [week1, setWeek1] = useState<IScale[]>([
    {
      day: "Qui",
      dayOfMonth: "8 de Dez",
      hours: [
        { text: "08:30", selected: true },
        { text: "09:00", selected: false },
        { text: "09:30", selected: false },
        { text: "10:00", selected: true },
        { text: "10:30", selected: false },
      ],
    },
    {
      day: "Sex",
      dayOfMonth: "9 de Dez",
      hours: [
        { text: "08:30", selected: true },
        { text: "09:00", selected: true },
        { text: "09:30", selected: false },
        { text: "10:00", selected: false },
        { text: "10:30", selected: false },
      ],
    },
    {
      day: "Sab",
      dayOfMonth: "10 de Dez",
      hours: [
        { text: "-", selected: false },
        { text: "-", selected: false },
        { text: "-", selected: false },
        { text: "-", selected: false },
        { text: "10:30", selected: true },
      ],
    },
    {
      day: "Dom",
      dayOfMonth: "11 de Dez",
      hours: [
        { text: "-", selected: false },
        { text: "-", selected: false },
        { text: "09:30", selected: false },
        { text: "10:00", selected: true },
        { text: "10:30", selected: true },
      ],
    },
    {
      day: "Seg",
      dayOfMonth: "12 de Dez",
      hours: [
        { text: "08:30", selected: false },
        { text: "09:00", selected: false },
        { text: "09:30", selected: false },
        { text: "10:00", selected: false },
        { text: "10:30", selected: false },
      ],
    },
  ]);
  const [week2, setWeek2] = useState<IScale[]>([
    {
      day: "Ter",
      dayOfMonth: "13 de Dez",
      hours: [
        { text: "08:30", selected: true },
        { text: "09:00", selected: true },
        { text: "-", selected: false },
        { text: "10:00", selected: true },
        { text: "10:30", selected: false },
      ],
    },
    {
      day: "Qua",
      dayOfMonth: "14 de Dez",
      hours: [
        { text: "08:30", selected: false },
        { text: "-", selected: false },
        { text: "09:30", selected: false },
        { text: "10:00", selected: true },
        { text: "10:30", selected: true },
      ],
    },
    {
      day: "Qui",
      dayOfMonth: "15 de Dez",
      hours: [
        { text: "08:30", selected: true },
        { text: "-", selected: false },
        { text: "-", selected: false },
        { text: "-", selected: false },
        { text: "10:30", selected: true },
      ],
    },
    {
      day: "Sex",
      dayOfMonth: "16 de Dez",
      hours: [
        { text: "-", selected: false },
        { text: "-", selected: false },
        { text: "09:30", selected: false },
        { text: "10:00", selected: false },
        { text: "10:30", selected: true },
      ],
    },
    {
      day: "Sab",
      dayOfMonth: "17 de Dez",
      hours: [
        { text: "08:30", selected: false },
        { text: "09:00", selected: false },
        { text: "09:30", selected: false },
        { text: "10:00", selected: false },
        { text: "10:30", selected: false },
      ],
    },
  ]);

  useMemo(() => {
    createScale();
  }, []);

  function dayOfWeek(day: number) {
    switch (day) {
      case 0:
        return "Dom";
      case 1:
        return "Seg";
      case 2:
        return "Ter";
      case 3:
        return "Qua";
      case 4:
        return "Qui";
      case 5:
        return "Sex";
      case 6:
        return "Sab";
      default:
        return "";
    }
  }

  function addDays(numOfDays: number, date: Date) {
    const dateCopy = new Date(date.getTime());

    dateCopy.setDate(dateCopy.getDate() + numOfDays);

    return dateCopy;
  }

  function week(weeks: number) {
    const dateCopy = new Date(now);
    dateCopy.setDate(dateCopy.getDate() + weeks * 5);

    setNow(dateCopy);
    //aqui é onde vai ter a chamada da api e vai trocar o array
    if (weeks === 1) {
      setScale(week2);
    } else {
      setScale(week1);
    }
  }

  function createScale() {
    setScale(week1);
  }

  const [data, setData] = useState<IScale[]>([
    {
      day: "Seg",
      hours: [
        { text: "08:00", selected: false },
        { text: "09:00", selected: false },
        { text: "10:00", selected: false },
        { text: "11:00", selected: false },
        { text: "12:00", selected: false },
        { text: "13:00", selected: false },
        { text: "14:00", selected: false },
        { text: "15:00", selected: false },
        { text: "16:00", selected: false },
        { text: "17:00", selected: false },
        { text: "18:00", selected: false },
        { text: "19:00", selected: false },
        { text: "20:00", selected: false },
        { text: "21:00", selected: false },
        { text: "22:00", selected: false },
      ],
    },
    {
      day: "Ter",
      hours: [
        { text: "08:00", selected: false },
        { text: "09:00", selected: false },
        { text: "10:00", selected: false },
        { text: "11:00", selected: false },
        { text: "12:00", selected: false },
        { text: "13:00", selected: false },
        { text: "14:00", selected: false },
        { text: "15:00", selected: false },
        { text: "16:00", selected: false },
        { text: "17:00", selected: false },
        { text: "18:00", selected: false },
        { text: "19:00", selected: false },
        { text: "20:00", selected: false },
        { text: "21:00", selected: false },
        { text: "22:00", selected: false },
      ],
    },
    {
      day: "Qua",
      hours: [
        { text: "08:00", selected: false },
        { text: "09:00", selected: false },
        { text: "10:00", selected: false },
        { text: "11:00", selected: false },
        { text: "12:00", selected: false },
        { text: "13:00", selected: false },
        { text: "14:00", selected: false },
        { text: "15:00", selected: false },
        { text: "16:00", selected: false },
        { text: "17:00", selected: false },
        { text: "18:00", selected: false },
        { text: "19:00", selected: false },
        { text: "20:00", selected: false },
        { text: "21:00", selected: false },
        { text: "22:00", selected: false },
      ],
    },
    {
      day: "Qui",
      hours: [
        { text: "08:00", selected: false },
        { text: "09:00", selected: false },
        { text: "10:00", selected: false },
        { text: "11:00", selected: false },
        { text: "12:00", selected: false },
        { text: "13:00", selected: false },
        { text: "14:00", selected: false },
        { text: "15:00", selected: false },
        { text: "16:00", selected: false },
        { text: "17:00", selected: false },
        { text: "18:00", selected: false },
        { text: "19:00", selected: false },
        { text: "20:00", selected: false },
        { text: "21:00", selected: false },
        { text: "22:00", selected: false },
      ],
    },
    {
      day: "Sex",
      hours: [
        { text: "08:00", selected: false },
        { text: "09:00", selected: false },
        { text: "10:00", selected: false },
        { text: "11:00", selected: false },
        { text: "12:00", selected: false },
        { text: "13:00", selected: false },
        { text: "14:00", selected: false },
        { text: "15:00", selected: false },
        { text: "16:00", selected: false },
        { text: "17:00", selected: false },
        { text: "18:00", selected: false },
        { text: "19:00", selected: false },
        { text: "20:00", selected: false },
        { text: "21:00", selected: false },
        { text: "22:00", selected: false },
      ],
    },
    {
      day: "Sáb",
      hours: [
        { text: "08:00", selected: false },
        { text: "09:00", selected: false },
        { text: "10:00", selected: false },
        { text: "11:00", selected: false },
        { text: "12:00", selected: false },
        { text: "13:00", selected: false },
        { text: "14:00", selected: false },
        { text: "15:00", selected: false },
        { text: "16:00", selected: false },
        { text: "17:00", selected: false },
        { text: "18:00", selected: false },
        { text: "19:00", selected: false },
        { text: "20:00", selected: false },
        { text: "21:00", selected: false },
        { text: "22:00", selected: false },
      ],
    },
    {
      day: "Dom",
      hours: [
        { text: "08:00", selected: false },
        { text: "09:00", selected: false },
        { text: "10:00", selected: false },
        { text: "11:00", selected: false },
        { text: "12:00", selected: false },
        { text: "13:00", selected: false },
        { text: "14:00", selected: false },
        { text: "15:00", selected: false },
        { text: "16:00", selected: false },
        { text: "17:00", selected: false },
        { text: "18:00", selected: false },
        { text: "19:00", selected: false },
        { text: "20:00", selected: false },
        { text: "21:00", selected: false },
        { text: "22:00", selected: false },
      ],
    },
  ]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 680,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const tags = ["Psiquiatria", "Clinica geral", "Pediatria"];
  const hoursOccupied = [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const returnHours = () => {
    data.map((day) => {
      day.hours.map((hour) => {});
    });
  };

  const showMemedStatusTag = (memedStatus: string | null) => {
    if (memedStatus) {
      switch (memedStatus) {
        case "Em análise":
          return (
            <Typography
              variant="body2"
              fontWeight={"medium"}
              className={styles.cardMemed}
              style={{ color: "#0db564" }}
            >
              {" "}
              Cadastrado
            </Typography>
          );
        case "Erro ao criar usuário":
          return (
            <Typography
              variant="body2"
              fontWeight={"light"}
              className={styles.cardMemed}
              style={{ color: "#ffcc00" }}
            >
              {" "}
              Erro no cadastro
            </Typography>
          );
        default:
          return (
            <Typography
              variant="body2"
              fontWeight={"light"}
              className={styles.cardBlack}
            >
              {" "}
              Cadastrado
            </Typography>
          );
      }
    } else {
      return (
        <Typography
          variant="body2"
          fontWeight={"medium"}
          className={styles.cardMemed}
          style={{ color: "#ff4545" }}
        >
          {" "}
          Não cadastrado
        </Typography>
      );
    }
  };

  const setSeleted = (day: number, index: any) => {
    const tempData = [...data];

    tempData[day].hours[index].selected = !data[day].hours[index].selected;

    setData(tempData);
  };

  return (
    <Grid className={styles.container}>
      <NavBarHeader
        setStepFixo={setStepFixo}
        name={professionalSelected.name}
      />
      <Grid className={styles.row}>
        <Image
          alt="no-alt"
          height={80}
          width={80}
          objectFit="cover"
          style={{ borderRadius: "50%" }}
          src={professionalSelected.image ? professionalSelected.image : user}
        />
        <Grid className={styles.marginLeft}>
          <Typography
            variant="h1"
            fontWeight={"bold"}
            className={styles.titleName}
          >
            Dr(a). {professionalSelected.name}
          </Typography>
          <Grid className={styles.row} style={{ marginTop: "5px" }}>
            {/* <Typography variant="body1" className={styles.cardTag}>
              {professionalSelected.professionalType.name}
            </Typography>
            <Typography variant="body1" className={styles.cardTag}>
              {professionalSelected.specialty.name}
            </Typography> */}
          </Grid>
        </Grid>
      </Grid>
      <Typography variant="h4" className={styles.marginTop}>
        Número de Registro: {professionalSelected.registrationUf}{" "}
        {professionalSelected.registration}
      </Typography>
      <div className={styles.hr}></div>

      <Grid lg={12} xl={12} container className={styles.block}>
        <Grid md={7} xl={6} container className={styles.borderRight}>
          <Grid md={6}>
            <Typography
              variant="h3"
              fontWeight={"medium"}
              className={styles.textBlack}
            >
              Contato:
            </Typography>
            <div style={{ marginTop: "20px" }}>
              <Typography
                variant="body2"
                fontWeight={"light"}
                className={styles.textGrey}
              >
                Email:
              </Typography>
              <Typography
                variant="body2"
                fontWeight={"light"}
                className={styles.textBlue}
              >
                {professionalSelected.email}
              </Typography>
            </div>
            <div style={{ marginTop: "20px" }} />
            <Typography
              variant="body2"
              fontWeight={"light"}
              className={styles.textGrey}
            >
              Telefone:
            </Typography>
            <Typography
              variant="body2"
              fontWeight={"light"}
              className={styles.textBlue}
            >
              {professionalSelected.phoneNumber}
            </Typography>
          </Grid>
          <Grid md={6} className={styles.marginTop2}>
            <Typography
              variant="body2"
              fontWeight={"light"}
              className={styles.textGrey}
            >
              CPF:
            </Typography>
            <Typography
              variant="body2"
              fontWeight={"light"}
              className={styles.textBlack}
            >
              {professionalSelected.document}
            </Typography>
            <div style={{ marginTop: "20px" }} />
            <Typography
              variant="body2"
              fontWeight={"light"}
              className={styles.textGrey}
            >
              Status da Memed:
            </Typography>

            {showMemedStatusTag(professionalSelected.memedStatus)}

            <div className={styles.spaceTop}></div>
          </Grid>

          <div className={styles.hr}></div>
          <Grid>
            <Typography
              variant="h3"
              fontWeight={"medium"}
              className={styles.textTitle2}
            >
              Histórico de Atendimentos:
            </Typography>
            <a onClick={() => setStepFixo(3)}>
              <Box className={styles.boxHistory}>
                <Grid className={styles.row}>
                  <Document className={styles.spaceIcon} />
                  <Typography
                    variant="h3"
                    fontWeight={"medium"}
                    className={styles.textTitle3}
                  >
                    Ver historico de atendimentos
                  </Typography>
                  <Arrow className={styles.spaceIcon} />
                </Grid>
              </Box>
            </a>
          </Grid>
        </Grid>
        <Grid md={5} xl={6} className={styles.gridScale}>
          <Typography
            variant="h3"
            fontWeight={"medium"}
            className={styles.textTitle2}
          >
            Escala
          </Typography>
          <Typography className={styles.textGrey}>
            Horários Disponíveis:
          </Typography>
          <Grid md={12}>
            <Grid style={{ marginTop: "20px" }}></Grid>
            <Grid container className={styles.row}>
              <Grid md={1}>
                <ArrowBackIos
                  className={styles.circle}
                  onClick={() => week(-1)}
                />
              </Grid>
              {scale?.map((i) => (
                <Grid
                  md={2}
                  className={styles.center}
                  key={i.day + i.dayOfMonth}
                >
                  <Typography variant="body1" className={styles.textDay}>
                    {i.day}
                  </Typography>
                  <Typography variant="body1" className={styles.textDayOfMonth}>
                    {i.dayOfMonth}
                  </Typography>
                  <div>
                    {i.hours.map((h) => (
                      <Grid
                        className={
                          h.selected
                            ? styles.hourBlue
                            : h.text === "-"
                            ? styles.hourNormal
                            : styles.hourRisked
                        }
                      >
                        {h.text}
                      </Grid>
                    ))}
                  </div>
                </Grid>
              ))}
              <Grid md={1}>
                <ArrowForwardIos
                  className={styles.circle}
                  onClick={() => week(1)}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container className={styles.rowCenter}>
            <a className={styles.buttonBlueWidth} onClick={() => handleOpen()}>
              <Typography variant="body1" className={styles.textButtonScala}>
                Cadastrar Escala
              </Typography>
            </a>
          </Grid>
        </Grid>
      </Grid>

      <Modal keepMounted open={open} onClose={handleClose}>
        <Box sx={style} className={styles.modal}>
          <Box className={styles.end}>
            <Image
              alt="no-alt"
              src={logoExit}
              className={styles.exit}
              onClick={handleClose}
            />
          </Box>
          <Typography
            variant="h1"
            fontWeight={"medium"}
            className={styles.titleModal}
          >
            Cadastrar Escala
          </Typography>
          <div style={{ marginTop: "25px" }}></div>

          <Grid container md={12} className={styles.row}>
            <Box sx={{ width: "70px" }}>
              <Box style={{ marginTop: "20px" }} />
              {data[0].hours.map((i) => (
                <Box key={i.text}>
                  <Typography variant="body1" className={styles.textHour}>
                    {i.text}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={{ width: "70px" }}>
              Seg
              {data[0].hours.map((hour, i) => (
                <a onClick={() => setSeleted(0, i)} key={hour.text + i}>
                  <Box
                    className={
                      hour.selected ? styles.hourBusy : styles.hourNotBusy
                    }
                  >
                    <Typography variant="body1" className={styles.textHour2}>
                      {hour.text}
                    </Typography>
                  </Box>
                </a>
              ))}
            </Box>

            <Box sx={{ width: "70px" }}>
              Ter
              {data[1].hours.map((hour, i) => (
                <a onClick={() => setSeleted(1, i)} key={hour.text + i}>
                  <Box
                    className={
                      hour.selected ? styles.hourBusy : styles.hourNotBusy
                    }
                  >
                    <Typography variant="body1" className={styles.textHour2}>
                      {hour.text}
                    </Typography>
                  </Box>
                </a>
              ))}
            </Box>
            <Box sx={{ width: "70px" }}>
              Qua
              {data[2].hours.map((hour, i) => (
                <a onClick={() => setSeleted(2, i)} key={hour.text + i}>
                  <Box
                    className={
                      hour.selected ? styles.hourBusy : styles.hourNotBusy
                    }
                  >
                    <Typography variant="body1" className={styles.textHour2}>
                      {hour.text}
                    </Typography>
                  </Box>
                </a>
              ))}
            </Box>
            <Box sx={{ width: "70px" }}>
              Qui
              {data[3].hours.map((hour, i) => (
                <a onClick={() => setSeleted(3, i)} key={hour.text + i}>
                  <Box
                    className={
                      hour.selected ? styles.hourBusy : styles.hourNotBusy
                    }
                  >
                    <Typography variant="body1" className={styles.textHour2}>
                      {hour.text}
                    </Typography>
                  </Box>
                </a>
              ))}
            </Box>
            <Box sx={{ width: "70px" }}>
              Sex
              {data[4].hours.map((hour, i) => (
                <a onClick={() => setSeleted(4, i)} key={hour.text + i}>
                  <Box
                    className={
                      hour.selected ? styles.hourBusy : styles.hourNotBusy
                    }
                  >
                    <Typography variant="body1" className={styles.textHour2}>
                      {hour.text}
                    </Typography>
                  </Box>
                </a>
              ))}
            </Box>
            <Box sx={{ width: "70px" }}>
              Sáb
              {data[5].hours.map((hour, i) => (
                <a onClick={() => setSeleted(5, i)} key={hour.text + i}>
                  <Box
                    className={
                      hour.selected ? styles.hourBusy : styles.hourNotBusy
                    }
                  >
                    <Typography variant="body1" className={styles.textHour2}>
                      {hour.text}
                    </Typography>
                  </Box>
                </a>
              ))}
            </Box>
            <Box sx={{ width: "70px" }}>
              Dom
              {data[6].hours.map((hour, i) => (
                <a onClick={() => setSeleted(6, i)} key={hour.text + i}>
                  <Box
                    className={
                      hour.selected ? styles.hourBusy : styles.hourNotBusy
                    }
                  >
                    <Typography variant="body1" className={styles.textHour2}>
                      {hour.text}
                    </Typography>
                  </Box>
                </a>
              ))}
            </Box>
          </Grid>

          <Grid container className={styles.rowCenter}>
            <a className={styles.buttonBlue} onClick={() => handleClose()}>
              <Typography variant="body1" className={styles.textButtonScala}>
                Salvar Escala
              </Typography>
            </a>
          </Grid>
        </Box>
      </Modal>
    </Grid>
  );
}
