// @ts-nocheck
import React, { useEffect, useRef } from 'react'
import { Box, Button, Typography } from '@mui/material'
import styles from './callended.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import User from '@public/images/icons/user.png'
import Clip from '@public/images/icons/clip.png'
import Doctor from '@public/images/icons/doctor.png'
import Clock from '@public/images/icons/oClock.png'
import { useSelector } from 'react-redux'
import { formatHour } from '@components/utils'

const CallEnded = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  appointment,
  openDialogFiles,
  connecting,
}: any) => {
  const videoRef = useRef()
  const audioRef = useRef()
  const router = useRouter()
  const { userLogged, role } = useSelector((state: any) => state.userState)

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.titleLobby}>Consulta finalizada</h2>
        <div className={styles.row}>
          <Image alt="no-alt" src={User} className={styles.image} />
          <Typography variant="h3" className={styles.body1}>
            {appointment?.patient?.name}
          </Typography>
        </div>
        <div className={styles.row}>
          <Image alt="no-alt" src={Doctor} className={styles.image} />
          <Typography variant="h3" className={styles.body1}>
            {appointment?.specialty?.name}
          </Typography>
        </div>
        <div className={styles.row}>
          <Image alt="no-alt" src={Clock} className={styles.image} />
          <Typography variant="h3" className={styles.body1}>
            {formatHour(appointment?.date)}
          </Typography>
        </div>
        <button
          onClick={() => openDialogFiles(true)}
          className={styles.filesButton}
          type="button"
          style={{
            cursor: "pointer",
          }}
        >
          <Image alt="no-alt" src={Clip} className={styles.image} />
          <Typography
            variant="h3"
            className={`${styles.body1} ${styles.attachment}`}
          >
            Ver exames anexados
          </Typography>
        </button>
      </div>

      <button
        onClick={() =>
          router.replace(role === "patient" ? "/home" : "/home-doctor")
        }
        className={styles.button}
      >
        {"Voltar a tela inicial"}
      </button>
    </div>
  );
}

export default CallEnded
