import React, { useEffect, useState } from "react";
import styles from "./myForms.module.scss";
import { useRouter } from "next/router";
import { FormsUrls } from "src/mocks/forms";
import ArrowRightWhite from "public/images/patient/arrowRightWhite.svg";
import ArrowRightBlue from "public/images/patient/arrowRightBlue.svg";
import GeneralHealthIcon from "public/images/patient/generalHealthHome.svg";
import IconPurple from "public/images/patient/iconFormsPurple.svg";
import IconBlue from "public/images/patient/iconFormsBlue.svg";
import IconYelow from "public/images/patient/iconFormsYellow.svg";
import MentalHealthIcon from "public/images/patient/mentalHealthHome.svg";
import {
  alpha,
  Box,
  Grid,
  InputBase,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  DataGrid,
  GridColumns,
  GridToolbar,
  useDataGrid,
} from "@pankod/refine-mui";
import { IExams } from "src/interfaces";
import SearchIcon from "@mui/icons-material/Search";
import ModalQuestionaire from "@components/layout/patient/ModalQuestionaire";

export default function myForms() {
  const router = useRouter();
  const [link, setLink] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClickOpen = (modal: string, link: string) => {
    setLink(link);
    setModalIsOpen(true);
  };
  const handleClose = (modal: string) => {
    setModalIsOpen(false);
  };
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  function CardForm(props: any) {
    return (
      <Grid
        item
        xs={12}
        md={3}
        className={styles.boxCard}
        sx={{ maxWidth: isSmallScreen ? "90vw" : "20vw" }}
        onClick={() => handleClickOpen("confirmation", props.url)}
      >
        <props.icon />

        <Typography
          variant="body2"
          fontWeight={"medium"}
          className={styles.titleCard}
        >
          {props.title}
        </Typography>
        <Typography
          variant="h4"
          fontWeight={"light"}
          className={styles.bodyCard}
        >
          Preencha o questionário de saúde geral e deixe o seu perfil mais
          completo
        </Typography>

        <div className={styles.row} style={{ paddingBottom: "5px" }}>
          <Typography
            variant="h4"
            fontWeight={"medium"}
            className={styles.buttonCard}
          >
            Responder
          </Typography>
          <ArrowRightBlue className={styles.arrowBlue} />
        </div>
      </Grid>
    );
  }

  return (
    <Grid container className={styles.container}>
      <Grid item md={12} xs={12}>
        <Typography variant="h1" className={styles.title}>
          Meus questionários
        </Typography>
        <Typography className={styles.subtitle}>
          Acesse e responda aos seus questionários de saúde aqui
        </Typography>
      </Grid>

      <CardForm
        handleClickOpen={handleClickOpen}
        title="Questionário de Saúde Básica"
        url={FormsUrls.basicHealth}
        icon={MentalHealthIcon}
      />
      <CardForm
        handleClickOpen={handleClickOpen}
        title="Questionário de Transtorno Depressivo"
        url={FormsUrls.depressiveDisorder}
        icon={IconPurple}
      />
      <CardForm
        handleClickOpen={handleClickOpen}
        title="Questionário de Transtorno de Ansiedade Generalizada"
        url={FormsUrls.anxietyGeneralDisorder}
        icon={IconBlue}
      />
      <CardForm
        handleClickOpen={handleClickOpen}
        title="Teste de Depressão(Beck)"
        url={FormsUrls.depressionBeck}
        icon={IconYelow}
      />
      <CardForm
        handleClickOpen={handleClickOpen}
        title="Teste de Ansiedade(Beck)"
        url={FormsUrls.anxietyBeck}
        icon={IconPurple}
      />

      <ModalQuestionaire
        open={modalIsOpen}
        handleClose={handleClose}
        link={link}
      />
    </Grid>
  );
}
