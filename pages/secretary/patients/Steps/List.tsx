import React, { useEffect, useState } from "react";
import styles from "../patients.module.scss";
import { useRouter } from "next/router";
import { IPatients, Patient } from "src/interfaces";
import { PatientsList } from "src/mocks/patientsList";
import Drawer from "@mui/material/Drawer";
import badge from "../../../../public/images/secretary/badge.png";
import PlaceHolderAvatar from "@public/placeholderAvatar.png";

import {
  alpha,
  Box,
  Button,
  Grid,
  InputBase,
  styled,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  AlertProps,
} from "@mui/material";
import InputMask from "react-input-mask";

import Image from "next/image";

import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import Input from "@components/layout/Input";
import Link from "next/link";
import logoDocument from "../../../../public/images/secretary/document.png";

import { createNewProfessional, getTypes } from "src/api/professional";

import { getSpecialties } from "src/api/appointment";
import FeedBack from "@components/layout/feedback";
import EmptyComponent from "@components/layout/emptyComponent";
import { calculateAge } from "@components/utils";
type Anchor = "top" | "left" | "bottom" | "right";

function Header(props: any) {
  return (
    <Grid item xs={12}>
      <Box className={styles.rowSpace}>
        <Box>
          <Typography
            variant="caption"
            fontWeight={"medium"}
            className={styles.title}
          >
            Pacientes
          </Typography>
          <Typography variant="h3" className={styles.subtitle}>
            {props.length} cadastros
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
interface ListProps {
  listProfessionals: Patient[];
  loading: boolean;
  patientSelected: any;
  setPatientSelected: any;
  getProfessionalsList: () => void;
  onClick: any;
}
export default function List({
  onClick,
  listProfessionals,
  patientSelected,
  setPatientSelected,
  loading,
  getProfessionalsList,
}: ListProps) {
  const [feedBack, setFeedback] = useState<string>("");
  const [feedbackIsOpen, setFeedbackIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedBackType] = useState<AlertProps["severity"]>();
  const [step, setStep] = useState<any>(1);
  const [open, setOpen] = useState<boolean>(false);
  const sider = (anchor: Anchor, patientSelected: Patient) => (
    <Box
      sx={{ width: 550 }}
      role="presentation"
      onClick={() => toggleDrawer(anchor, false)}
      onKeyDown={() => toggleDrawer(anchor, false)}
    >
      <Box className={styles.bgTop}></Box>
      <Box className={styles.containerModal}>
        <Box>
          <Image
            alt="no-alt"
            src={PlaceHolderAvatar}
            placeholder="blur"
            blurDataURL={
              "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkOPu/HgAE7gJNy/1riwAAAABJRU5ErkJggg=="
            }
            className={styles.userRound}
            width={125}
            height={125}
          />
        </Box>
        <Box className={styles.row}>
          <Typography
            variant="h1"
            fontWeight={"medium"}
            className={styles.titleModal}
          >
            {patientSelected?.name}
          </Typography>
          {patientSelected?.planId && (
            <Box className={styles.tagPlan}>
              <Image alt="no-alt" src={badge} />
              <Typography variant="h4" className={styles.plan}>
                Plano pro
              </Typography>
            </Box>
          )}
        </Box>
        <Typography variant="h3" className={styles.subtitleModal}>
          {patientSelected?.email}
        </Typography>
        {/* <Typography
          variant="body2"
          className={styles.label}
          style={{ marginTop: "5px" }}
        >
          Programas
        </Typography> */}
        {/* <Box className={styles.row} style={{ marginTop: "5px" }}>
          {patientSelected?.programs?.map((i, index) => (
            <div className={styles.row} key={index}>
              <Typography
                variant="h4"
                fontWeight={"medium"}
                className={styles.tag}
              >
                {i}
              </Typography>
            </div>
          ))}
        </Box> */}
        <Box className={styles.marginTop} />

        <Box
          className={styles.row}
          onClick={() => onClick()}
          style={{ cursor: "pointer" }}
        >
          <Image alt="no-alt" src={logoDocument} />
          <Typography variant="body2" className={styles.link}>
            Ver histórico de atendimentos
          </Typography>
        </Box>
        <Box className={styles.marginTop} />
        <Box>
          <Typography variant="body2" className={styles.label}>
            CPF
          </Typography>
          <Typography variant="h4" className={styles.text}>
            {patientSelected?.document}
          </Typography>

          <Box className={styles.rowSpace}>
            <Box>
              <Typography variant="body2" className={styles.label}>
                Telefone
              </Typography>
              <Typography variant="h4" className={styles.textBlue}>
                {patientSelected?.phoneNumber}
              </Typography>
            </Box>
            <a
              target="_blank"
              href={`https://wa.me/${patientSelected?.phoneNumber}`}
              className={styles.linkMessage}
            >
              Enviar mensagem
            </a>
          </Box>

          <Box>
            <Typography variant="body2" className={styles.label}>
              Idade
            </Typography>
            <Typography variant="h4" className={styles.text}>
              {" "}
              {calculateAge(patientSelected?.birthdate!!)} anos
            </Typography>
          </Box>

          <Box className={styles.rowSpace}>
            {/* <Box>
              <Typography variant="body2" className={styles.label}>
                Profissão
              </Typography>
              <Typography variant="h4" className={styles.text}>
                {patientSelected?.}
              </Typography>
            </Box> */}
            {/* <Box>
              <Typography variant="body2" className={styles.label}>
                Estado Civil
              </Typography>
              <Typography variant="h4" className={styles.text}>
                {patientSelected?.civilState}
              </Typography>
            </Box> */}
            <Box>
              <Typography variant="body2" className={styles.label}>
                Sexo
              </Typography>
              <Typography variant="h4" className={styles.text}>
                {patientSelected?.sex === "M" ? "Masculino" : "Feminino"}
              </Typography>
            </Box>
          </Box>

          {/* <Box>
            <Typography variant="body2" className={styles.label}>
              Endereço
            </Typography>
            <Typography variant="h4" className={styles.text}>
              {patientSelected?.address}
            </Typography>
          </Box> */}
        </Box>
      </Box>
    </Box>
  );

  const [state, setState] = React.useState<any>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const tags = ["Saúde da Família", "Saúde Mental", "Combate à obesidade"];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEvent = (id: any) => {
    listProfessionals.map((item: any) => {
      if (item.id === id) {
        setPatientSelected(item);
      }
    });
    toggleDrawer("right", true);
  };

  const toggleDrawer = (anchor: Anchor, open: boolean) => {
    setState({ ...state, [anchor]: open });
  };

  const handleCloseFeedback = () => setFeedbackIsOpen(false);

  function TableHeader() {
    return (
      <Grid
        container
        className={styles.row}
        style={{
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <Grid
          item
          xs={2}
          style={{
            marginLeft: "0px",
            maxWidth: "250px",
          }}
        >
          <Typography variant="h4" className={styles.textGrey}>
            Nome completo{" "}
          </Typography>
        </Grid>
        <Grid
          item
          xs={3}
          style={{
            marginLeft: "40px",
          }}
        >
          <Typography variant="h4" className={styles.textGrey}>
            Email{" "}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            marginLeft: "20px",
            maxWidth: "200px",
          }}
        >
          <Typography variant="h4" className={styles.textGrey}>
            Idade{" "}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            marginLeft: "20px",
            maxWidth: "200px",
          }}
        >
          <Typography variant="h4" className={styles.textGrey}>
            Telefone{" "}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  function TableHistory(props: any) {
    return (
      <Box className={styles.historyList} sx={{ flexDirection: "column" }}>
        {props.professionals.length > 0 ? (
          props.professionals.map((item: Patient) => (
            <Grid
              key={item.id}
              container
              className={styles.historyListItem}
              onClick={() => handleEvent(item.id)}
            >
              <Grid
                item
                xs={2}
                style={{
                  marginLeft: "0px",
                  maxWidth: "250px",
                }}
              >
                <Typography variant="h4" className={styles.textBlack}>
                  {item.name}
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  marginLeft: "40px",
                }}
              >
                <Typography variant="h4" className={styles.textBlue}>
                  {item.email}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  marginLeft: "20px",
                  maxWidth: "200px",
                }}
              >
                <Typography variant="h4" className={styles.textGrey}>
                  {item.birthdate
                    ? `${calculateAge(item.birthdate!!)} anos`
                    : "-"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={2}
                style={{
                  marginLeft: "20px",
                  maxWidth: "200px",
                }}
              >
                <Typography variant="h4" className={styles.textGrey}>
                  {item.phoneNumber ? item.phoneNumber : "-"}
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                style={{
                  marginLeft: "20px",
                }}
              >
                <Typography variant="h4" className={styles.textBlue}>
                  Ver detalhes
                </Typography>
              </Grid>
            </Grid>
          ))
        ) : (
          <EmptyComponent
            isLoading={props.isListLoading}
            update={props.getProfessionalsList}
            type={"other"}
            title={"Ainda não há pacientes cadastrados"}
            message={
              "Atualize a lista no botão abaixo se acredita que isso é um erro, ou tente novamente mais tarde."
            }
          />
        )}
      </Box>
    );
  }

  return (
    <Grid className={styles.container}>
      <FeedBack
        handleClose={handleCloseFeedback}
        open={feedbackIsOpen}
        messageType={feedbackType}
        message={feedBack}
      />
      <Header length={listProfessionals.length} handleOpen={handleOpen} />

      <TableHeader />
      <TableHistory
        isListLoading={loading}
        professionals={listProfessionals}
        handleClick={onClick}
        getProfessionalsList={getProfessionalsList}
      />
      <div>
        <React.Fragment key={"right"}>
          {/* <Button onClick={toggleDrawer(anchor, true)}></Button> */}
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={() => toggleDrawer("right", false)}
          >
            {sider("right", patientSelected!!)}
          </Drawer>
        </React.Fragment>
      </div>
    </Grid>
  );
}
