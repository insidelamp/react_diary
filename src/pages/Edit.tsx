import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import Button from "../components/Button";
import Header from "../components/Header";
import useDiary from "../hokks/useDiary";
import { DateType } from "../components/Reducer";
import Editor from "../components/Editor";
import { setPageTitle } from "../until";

function Edit() {
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
  const onClickDelete = () => {
    if (id) {
      if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않습니다!")) {
        onDelete({ targetId: id, date: new Date().getTime() });
        navigate("/", { replace: true });
      }
    }
  };
  const goBack = () => {
    navigate(-1);
  };
  const onSubmit = (data: DateType) => {
    if (id) {
      if (window.confirm("일기를 정말 수정할까요?")) {
        const { date, content, emotionId } = data;
        onUpdate({ targetId: id, date, content, emotionId });
        navigate("/", { replace: true });
      }
    }
  };
  useEffect(() => {
    setPageTitle(`${id}번 일기 수정하기`);
  }, []);

  if (!data) {
    return <div>일기를 불러오고 있습니다</div>;
  } else {
    return (
      <div>
        <Header
          title={"일기 수정하기"}
          leftChild={<Button text={"< 뒤로가기"} onClickFunc={goBack} />}
          rightChild={
            <Button
              type={"negative"}
              text={"삭제하기"}
              onClickFunc={onClickDelete}
            />
          }
        />
        <Editor initData={data} onSubmitFunc={onSubmit} />
      </div>
    );
  }
}

export default Edit;
