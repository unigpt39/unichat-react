import React from "react";
import "./LoadingDots.css";

function LoadingDots() {
  return (
    <div className="loading-container">
      <div className="loading-dots">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className="loading-text">생각하고 있어요!</span>
    </div>
  );
}

export default LoadingDots;
