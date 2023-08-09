import React, { useState } from "react";

import Board from "./Board";

import "../css/styles.css";

export default function Game() {
  const boardSize = 4;
  const relativeSize = 50; // min(?vw, ?vh)
  const boardWidth = `min(${relativeSize}vw, ${relativeSize}vh)`;
  const [squaresHistory, setSquaresHistory] = useState([
    {
      squares: Array(Math.pow(boardSize, 2)).fill(null),
      playedRow: -1,
      playedCol: -1
    }
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const curSquares = () => [...squaresHistory.slice(-1)[0].squares];

  function getWinPos() {
    const linesToCheck = [
      // add each row's index in "squares" array
      ...[...Array(boardSize).keys()].map((i) =>
        [...Array(boardSize).keys()].map((j) => i * boardSize + j)
      ),
      // add each column's index in "squares" array
      ...[...Array(boardSize).keys()].map((j) =>
        [...Array(boardSize).keys()].map((i) => i * boardSize + j)
      ),
      // add each diagonal's index in "squares" array
      [...Array(boardSize).keys()].map((i) => i * (boardSize + 1)),
      [...Array(boardSize).keys()].map((i) => (i + 1) * (boardSize - 1)),
    ];
    for (const line of linesToCheck) {
      const squares = curSquares();
      if (
        squares[line[0]] &&
        line.every((value, id, array) => squares[value] === squares[array[0]])
      ) {
        return line;
      }
    }
    return [];
  }

  const getStatus = () => {
    const squares = curSquares();
    const winner = squares[getWinPos()[0]];
    return winner ? `Vainqueur ${winner}` :
      squares.indexOf(null) === -1 ? "Match nul !" :
        `Joueur suivant : ${xIsNext ? "X" : "O"}`;
  };

  const fillSquare = (clickedSquareId) => {
    const squares = curSquares();
    if (squares[clickedSquareId] || getWinPos().length != 0) {
      return;
    }
    setSquaresHistory([
      ...squaresHistory,
      {
        squares: squares.map((value, id) =>
          id === clickedSquareId ? (xIsNext ? "X" : "O") : value
        ),
        playedRow: Math.floor(clickedSquareId / boardSize) + 1,
        playedCol: clickedSquareId % boardSize + 1
      }
    ]);
    setXIsNext(!xIsNext);
  };

  const Steps = () =>
    squaresHistory.map((move, id) => {
      const xOrO = id & 1 ? "X" : "O";
      const buttonValue =
        id ? `${xOrO} : [C]${move.playedCol} - [L]${move.playedRow}` : "Début";
      return (
        <li key={id}>
          <input type="button" value={buttonValue} className="step-btn" />
        </li>
      );
    });

  return (
    <div className="flex-row">
      <div className="flex-column-wrap">
        <div className="board"
          style={{
            width: boardWidth,
            height: boardWidth,
          }}
        >
          <Board
            boardSize={boardSize}
            relativeSize={relativeSize}
            squares={curSquares()}
            whenSquareClicked={fillSquare}
          />
        </div>
        <div className="status-line">{getStatus()}</div>
      </div>
      <div>
        <ol start={0}>
          <Steps />
        </ol>
      </div>
    </div>
  );
}
