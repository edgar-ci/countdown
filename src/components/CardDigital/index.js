import React from "react";

const CardDigital = ({ digit }) => {
  const value = digit < 10 ? `0${digit}` : digit;
  return (
    <li>
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
