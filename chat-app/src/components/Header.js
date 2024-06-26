import React from "react";
import MenuBurgerIcon from "./icons/MenuBurgerIcon";
import "./Header.css";
import { useNavigate } from "react-router-dom";

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

  // const navigate = useNavigate();

  const handleCompanyPolicyClick = () => {
    // navigate("/company-policy");
    window.open("/company-policy", "CompanyPolicy", "width=800,height=600");
  };

  return (
    <div className="header">
      <div className="icon-text">
        <div onClick={toggleDrawer}>
          <MenuBurgerIcon />
        </div>
        <div className="title">Chat to</div>
      </div>
      {/* {showDemoButton && <div className="demoButton">시연용</div>} */}
      <div className="companyPolicyButton" onClick={handleCompanyPolicyClick}>
        사내규정집
      </div>
    </div>
  );
}

export default Header;
