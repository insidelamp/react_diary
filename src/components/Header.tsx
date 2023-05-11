import styled from "styled-components";

interface HeaderType {
  title: string;
  leftChild?: JSX.Element;
  rightChild?: JSX.Element;
}

const Header = ({ title, leftChild, rightChild }: HeaderType) => {
  return (
    <HeadeWrapper>
      <HeaderLeft>{leftChild}</HeaderLeft>
      <HeaderTitle>{title}</HeaderTitle>
      <HeaderRight>{rightChild}</HeaderRight>
    </HeadeWrapper>
  );
};

const HeadeWrapper = styled.div`
  padding: 15px 0px;
  height: 20%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
`;
const HeaderTitle = styled.div`
  width: 50%;
  font-size: 25px;
  display: flex;
  justify-content: center;
`;

const HeaderLeft = styled.div`
  width: 25%;
  display: flex;
  justify-content: start;
`;

const HeaderRight = styled.div`
  width: 25%;
  display: flex;
  justify-content: end;
`;

export default Header;
