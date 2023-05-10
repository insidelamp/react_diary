import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { DateType } from "../components/Reducer";
import { setPageTitle } from "../until";

function New() {
  const navigate = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);
  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = (data: any) => {
    const { date, content, emotionId } = data;
    onCreate({ date, content, emotionId });
    navigate("/", { replace: true });
  };
  useEffect(() => {
    setPageTitle("새 일기 쓰기");
  }, []);
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
