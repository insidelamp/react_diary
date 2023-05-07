import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { DateType } from "../components/Reducer";

const useDiary = (id: string | number | undefined) => {
  const data = useContext(DiaryStateContext);
  const [diary, setDiary] = useState<DateType>();
  const navigate = useNavigate();
  useEffect(() => {
    const matchDiary = data?.find((it) => String(it.id) === String(id));
    if (matchDiary) {
      setDiary(matchDiary);
    } else {
      alert("일기가 존재하지 않습니다");
      navigate("/", { replace: true });
      // replace 속성을 true로 할경우 페이지를 이동후 다시 돌아오수없도록 뒤로가기 아이콘을 비활성화시킴
    }
  }, [id, data]);
  return data;
};
export default useDiary;
