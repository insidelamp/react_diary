import React from "react";
import { DateType } from "./Reducer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getEmotionImgById } from "../until";
import Button from "../components/Button";
function DiaryItem({ id, emotionId, content, date }: DateType) {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };
  return (
    <ItemWrapper>
      <ImgWrapper onClick={goDetail} className={`img_section_${emotionId}`}>
        <ItemImg
          alt={`emotion${emotionId}`}
          src={getEmotionImgById(String(emotionId))}
        />
      </ImgWrapper>
      <InfoSection onClick={goDetail}>
        <DateWrapper>
          {new Date(parseInt(String(date))).toLocaleDateString()}
        </DateWrapper>
        <ContentWrapper>{content?.slice(0, 25)}</ContentWrapper>
      </InfoSection>
      <ButtonSection>
        <Button onClickFunc={goEdit} text={"수정하기"} />
      </ButtonSection>
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0px;
  border-bottom: 1px solid #e2e2e2;
`;
const ImgWrapper = styled.div`
  cursor: pointer;
  min-width: 120px;
  height: 80px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  &.img_section_1 {
    background-color: #64c964;
  }
  &.img_section_2 {
    background-color: #9dd772;
  }
  &.img_section_3 {
    background-color: #fdce17;
  }
  &.img_section_4 {
    background-color: #fd8446;
  }
  &.img_section_5 {
    background-color: #fd565f;
  }
`;

const ItemImg = styled.img`
  width: 50%;
`;
const InfoSection = styled.div`
  flex-grow: 1;
  margin-left: 20px;
  cursor: pointer;
`;
const DateWrapper = styled.div`
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 5px;
`;
const ContentWrapper = styled.div`
  font-size: 18px;
`;
const ButtonSection = styled.div`
  min-width: 70px;
`;
export default DiaryItem;
