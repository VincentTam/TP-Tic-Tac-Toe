import React from "react";

export default function Square(props) {
  return (
    <input type="button" className={props.classes} value={props.value}
      onClick={() => props.whenClicked()} style={{fontSize: props.fontSize}} />
  );
}
