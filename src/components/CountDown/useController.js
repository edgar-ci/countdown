import { useState, useEffect, useRef } from "react";

const useController = (targetTime, breakTime) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(targetTime);
  const [isPause, setIsPause] = useState(null);
  const [isBrake, setIsBrake] = useState(false);
  let timer = useRef(null);

  useEffect(() => {
    // (A1) GO INTO FULL SCREEN FIRST
    let de = document.documentElement;
    if (de.requestFullscreen) {
      de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
      de.mozRequestFullScreen();
    } else if (de.webkitRequestFullscreen) {
      de.webkitRequestFullscreen();
    } else if (de.msRequestFullscreen) {
      de.msRequestFullscreen();
    }

    // (A2) THEN LOCK ORIENTATION
    window.screen.orientation.lock("landscape");
    setTimer();
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    if (seconds === 59 && minutes > 0) setMinutes((prev) => prev - 1);

    if (minutes === 0 && seconds === 0) {
      console.log("minutes === 0 && seconds === 0");
      clearInterval(timer.current);
      setIsBrake((prev) => {
        setMinutes(!isBrake ? breakTime : targetTime);
        setTimer();
        return !prev;
      });
    }
  }, [seconds]);

  useEffect(() => {
    if (isPause) {
      clearInterval(timer.current);
    }
    if (isPause !== null && !isPause) {
      setTimer();
    }
  }, [isPause]);

  const setTimer = () => {
    timer.current = setInterval(() => {
      setSeconds((prev) => {
        return prev === 0 ? 60 : prev - 1;
      });
    }, 1000);
  };

  const handlePause = () => {
    setIsPause((prev) => !prev);
  };

  return {
    seconds,
    minutes,
    isBrake,
    handlePause,
  };
};

export default useController;
