import React, { useState } from "react";

import Board from "./Board";

import "../css/styles.css";

export default function Game() {
  const boardSize = 10;
  const relativeSize = 80; // min(?vw, ?vh)
  const boardWidth = `min(${relativeSize}vw, ${relativeSize}vh)`;
  const [squaresHistory, setSquaresHistory] = useState([
    {
      squares: Array(Math.pow(boardSize, 2)).fill(null),
      playedRow: -1,  // 1-based index
      playedCol: -1
    }
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [viewStep, setViewStep] = useState(0);
  const curSquares = () => [...squaresHistory[viewStep].squares];

  // check only lines touching last played grid
  const vs = [[0,1],[1,0],[1,1],[1,-1]];  // "check directions"
  const N = boardSize;
  const n = 5;  // match length
  const l = Math.min(n, N);  // var for unifying cases when n > N and n <= N
  const arrL = [...Array(l).keys()];  // shorthand for [0,...,l-1]
  function getWinPos() {
    const [i, j] = [squaresHistory[viewStep].playedRow - 1,
      squaresHistory[viewStep].playedCol - 1];  // "center" of checking (0-based index)
    if (i < 0) return [];  // return empty array if user clicked "Début"

    const linesToCheck = vs.flatMap(v =>  // for each "check direction"
      arrL.filter(s =>  // for each "check line offset", verify boundary conditions
        i-s*v[0]>=0 && i-s*v[0]<N && j-s*v[1]>=0 && j-s*v[1]<N &&  // 0<=chkLine start<N
        i+(l-s-1)*v[0]>=0 && i+(l-s-1)*v[0]<N && j+(l-s-1)*v[1]>=0 && j+(l-s-1)*v[1]<N)
        .map(s =>  // get "check line" (an array of indice (from 0 to N²)) from offset
          arrL.map(k => (i+(k-s)*v[0])*N+(j+(k-s)*v[1]))
        )
    );
    
    for (const line of linesToCheck) {  // use for loop to exit fct in case of match
      const squares = curSquares();
      if (
        squares[line[0]] &&
        line.every((value, id, array) => squares[value] === squares[array[0]])
      ) {
        return line;
      }
    }
    return [];  // no matches
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
      ...squaresHistory.slice(0, viewStep + 1),
      {
        squares: squares.map((value, id) =>
          id === clickedSquareId ? (xIsNext ? "X" : "O") : value
        ),
        playedRow: Math.floor(clickedSquareId / boardSize) + 1,
        playedCol: clickedSquareId % boardSize + 1
      }
    ]);
    setXIsNext(x => !x);
    setViewStep(x => x + 1);
  };

  const stepButtonHandler = (clickedBtnId) => {
    setViewStep(clickedBtnId);
    setXIsNext(clickedBtnId % 2 === 0);
  };

  const Steps = () =>
    squaresHistory.map((move, id) => {
      const xOrO = id & 1 ? "X" : "O";
      const buttonValue =
        id ? `${xOrO} : [L]${move.playedRow} - [C]${move.playedCol}` : "Début";
      const buttonClasses =
        id === viewStep ? "step-btn step-btn-hl" : "step-btn";
      return (
        <li key={id}>
          <input type="button" value={buttonValue} className={buttonClasses}
            onClick={() => stepButtonHandler(id)}/>
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
