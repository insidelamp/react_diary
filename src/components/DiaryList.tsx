import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BackImgSelectType } from "../App";
import Button from "./Button";
import DiaryItem from "./DiaryItem";
import Modal from "./Modal";
import { DateType } from "./Reducer";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

interface ListType {
  data: DateType[];
  clickModal: boolean;
  setClickModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function DiaryList({ data, clickModal, setClickModal }: ListType) {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<string>("latest");
  const [sortedData, setSortedData] = useState<DateType[]>([]);
  const onChangeSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value);
  };
  const onClickNew = () => {
    navigate("/new");
  };

  function clickModalFunc() {
    setClickModal(!clickModal);
  }

  useEffect(() => {
    const compare = (a: DateType, b: DateType) => {
      if (sortType === "latest") {
        return Number(b.date) - Number(a.date);
      } else {
        return Number(a.date) - Number(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(data));
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
        <BackSelectBtn onClick={clickModalFunc}>배경선택</BackSelectBtn>
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
  position: relative;
`;

const MenuWrapper = styled.div`
  width: 100%;
  margin: 20px 0px 30px 0px;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  position: absolute;
`;

const MenuSelect = styled.select`
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ececec;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 13px;
`;
const ListRight = styled.div`
  border: none;
  background-color: white;
  width: 95%;
  & > button {
    width: 95%;
    flex-grow: 1;
  }
`;
const BackSelectBtn = styled.div`
  width: 200px;
  font-size: 13px;
  background-color: goldenrod;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ListWrapper = styled.div`
  margin-top: 80px;
  overflow: scroll;
  width: 100%;
  height: 70vh;
`;

export default DiaryList;
