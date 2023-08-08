import React, { useState } from "react";

export default function Square(props) {
  return (
    <input type="button" className="squareBtn" value={props.value} onClick={props.whenClicked} />
  );
}
