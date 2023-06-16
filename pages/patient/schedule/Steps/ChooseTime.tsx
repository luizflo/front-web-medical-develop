import React, { RefObject, useEffect, useRef, useState } from "react";
import styles from "../schedule.module.scss";
import { useRouter } from "next/router";
import {
  Grid,
  Typography,
  Button,
  CircularProgress,
  Box,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { ArrowBackIos, ArrowForwardIos, Close } from "@mui/icons-material";
import { getSlots, setProfessional } from "src/api/appointment";
import { ISlots } from "src/interfaces/appointment";
import LogoHausey from "public/hauseyLogo.svg";
import user from "public/placeholderAvatar.png";
import { ISlot, ISpecialties, SlotsArr } from "src/interfaces";
import { formatDateForSlots } from "@components/utils";
import HeaderNavigation from "@components/booking/header";

type ChooseTimeProps = {
  onClick: () => void;
  returnStep: () => void;
  selectedHour?: string;
  selectedDate?: ISlot;
  setSelectedDate: React.Dispatch<React.SetStateAction<ISlot | undefined>>;
  setSelectedHour: React.Dispatch<React.SetStateAction<string>>;
  setProfessionalSelected: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  slots: SlotsArr[];
};
export default function ChooseTime({
  onClick,
  returnStep,
  selectedHour,
  selectedDate,
  setSelectedDate,
  setSelectedHour,
  setProfessionalSelected,
  isLoading,
  slots,
}: ChooseTimeProps) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>();

  const handleSelectTime = (
    item: ISlot,
    slot: string,
    professionalId: string
  ) => {
    setSelectedDate(item);
    setSelectedHour(slot);
    setProfessionalSelected(professionalId);
  };

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  function HeaderSchedule() {
    return (
      <Box>
        <Box
          className={styles.grid}
          sx={{ paddingInline: isSmallScreen ? "10vw" : "20vw" }}
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
          <LogoHausey className={styles.logo} />
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
          <div className={styles.progressBar} style={{ width: "60%" }} />
        </div>
      </Box>
    );
  }

  useEffect(() => {
    console.log("SlotsReceived", slots);
    const scrolContainer = scrollRef.current;
    if (scrolContainer) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        scrolContainer.scrollTo({
          left: scrolContainer.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      scrolContainer?.addEventListener("wheel", onWheel);
    }
  }, []);

  return (
    <Box className={styles.content}>
      <HeaderNavigation widthProgress={"80%"} />
      <Grid container sx={{ display: "flex", flexDirection: "column" }}>
        {isLoading ? (
          <CircularProgress
            color="primary"
            size={24}
            sx={{
              alignSelf: "center",
              verticalAlign: "center",
              marginTop: "100px",
            }}
          />
        ) : (
          <Grid
            item
            xs={12}
            className={styles.gridHoursSchedule}
            sx={{ paddingInline: isSmallScreen ? "10vw" : "20vw" }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={"medium"}
              className={styles.title}
            >
              Escolha a melhor data e horário:
            </Typography>
            <Typography variant="h3" className={styles.subtitle}>
              Médicos disponíveis para essa especialidade:
            </Typography>
            <div className={styles.hr}></div>
            {/* {isLoading ? <CircularProgress color="primary" size={24} /> : null} */}
            {slots.map((item, index) => (
              <Grid
                container
                key={index}
                className={styles.boxChooseDoctor}
                sx={{
                  width: { xs: "90vw", md: "70vw" },
                  //overflowX: "hidden",
                  // flexWrap: "wrap",
                  display: "flex",
                  minHeight: "fit-content",
                }}
              >
                <Grid item md={5}>
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Image
                      src={item.image ? item.image : user}
                      height={70}
                      width={70}
                      style={{ borderRadius: "50%" }}
                      objectFit="cover"
                    />
                    <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                      <Typography
                        variant="h2"
                        fontWeight={"bold"}
                        sx={{ width: "100%" }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="h4"
                        fontWeight={"medium"}
                        className={styles.textGrey}
                      >
                        Número de registro: CRM {item.registrationUf}{" "}
                        {item.registration}
                      </Typography>
                      <Box sx={{ marginTop: "20px" }}>
                        <Typography
                          variant="h4"
                          fontWeight={"medium"}
                          className={styles.textGrey}
                        >
                          Preço da consulta:
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight={"bold"}
                          className={styles.textBlack}
                        >
                          R${item.price ? item.price : " --"}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={7}>
                  <Typography variant="h3" fontWeight={"bold"}>
                    Escala
                  </Typography>
                  <Typography
                    variant="h4"
                    fontWeight={"regular"}
                    className={styles.textGrey}
                  >
                    Horários disponíveis
                  </Typography>
                  <Box sx={{ marginTop: "10px" }}>
                    <Box>
                      {item.slots?.map(
                        (slot, index) =>
                          slot.slots?.length > 0 && (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                                // alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="h4"
                                fontWeight={"bold"}
                                sx={{ color: "#1E1E1E" }}
                              >
                                {/* {formatDateForSlots(slot.formattedDate, "week")} */}
                                {slot.formattedDate}
                              </Typography>
                              {/* <Typography
                              variant="body1"
                              fontWeight={"regular"}
                              className={styles.textGrey}
                              sx={{ marginTop: "0px" }}
                            >
                              {formatDateForSlots(slot.formattedDate, "day")}
                            </Typography> */}
                              <Box
                                sx={{
                                  overflow: "hidden",
                                  width: "80%",
                                }}
                              >
                                <Box
                                  ref={scrollRef}
                                  className={styles.boxHours}
                                  // sx={{
                                  //   display: "flex",
                                  //   overflowX: "scroll",
                                  //   // width: "100px",
                                  //   paddingRight: "10px",
                                  //   ":-webkit-scrollbar": {
                                  //     display: "none",
                                  //   },
                                  // }}
                                >
                                  {slot.slots?.map((hour, index) => (
                                    <Button
                                      color="primary"
                                      variant="outlined"
                                      key={index}
                                      sx={{
                                        fontSize: "12px",
                                        color: "#1E1E1E",
                                        marginBottom: "10px",
                                      }}
                                      onClick={() =>
                                        handleSelectTime(
                                          slot,
                                          hour.time,
                                          item.id
                                        )
                                      }
                                      className={
                                        hour.available
                                          ? slot === selectedDate &&
                                            hour.time === selectedHour
                                            ? styles.buttonSlotSelected
                                            : styles.buttonSlotAvaliable
                                          : styles.buttonSlotOcuppied
                                      }
                                    >
                                      {hour.time}
                                    </Button>
                                  ))}
                                </Box>
                              </Box>
                            </Box>
                          )
                      )}
                    </Box>
                  </Box>
                </Grid>

                {/* <div
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  display: "flex",
                }}
                key={index}
              >
                 {item.slots.map((sub: any, index: any) => (
                  <Button
                    variant="outlined"
                    key={sub}
                    onClick={() => handleSelectTime(item, item.slots[index])}
                    className={styles.buttonHour}
                    color="primary"
                    size="large"
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      marginTop: "10px",
                      backgroundColor:
                        item === selectedDate && sub === selectedHour
                          ? "#12CC7E"
                          : "white",
                      color:
                        item === selectedDate && sub === selectedHour
                          ? "white"
                          : "#12CC7E",
                      paddingInline: "25px",
                      borderWidth: "1.5px",
                    }}
                  >
                    {sub}
                  </Button>
                ))}
              </div> */}
              </Grid>
            ))}
            <a className={styles.buttonForward} onClick={() => onClick()}>
              <ArrowForwardIos sx={{ color: "white" }} fontSize="large" />
            </a>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
