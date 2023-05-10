import React, { useState, useEffect, useCallback } from "react";
import { getFormattedDate, emotionList } from "../until";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import EmotionItem from "./EmotionItem";
import { DateType } from "./Reducer";

interface EditorType {
  initData?: DateType;
  onSubmitFunc: ({ date, emotionId, content }: DateType) => void;
}

function Editor({ initData, onSubmitFunc }: EditorType) {
  const [state, setState] = useState<DateType>({
    date: "",
    emotionId: 3,
    content: "",
  });
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);
  const handleOnGoBack = () => {
    navigate(-1);
  };

  const handleChangeDate = (e: React.FormEvent<HTMLInputElement>) => {
    setState({
      ...state,
      date: e.currentTarget.value,
    });
  };
  const handleChangeContent = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setState({
      ...state,
      content: e.target.value,
    });
  };
  const handleChangeEmotion = useCallback((emotionId: number) => {
    setState((state) => ({
      ...state,
      emotionId,
    }));
  }, []);
  const handleSubmit = () => {
    onSubmitFunc(state);
  };
  useEffect(() => {
    if (initData) {
      let stringDate = String(initData.date);
      setState({
        ...initData,
        date: getFormattedDate(new Date(parseInt(stringDate))),
      });
    }
  }, [initData]);
  return (
    <div>
      <div>
        <EditorH4>오늘의 날씨</EditorH4>
        <div>
          <EditorInput
            type="date"
            value={state.date}
            onChange={handleChangeDate}
          />
        </div>
      </div>
      <div>
        <EditorH4>오늘의 감정</EditorH4>
        <EditorListWrapper>
          {emotionList.map((it) => (
            <EmotionItem
              key={it.id}
              {...it}
              onClickFunc={handleChangeEmotion}
              isSelected={state.emotionId === it.id}
            />
          ))}
        </EditorListWrapper>
      </div>
      <div>
        <EditorH4>오늘의 일기</EditorH4>
        <div>
          <EditorTextarea
            value={state.content}
            onChange={handleChangeContent}
          />
        </div>
      </div>
      <EditorSection>
        <EditorBtnSpace>
          <Button text={"취소하기"} onClickFunc={handleOnGoBack} />
          <Button
            text={"작성 완료"}
            type={"positive"}
            onClickFunc={handleSubmit}
          />
        </EditorBtnSpace>
      </EditorSection>
    </div>
  );
}
const EditorListWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 2%;
`;
const EditorSection = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const EditorH4 = styled.h1`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 40px;
`;
const EditorInput = styled.input`
  border: none;
  border-radius: 5px;
  background-color: #ececec;
  padding: 20px;
  font-size: 20px;
  font-family: "Instrument Serif", serif;
  padding: 10px 0px;
  cursor: pointer;
  margin-bottom: 40px;
`;
const EditorTextarea = styled.textarea`
  border: none;
  border-radius: 5px;
  background-color: #ececec;
  padding: 20px;
  font-size: 20px;
  font-family: "Instrument Serif", serif;
  width: 100%;
  min-height: 200px;
  box-sizing: border-box;
  resize: vertical;
  margin-bottom: 40px;
`;
const EditorBtnSpace = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export default Editor;
