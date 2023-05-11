import React from "react";
import styled from "styled-components";

interface EmotionItemType {
  id: number;
  img: string | undefined;
  name: string;
  onClickFunc: (id: number) => void;
  isSelected: boolean;
}
function EmotionItem({
  id,
  img,
  name,
  onClickFunc,
  isSelected,
}: EmotionItemType) {
  const handleOnClick = () => {
    onClickFunc(id);
  };

  return (
    <EmotionItemWrapper
      className={isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`}
      onClick={handleOnClick}
    >
      <EmotionItemImg alt={`emotion${id}`} src={img} />
      <EmotionItemSpan>{name}</EmotionItemSpan>
    </EmotionItemWrapper>
  );
}

const EmotionItemWrapper = styled.div`
  cursor: pointer;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.EmotionItem_off {
    background-color: #ececec;
  }
  &.EmotionItem_on_1 {
    background-color: #64c964;
    color: white;
  }
  &.EmotionItem_on_2 {
    background-color: #9dd772;
    color: white;
  }
  &.EmotionItem_on_3 {
    background-color: #fdce17;
    color: white;
  }
  &.EmotionItem_on_4 {
    background-color: #fd8446;
    color: white;
  }
  &.EmotionItem_on_5 {
    background-color: #fd565f;
    color: white;
  }
`;

const EmotionItemImg = styled.img`
  width: 50%;
  margin-bottom: 10px;
`;

const EmotionItemSpan = styled.span`
  font-size: 18px;
`;
export default React.memo(EmotionItem);
