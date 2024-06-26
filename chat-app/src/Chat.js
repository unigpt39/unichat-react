import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import QuestionAnswerFrame from "./components/QuestionAnswerFrame";
import Symbol from "./components/icons/Symbol";
import Icon from "./components/icons/Icon";
import Input from "./components/Input";
import ResponseIcon from "./components/icons/ResponseIcon";
import "./Chat.css";
import { useParams } from "react-router-dom";
import LoadingDots from "./components/LoadingDots";
import ShrinkIcon from "./components/icons/ShrinkIcon";
import ExpandIcon from "./components/icons/ExpandIcon";

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

function Chat() {
  const { question } = useParams();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const firstRender = useRef(true); // 첫 번째 렌더링 여부를 추적
  const messagesEndRef = useRef(null); // 스크롤을 위한 ref
  const [expanded, setExpanded] = useState([]);
  const [model, setModel] = useState("GPT-3.5"); // 모델 선택 상태
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (question) {
        setMessages([{ text: question, type: "user", time: new Date() }]);
        fetchResponse(question);
      }
    }
  }, [question]);

  useEffect(() => {
    scrollToBottom(); // 새로운 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const addMessage = (text, type, model, reference, startTime, endTime) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, type, model, reference, time: new Date(), startTime, endTime },
    ]);
  };

  const fetchResponse = async (message) => {
    setLoading(true);
    const start = new Date();
    setStartTime(start); // 시작 시간 기록
    try {
      // const res = await axios.post("http://192.168.1.10:18001/chatgpt", {
      //   message: decodeURIComponent(message),
      const url =
        model === "GPT-4"
          ? "http://192.168.1.10:18001/chatgpt4"
          : "http://192.168.1.10:18001/chatgpt";
      const res = await axios.post(url, {
        message: decodeURIComponent(message),
      });

      let answerText = res?.data?.answer;

      if (model === "GPT-4" && answerText.startsWith("Answer: ")) {
        answerText = answerText.replace("Answer: ", "");
      }

      const end = new Date();
      setEndTime(end); // 종료 시간 기록
      const newResponse = {
        // text: res?.data?.answer,
        text: answerText,
        type: "bot",
        model: model,
        reference: res?.data?.reference,
        startTime: start,
        endTime: end,
      };
      addMessage(
        newResponse.text,
        newResponse.type,
        newResponse.model,
        newResponse.reference,
        newResponse.startTime,
        newResponse.endTime
      );
    } catch (error) {
      const end = new Date();
      setEndTime(end); // 오류 발생 시에도 종료 시간 기록
      const errorResponse = {
        text: "Error: " + error.message,
        type: "bot",
        model: model,
        reference: null,
        startTime: start,
        endTime: end,
      };
      addMessage(
        errorResponse.text,
        errorResponse.type,
        errorResponse.model,
        errorResponse.reference,
        errorResponse.startTime,
        errorResponse.endTime
      );
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   const getInitialResponse = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await axios.post("http://192.168.1.10:18001/chatgpt", {
  //         message: decodeURIComponent(question),
  //       });
  //       // console.log(res);
  //       const newResponse = { type: "bot", text: res?.data?.answer };
  //       setResponse(newResponse);
  //       // console.log(response);
  //     } catch (error) {
  //       const errorResponse = { type: "bot", text: "Error: " + error.message };
  //       setResponse(errorResponse);
  //     }
  //     setLoading(false);
  //   };

  //   getInitialResponse();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentMessage.trim() === "") return;

    const start = new Date();
    setStartTime(start); // 메시지 전송 시간 기록
    addMessage(currentMessage, "user");
    fetchResponse(currentMessage);
    setCurrentMessage("");
    // const newMessage = { type: "user", text: message };
    // setResponse(newMessage);

    // setLoading(true);
    // try {
    //   const res = await axios.post("http://192.168.1.10:18001/chatgpt", {
    //     message: message,
    //   });

    //   const newResponse = { type: "bot", text: res?.data?.answer };
    //   setResponse(newResponse);
    // } catch (error) {
    //   const errorResponse = { type: "bot", text: "Error: " + error.message };
    //   setResponse(errorResponse);
    // }
    // setLoading(false);

    // setMessage("");
  };

  const handleToggleExpand = (index) => {
    // setExpanded((prevState) => ({
    //   ...prevState,
    //   [index]: !prevState[index],
    // }));
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // weekday: "long",
  });

  const formattedTime = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formatElapsedTime = (start, end) => {
    if (!start || !end) return null;
    const elapsed = end - start;
    const seconds = Math.floor(elapsed / 1000);
    const milliseconds = elapsed % 1000;
    return `${seconds}.${milliseconds} 초`;
  };

  return (
    <div className="container">
      <Header />
      <div className="chatContent">
        {/* <div className="innerContent">
      <div className="flexCenter">
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
      <div className="iconRight">
        <Icon />
      </div>
    </div> */}
        {/* {response.map((res, index) => (
      <div key={index} className={`message ${res.type}`}>
        {res.text}
      </div>
    ))} */}
        <div className="chatWindow">
          <div className="modelSelector">
            {/* <label htmlFor="modelSelect">모델 선택:</label> */}
            <select
              id="modelSelect"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              <option value="GPT-3.5">GPT-3.5</option>
              <option value="GPT-4">GPT-4</option>
            </select>
          </div>
          <div className="dateTime">
            {/* {date.toLocaleDateString()} {date.toLocaleTimeString()} */}
            {formattedDate} {formattedTime}
          </div>
          {/* <div className="chatBox">
      <div className="questionBox">{question}</div>
      <div className="responseBox">
        <div>
          <ResponseIcon />
        </div>
        {loading ? (
          <LoadingDots />
        ) : (
          <div className="responseText">{response?.text}</div>
        )}
      </div>
    </div>
  </div> */}
          <div className="messagesContainer">
            {messages.map((msg, index) => (
              <div key={index} className={`chatBox ${msg.type}`}>
                {msg.type === "bot" && (
                  <div className="responseIconContainer">
                    <ResponseIcon />
                    <div className="modelLabel">{msg.model}</div>
                  </div>
                )}
                <div className={`message ${msg.type}Box`}>
                  {msg.text}
                  {msg.type === "bot" && (
                    <>
                      <div
                        className="toggleButton"
                        onClick={() => handleToggleExpand(index)}
                      >
                        <span>RAG</span>
                        {expanded[index] ? <ShrinkIcon /> : <ExpandIcon />}
                      </div>
                      {expanded[index] && (
                        <div className="reference">{msg.reference}</div>
                      )}
                    </>
                  )}
                  {msg.type === "bot" && msg.startTime && msg.endTime && (
                    <div className="responseTime">
                      응답 시간: {formatElapsedTime(msg.startTime, msg.endTime)}
                    </div>
                  )}
                </div>
                {msg.type === "user" &&
                  loading &&
                  index === messages.length - 1 && (
                    <div className="chatBox loading">
                      <ResponseIcon />
                      <LoadingDots />
                    </div>
                  )}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
        <form className="formWrapper" onSubmit={handleSubmit}>
          <Input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onSubmit={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}

export default Chat;
