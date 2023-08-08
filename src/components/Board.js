import React, { useState } from "react";

import Square from "./Square";

export default function Board() {
  const boardSize = 3;
  const createInitialBoard =
    () => Array(Math.pow(boardSize, 2)).fill("X");
  const [squares, setSquares] = useState(() => createInitialBoard());

  const changeSquareValue = (clickedSquareId, str) => {
    setSquares(squares.map((value, id) => id === clickedSquareId ? str : value));
  };
  const X2O = str => str === "X" ? "O" : "X";

  return (
    <>
      {squares.map((value, id) => (
        <Square key={id} value={value}
          whenClicked={e => changeSquareValue(id, X2O(e.target.value))} />
      ))}
    </>
  );
}
