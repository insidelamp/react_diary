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
import {
  defaultData,
  onCreate,
  onDelete,
  onUpdate,
} from "./components/clickFuction";

import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";

interface StateType {
  type: string;
  data: Partial<DateType>;
}
interface IStateContext {
  data?: DateType[];
  onCreate?: (
    { date, content, emotionId, id }: DateType,
    idRef: any,
    dispatch: ({ type, data }: Actions) => void
  ) => void;
  onUpdate?: (
    { targetId, date, content, emotionId }: DateType,
    idRef: any,
    dispatch: ({ type, data }: Actions) => void
  ) => void;
  onDelete?: (
    { targetId, date }: DateType,
    idRef: any,
    dispatch: ({ type, data }: Actions) => void
  ) => void;
}

export const DiaryStateContext = React.createContext<DateType[] | null>(null);
export const DiaryDispatchContext = React.createContext<
  IStateContext | undefined
>(undefined);
function App() {
  const idRef = useRef<HTMLDivElement>(null);
  const [data, dispatch] = useReducer<
    (arg1: DateType[], actions: Actions) => DateType[]
  >(reducer, []);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

  const mockData = [
    {
      id: "mock1",
      date: new Date().getTime(),
      content: "mock1",
      emotionId: 1,
      targetId: 1,
    },
    {
      id: "mock2",
      date: new Date().getTime(),
      content: "mock2",
      emotionId: 2,
      targetId: 2,
    },
    {
      id: "mock3",
      date: new Date().getTime(),
      content: "mock3",
      emotionId: 3,
      targetId: 3,
    },
  ];
  useEffect(() => {
    defaultData(mockData, dispatch);
    setIsDataLoaded(true);
  }, []);

  if (!isDataLoaded) {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
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
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
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
