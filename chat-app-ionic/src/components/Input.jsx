// Input.jsx
import React from "react";
import InputIcon from "./icons/InputIcon";
import "./Input.css";

function Input({ value, onChange, onSubmit }) {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    background: "#000000", // 배경색을 검은색으로 변경
    borderRadius: 30,
    boxShadow: "0px 4px 10px 1px #0000001A",
    padding: "4px 4px 4px 16px",
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#797979",
    border: "none",
    cursor: "pointer",
    flexShrink: 0,
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="챗투에게 궁금한 걸 물어보세요"
        className="input input-dark" // 클래스 추가
      />
      <button type="submit" style={buttonStyle} onClick={onSubmit}>
        <InputIcon />
      </button>
    </div>
  );
}

export default Input;

