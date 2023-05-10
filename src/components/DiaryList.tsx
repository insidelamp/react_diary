import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import { DateType } from "./Reducer";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];
function DiaryList(data: { data: DateType[] }) {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<string>("latest");
  const [sortedData, setSortedData] = useState<DateType[]>([]);
  const onChangeSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
  };
  const onClickNew = () => {
    navigate("/new");
  };
  useEffect(() => {
    const compare = (a: DateType, b: DateType) => {
      if (sortType === "latest") {
        return Number(b.date) - Number(a.date);
      } else {
        return Number(a.date) - Number(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(data.data));
    copyList.sort(compare);
    setSortedData(copyList);
  }, [data, sortType]);
  return (
    <Wrapper>
      <MenuWrapper>
        <div>
          <MenuSelect value={sortType} onChange={onChangeSortType}>
            {sortOptionList.map((it, idx) => (
              <option key={idx} value={it.value}>
                {it.name}
              </option>
            ))}
          </MenuSelect>
        </div>
        <ListRight>
          <Button
            type={"positive"}
            text={"새 일기 쓰기"}
            onClickFunc={onClickNew}
          />
        </ListRight>
      </MenuWrapper>
      <ListWrapper>
        {sortedData.map((it) => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </ListWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 20px 10px 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  flex-grow: 1;
  width: 100%;
  border: 2px solid blue;
`;

const MenuWrapper = styled.div`
  width: 100%;
  margin: 20px 0px 30px 0px;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

const MenuSelect = styled.select`
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ececec;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 18px;
`;
const ListRight = styled.div`
  border: none;
  background-color: white;
  width: 100%;
  & > button {
    width: 100%;
    flex-grow: 1;
  }
`;
const ListWrapper = styled.div``;

export default DiaryList;
