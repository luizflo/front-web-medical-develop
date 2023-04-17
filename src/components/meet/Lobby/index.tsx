// @ts-nocheck
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Grid, Typography, Button, useMediaQuery } from "@mui/material";
import styles from "./lobby.module.scss";
import bgLobby from "@public/images/icons/lobby.png";
import Image from "next/image";
import User from "@public/images/icons/user.png";
import Clip from "@public/images/icons/clip.png";
import Doctor from "@public/images/icons/doctor.png";
import Clock from "@public/images/icons/oClock.png";
import { useRouter } from "next/router";
import { formatHour } from "@components/utils";
import Webcam from "react-webcam";

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
  appointment,
  connecting,
  openDialogFiles,
}: any) => {
  const videoRef: any = useRef();
  const audioRef: any = useRef();
  const router = useRouter();
  const [mediaStream, setMediaStream] = useState<any>(null);
  const [height, setHeight] = useState<number>(0);
  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );
  const stopVideo = async () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(function (track) {
        track.stop();
      });
      videoRef.current = null;
    }
    // video.srcObject.getAudioTracks()[0].stop()
  };

  useEffect(() => {
    // getVideo()
    setHeight(window.innerHeight);
    return () => stopVideo();
  }, []);

  return (
    <Grid container className={styles.container} sx={{ paddingInline: "7vw" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          width: { xs: "45vw", md: "45vw" },
          height: { xs: "30vh", md: "50vh" },
        }}
        style={{
          display: "flex",
          backgroundPosition: "center",
          backgroundSize: "fill",
          alignItems: "center",
          justifyContent: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Webcam
          width={isSmallScreen ? "inherit" : window.innerWidth - 900}
          height={isSmallScreen ? height - 500 : "inherit"}
        />
      </Grid>
      <Grid item xs={12} md={6} className={styles.form}>
        <Typography
          variant="subtitle1"
          fontWeight={"medium"}
          className={styles.titleLobby}
        >
          Pronto para a consulta?
        </Typography>
        <h2 className={styles.subtitle}>Informações prévias:</h2>
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
        <Button
          sx={{ marginBottom: { xs: "20px", md: "0px" } }}
          variant="contained"
          onClick={() => handleSubmit()}
          disabled={connecting}
          className={styles.button}
        >
          {connecting ? "Conectando..." : "Entrar"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Lobby
