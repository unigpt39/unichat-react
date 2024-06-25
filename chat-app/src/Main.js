import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import QuestionAnswerFrame from "./components/QuestionAnswerFrame";
import Symbol from "./components/icons/Symbol";
import Icon from "./components/icons/Icon";
import Input from "./components/Input";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import Drawer from "./components/Drawer";
// import "./Chat.scss";

// const containerStyle = {
//   display: "flex",
//   flexDirection: "column",
//   height: "100vh",
//   overflow: "hidden",
// };

// const contentStyle = {
//   flex: 1,
//   padding: "24px",
//   overflow: "auto",
//   background: "#f3f6fb",
// };

// const innerContentStyle = {
//   display: "flex",
//   flexDirection: "column",
//   gap: "24px",
//   height: "100%",
// };

// const flexCenterStyle = {
//   flex: 1,
//   overflow: "auto",
//   display: "flex",
//   flexDirection: "column",
//   gap: "80px",
//   justifyContent: "center",
//   alignItems: "center",
// };

// const symbolContainerStyle = {
//   display: "flex",
//   justifyContent: "center",
// };

// const iconRightStyle = {
//   display: "flex",
//   justifyContent: "flex-end",
// };

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
        <div className="innerContent">
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
          {/* <div className="flexCenter">
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
          </div> */}
          {/* <div className="iconRight">
            <Icon />
          </div> */}
        </div>
      </div>
    </div>
    // <div>
    //     <h1>Chat with GPT-3.5-turbo</h1>
    //     <form onSubmit={handleSubmit}>
    //         <input
    //             type="text"
    //             value={message}
    //             onChange={(e) => setMessage(e.target.value)}
    //             placeholder="Type your message"
    //         />
    //         <button type="submit">Send</button>
    //     </form>
    //     <div>
    //         <h2>Response:</h2>
    //         <p>{response}</p>
    //     </div>
    // </div>
  );
}

export default Main;
