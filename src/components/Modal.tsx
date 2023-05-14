import React from "react";
import styled from "styled-components";

import { backImgArr } from "../App";

type BackImgType = {
  changeImg: (idx: number) => void;
};
function Modal({ changeImg }: BackImgType) {
  return (
    <ModalSpace>
      {backImgArr.map((item, idx) => (
        <ModalContent key={idx}>
          <SmallImg src={item.img} />
          <ModalLabel>
            <input
              type="radio"
              name="배경이미지"
              onClick={() => changeImg(idx)}
            />
            <div>{item.name}</div>
          </ModalLabel>
        </ModalContent>
      ))}
    </ModalSpace>
  );
}
const ModalSpace = styled.div`
  border: 3px solid gray;
  padding: 10px 0px;
  border-radius: 10px;
  background-color: white;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ModalLabel = styled.label`
  display: flex;
  height: 30px;
  align-items: center;
`;

const SmallImg = styled.img`
  width: 80%;
  height: 75px;
`;
export default Modal;
