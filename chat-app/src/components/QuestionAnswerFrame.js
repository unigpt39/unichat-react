import React from "react";
import CursorTextIcon from "./icons/CursorTextIcon";
import UserIcon from "./icons/UserIcon";
import SearchIcon from "./icons/SearchIcon";
import "./QuestionAnswerFrame.css";

function QuestionAnswerFrame() {
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "24px",
  };

  const boxStyle = {
    borderRadius: 10,
    padding: 16,
    background: "#FFFFFF",
    boxShadow: "0px 1px 1px 0px #00000040",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxWidth: 200,
  };

  const innerBoxStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
  };

  const textStyle = {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "17px",
    color: "#797979",
  };

  const newTextStyle = {
    fontSize: 12,
    fontWeight: 400,
    lineHeight: "17px",
    color: "#222222",
  };

  return (
    <div className="questionAnswerFrameContainer">
      <div className="box">
        <div className="innerBox">
          <CursorTextIcon />
          <div className="questionAnswerFrameTitle">
            묻기 어려운 것들을 질문해보세요
          </div>
        </div>
        <div className="questionAnswerFrameDescription">
          다른 사람에게 질문하기 곤란한 사내 질문이 있다면 저에게 물어보세요.
          방법을 찾아드릴게요!
        </div>
      </div>
      <div className="box">
        <div className="innerBox">
          <UserIcon />
          <div className="questionAnswerFrameTitle">
            사실 여부를 다시 확인해보세요
          </div>
        </div>
        <div className="questionAnswerFrameDescription">
          챗투는 여러분의 편의를 위해 존재합니다. 새로운 규정은 반영되지 않을 수
          있으니, 반드시 관계자에게 확인해주세요.
        </div>
      </div>
      <div className="box">
        <div className="innerBox">
          <SearchIcon />
          <div className="questionAnswerFrameTitle">다양한 의견이 필요해요</div>
        </div>
        <div className="questionAnswerFrameDescription">
          모든 의견을 소중히 여기며, 여러분의 아이디어와 제안을 환영합니다. 더
          나은 서비스를 위해 함께해 주세요.
        </div>
      </div>
    </div>
  );
}

export default QuestionAnswerFrame;
