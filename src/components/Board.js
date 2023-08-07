import React from "react";

import Square from "./Square";

// needs root element
export default function Board() {
  const changeSquareValue = (e) => {e.target.value = e.target.value === "O" ? "X" : "O";}
  return (
    <>
      <div>
        <Square label="O" whenClicked={(e) => changeSquareValue(e)}/>
        <Square label="O" whenClicked={(e) => changeSquareValue(e)}/>
        <Square label="O" whenClicked={(e) => changeSquareValue(e)}/>
      </div>
      <div>
        <Square label="O" whenClicked={(e) => changeSquareValue(e)}/>
        <Square label="O" whenClicked={(e) => changeSquareValue(e)}/>
        <Square label="O" whenClicked={(e) => changeSquareValue(e)}/>
      </div>
      <div>
        <Square label="O" whenClicked={(e) => changeSquareValue(e)}/>
        <Square label="O" whenClicked={(e) => changeSquareValue(e)}/>
        <Square label="O" whenClicked={(e) => changeSquareValue(e)}/>
      </div>
    </>
    );
}
