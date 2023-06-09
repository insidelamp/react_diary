import React from "react";
import styled from "styled-components";
export interface BtnType {
  text?: string;
  type: string;
  onClickFunc?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function Button({ text, type, onClickFunc }: BtnType) {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <ButtonStyle className={`${btnType}`} onClick={onClickFunc}>
      {text}
    </ButtonStyle>
  );
}

Button.defaultProps = {
  type: "default",
};

const ButtonStyle = styled.button`
  cursor: pointer;
  border: none;
  box-sizing: 5px;
  padding: 10px 15px;
  font-size: 13px;
  white-space: nowrap;
  font-family: "Instrument Serif", serif;
  background-color: #ececec;
  color: black;
  &.positive {
    background-color: #64c964;
    color: white;
  }
  &.negative {
    background-color: #fd565f;
    color: white;
  }
`;

export default Button;
