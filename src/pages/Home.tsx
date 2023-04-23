import React from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <Editor
        initData={{
          date: new Date().getTime(),
          emotionId: 1,
          content: "이전에 작성했던 일기",
        }}
        onSubmit={() => {
          alert("작성완료");
        }}
      />
    </div>
  );
}

export default Home;
