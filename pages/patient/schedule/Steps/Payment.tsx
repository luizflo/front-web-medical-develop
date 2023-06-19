import React, { useEffect, useState } from "react";
import styles from "../schedule.module.scss";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
  Button,
  TextField,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import Input from "@components/layout/Input";
import { useForm } from "react-hook-form";
import { IAppointmentPost, ISpecialties } from "src/interfaces";
import { postAppointment } from "src/api/appointment";
import { ArrowBackIos, Close } from "@mui/icons-material";
import LogoHausey from "public/logo_black.png";
import QRCodePix from "public/images/qrCodePix.png";
import QRCodeWpp from "public/images/qrCodeWpp.png";
import CreditCard from "@public/images/checkout/creditCard.svg";
import CVV from "@public/images/checkout/cvv.svg";
import Validity from "@public/images/checkout/validity.svg";
import Image from "next/image";
import Resume from "@components/patients/components/resumeAppointment";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@components/patients/schemas/checkoutSchema";
import { ICard } from "src/interfaces/stripe";

interface Props {
  onClick: any;
  returnStep: any;
  specialtySelected: ISpecialties;
  professionalSelected: string;
  selectedHour: any;
  prices: any;
  selectedDate: any;
  setFeedback: any;
  setFeedBackType: any;
  setFeedbackIsOpen: any;
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

export default function Payment({
  onClick,
  returnStep,
  selectedHour,
  selectedDate,
  setFeedBackType,
  setFeedback,
  setFeedbackIsOpen,
  prices,
  specialtySelected,
  professionalSelected,
}: Props) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const cards = ["xxxx xxxx xxxx 1999", "xxxx xxxx xxxx 1999"];
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

  const postAppointmentCall = handleSubmit(async (data) => {
    const expMonth = data.cardValidity.split("/")[0];
    const expYear = data.cardValidity.split("/")[1];
    const card: ICard = {
      number: data.number.replace(" ", ""),
      cvc: data.cvc,
      expMonth: Number(expMonth),
      expYear: Number(expYear),
    };
    let date = selectedDate?.date + "T" + selectedHour + ":00";
    let body: IAppointmentPost = {
      specialtyId: specialtySelected.id!!,
      professionalId: professionalSelected ? professionalSelected : undefined,
      date: selectedDate ? date : undefined,
      card: card,
    };

    const response = await postAppointment(body);
    if (response.status) {
      setFeedBackType("error");
      setFeedbackIsOpen(true);
      setFeedback(response.message);
      setIsLoading(false);
    } else {
      onClick();
      setIsLoading(false);
    }
  });

  const handleForm = async () => {
    setIsLoading(true);
    await delay();
    postAppointmentCall();
  };

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  function HeaderSchedule() {
    return (
      <Box>
        <Box
          className={styles.grid}
          sx={{ paddingInline: isSmallScreen ? "10vw" : "25vw" }}
        >
          <ArrowBackIos
            sx={{
              color: "#0074E5",
              cursor: "pointer",
            }}
            fontSize="large"
            className={styles.buttonHeader}
            onClick={() => returnStep()}
          />
          <Image src={LogoHausey} className={styles.logo} />
          <Close
            sx={{
              color: "#0074E5",
            }}
            fontSize="large"
            className={styles.buttonHeader}
            onClick={() => router.replace("/home")}
          />
        </Box>
        <div className={styles.progressDiv}>
          <div className={styles.progressBar} style={{ width: "95%" }} />
        </div>
      </Box>
    );
  }

