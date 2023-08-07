import React from "react";

import Square from "./Square";

// needs root element
export default function Board() {
  const changeSquareValue = (e) => {e.target.value = e.target.value === "O" ? "X" : "O"};
  const squares = [...Array(9).keys()].map(_ => (
    <Square label="O" whenClicked={(e) => changeSquareValue(e)}/>
  ));
  return (<>{squares}</>);
}
