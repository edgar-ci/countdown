import React from "react";
import CardDigital from "../CardDigital";
import useController from "./useController";

const CountDown = ({ targetTime }) => {
  const { seconds, minutes, handlePause } = useController(targetTime);
  return (
    <>
      <main className="effects">
        <ul className="flip">
          {minutes === 1 && <CardDigital digit={0} />}
          {[...Array(minutes).keys()]
            .sort((a, b) => (a < b ? -1 : 1))
            .map((n) => (
              <CardDigital key={`minutes-${n}`} digit={n + 1} />
            ))}
        </ul>
        <ul className="flip">
          {[...Array(seconds).keys()]
            .sort((a, b) => (a < b ? -1 : 1))
            .map((n) => (
              <CardDigital key={`seconds-${n}`} digit={n === 60 ? 0 : n} />
            ))}
        </ul>
      </main>
      <footer>
        <button
          style={{
            zIndex: 1000,
            position: "relative",
            width: 400,
            height: 40,
            display: "block",
          }}
          onClick={handlePause}
        >
          pause
        </button>
      </footer>
    </>
  );
};

export default CountDown;