  function PixInfosSection() {
    return (
      <Grid item xs={12} md={7}>
        <Typography variant="h2" fontWeight={"medium"} className={styles.title}>
          Informe os dados para pagamento
        </Typography>
        {/* <div className={styles.hr} /> */}
        {/* <FormsCardInput
       isLoading={isLoading}
       register={register}
       handleSubmit={handleSubmit}
       handleForm={handleForm}
      /> */}
        <Box className={styles.forms}>
          <Input
            control={control}
            Icon={CreditCard}
            label="Número do cartão"
            inputName="number"
            inputMask="9999 9999 9999 9999"
            index={0}
            placeholder="Digite o número do cartão"
          />
          <Grid container className={styles.row}>
            <Grid xs={12} md={6} item>
              <Input
                control={control}
                label="Validade"
                Icon={Validity}
                inputName="cardValidity"
                inputMask="99/9999"
                index={1}
                placeholder="MM/AAAA"
              />
            </Grid>
            <Grid xs={12} md={6} item>
              <Input
                control={control}
                label="CVV"
                inputName="cvc"
                Icon={CVV}
                containerStyle={{ marginLeft: "20px" }}
                inputMask="999"
                index={2}
                placeholder="Digite o código"
              />
            </Grid>
          </Grid>
          {/* <Input
          label="Nome do titular"
          control={control}
          inputName="cardName"
          inputMask=""
          inputValue=""
          index={3}
          placeholder="Digite o nome do titular"
        />
        <Input
          control={control}
          label="CPF"
          inputName="cpf"
          inputMask="999.999.99-99"
          inputValue=""
          index={4}
          placeholder="Digite o cpf do titular"
        /> */}
        </Box>
        {/* <Typography
          variant="h4"
          fontWeight={"regular"}
          className={styles.textGrey}
          style={{
            marginTop: "20px",
          }}
        >
          Pelo aplicativo do seu banco, escaneie o QR Code:
        </Typography>
        <Box className={styles.row}>
          <Image
            src={QRCodePix}
            alt="qr-code"
            width={180}
            objectFit="contain"
          />
          <div
            style={{
              marginLeft: "20px",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={"light"}
              className={styles.textGrey}
            >
              Nome:
            </Typography>
            <Typography
              variant="h4"
              fontWeight={"regular"}
              className={styles.textBlack}
            >
              EL SHADAI PREST DE SERV ME
            </Typography>
            <Typography
              variant="h4"
              fontWeight={"light"}
              className={styles.textGrey}
              style={{
                marginTop: "20px",
              }}
            >
              CNPJ:
            </Typography>
            <Typography
              variant="h4"
              fontWeight={"regular"}
              className={styles.textBlack}
            >
              15.649.430/0001-06
            </Typography>
            <Typography
              variant="h4"
              fontWeight={"light"}
              className={styles.textGrey}
              style={{
                marginTop: "20px",
              }}
            >
              Chave PIX:
            </Typography>
            <Typography
              variant="h4"
              fontWeight={"regular"}
              className={styles.textBlack}
            >
              15.649.430/0001-06
            </Typography>
          </div>
        </Box>
        <Typography
          variant="h4"
          fontWeight={"regular"}
          className={styles.textGrey}
          style={{
            marginTop: "40px",
          }}
        >
          Após realizar o pagamento, envie o comprovante no Whatsapp:
        </Typography>
        <Box className={styles.row}>
          <Image
            src={QRCodeWpp}
            alt="qr-code"
            width={100}
            objectFit="contain"
          />
          <div
            style={{
              marginLeft: "20px",
            }}
          >
            <Typography
              variant="h3"
              fontWeight={"light"}
              className={styles.textGrey}
            >
              Suporte Hausey
            </Typography>
            <Typography
              variant="h3"
              fontWeight={"regular"}
              className={styles.textBlack}
            >
              (43) 99603-0042
            </Typography>
          </div>
        </Box> */}
      </Grid>
    );
  }

  function FormsCardInput(props: any) {
    return (
      <form
        className={styles.forms}
        onSubmit={props.handleSubmit(props.handleForm)}
      >
        <Input
          {...props.register("cardNumber")}
          label="Número do cartão"
          inputName="cardNumber"
          inputMask="9999 9999 9999 9999"
          inputValue=""
          index={0}
          placeholder="Digite o número do cartão"
        />
        <div className={styles.spaceBetween}>
          <Input
            {...props.register("validity")}
            label="Validade"
            inputName="cardValidity"
            inputMask="99/99"
            inputValue=""
            index={1}
            placeholder="MM/AA"
          />
          <Input
            {...props.register("cvv")}
            label="CVV"
            inputName="cvv"
            inputMask="999"
            inputValue=""
            index={2}
            placeholder="Digite o código"
          />
        </div>
        <Input
          {...props.register("responsibleName")}
          label="Nome do titular"
          inputName="cardName"
          inputValue=""
          index={3}
          placeholder="Digite o nome do titular"
        />
        <Input
          {...props.register("cpf")}
          label="CPF"
          inputName="cpf"
          inputMask="999.999.99-99"
          inputValue=""
          index={4}
          placeholder="Digite o cpf do titular"
        />
        <Button
          variant="contained"
          disableElevation
          type="submit"
          size="large" // onClick={() => onClick()}
          className={styles.buttonConfirm} // onClick={() => submitForm()}
        >
          {props.isLoading ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            "Confirmar pagamento"
          )}
        </Button>
      </form>
    );
  }

  function ResumeConfirmSection() {
    return (
      <Grid item md={5} xs={12}>
        <Resume
          isLoading={isLoading}
          price={prices?.total}
          specialty={specialtySelected.name}
        />
        <Box className={styles.boxButton} sx={{ marginTop: "20px" }}>
          <Button
            variant="contained"
            disableElevation
            onClick={() => handleForm()}
            size="large" //
            className={styles.buttonConfirm} // onClick={() => submitForm()}
          >
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              "Confirmar pagamento"
            )}
          </Button>
          <Typography
            variant="body1"
            fontWeight={"regular"}
            className={styles.textGrey}
            style={{
              marginTop: "20px",
            }}
          >
            *A confirmação de pagamento pode levar alguns minutos para ser
            confirmada pela secretária. No card do seu agendamento na Tela
            Inicial estará indicado quando o pagamento for confirmado.
          </Typography>
        </Box>
      </Grid>
    );
  }

  return (
    <Box className={styles.content}>
      <HeaderSchedule />

      <Grid
        container
        className={styles.content}
        style={{ paddingInline: isSmallScreen ? "10vw" : "20vw" }}
      >
        <PixInfosSection />
        <ResumeConfirmSection />
      </Grid>
    </Box>
  );
}
