import React, { useEffect, useState } from 'react'
import styles from './agenda.module.scss'
import { useRouter } from 'next/router'
import { Grid, Typography } from '@mui/material'
// import WeekCalendar from 'react-week-calendar'
import EventsList from 'src/components/layout/secretary/EventsList'
import ModalConfirmation from '@components/layout/secretary/ModalConfirmation'

// import Calendar from 'react-calendar'

export default function agenda() {
  const router = useRouter()
  const [value, setValue] = useState(new Date())
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [events, setEvents] = useState([
    {
      id: 0,
      pacient: 'Jonathan Richard',
      body: 'Consulta de Psiquiatria com Dr. Marcos',
      hour: '9:30',
      date: 'Qui, 07 de Novembro de 2022',
    },
    {
      id: 1,
      pacient: 'Bianca Canezin',
      body: 'Consulta de Clínica geral com Dr. Marcos',
      hour: '11:30',
      date: 'Sex, 08 de Novembro de 2022',
    },
    {
      id: 2,
      pacient: 'Bianca Canezin',
      body: 'Consulta de Clínica geral com Dr. Marcos',
      hour: '11:30',
      date: 'Sex, 08 de Novembro de 2022',
    },
  ])
  const handleClickOpen = () => {
    setModalIsOpen(true)
  }

  const handleClose = () => {
    setModalIsOpen(false)
  }

  const exams = ['Meus exames adicionados']
  const questionnaires = [
    'Questionário de saúde mental',
    'Questionário de saúde geral',
  ]

  return (
    <Grid className={styles.row}>
      <Grid className={styles.container}>
        <Grid className={styles.rowSpace}>
          <div className={styles.pageTitleContainer}>
            <Typography className={styles.title}>Agendamentos</Typography>
            <Typography variant="body1" className={styles.subtitle}>
              Consulte os novos agendamentos e designe o profissional
              responsável
            </Typography>
          </div>
          <a
            className={styles.buttonSchedule}
            onClick={() => router.push('/patient/schedule')}
          >
            <Typography variant="body1" className={styles.textButtonConfirm}>
              Visualizar histórico
            </Typography>
          </a>
        </Grid>
      </Grid>
    </Grid>
  )
}
