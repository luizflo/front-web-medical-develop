// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import styles from './participant.module.scss'
import { Box, Typography } from "@mui/material";

type ParticpantProps = {
  participant: any;
  type: string;
  key: string;
  participants: any;
  isDiagnosysOpen: boolean;
  isAnamneseOpen: boolean;
};
const Participant = ({
  participant,
  type,
  key,
  participants,
  isAnamneseOpen,
  isDiagnosysOpen,
}: ParticpantProps) => {
  const [videoTracks, setVideoTracks] = useState<any>([]);
  const [audioTracks, setAudioTracks] = useState<any>([]);

  const videoRef: any = useRef();
  const audioRef: any = useRef();

  const trackpubsToTracks = (trackMap: any) =>
    Array.from(trackMap.values())
      .map((publication: any) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks: any) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks: any) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track: any) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks: any) =>
          videoTracks.filter((v: any) => v !== track)
        );
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks: any) =>
          audioTracks.filter((a: any) => a !== track)
        );
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);
  useEffect(() => {
    const audioTrack = audioTracks[0];
    console.log("Tracks", trackpubsToTracks(participant.audioTracks));
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <Box
      key={key}
      sx={{
        width: {
          xs: "100vw",
          md:
            isDiagnosysOpen || isAnamneseOpen
              ? type === "remote"
                ? "60vw"
                : "20vw"
              : "50vw",
        },
        maxHeight: { xs: "30vh", md: "inherit" },
        backgroundRepeat: "no-repeat",
        display: "block",
        position: "absolute",
        backgroundSize: "fit",
        left: {
          xs: 0,
          md:
            isDiagnosysOpen || isAnamneseOpen
              ? type !== "remote"
                ? 750
                : 50
              : "inherit",
        },
        bottom: {
          xs: type !== "remote" ? 200 : 550,
          md:
            isDiagnosysOpen || isAnamneseOpen
              ? type === "remote"
                ? 80
                : 100
              : 100,
        },
      }}
    >
      {/* <h3 className={styles.participantName}>{participant.identity}</h3> */}
      <video
        ref={videoRef}
        autoPlay={true}
        style={{
          transform: "scale(-1,1)",
          zIndex: 0,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "inherit",
          width: "inherit",
          // position: type === "remote" ? "relative" : "relative",
          //marginLeft:type === "local" && participants.length !== 0 ? "40vw" : "0px",
          // bottom: type === "remote" ? 0 : 80,
          // zIndex: type === "remote" ? 0 : 100,
        }}
      />
      <Box
        sx={{
          backgroundColor: "black",
          display: "flex",
          opacity: "0.40",
          height: "50px",
          width: {
            xs: "45vw",
            md: "15vw",
          },
          position: "absolute",
          bottom: 5,
          paddingLeft: "20px",
          // paddingTop: "10px",
          alignItems: "center",
          // marginTop: "-50px",
          zIndex: 10,
        }}
      >
        <Typography variant="h3" className={styles.remoteParticipantName}>
          {participant.identity}
        </Typography>
      </Box>
      <audio ref={audioRef} autoPlay={true} />
    </Box>
  );
};

export default Participant
