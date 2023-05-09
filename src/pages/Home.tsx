import React, { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import styled from "styled-components";
import { DateType } from "../components/Reducer";
import { getMonthRangeByDate } from "../until";
import DiaryList from "../components/DiaryList";
function Home() {
  const [pivotDate, setPrivotDate] = useState<Date>(new Date());
  const data = useContext(DiaryStateContext);
  const [filteredData, setFilteredDate] = useState<DateType[]>([]);
  const headerTitle = `${pivotDate.getFullYear()}년 ${
    pivotDate.getMonth() + 1
  }월`;
  const onIncreaseMonth = () => {
    setPrivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreaseMonth = () => {
    setPrivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  useEffect(() => {
    if (data !== null && data.length >= 1) {
      const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
      setFilteredDate(
        data.filter(
          (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
        )
      );
    } else {
      setFilteredDate([]);
    }
  }, [data, pivotDate]);
  return (
    <HomeWrapper>
      <Header
        title={headerTitle}
        leftChild={<Button text={"<"} onClickFunc={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClickFunc={onIncreaseMonth} />}
      />
      <DiaryList data={filteredData} />
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  width: 100%;
`;

export default Home;
