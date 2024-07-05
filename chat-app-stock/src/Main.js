import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import QuestionAnswerFrame from "./components/QuestionAnswerFrame";
import Symbol from "./components/icons/Symbol";
import Input from "./components/Input";
import "./Main.css";
import Drawer from "./components/Drawer";

function Main() {
  const [message, setMessage] = useState("");
  const [isDrawerOpen, setDrawerOpen] = useState(false); // Drawer 상태
  const [isAnimating, setAnimating] = useState(false); // 애니메이션 상태
  // const [response, setResponse] = useState("");
  const navigate = useNavigate();
  
  const toggleDrawer = () => {
    // setDrawerOpen(!isDrawerOpen);
    if (isDrawerOpen) {
      setAnimating(true);
      setTimeout(() => {
        setDrawerOpen(false);
        setAnimating(false);
      }, 300); // 애니메이션 시간에 맞추기
    } else {
      setDrawerOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/chat/${encodeURIComponent(message)}`);
  };

  return (
    <div className="container">
      <Header toggleDrawer={toggleDrawer} showDemoButton={true} />
      <div className={`content ${isDrawerOpen || isAnimating ? "open" : ""}`}>
        <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        <div
          className={`innerContent ${
            isDrawerOpen || isAnimating ? "open" : ""
          }`}
        >
          <div className="contentWrapper">
            <div className="symbolContainer">
              <Symbol />
            </div>
            <QuestionAnswerFrame />
          </div>
          <form className="formWrapper" onSubmit={handleSubmit}>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onSubmit={handleSubmit}
            />
          </form>
        </div>
      </div>
    </div>
  );

}

export default Main;
