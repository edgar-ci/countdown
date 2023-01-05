import React, { useState, useEffect, useRef } from "react";
import CardDigital from "../CardDigital";

const CountDown = ({ targetTime }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(targetTime);
  let timer;
  let container = useRef(null);

  useEffect(() => {
    setMinutes(targetTime);
    setRemaing();
    setTimer();
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    console.log({ seconds, minutes });
    if (seconds === 0 && minutes !== targetTime) {
      console.log("dentro", { seconds, minutes });
      setRemaing();
    }
  }, [seconds]);

  const setTimer = () => {
    timer = setInterval(() => {
      container.current.classList.remove("effects");
      setSeconds((prev) => prev - 1);
      container.current.classList.add("effects");
    }, 1000);
  };

  const setRemaing = () => {
    setSeconds(60);
    setMinutes((prev) => prev - 1);
  };

  return (
    <main ref={container}>
      <ul class="flip">
        {[...Array(targetTime + 1).keys()]
          .sort((a, b) => (a < b ? 1 : -1))
          .map((n) => (
            <CardDigital
              digit={n}
              current={minutes + 1}
              initial={targetTime + 1}
            />
          ))}
      </ul>
      <ul class="flip">
        {[...Array(60).keys()]
          .sort((a, b) => (b === 0 ? 1 : a < b ? 1 : -1))
          .map((n) => (
            <CardDigital digit={n} current={seconds + 1} initial={60} />
          ))}
      </ul>
    </main>
  );
};

export default CountDown;
