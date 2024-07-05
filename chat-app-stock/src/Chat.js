import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Input from "./components/Input";
import ResponseIcon from "./components/icons/ResponseIcon";
import "./Chat.css";
import { useParams } from "react-router-dom";
import LoadingDots from "./components/LoadingDots";
import ShrinkIcon from "./components/icons/ShrinkIcon";
import ExpandIcon from "./components/icons/ExpandIcon";
import { useSelector , useDispatch} from 'react-redux';
import { addMessage, setChatOption } from './redux/chatSlice';


const TextDisplay = ({ text, isApiResponse }) => {
  if (!text) return null;
  return (
    <div className={`text-display ${isApiResponse ? 'api-response' : ''}`}>
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {text}
      </div>
    </div>
  );
};

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
  // const [startTime, setStartTime] = useState(null);
  // const [responseTime, setResponseTime] = useState(null);

  const chatOption = useSelector(state => state.chat.chatOption);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (question) {
        setMessages([{ text: question, type: "user" }]);
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

  const addMessage = (text, type, model, reference) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, type, model, reference },
    ]);
  };


  const fetchResponse = async (message) => {
    setLoading(true);
    try {
      let baseUrl;
      if (chatOption === 'company_manual') {
        baseUrl = process.env.REACT_APP_COMPANY_MANUAL_URL;
      } else {
        baseUrl = process.env.REACT_APP_STOCKTRADE_LAW_URL;
      }

      const url = model === "GPT-4"
        ? `${baseUrl}/chatgpt4`
        : `${baseUrl}/chatgpt`;
      
      const res = await axios.post(url, {
        message: decodeURIComponent(message),
      });
      const newResponse = {
        text: res?.data?.answer,
        type: "bot",
        model: model,
        reference: res?.data?.reference,
      };
      addMessage(
        newResponse.text,
        newResponse.type,
        newResponse.model,
        newResponse.reference
      );
    } catch (error) {
      const errorResponse = {
        text: "Error: " + error.message,
        type: "bot",
        model: model,
        reference: null,
      };
      addMessage(
        errorResponse.text,
        errorResponse.type,
        errorResponse.model,
        errorResponse.reference
      );
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentMessage.trim() === "") return;

    // setStartTime(new Date()); // 메시지 전송 시간 기록
    // setResponseTime(null); // 이전 응답 시간 초기화
    addMessage(currentMessage, "user");
    fetchResponse(currentMessage);
    setCurrentMessage("");
    
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

  return (
    <div className="container">
      <Header />
      <div className="chatContent">        
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
   {msg.type === "bot" ? (
     <div className="answer">
       <TextDisplay text={msg.text} isApiResponse={true} />
     </div>
   ) : (
     <TextDisplay text={msg.text} isApiResponse={false} />
   )}
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
         <div className="reference">
           <TextDisplay text={msg.reference} isApiResponse={true} />
         </div>
       )}
     </>
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
