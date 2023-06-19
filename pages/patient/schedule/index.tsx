import React, { useEffect, useState } from "react";
import styles from "./schedule.module.scss";
import { useRouter } from "next/router";
import {
  AlertProps,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ArrowBackIos, Close, ArrowForwardIos } from "@mui/icons-material";
import ChooseSpeciality from "./Steps/ChooseSpeciality";
import ChooseGroup from "./Steps/ChooseGroup";
import ChooseTime from "./Steps/ChooseTime";
import LogoHausey from "public/logo_black.png";
import ChoosePayment from "./Steps/ChoosePayment";
import Payment from "./Steps/Payment";
import Success from "./Steps/Success";
import {
  IPrices,
  ISlot,
  ISpecialties,
  ISpecialty,
  SlotsArr,
} from "src/interfaces";
import { ISlots } from "src/interfaces/appointment";
import FeedBack from "@components/layout/feedback";
import { getSlots, getSpecialties } from "src/api/appointment";
import { formatDateToSlots } from "@components/utils";
import EmergencyAppointment from "./Steps/EmergencyAppointment";

export default function schedule({ stepProps, slotsApi, specialtyId }: any) {
  const router = useRouter();
  const [step, setStep] = useState<number>(stepProps ? parseInt(stepProps) : 1);
  const [feedBack, setFeedback] = useState<string>("");
  const [feedbackIsOpen, setFeedbackIsOpen] = useState<boolean>(false);
  const [feedbackType, setFeedBackType] = useState<AlertProps["severity"]>();
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<ISlot>();
  const [prices, setPrices] = useState<IPrices>();
  const [specialtySelected, setSpecialtySelected] = useState<ISpecialties>();
  const [professionalSelected, setProfessionalSelected] = useState<string>("");
  const [groupSelected, setGroupSelected] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [slots, setSlots] = useState<SlotsArr[]>([]);

  const handleChange = (event: any) => {
    setSpecialtySelected(event);
  };
  const handleChooseGroup = (event: any) => {
    setGroupSelected(event);
  };

  const handleClose = () => {
    setFeedbackIsOpen(false);
  };
  const setSlotsTwoHoursFromNow = (daySlots: SlotsArr[]) => {
    console.log("SlotEnter", daySlots);
    if (daySlots) {
      daySlots.map((slot) => {
        slot.slots?.map((item) => {
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
      console.log("DaySlot", daySlots);
      setSlots(daySlots);
      setIsLoading(false);
    }
  };
  const getSpecialtiesLocal = async () => {
    const response: ISpecialty[] = await getSpecialties();
    const specialtySelected = response.filter(
      (specialty) =>
        specialty.specialties.filter((item) => item.id === specialtyId).length >
        0
    );
    console.log("SpecialtySelected", specialtySelected);
    setSpecialtySelected(specialtySelected[0].specialties[0]);
    // setSpecialtySelected(specialtySelected[0]);
    // if (response.status) {
    //   setFeedBackType("error");
    //   setFeedbackIsOpen(true);
    //   setFeedback(response.message);
    // } else {
    //   return;
    // }
  };
  const handleClickContinueEmergencyAppointment = () => {
    setPrices({
      discount: 0,
      price: "R$80,00",
      total: "R$80,00",
    });
    setStep(6);
  };

  useEffect(() => {
    if (slotsApi.length > 0) {
      setSlotsTwoHoursFromNow(slotsApi);
    }
  }, [slotsApi]);

  useEffect(() => {
    if (specialtyId) {
      getSpecialtiesLocal();
    }
  }, []);

  const renderStep = () => {
    switch (step) {
      case 0: {
        router.replace("/home");
      }
      case 1:
        return (
          <ChooseGroup
            onClick={() => setStep(step + 1)}
            returnStep={() => setStep(step - 1)}
            handleChange={handleChooseGroup}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setSlots={setSlots}
            groupSelected={groupSelected}
            setFeedback={setFeedback}
            setFeedBackType={setFeedBackType}
            setFeedbackIsOpen={setFeedbackIsOpen}
          />
        );

      case 2:
        return (
          <ChooseSpeciality
            onClick={() => setStep(step + 1)}
            returnStep={() => setStep(step - 1)}
            handleChange={handleChange}
            groupSelected={groupSelected}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setSlots={setSlots}
            specialtySelected={specialtySelected}
            setFeedback={setFeedback}
            setFeedBackType={setFeedBackType}
            setFeedbackIsOpen={setFeedbackIsOpen}
          />
        );

      case 3:
        return (
          <ChooseTime
            onClick={() => setStep(step + 1)}
            returnStep={() =>
              stepProps === "3" ? router.back() : setStep(step - 1)
            }
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
            selectedDate={selectedDate}
            setProfessionalSelected={setProfessionalSelected}
            setSelectedDate={setSelectedDate}
            isLoading={isLoading}
            slots={slots}
          />
        );

      case 4:
        return (
          <ChoosePayment
            onClick={() => setStep(step + 2)}
            returnStep={() => setStep(step - 1)}
            selectedHour={selectedHour}
            selectedDate={selectedDate}
            setPrices={setPrices}
            prices={prices}
            specialtySelected={specialtySelected!!}
          />
        );
      case 5:
        return (
          <EmergencyAppointment
            returnStep={() => router.back()}
            onClick={() => handleClickContinueEmergencyAppointment()}
          />
        );
      case 6:
        return (
          <Payment
            onClick={() => setStep(step + 1)}
            returnStep={() => setStep(selectedHour ? step - 2 : step - 1)}
            specialtySelected={specialtySelected!!}
            professionalSelected={professionalSelected!!}
            selectedHour={selectedHour}
            prices={prices}
            selectedDate={selectedDate}
            setFeedback={setFeedback}
            setFeedBackType={setFeedBackType}
            setFeedbackIsOpen={setFeedbackIsOpen}
          />
        );
      case 7:
        return <Success />;
    }
  };

  return (
    <Grid>
      <FeedBack
        handleClose={handleClose}
        open={feedbackIsOpen}
        messageType={feedbackType}
        message={feedBack}
      />
      {renderStep()}
    </Grid>
  );
}

schedule.getInitialProps = async (ctx: any) => {
  const { stepProps, specialtyId } = ctx.query;
  let slotsApi = {};
  if (specialtyId) {
    const response = await getSlots(specialtyId);
    slotsApi = response;
  }
  return { stepProps, slotsApi, specialtyId };
};
