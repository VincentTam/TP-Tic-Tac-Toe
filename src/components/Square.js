import React, { useState } from "react";

export default function Square() {

  const [squareValue, setSquareValue] = useState("O");

  const changeSquareValue = () => setSquareValue(squareValue === "O" ? "X" : "O");
 
  return (
    <input value={squareValue} type="button" onClick={() => changeSquareValue()} />
  );
}