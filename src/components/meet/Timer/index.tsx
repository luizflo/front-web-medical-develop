// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react'

export default function Timer() {
  const Ref: any = useRef(null)
  const [timer, setTimer] = useState<any>('00:00:00')
  const [minutesRemain, setMinutesRemain] = useState<any>()

  const getTimeRemaining = (e: any) => {
    const total = Date.parse(e) - Date.parse(new Date().toString())
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / 1000 / 60 / 60) % 24)
    return {
      total,
      hours,
      minutes,
      seconds,
    }
  }

  const startTimer = (e: any) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e)
    setMinutesRemain(minutes)
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds),
      )
    }
  }

  const clearTimer = (e: any) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:15:00");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };
  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setMinutes(deadline.getMinutes() + 15);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime())
  }, [])

  const onClickReset = () => {
    clearTimer(getDeadTime())
  }
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <h2
        style={{
          color: minutesRemain >= 2 ? '#1e1e1e' : '#ff4545',
          fontSize: 20,
        }}
      >
        {timer}
      </h2>
    </div>
  )
}
