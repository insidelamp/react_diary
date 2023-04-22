import React from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("sort"));
  return (
    <div>
      <Button
        text={"버튼텍스트"}
        type={"negative"}
        onClickFunc={() => {
          alert("hi");
        }}
      />
    </div>
  );
}

export default Home;
