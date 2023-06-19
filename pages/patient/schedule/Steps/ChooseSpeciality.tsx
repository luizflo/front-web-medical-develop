import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "../schedule.module.scss";
import { useRouter } from "next/router";
import {
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
import { ISlot, ISpecialties, ISpecialty, SlotsArr } from "src/interfaces";
import LogoHausey from "public/logo_black.png";
import { formatDate, formatDateToSlots } from "@components/utils";
import HeaderNavigation from "@components/booking/header";
import Image from "next/image";

export default function ChooseSpeciality({
  onClick,
  returnStep,
  handleChange,
  isLoading,
  setIsLoading,
  setSlots,
  groupSelected,
  specialtySelected,
  setFeedBackType,
  setFeedbackIsOpen,
  setFeedback,
}: any) {
  const router = useRouter();
  const [specialties, setSpecialties] = useState<ISpecialty[]>([]);
  const [buttonDisabled, setDisabled] = useState<boolean>(true);
  const { userToken } = useSelector<AppState, UserState>(
    (state) => state.userState
  );
  // const handleChange = (event: any) => {
  //   setSpecialtySelected(event.target.value)
  // }
  const handleSelect = (item: ISpecialties) => {
    handleChange(item);
    getSlotsSpecialty(item);
  };

  const getSpecialtiesLocal = async () => {
    const response: any = await getSpecialties();
    setSpecialties(response);
    if (response.status) {
      setFeedBackType("error");
      setFeedbackIsOpen(true);
      setFeedback(response.message);
    } else {
      return;
    }
  };

  const setSlotsTwoHoursFromNow = (daySlots: SlotsArr[]) => {
    daySlots.map((slot) => {
      slot.slots.map((item) => {
        let dateNow = new Date();
        let dateUTC = dateNow.toUTCString();
        let dateFormatted = formatDateToSlots(dateUTC);
        if (dateFormatted === item.date) {
          const slotTwoHoursAhead = item.slots.filter((text) => {
            let hourSplited = text.time.split(":");
            let secondsOfSlot =
              parseFloat(hourSplited[0]) * 60 * 60 +
              parseFloat(hourSplited[1]) * 60;
            let secondsOfNow =
              (dateNow.getHours() + 2) * 60 * 60 + dateNow.getMinutes() * 60;
            return secondsOfSlot >= secondsOfNow;
          });
          // console.log("Slots novo", slotTwoHoursAhead);
          item.slots = slotTwoHoursAhead;
        }
      });
      // slot.slots.filter(item => item === )
    });
    // console.log("DaySlot", daySlots);
    setSlots(daySlots);
  };

  const getSlotsSpecialty = async (item: ISpecialties) => {
    setIsLoading(true);
    let id = item.id;

    const response = await getSlots(id);
    console.log("slots", response);

    if (response.status) {
      setFeedBackType("error");
      setFeedbackIsOpen(true);
      setFeedback(response.message);
    } else {
      setDisabled(false);
      setSlotsTwoHoursFromNow(response);
      // setSlots(response);
      setIsLoading(false);
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
          <div className={styles.progressBar} style={{ width: "45%" }} />
        </div>
      </Box>
    );
  }

  useEffect(() => {
    let dateNow = new Date();
    getSpecialtiesLocal();
    console.log("Date now", dateNow.getHours());
  }, []);

  const especialidades = [
    "Clínica médica",
    "Psiquiatria",
    "Acupuntura",
    "Cardiologia",
  ];

  return (
    <Box className={styles.content}>
      <HeaderNavigation widthProgress={"60%"} />

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
            Qual especialidade você precisa?
          </Typography>
          <Select className={styles.select}>
            {specialties?.map(
              (item) =>
                item.group === groupSelected
                  ? item.specialties.map((specialty) => (
                      <MenuItem
                        key={specialty.id}
                        value={specialty.id}
                        style={{ fontSize: 20 }}
                        className={styles.selectOption}
                        onClick={() => handleSelect(specialty)}
                      >
                        {specialty.name}
                      </MenuItem>
                    ))
                  : null
              // (
              //   <MenuItem
              //     key={item.id}
              //     value={item.name}
              //     style={{ fontSize: 20 }}
              //     onClick={() => handleSelect(item)}
              //   >
              //     {item.name}
              //   </MenuItem>
              // )
            )}
          </Select>
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
