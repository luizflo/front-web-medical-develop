import React, { useEffect, useState } from "react";
import styles from "../schedule.module.scss";
import { useRouter } from "next/router";
import {
  Checkbox,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ArrowBackIos, Close, ArrowForwardIos } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { AppState } from "src/store";
import { UserState } from "src/store/user/types";
import { getSlots, getSpecialties } from "src/api/appointment";
import { ISpecialties, ISpecialty } from "src/interfaces";
import LogoHausey from "public/logo_black.png";
import Image from "next/image";
import HeaderNavigation from "@components/booking/header";

export default function ChooseGroup({
  onClick,
  returnStep,
  handleChange,
  isLoading,
  setIsLoading,
  setSlots,
  groupSelected,
  setFeedBackType,
  setFeedbackIsOpen,
  setFeedback,
}: any) {
  const router = useRouter();
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  const [buttonDisabled, setDisabled] = useState<boolean>(true);
  const [checked, setChecked] = useState(false);
  const { userToken } = useSelector<AppState, UserState>(
    (state) => state.userState
  );
  // const handleChange = (event: any) => {
  //   setSpecialtySelected(event.target.value)
  // }
  const handleSelect = (item: any) => {
    handleChange(item);
    if (checked) {
      setDisabled(false);
    }
  };

  const getSpecialtiesLocal = async () => {
    const response: any = await getSpecialties();
    if (response.status) {
      setFeedBackType("error");
      setFeedbackIsOpen(true);
      setFeedback(response.message);
    } else {
      setSpecialties(response);
      return;
    }
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
          <div className={styles.progressBar} />
        </div>
      </Box>
    );
  }

  useEffect(() => {
    getSpecialtiesLocal();
  }, []);

  useEffect(() => {
    if (groupSelected !== "") {
      if (checked) {
        setDisabled(false);
      }
    }
  }, [checked, groupSelected]);

  const especialidades = [
    "Clínica médica",
    "Psiquiatria",
    "Acupuntura",
    "Cardiologia",
  ];

  return (
    <Box className={styles.content}>
      {/* <HeaderSchedule /> */}
      <HeaderNavigation widthProgress={"40%"} />

      <Grid container>
        <Grid
          item
          xs={12}
          className={styles.gridContent}
          sx={{ paddingInline: isSmallScreen ? "10vw" : "25vw" }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={"medium"}
            className={styles.title}
          >
            Escolha um grupo de especialidade para começar
          </Typography>
          <Select className={styles.select}>
            {specialties?.map((item, index) => (
              <MenuItem
                key={index}
                value={item.group}
                style={{ fontSize: 20 }}
                onClick={() => handleSelect(item.group)}
              >
                {item.group}
              </MenuItem>
            ))}
          </Select>
          <Box
            sx={{ paddingTop: "10px", display: "flex", alignItems: "center" }}
          >
            <Checkbox checked={checked} onClick={() => setChecked(!checked)} />
            <Typography className={styles.textNotification}>
              Estou de acordo em receber atendimento por teleconsulta.
            </Typography>
          </Box>
          {/* <Box className={styles.callout}>
          <Typography variant="body1" className={styles.body}>
            O valor da consulta pra essa especialidade fica R$20,00 com o seu
            <span style={{ fontWeight: 700 }}> Plano Bronze</span>
          </Typography>
        </Box> */}
          <button
            className={styles.buttonForward}
            onClick={() => onClick()}
            style={{ backgroundColor: buttonDisabled ? "#848d9f" : "#12CC7E" }}
            disabled={buttonDisabled}
          >
            <ArrowForwardIos sx={{ color: "white" }} fontSize="large" />
          </button>
        </Grid>
      </Grid>
    </Box>
  );
}
