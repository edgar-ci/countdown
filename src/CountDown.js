import React, { useState, useEffect, useRef } from "react";

const Entry = ({ digit, current, initial }) => {
  const value = digit < 10 ? `0${digit}` : digit;
  return (
    <li
      className={`${
        digit === current || (digit === 0 && current === 60)
          ? "before"
          : digit === current - 1
          ? "active"
          : ""
      }`}
    >
      <a href="#">
        <div class="up">
          <div class="shadow"></div>
          <div class="inn">{value}</div>
        </div>
        <div class="down">
          <div class="shadow"></div>
          <div class="inn">{value}</div>
        </div>
      </a>
    </li>
  );
};

const CountDown = ({ targetTime }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  let timer;
  let container = useRef(null);

  useEffect(() => {
    setMinutes(targetTime);
    setTimer();
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    console.log("useEffect");
    console.log({ minutes, seconds });
    if (seconds === -1) {
      clearInterval(timer);
      setTimer();
      console.log("limpiamo");
    }
  }, [seconds]);

  const setTimer = () => {
    console.log("setTimer");
    setMinutes((prev) => prev - 1);
    setRemaing();
  };

  const setRemaing = () => {
    console.log("setRemaing");
    setSeconds(59);
    timer = setInterval(() => {
      container.current.classList.remove("play");
      setSeconds((prev) => prev - 1);
      container.current.classList.add("play");
    }, 1000);
  };

  return (
    <div class="container" ref={container}>
      <ul class="flip">
        {[...Array(targetTime).keys()]
          .sort((a, b) => (a < b ? 1 : -1))
          .map((n) => (
            <Entry digit={n + 1} current={minutes} />
          ))}
      </ul>
      <ul class="flip">
        {[...Array(60).keys()]
          .sort((a, b) => (b === 0 ? 1 : a < b ? 1 : -1))
          .map((n) => (
            <Entry digit={n} current={seconds} />
          ))}
      </ul>
    </div>
  );
};

export default CountDown;
