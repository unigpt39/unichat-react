import React from "react";
import MenuBurgerIcon from "./icons/MenuBurgerIcon";
import "./Header.css";

function Header({ toggleDrawer, showDemoButton }) {
  // const headerStyle = {
  //   width: "100%",
  //   color: "#FFFFFF",
  //   padding: "24px",
  //   zIndex: 1000,
  //   borderBottom: "1px solid #E0E0E0",
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "space-between", // 좌우 배치
  //   position: "relative", // 상대 위치 설정
  // };

  // const iconTextStyle = {
  //   display: "flex",
  //   alignItems: "center",
  //   gap: 16,
  // };

  return (
    <div className="header">
      <div className="icon-text">
        <div onClick={toggleDrawer}>
          <MenuBurgerIcon />
        </div>
        <div className="title">Chat to</div>
      </div>
      {showDemoButton && <div className="demoButton">시연용</div>}
    </div>
  );
}

export default Header;
