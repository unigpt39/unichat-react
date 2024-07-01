import React from "react";
import InputIcon from "./icons/InputIcon";
import "./Input.css"; // CSS 파일로 변경

function Input({ value, onChange, onSubmit }) {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    background: "#FFFFFF",
    borderRadius: 30,
    boxShadow: "0px 4px 10px 1px #0000001A", // 그림자 효과
    padding: "4px 4px 4px 16px",
    // width: 730,
    // width: "100%",
    // maxWidth: 730,
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // width: 36,
    // height: 36,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#797979",
    border: "none", // 기본 버튼 스타일 제거
    cursor: "pointer", // 마우스 커서가 포인터로 변경
    flexShrink: 0, // 아이콘 크기가 줄어들지 않도록 설정
  };

  //   const mediaQueryStyle = `
  //   @media (max-width: 797px) {
  //     .container {
  //       width: 100%;
  //     }
  //   }
  // `;

  return (
    <div style={containerStyle}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="챗투에게 궁금한 걸 물어보세요"
        className="input" // 클래스명 변경
      />
      <button type="submit" style={buttonStyle} onClick={onSubmit}>
        <InputIcon />
      </button>
      {/* <style>{mediaQueryStyle}</style> */}
    </div>
  );
}

export default Input;
