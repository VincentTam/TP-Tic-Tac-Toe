import React, { useState } from "react";

import Square from "./Square";

// needs root element
export default function Board() {
  const createInitialBoard = () => {
    [...Array(9).keys()].map(v => ({id: v, label: "O"}))
  };
  const [squares, setSquares] = useState(() => createInitialBoard());

  const changeSquareValue = clickedSquare => {
    setSquares(squares.map(sqaure => {
      sqaure.id === clickedSquare.id ? clickedSquare : sqaure
    }));
  };

  const X2O = str => str === "X" ? "O" : "X";

  return (
    <>
      {squares.map(square => (
        <Square key={square.id} value={square.label}
          whenClicked={s => changeSquareValue({...s, label: X2O(e.target.value)})} />
      ))}
    </>
  );
}
