import React from "react";

const CardDigital = ({ digit, current, initial }) => {
  const value = digit < 10 ? `0${digit}` : digit;
  return (
    <li
      className={`${
        digit === current || (digit === 0 && current === initial)
          ? "previous"
          : digit === current - 1
          ? "current"
          : ""
      }`}
    >
      <div className="header">
        <span className="digit">{value}</span>
      </div>
      <div className="footer">
        <span className="digit">{value}</span>
      </div>
    </li>
  );
};

export default CardDigital;
