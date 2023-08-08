import React from "react";

import Square from "./Square";

export default function Board(props) {
  return (
    <>
      {props.squares.map((value, id) => (
        <Square key={id} value={value} whenClicked={() => props.whenSquareClicked(id)} />
      ))}
    </>
  );
}
