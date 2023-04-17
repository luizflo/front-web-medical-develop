import React, { useEffect, useState } from 'react'

import { Box, Button, Grid, Typography } from '@mui/material'
import ModalOnboarding from "@components/layout/patient/Home/ModalOnboarding";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import Details from "./Steps/Details";
import Home from "./Steps/Home";
import { IAppointment } from "src/interfaces";
import { parseCookies } from "nookies";
import { getSpecialties } from "src/api/appointment";

function HomePage(props: any) {
  const [step, setStep] = useState<any>(1);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  console.log("User Props", props);

  const handlerClick = (item: IAppointment) => {
    setStep(step + 1);
    setSelectedAppointment(item);
  };

  const returnStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Home
            onClick={handlerClick}
            appointments={appointments}
            setAppointments={setAppointments}
          />
        );
      case 2:
        return (
          <Details
            returnStep={returnStep}
            selectedAppointment={selectedAppointment!!}
          />
        );
    }
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };
  // useEffect(() => {
  //   window.history.pushState(null, document.title, window.location.href)
  //   window.addEventListener('popstate', function (event) {
  //     window.history.pushState(null, document.title, window.location.href)
  //   })
  // }, [])

  return (
    <Grid>
      <ModalOnboarding
        open={modalIsOpen}
        handleClose={handleClose}
        link={"sadfassadas"}
      />
      {renderStep()}
    </Grid>
  );
}

export default HomePage;
