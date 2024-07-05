import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./Header.css";
import { setChatOption , setTheme } from '../chatActions';

function Header({ toggleDrawer }) {
  const dispatch = useDispatch();
  const selectedOption = useSelector(state => state.chat.chatOption);

  const handleCompanyPolicyClick = () => {
    const pdfPath = "/stocktrade_law.pdf";
    window.open(pdfPath, "증권거래법시행령", "width=800,height=600");
  };

  const handleManualClick = () => {
    const pdfPath = "/manual.pdf";
    window.open(pdfPath, "회사표준규정", "width=800,height=600");
  };

  const handleComboBoxChange = (event) => {
    dispatch(setChatOption(event.target.value));
  };

  return (
    <div className="header">
      <div className="icon-text">
        {/* <div onClick={toggleDrawer}>
          <MenuBurgerIcon />
        </div> */}
        <div className="title">Chat about</div>
        <select value={selectedOption} onChange={handleComboBoxChange}>
          <option value="company_manual">회사표준규정</option>
          <option value="stock_law">증권거래법시행령</option>
        </select>
      </div>
      <div className="policyButtons">
        <button className="policyButton" onClick={handleCompanyPolicyClick}>
          증권거래법시행령
        </button>
        <button className="policyButton" onClick={handleManualClick}>
          회사표준규정
        </button>
      </div>
    </div>
  );
}

export default Header;