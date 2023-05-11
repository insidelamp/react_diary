import { Routes, Route } from "react-router-dom";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { reducer, DateType, Actions } from "./components/Reducer";

import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";

type IStateContext = {
  data: DateType[];
  onCreate: ({ date, content, emotionId }: DateType) => void;
  onUpdate: ({ targetId, date, content, emotionId }: DateType) => void;
  onDelete: ({ targetId, date }: DateType) => void;
};

export const DiaryStateContext = React.createContext<DateType[] | null>(null);
export const DiaryDispatchContext = React.createContext<IStateContext>(
  {} as IStateContext
);

function App() {
  const idRef = useRef<number>(0);
  const [data, dispatch] = useReducer<
    (arg1: DateType[], actions: Actions) => DateType[]
  >(reducer, []);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
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

  if (!isDataLoaded) {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{ data, onCreate, onUpdate, onDelete }}
        >
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
            <div>데이터 준비중입니다</div>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider
          value={{ data, onCreate, onUpdate, onDelete }}
        >
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
