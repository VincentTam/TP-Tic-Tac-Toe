import React, { useState } from "react";

import Board from "./Board";

import "../css/styles.css";

export default function Game() {
  const boardSize = 3;
  const [squares, setSquares] = useState(Array(Math.pow(boardSize, 2)).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const getWinPos = () => [];
  const getStatus = () => {
    const winner = squares[getWinPos()[0]];
    return winner ? `Vainqueur ${winner}` :
      squares.indexOf(null) === -1 ? "Match nul !" :
        `Joueur suivant : ${xIsNext ? "X" : "O"}`;
  }

  const fillSquare = (clickedSquareId) => {
    if (squares[clickedSquareId] || getWinPos().length != 0) {
      return;
    }
    setSquares(
      squares.map(
        (value, id) => id === clickedSquareId ? (xIsNext ? "X" : "O") : value
      )
    );
    setXIsNext(!xIsNext);
  };

  return (
    <div className="board" >
      <Board boardSize={boardSize} squares={squares} whenSquareClicked={fillSquare} />
      <p>{getStatus()}</p>
    </div>
  );
}
