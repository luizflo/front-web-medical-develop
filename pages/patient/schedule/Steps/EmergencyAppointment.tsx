import React, { useCallback, useEffect, useState } from "react";
import styles from "../../../welcome/style.module.scss";
import stylesAppointment from "../schedule.module.scss";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  ArrowBackIos,
  Close,
  ArrowForwardIos,
  Schema,
} from "@mui/icons-material";
import Image from "next/image";
import Resume from "src/components/patients/components/resume";
import Logo from "public/logo_black.png";
import CheckIcon from "public/checkIcon.png";
import Celebration from "public/celebration.png";
import { getPlans, getPrograms } from "src/api/programs";
import { FeedBackProps, IPlan, IProgram } from "src/interfaces";
import { AppState } from "src/store";
import { UserState } from "src/store/user/types";
import { useSelector } from "react-redux";
import { ICard } from "src/interfaces/stripe";
import LogoHausey from "public/logo_black.png";

export interface Program {
  id: string;
  title: string;
  value: string;
  selected: boolean;
  text: string;
}
type Props = {
  returnStep: () => void;
  onClick: () => void;
};
export default function EmergencyAppointment({ returnStep, onClick }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<any>(1);
  const [feedBack, setFeedback] = useState<FeedBackProps>({
    feedBack: "",
    feedbackIsOpen: false,
    feedbackType: undefined,
  });
  const benefits = [
    "Médico Clínico Geral",
    "Atendimento em até 24 horas",
    "Prescrições online",
  ];
  const bonus = [
    "1 - Efetue o pagamento",
    "2 - Aguarde o contato da Atendente",
    "3 - Realize sua consulta o mais breve possível",
  ];
  const [visible, setVisible] = useState<boolean>(true);
  const delay = (amount = 750) =>
    new Promise((resolve) => setTimeout(resolve, amount));
  const [programs, setPrograms] = useState<IProgram[]>([]);

  const getAllPrograms = async () => {
    try {
      const response = await getPrograms();
      const programsResponse: IProgram[] = response;
      setPrograms(programsResponse);
    } catch (error) {
      if (error instanceof Error) {
        setFeedback({
          feedbackType: "error",
          feedbackIsOpen: true,
          feedBack: error.message,
        });
      }
    }
  };
  const handleClose = () => setFeedback({ ...feedBack, feedbackIsOpen: false });

  const backStep = () => {
    setVisible(true);

    if (step >= 2) {
      setStep(step - 1);
    } else if (step === 1) {
      router.push("/home");
    } else {
      return;
    }
  };
  useEffect(() => {
    getAllPrograms();
  }, []);

  function HeaderSchedule() {
    return (
      <Box>
        <Box
          className={stylesAppointment.grid}
          sx={{ paddingInline: { xs: "10vw", md: "20vw" } }}
        >
          <ArrowBackIos
            sx={{
              color: "#0074E5",
              cursor: "pointer",
            }}
            fontSize="large"
            className={stylesAppointment.buttonHeader}
            onClick={() => returnStep()}
          />
          <Image src={LogoHausey} className={stylesAppointment.logo} />
          <Close
            sx={{
              color: "#0074E5",
            }}
            fontSize="large"
            className={stylesAppointment.buttonHeader}
            onClick={() => router.replace("/home")}
          />
        </Box>
        <div className={stylesAppointment.progressDiv}>
          <div
            className={stylesAppointment.progressBar}
            style={{ width: "60%" }}
          />
        </div>
      </Box>
    );
  }

  return (
    <Grid container className={styles.content}>
      <Grid item xs={12}>
        <HeaderSchedule />
      </Grid>
      <Grid container className={styles.container}>
        <Grid
          item
          xs={12}
          style={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <Typography
              variant="caption"
              fontWeight={"bold"}
              className={styles.centralTitle}
            >
              Pronto atendimento Hausey
            </Typography>
          </Box>
          <Typography
            variant="h3"
            fontWeight={"regular"}
            className={styles.textGrey}
            sx={{
              textAlign: "center",
              alignSelf: "center",
              paddingInline: "20vw",
            }}
          >
            Siga as instruções para ser atendido(a) no melhor horário.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ marginTop: "40px", paddingInline: "20px" }}
        >
          <Box className={styles.boxTexts}>
            <Typography
              variant="h1"
              fontWeight={"medium"}
              className={styles.textBlack}
            >
              O que é o{" "}
              <span style={{ color: "#12CC7E", fontWeight: 700 }}>
                Pronto Atendimento?
              </span>
            </Typography>
            <Typography
              variant="body2"
              fontWeight={"light"}
              sx={{ marginTop: "10px", maxWidth: "90%" }}
            >
              O Pronto Atendimento Hausey é feito para você que precisa de um
              atendimento rápido, de onde estiver. Com ele você tem todo o
              conforto do Teleatendimento, com a qualidade Hausey.
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ marginTop: "20px" }}>
                <Typography
                  variant="body2"
                  fontWeight={"light"}
                  className={styles.textGrey}
                >
                  No Pronto Atendimento você tem:
                </Typography>
                {benefits.map((item) => (
                  <Box
                    key={item}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <Image
                      src={CheckIcon}
                      className={styles.iconCheck}
                      height={21}
                      width={21}
                    />
                    <Typography
                      variant="h4"
                      fontWeight={"regular"}
                      sx={{ marginLeft: "5px" }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item md={4} sx={{ marginTop: "40px" }}>
          <Box
            className={styles.boxProgram}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={"bold"}
              sx={{ marginTop: "20px" }}
            >
              Pronto Atendimento
            </Typography>
            <Typography
              variant="body2"
              fontWeight={"regular"}
              sx={{ display: "flex", alignItems: "baseline" }}
            >
              R$
              <Typography variant="subtitle1" fontWeight={"medium"}>
                80
              </Typography>
              ,00
            </Typography>
            <Typography
              variant="h4"
              fontWeight={"light"}
              className={styles.textGrey}
              sx={{ marginTop: "10px" }}
            >
              Passos:
            </Typography>
            {bonus.map((item) => (
              <Box
                key={item}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={"regular"}
                  sx={{ marginLeft: "5px" }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
            <Button
              variant="contained"
              onClick={onClick}
              sx={{
                paddingInline: "90px",
                paddingBlock: "10px",
                borderRadius: "10px",
                alignSelf: "center",
                justifySelf: "center",
                fontSize: "16px",
                marginTop: "20px",
              }}
            >
              Continuar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
