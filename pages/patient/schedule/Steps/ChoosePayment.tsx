import React, { useEffect, useState } from "react";
import styles from "../schedule.module.scss";
import { useRouter } from "next/router";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import IconSteto from "public/iconSteto.svg";
import IconCalendar from "public/IconCalendar.svg";
import ModalPreparation from "../components/ModalPreparation";
import IconPix from "public/pix.svg";
import IconBoleto from "public/boleto.svg";
import IconCard from "public/creditCard.svg";
import { getPrices } from "src/api/appointment";
import { IPrices, ISpecialties } from "src/interfaces";
import { ArrowBackIos, Close } from "@mui/icons-material";
import LogoHausey from "public/logo_black.png";
import HeaderNavigation from "@components/booking/header";

interface Methods {
  id: number;
  name: string;
  value: number | undefined;
  icon: JSX.Element;
}
interface Props {
  onClick: any;
  returnStep: any;
  specialtySelected: ISpecialties;
  selectedHour: any;
  setPrices: any;
  prices: any;
  selectedDate: any;
}
export default function ChoosePayment({
  onClick,
  returnStep,
  specialtySelected,
  setPrices,
  prices,
  selectedHour,
  selectedDate,
}: Props) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState<any>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState<any>();
  const [paymentsMethods, setPaymentsMethods] = useState<Methods[]>([]);
  const plano = "Plano Saúde Geral";
  const methods = [
    {
      id: 2,
      name: "Pagar com Cartão de Crédito",
      value: prices?.total,
      icon: <IconCard className={styles.icon} />,
    },
  ];
  useEffect(() => {
    setPaymentsMethods(methods);
    getPricesCall();
  }, []);

  const getPricesCall = async () => {
    let specialtyId = specialtySelected.id;
    const response = await getPrices(specialtyId);
    setPrices(response);
  };

  const handleClickOpen = () => {
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
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
          <div className={styles.progressBar} style={{ width: "85%" }} />
        </div>
      </Box>
    );
  }

  return (
    <Box className={styles.content}>
      <HeaderNavigation widthProgress={"90%"} />

      <Grid container>
        <Grid
          item
          xs={12}
          className={styles.gridContent}
          sx={{ paddingInline: isSmallScreen ? "10vw" : "25vw" }}
        >
          <Typography
            variant="h1"
            fontWeight={"medium"}
            className={styles.title}
          >
            Confirme os dados da sua consulta:
          </Typography>
          <Typography
            variant="h3"
            className={styles.subtitle}
            sx={{ marginTop: "10px" }}
          >
            Dados da consulta
          </Typography>
          <Box className={styles.row} sx={{ marginTop: "15px" }}>
            <IconSteto className={styles.icon} />
            <div style={{ marginLeft: 20 }}>
              <Typography
                variant="body2"
                fontWeight={"medium"}
                className={styles.text}
              >
                Especialidade:
              </Typography>
              <Typography
                variant="body2"
                className={styles.subtext}
                style={{ marginTop: "-20px" }}
              >
                {specialtySelected.name}
              </Typography>
            </div>
          </Box>
          <Box className={styles.row} style={{ marginTop: 30 }}>
            <IconCalendar className={styles.icon} />
            <div style={{ marginLeft: 20 }}>
              <Typography
                variant="body2"
                fontWeight={"medium"}
                className={styles.text}
              >
                Data e Hora:
              </Typography>
              <Typography
                variant="body2"
                className={styles.subtext}
                style={{ marginTop: "-20px" }}
              >
                {selectedDate.date} às {selectedHour}
              </Typography>
            </div>
          </Box>
          {/* <Box className={styles.row} style={{ marginTop: 30 }}>
          <img src="../IconDocument.svg" className={styles.icon} />
          <div style={{ marginLeft: 20 }}>
            <Typography variant="body1" className={styles.text}>
              Exames:
            </Typography>
            <Typography variant="body1" className={styles.subtext}>
              Não há exames anexados
            </Typography>
          </div>
          <Typography
            variant="body1"
            className={styles.attachButton}
            style={{ marginLeft: 170 }}
          >
            Anexar arquivos
          </Typography>
        </Box> */}
          <Typography
            variant="body2"
            fontWeight={"regular"}
            className={styles.attachButton}
            style={{ marginTop: 40 }}
            onClick={() => handleClickOpen()}
          >
            Ver preparação da consulta
          </Typography>
          <div className={styles.line} />
          <Typography
            variant="h3"
            fontWeight={"medium"}
            className={styles.dayText}
          >
            Como você prefere pagar?
          </Typography>
          {plano && (
            <Typography variant="body2" className={styles.subtext}>
              Formas de pagamento e valores para o{" "}
              <span style={{ color: "#0074E5" }}>{plano}</span>
            </Typography>
          )}
          {paymentsMethods.map((item) => (
            <Box
              className={styles.paymentButton}
              style={{
                marginTop: 10,
                border:
                  selectedMethod === item.id
                    ? "2px solid #12CC7E"
                    : "1.5px solid #dadee5",
              }}
              key={item.id}
              onClick={() => setSelectedMethod(item.id)}
            >
              {item.icon}
              <div style={{ marginLeft: 20 }}>
                <Typography
                  variant="body2"
                  className={styles.subtext}
                  style={{
                    marginTop: 0,
                    fontWeight: selectedMethod === item.id ? 700 : 400,
                    color: selectedMethod === item.id ? "#12CC7E" : "#848d9f",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight={"medium"}
                  className={styles.text}
                  style={{ marginTop: -20 }}
                >
                  {prices?.total}
                </Typography>
              </div>
            </Box>
          ))}

          <div className={styles.padding} />

          {/* <div className={styles.rowTerms}>
            <Typography variant="body1" className={styles.textTerms}>
              Ao clicar em Confirmar consulta você estará de acordo com nossas
            </Typography>

            <a
              className={styles.linkTerms}
              target={"_blank"}
              href="https://www.reforcemed.com.br/demo/termos-de-uso.pdf"
            >
              termos.
            </a>
          </div> */}

          <a className={styles.buttonConfirm} onClick={() => onClick()}>
            <Typography variant="body2" className={styles.textButtonConfirm}>
              Confirmar consulta
            </Typography>
          </a>

          <ModalPreparation open={modalIsOpen} handleClose={handleClose} />
        </Grid>
      </Grid>
    </Box>
  );
}
