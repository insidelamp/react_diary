import { getEmotionImgById } from "./until";
import { Routes, Route } from "react-router-dom";
import React, {
  useEffect,
  useReducer,
  useRef,
  useState,
  Dispatch,
} from "react";
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

const mockData = [
  {
    id: "mock1",
    date: new Date().getTime() - 1,
    content: "mock1",
    emotionId: 1,
    targetId: 1,
  },
  {
    id: "mock2",
    date: new Date().getTime() - 2,
    content: "mock2",
    emotionId: 2,
    targetId: 2,
  },
  {
    id: "mock3",
    date: new Date().getTime() - 3,
    content: "mock3",
    emotionId: 3,
    targetId: 3,
  },
];

function App() {
  const idRef = useRef<number>(mockData.length);
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

  const defaultData = (data: DateType[]) => {
    dispatch({
      type: "INIT",
      data: [...data],
    });
  };

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
