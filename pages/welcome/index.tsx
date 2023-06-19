import React, { useCallback, useEffect, useState } from "react";
import styles from "./style.module.scss";
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

export interface Program {
  id: string;
  title: string;
  value: string;
  selected: boolean;
  text: string;
}
type FormData = {
  number: string;
  cardValidity: string;
  cvc: string;
};
const initialValues = {
  number: "",
  cardValidity: "",
  cvc: "",
};
export default function Welcome() {
  const router = useRouter();
  const [step, setStep] = useState<any>(1);
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [planSelected, setPlanSelected] = useState<IPlan>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userLogged, role } = useSelector<AppState, UserState>(
    (state: any) => state.userState
  );
  const [feedBack, setFeedback] = useState<FeedBackProps>({
    feedBack: "",
    feedbackIsOpen: false,
    feedbackType: undefined,
  });
  const benefits = [
    "Avaliação completa",
    "Check-ups",
    "Teleconsultas",
    "Monitoramento",
    "Atendimento 24/7",
  ];
  const bonus = ["Programa Cuidando de Você", "Programa de Saúde Mental"];
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

  const getAllPlans = async () => {
    try {
      const response = await getPlans();
      const plansResponse: IPlan[] = response;
      setPlans(plansResponse);
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
    getAllPlans();
    getAllPrograms();
  }, []);

  // const renderStep = () => {
  //   switch (step) {
  //     case 1:
  //       return (
  //         <ChoosePlan
  //           onClick={() => setStep(step + 1)}
  //           planSelected={planSelected!!}
  //           setPlanSelected={setPlanSelected}
  //           programs={programs}
  //           plans={plans}
  //           setPrograms={setPrograms}
  //         />
  //       );
  //     case 2:
  //       return <Payment onClick={() => setStep(step + 1)} control={control} />;
  //     case 3:
  //       return <Success />;
  //   }
  // };

  return (
    <Grid container className={styles.content}>
      <Grid item xs={12} className={styles.grid}>
        <Grid item md={3}>
          <Typography
            variant="h4"
            fontWeight={"regular"}
            sx={{ color: "white" }}
          >
            Contratar um plano depois
          </Typography>
        </Grid>
        <Grid
          item
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={Logo} className={styles.logo} />
        </Grid>
        <Grid
          item
          md={3}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={"regular"}
            className={styles.textJump}
            sx={{ cursor: "pointer" }}
            onClick={() => router.replace("/home")}
          >
            Assinar um plano depois
          </Typography>
        </Grid>
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
              Seja bem vindo(a) a Hausey!
            </Typography>
            <Image
              src={Celebration}
              height={50}
              width={50}
              objectFit="contain"
            />
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
            Contrate o nosso plano para obter muito mais da plataforma e cuidar
            da sua saúde com mais qualidade.
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
                Plano Hausey?
              </span>
            </Typography>
            <Typography
              variant="h4"
              fontWeight={"light"}
              sx={{ marginTop: "10px" }}
            >
              Programa exclusivo de saúde que tem o objetivo de colaborar na
              gestão da sua saúde e bem-estar, levando em conta o seu perfil de
              forma individual, cuidando da sua saúde no dia a dia, focado
              principalmente na prevenção de problemas crônicos.
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ marginTop: "20px" }}>
                <Typography
                  variant="body2"
                  fontWeight={"light"}
                  className={styles.textGrey}
                >
                  O que você terá acesso:
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
              <Box sx={{ marginTop: "20px", marginLeft: "50px" }}>
                <Typography
                  variant="body2"
                  fontWeight={"light"}
                  className={styles.textGrey}
                >
                  Bônus:
                </Typography>
                {bonus.map((item) => (
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
          <Box className={styles.boxProgram}>
            <Typography
              variant="body1"
              fontWeight={"regular"}
              className={styles.tag}
            >
              Bônus: programas
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={"bold"}
              sx={{ marginTop: "20px" }}
            >
              Plano Hausey
            </Typography>
            <Typography
              variant="body2"
              fontWeight={"regular"}
              sx={{ display: "flex", alignItems: "baseline" }}
            >
              R$
              <Typography variant="subtitle1" fontWeight={"medium"}>
                25
              </Typography>
              /mês
            </Typography>
            <Typography
              variant="h4"
              fontWeight={"light"}
              className={styles.textGrey}
              sx={{ marginTop: "17px" }}
            >
              Ao assinar esse programa você recebe:
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
            <Button
              variant="contained"
              onClick={() =>
                router.push(
                  {
                    pathname: "/patient/CheckoutPlans",
                    query: { stepProps: "1" },
                  },
                  "/assinar"
                )
              }
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
              Assinar o plano
            </Button>
          </Box>
        </Grid>
        <Grid
          xs={12}
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Typography
            variant="body2"
            fontWeight={"light"}
            className={styles.textJump}
            sx={{
              alignSelf: "center",
              justifySelf: "center",
              cursor: "pointer",
            }}
            onClick={() => router.replace("/welcome")}
          >
            Assinar um plano depois
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
