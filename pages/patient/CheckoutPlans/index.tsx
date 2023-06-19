import React, { useCallback, useEffect, useState } from "react";
import styles from "./checkout.module.scss";
import { useRouter } from "next/router";
import { Container, Grid, MenuItem, Select, Typography } from "@mui/material";
import {
  ArrowBackIos,
  Close,
  ArrowForwardIos,
  Schema,
} from "@mui/icons-material";
import ChoosePlan from "src/components/patients/components/choosePlan";
import Resume from "src/components/patients/components/resume";
import Payment from "src/components/patients/components/payment";
import Success from "src/components/patients/components/Success";
import Logo from "public/logo_black.png";
import { getPlans, getPrograms } from "src/api/programs";
import { FeedBackProps, IPlan, IProgram } from "src/interfaces";
import FeedBack from "@components/layout/feedback";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@components/patients/schemas/checkoutSchema";
import { postStripeSubscription } from "src/api/integrations";
import { AppState } from "src/store";
import { UserState } from "src/store/user/types";
import { useSelector } from "react-redux";
import { ICard } from "src/interfaces/stripe";
import { GetServerSideProps } from "next/types";

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
export default function checkoutPlans({ stepProps }: any) {
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
  console.log("Step", stepProps);
  const [visible, setVisible] = useState<boolean>(true);
  const {
    control,
    watch,
    register,
    formState,
    getValues,
    setValue,
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: initialValues,
  });
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

  const passStep = async () => {
    if (step !== 2) {
      setStep(step + 1);
    } else {
      handleBuyClick();
    }
  };
  const backStep = () => {
    setVisible(true);

    if (step >= 2) {
      setStep(step - 1);
    } else if (step === 1) {
      router.back();
    } else {
      return;
    }
  };
  const handleBuyClick = handleSubmit(async (data) => {
    const expMonth = data.cardValidity.split("/")[0];
    const expYear = data.cardValidity.split("/")[1];
    const card: ICard = {
      number: data.number.replace(" ", ""),
      cvc: data.cvc,
      expMonth: Number(expMonth),
      expYear: Number(expYear),
    };
    try {
      setIsLoading(true);
      const apiResponse = await postStripeSubscription(
        userLogged.id,
        planSelected?.stripePriceId!!,
        card
      );

      setStep(step + 1);
      setVisible(false);
    } catch (error) {
      if (error instanceof Error) {
        setFeedback({
          feedbackType: "error",
          feedbackIsOpen: true,
          feedBack: error.message,
        });
      }
    }
    setIsLoading(false);
  });
  useEffect(() => {
    getAllPlans();
    getAllPrograms();
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ChoosePlan
            onClick={() => setStep(step + 1)}
            planSelected={planSelected!!}
            setPlanSelected={setPlanSelected}
            programs={programs}
            plans={plans}
            setPrograms={setPrograms}
          />
        );
      case 2:
        return <Payment onClick={() => setStep(step + 1)} control={control} />;
      case 3:
        return <Success />;
    }
  };

  return (
    <Grid container className={styles.content}>
      <FeedBack
        handleClose={handleClose}
        open={feedBack.feedbackIsOpen}
        messageType={feedBack.feedbackType}
        message={feedBack.feedBack}
      />
      <Grid xs={12} className={styles.grid}>
        <ArrowBackIos
          sx={{ color: "#0074E5" }}
          fontSize="large"
          className={styles.arrowBack}
          onClick={() => backStep()}
        />
        <Image src={Logo} className={styles.logo} />
        <Close sx={{ color: "#ffff" }} fontSize="large" />
      </Grid>
      <Grid container className={styles.container}>
        {renderStep()}
        {/* <ChoosePlan onClick={() => setStep(step + 1)} /> */}

        {visible ? (
          <Resume
            onClick={() => passStep()}
            plan={planSelected!!}
            programs={programs}
            step={step}
            isLoading={isLoading}
          />
        ) : (
          <div></div>
        )}
      </Grid>
    </Grid>
  );
}
checkoutPlans.getInitialProps = async (ctx: any) => {
  const { stepProps } = ctx.query;

  return { stepProps };
};
