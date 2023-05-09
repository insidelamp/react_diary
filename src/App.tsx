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

interface StateType {
  type: string;
  data: Partial<DateType>;
}
type IStateContext = {
  data?: DateType[];
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
    id: 0,
    date: new Date().getTime() - 1,
    content: "mock1",
    emotionId: 1,
    targetId: 1,
  },
  {
    id: 1,
    date: new Date().getTime() - 2,
    content: "mock2",
    emotionId: 2,
    targetId: 2,
  },
  {
    id: 2,
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
  console.log(idRef);
  useEffect(() => {
    defaultData(mockData);
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
    if (date !== undefined) {
      dispatch({
        type: "UPDATE",
        data: {
          id: targetId,
          date: new Date(date).getTime(),
          content,
          emotionId,
        },
      });
    }
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
