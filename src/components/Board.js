import React from "react";

import Square from "./Square";

export default function Board(props) {
  const squareClasses = (id) =>
    "squareBtn" + (props.winPos.includes(id) ? " winner" : "");

  return (
    <>
      {props.squares.map((value, id) => (
        <Square key={id} value={value} whenClicked={() => props.whenSquareClicked(id)}
          fontSize={props.fontSize} classes={squareClasses(id)} />
      ))}
    </>
  );
}
