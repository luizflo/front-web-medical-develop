import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import Details from './Steps/Details'
import HomeScreen from './Steps/Home'
import { IAppointment } from 'src/interfaces'
import Historic from './Steps/Historic'
import { AppState } from 'src/store'
import { AppointmentState } from 'src/store/appointment/types'
import { useSelector } from 'react-redux'

export default function Home() {
  const [step, setStep] = useState<any>(1)
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment>()
  const { cameFromCall, appointment } = useSelector<AppState, AppointmentState>(
    (state) => state.appointmentState,
  )
  const handlerClick = (item: IAppointment) => {
    setStep(step + 1);
    setSelectedAppointment(item)
  }
  const handlerClickHistory = () => {
    setStep(step + 1)
  }

  const returnStep = () => {
    setStep(step - 1)
  }
  useEffect(() => {
    if (cameFromCall) {
      setStep(2)
    }
  }, [])
  const renderStep = () => {
    switch (step) {
      case 1:
        return <HomeScreen onClick={handlerClick} />
      case 2:
        return (
          <Details
            onClickHistory={handlerClickHistory}
            returnStep={returnStep}
            selectedAppointment={selectedAppointment!!}
          />
        )
      case 3:
        return (
          <Historic
            returnStep={returnStep}
            selectedAppointment={appointment!!}
          />
        )
    }
  }

  return <Grid>{renderStep()}</Grid>
}
