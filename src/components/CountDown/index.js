import React from "react";
import CardDigital from "../CardDigital";
import useController from "./useController";

const separeValues = (value) => {
  let el = value?.toString();
  let ten = el.length > 1 ? Number(el[0]) : 0;
  let unit = el.length > 1 ? Number(el[1]) : Number(el[0]);

  return {
    ten,
    unit,
  };
};

const Card = ({ digito }) => {
  return (
    <div className="card">
      <div className={`inner ejeY-${digito}`}>
        {[...Array(10).keys()]
          .sort((a, b) => (a < b ? 1 : -1))
          .map((n) => (
            <span className={` element ${n === digito ? "active" : "preview"}`}>
              {n}
            </span>
          ))}
      </div>
    </div>
  );
};

const CountDown = ({ targetTime, breakTime }) => {
  const { seconds, minutes, handlePause, isBrake } = useController(
    targetTime,
    breakTime
  );

  return (
    <>
      <main className={isBrake ? "break" : ""}>
        <div className="wrap">
          <Card digito={separeValues(minutes).ten} />
          <Card digito={separeValues(minutes).unit} />
          <Card digito={seconds === 60 ? "0" : separeValues(seconds).ten} />
          <Card digito={separeValues(seconds).unit} />
        </div>
      </main>
    </>
  );
};

export default CountDown;
