import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { DateType } from "../components/Reducer";

function New() {
  const navigate = useNavigate();
  const hooks = useContext(DiaryDispatchContext);
  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = (data: any) => {
    const { date, content, emotionId } = data;
    if (hooks) {
      console.log(11);
      hooks.onCreate(date, content, emotionId);
      console.log(date, content, emotionId);
    }
    navigate("/", { replace: true });
  };
  return (
    <div>
      <div>
        <Header
          title={"새 일기쓰기"}
          leftChild={<Button text={"<뒤로가기"} onClickFunc={goBack} />}
        />
        <Editor onSubmitFunc={onSubmit} />
      </div>
    </div>
  );
}

export default New;
