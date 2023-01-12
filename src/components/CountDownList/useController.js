import { useState, useEffect, useRef } from "react";

const useController = (targetTime) => {
  const [seconds, setSeconds] = useState();
  const [minutes, setMinutes] = useState(targetTime);
  const [isPause, setIsPause] = useState(null);
  let timer = useRef(null);

  useEffect(() => {
    setSeconds(61);
    setMinutes(targetTime);
    setTimer();
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    if (seconds === 2) setMinutes((prev) => prev - 1);
  }, [seconds]);

  useEffect(() => {
    if (minutes === 1) setMinutes(0);
  }, [minutes]);

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
        if (prev === 2) {
          return 61;
        }

        return prev - 1;
      });
    }, 1000);
  };

  const handlePause = () => {
    setIsPause((prev) => !prev);
  };

  return {
    seconds,
    minutes,
    handlePause,
  };
};

export default useController;
