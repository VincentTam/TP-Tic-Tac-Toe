import React from "react";

import Square from "./Square";

// needs root element
export default function Board() {
  const changeSquareValue = (e) => {e.target.value = e.target.value === "O" ? "X" : "O"};
  const squareProps = {label: "O", whenClicked: (e) => changeSquareValue(e)};
  const squares = [];
  [...Array(3).keys()].forEach(_ => {
    [...Array(3).keys()].forEach(_ => {
      squares.push(Square(squareProps));
    });
  });
  return (<>{squares}</>);
}
