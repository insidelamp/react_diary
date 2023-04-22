import React from "react";
import { useParams } from "react-router-dom";

function Diary() {
  const { id } = useParams();
  return (
    <div>
      <div>{id}번 일기</div>
      <div>Diary 페이지입니다</div>
    </div>
  );
}

export default Diary;
