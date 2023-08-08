import React from "react";

export default function Square(props) {
  const relativeGridSize = props.relativeSize / props.boardSize;
  const gridWidth = `min(${relativeGridSize}vw, ${relativeGridSize}vh)`;

  return (
    <input type="button" className="squareBtn" value={props.value}
      onClick={() => props.whenClicked()}
      style={{
        width: gridWidth,
        height: gridWidth,
        flex: `1 1 ${100 / props.boardSize}%`
        }} />
  );
}
