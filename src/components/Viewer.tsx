import { DateType } from "./Reducer";
import { emotionList } from "../until";
import styled from "styled-components";

function Viewer({ date, content, emotionId }: DateType) {
  const emotionItem = emotionList.find((it) => it.id === emotionId);
  return (
    <div>
      <ViewerSection>
        <ViewerH4>오늘의 감정</ViewerH4>
        <ViewerWrapper className={`emotion_img_wrapper_${emotionItem?.id}`}>
          <img alt={emotionItem?.name} src={emotionItem?.img} />
          <ViewerName>{emotionItem?.name}</ViewerName>
        </ViewerWrapper>
      </ViewerSection>
      <section>
        <h1>오늘의 일기</h1>
        <ViewerContentWrapper>
          <ViewerContent>{content}</ViewerContent>
        </ViewerContentWrapper>
      </section>
    </div>
  );
}

const ViewerSection = styled.section`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const ViewerH4 = styled.h1`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const ViewerWrapper = styled.div`
  background-color: #ececec;
  width: 250px;
  height: 250px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  &.emotion_img_wrapper_1 {
    background-color: #64c964;
  }
  &.emotion_img_wrapper_2 {
    background-color: #9dd772;
  }
  &.emotion_img_wrapper_3 {
    background-color: #fdce17;
  }
  &.emotion_img_wrapper_4 {
    background-color: #fd8446;
  }
  &.emotion_img_wrapper_5 {
    background-color: #fd565f;
  }
`;
const ViewerName = styled.div`
  font-size: 25px;
  color: white;
`;

const ViewerContentWrapper = styled.div`
  width: 100%;
  background-color: #ececec;
  border-radius: 5px;
  word-break: keep-all;
  overflow-wrap: break-word;
`;
const ViewerContent = styled.p`
  padding: 20px;
  text-align: left;
  font-size: 20px;
  font-weight: 400;
  line-height: 2.5;
`;
export default Viewer;
