import { getEmotionImgById } from "./until";
import { Routes, Route } from "react-router-dom";
import { useEffect, useReducer, useRef, useState } from "react";
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

function App() {
  const idRef = useRef<number>(null);
  const [data, dispatch] = useReducer<
    (arg1: DateType[], actions: Actions) => DateType[]
  >(reducer, []);

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
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
