import React, { useEffect, useState } from "react";
import styles from "./myPrograms.module.scss";
import { useRouter } from "next/router";
import { Box, Grid, Typography } from "@mui/material";
import { getPlans, getPrograms } from "src/api/programs";
import { FeedBackProps, IPlan, IProgram, Patient } from "src/interfaces";
import Image from "next/image";
import ImgMentalHealth from "public/images/mentalHealth.jpg";
import ImgGeneralHealth from "public/images/generalHealthPlan.jpg";
import FeedBack from "@components/layout/feedback";
import { useSelector } from "react-redux";
import { AppState } from "src/store";
import { UserState } from "src/store/user/types";
export default function myPrograms() {
  const router = useRouter();
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [programs, setPrograms] = useState<IProgram[]>([]);
  const [userInfos, setUserInfos] = useState<Patient>();
  const { userLogged, role } = useSelector<AppState, UserState>(
    (state: any) => state.userState
  );
  const [feedBack, setFeedback] = useState<FeedBackProps>({
    feedBack: "",
    feedbackIsOpen: false,
    feedbackType: undefined,
  });
  function checkUserLoggedType(object: unknown): object is Patient {
    if (object !== null && typeof object === "object") {
      return true;
    }
    return false;
  }
  const getAllPrograms = async () => {
    const response = await getPrograms();
    if (response.status) {
      setFeedback({
        feedbackType: "error",
        feedbackIsOpen: true,
        feedBack: response.message,
      });
    } else {
      const programsResponse: IProgram[] = response;
      setPrograms(programsResponse);
    }
  };
  const getAllPlans = async () => {
    const response = await getPlans();
    if (response.status) {
      setFeedback({
        feedbackType: "error",
        feedbackIsOpen: true,
        feedBack: response.message,
      });
    } else {
      const plansResponse: IPlan[] = response;
      setPlans(plansResponse);
    }
  };
  const handleCloseFeedback = () => {
    setFeedback({ ...feedBack, feedbackIsOpen: false });
  };
  useEffect(() => {
    if (checkUserLoggedType(userLogged)) {
      setUserInfos(userLogged);
    }
    getAllPrograms();
    getAllPlans();
  }, []);

  return (
    <Grid container className={styles.container}>
      <FeedBack
        handleClose={handleCloseFeedback}
        open={feedBack.feedbackIsOpen}
        messageType={feedBack.feedbackType}
        message={feedBack.feedBack}
      />
      <Box>
        <Typography variant="h1" fontWeight={"bold"} className={styles.title}>
          Todos os Programas e Planos
        </Typography>
        <Typography variant="h4" className={styles.subtitle}>
          Contrate programas e tenha ainda mais benefícios para cuidar da sua
          saúde
        </Typography>
      </Box>

      <div className={styles.hr} />

      <Grid className={styles.row}>
        {plans.map((item, index) => (
          <Grid className={styles.cardProgram} key={item.id}>
            <Image
              src={ImgGeneralHealth}
              alt="qr-code"
              width={180}
              height={100}
              style={{ borderRadius: "14px" }}
              objectFit="cover"
            />
            <div style={{ paddingLeft: "20px", paddingBlock: "10px" }}>
              <Typography
                variant="h4"
                fontWeight={"light"}
                className={styles.bodyCard}
              >
                Plano de
              </Typography>
              <Typography
                variant="h3"
                fontWeight={"medium"}
                className={styles.textBlue}
              >
                {item.name}
              </Typography>
              <Typography
                variant="h4"
                fontWeight={"light"}
                className={styles.bodyCard}
              >
                {item.description}
              </Typography>
              {userInfos?.planId && (
                <Typography
                  variant="h4"
                  fontWeight={"light"}
                  className={styles.tag}
                  sx={{ marginTop: "10px" }}
                >
                  Plano contratado
                </Typography>
              )}
            </div>
            <Typography
              variant="h4"
              fontWeight={"medium"}
              className={styles.titleCard}
            >
              R${item.price}/mês
            </Typography>
          </Grid>
        ))}
        {programs.map((item, index) => (
          <Grid className={styles.cardProgram} key={item.id}>
            {/* <img src={item.image} /> */}
            <Image
              src={ImgMentalHealth}
              alt="qr-code"
              width={180}
              height={150}
              style={{ borderRadius: "14px" }}
              objectFit="cover"
            />
            <div style={{ paddingLeft: "20px", paddingBlock: "10px" }}>
              <Typography
                variant="h4"
                fontWeight={"light"}
                className={styles.bodyCard}
              >
                Programa de
              </Typography>
              <Typography
                variant="h3"
                fontWeight={"medium"}
                className={styles.textBlue}
              >
                {item.name}
              </Typography>
              <Typography
                variant="h4"
                fontWeight={"light"}
                className={styles.bodyCard}
              >
                {item.description}
              </Typography>
              {/* {userInfos?.plan && (
                <Typography
                  variant="h4"
                  fontWeight={"light"}
                  className={styles.tag}
                  sx={{ marginTop: "10px" }}
                >
                  Plano contratado
                </Typography>
              )} */}
            </div>
            <Typography
              variant="h4"
              fontWeight={"medium"}
              className={styles.titleCard}
            >
              R${item.price}/mês
            </Typography>
            {/* <Typography className={styles.textCard}>{item.name}</Typography>
            <Typography className={styles.textLink}>Ver detalhes</Typography> */}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
