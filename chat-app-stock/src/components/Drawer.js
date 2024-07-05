import React from "react";
import "./Drawer.css";

function Drawer({ isOpen, toggleDrawer }) {
  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleDrawer}>
        X
      </button>
      <div className="drawer-content">
        <p>Drawer Content</p>
      </div>
    </div>
  );
}

export default Drawer;
