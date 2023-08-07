import React, { useState } from "react";

export default function Square(props) {
  return (
    <input type="button" value={props.label} onClick={(e) => props.whenClicked(e)} />
  );
}
