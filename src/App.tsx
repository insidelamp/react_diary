import { Routes, Route } from "react-router-dom";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { reducer, DateType, Actions } from "./components/Reducer";

import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";

import styled from "styled-components";
import backImg1 from "./img/backgroudImg/beautiful-nature.jpg";
import backImg2 from "./img/backgroudImg/beautiful-nature2.jpg";
import backImg3 from "./img/backgroudImg/beautiful-nature3.jpg";
import backImg4 from "./img/backgroudImg/flower.png";
import backImg5 from "./img/backgroudImg/flower2.png";
import backImg6 from "./img/backgroudImg/wood.jpg";
import backImg7 from "./img/backgroudImg/christmas-bauble.jpg";
import Modal from "./components/Modal";
type IStateContext = {
  data: DateType[];
  onCreate: ({ date, content, emotionId }: DateType) => void;
  onUpdate: ({ targetId, date, content, emotionId }: DateType) => void;
  onDelete: ({ targetId, date }: DateType) => void;
};
export type BackImgSelectType = {
  clickModal: boolean;
  setClickModal: React.Dispatch<React.SetStateAction<boolean>>;
};
export const DiaryStateContext = React.createContext<DateType[] | null>(null);
export const DiaryDispatchContext = React.createContext<IStateContext>(
  {} as IStateContext
);
export const backImgArr = [
  { img: backImg1, name: "숲" },
  { img: backImg2, name: "우주" },
  { img: backImg3, name: "나뭇잎" },
  { img: backImg4, name: "연꽃" },
  { img: backImg5, name: "꽃" },
  { img: backImg6, name: "나무" },
  { img: backImg7, name: "등" },
];

function App() {
  const idRef = useRef<number>(0);
  const [data, dispatch] = useReducer<
    (arg1: DateType[], actions: Actions) => DateType[]
  >(reducer, []);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [selectBackImg, setSelectBackImg] = useState<number>(0);
  const [clickModal, setClickModal] = useState<boolean>(false);
  useEffect(() => {
    const rawData = localStorage.getItem("diary");
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if (localData.length === 0) {
      setIsDataLoaded(true);
      return;
    }
    localData.sort((a: DateType, b: DateType) => Number(b.id) - Number(a.id));
    idRef.current = localData[0].id + 1;
    dispatch({ type: "INIT", data: localData });
    setIsDataLoaded(true);
  }, []);

  const onCreate = ({ date, content, emotionId }: DateType) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current + 1,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    idRef.current += 1;
  };

  const onUpdate = ({ targetId, date, content, emotionId }: DateType) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };

  const onDelete = ({ targetId, date }: DateType) => {
    if (targetId !== undefined && date !== undefined) {
      dispatch({
        type: "DELETE",
        data: {
          targetId,
          date,
        },
      });
    }
  };

  function changeImg(select: number) {
    if (select == 0) {
      setSelectBackImg(0);
    } else if (select == 1) {
      setSelectBackImg(1);
    } else if (select == 2) {
      setSelectBackImg(2);
    } else if (select == 3) {
      setSelectBackImg(3);
    } else if (select == 4) {
      setSelectBackImg(4);
    } else if (select == 5) {
      setSelectBackImg(5);
    } else if (select == 6) {
      setSelectBackImg(6);
    }
  }
  console.log(selectBackImg);
  if (!isDataLoaded) {
    return (
      <Main>
        <DiaryStateContext.Provider value={data}>
          <BackImg src={backImgArr[selectBackImg].img} />
          <DiaryDispatchContext.Provider
            value={{ data, onCreate, onUpdate, onDelete }}
          >
            <MainContent className="App">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      clickModal={clickModal}
                      setClickModal={setClickModal}
                    />
                  }
                />
                <Route path="/new" element={<New />} />
                <Route path="/diary/:id" element={<Diary />} />
                <Route path="/edit/:id" element={<Edit />} />
              </Routes>
              <div>데이터 준비중입니다</div>
            </MainContent>
            {clickModal ? (
              <SelectSpace>
                <Modal changeImg={changeImg} />
              </SelectSpace>
            ) : null}
          </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
      </Main>
    );
  } else {
    return (
      <Main>
        <DiaryStateContext.Provider value={data}>
          <BackImg src={backImgArr[selectBackImg].img} />
          <DiaryDispatchContext.Provider
            value={{ data, onCreate, onUpdate, onDelete }}
          >
            <MainContent className="App">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      clickModal={clickModal}
                      setClickModal={setClickModal}
                    />
                  }
                />
                <Route path="/new" element={<New />} />
                <Route path="/diary/:id" element={<Diary />} />
                <Route path="/edit/:id" element={<Edit />} />
              </Routes>
            </MainContent>
            {clickModal ? (
              <SelectSpace>
                <Modal changeImg={changeImg} />
              </SelectSpace>
            ) : null}
          </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
      </Main>
    );
  }
}
const Main = styled.div`
  margin: 0 auto;
  max-width: 550px;
  width: 100%;
  height: 95vh;
  background-color: white;
  box-shadow: rgba(100, 100, 100, 0.2) 0px 7px 29px 0px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const MainContent = styled.div`
  padding: 0px 20px;
  width: 100%;
  height: 89vh;
  border: 4px solid black;
  z-index: 3;
  background-color: white;
  border-radius: 20px;
  overflow-y: hidden;
`;
const SelectSpace = styled.div`
  width: 20vh;
  height: 90vh;
  z-index: 3;
`;
const BackImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
`;

export default App;
