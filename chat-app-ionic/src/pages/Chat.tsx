import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonSelect, 
  IonSelectOption,
  IonItem,
  IonLabel,
  IonList,
  IonButton
} from '@ionic/react';

import Header from "../components/Header";
import QuestionAnswerFrame from "../components/QuestionAnswerFrame";
import Symbol from "../components/icons/Symbol";
import Icon from "../components/icons/Icon";
import Input from "../components/Input";
import ResponseIcon from "../components/icons/ResponseIcon";
import LoadingDots from "../components/LoadingDots";
import ShrinkIcon from "../components/icons/ShrinkIcon";
import ExpandIcon from "../components/icons/ExpandIcon";

import "./Chat.css";

interface Message {
  text: string;
  type: 'user' | 'bot';
  model?: string;
  reference?: string | null;
}

interface TextDisplayProps {
  text: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text }) => {
  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      {text}
    </div>
  );
};

const Chat: React.FC = () => {
  const { question } = useParams<{ question: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const firstRender = useRef<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<boolean[]>([]);
  const [model, setModel] = useState<string>("GPT-3.5");

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
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (text: string, type: 'user' | 'bot', model?: string, reference?: string | null) => {
    setMessages(prevMessages => [...prevMessages, { text, type, model, reference }]);
  };

  const fetchResponse = async (message: string) => {
    setLoading(true);
    try {
      const url = model === "GPT-4"
        ? "http://121.131.131.100:39091/chatgpt4"
        : "http://121.131.131.100:39091/chatgpt";
      
      const res = await axios.post(url, {
        message: decodeURIComponent(message),
      });
      const newResponse = {
        text: res?.data?.answer,
        type: "bot" as const,
        model: model,
        reference: res?.data?.reference,
      };
      addMessage(newResponse.text, newResponse.type, newResponse.model, newResponse.reference);
    } catch (error) {
      if (error instanceof Error) {
        const errorResponse = {
          text: "Error: " + error.message,
          type: "bot" as const,
          model: model,
          reference: null,
        };
        addMessage(errorResponse.text, errorResponse.type, errorResponse.model, errorResponse.reference);
      }
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim() === "") return;

    addMessage(currentMessage, "user");
    fetchResponse(currentMessage);
    setCurrentMessage("");
  };

  const handleToggleExpand = (index: number) => {
    setExpanded(prevExpanded => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* <IonTitle>Chat</IonTitle> */}

          <IonItem>
            {/* <IonLabel>모델 선택</IonLabel> */}
            <IonSelect value={model} onIonChange={(e) => setModel(e.detail.value!)}>
              <IonSelectOption value="GPT-3.5">GPT-3.5</IonSelectOption>
              <IonSelectOption value="GPT-4">GPT-4</IonSelectOption>
            </IonSelect>
          </IonItem>

        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          {/* <Header /> */}
          <div className="chatContent">        
            <div className="chatWindow">
              {/* <IonItem>
                <IonLabel>모델 선택:</IonLabel>
                <IonSelect value={model} onIonChange={(e) => setModel(e.detail.value!)}>
                  <IonSelectOption value="GPT-3.5">GPT-3.5</IonSelectOption>
                  <IonSelectOption value="GPT-4">GPT-4</IonSelectOption>
                </IonSelect>
              </IonItem> */}
              <div className="dateTime">
                {formattedDate} {formattedTime}
              </div>
              
              <IonList className="messagesContainer">
                {messages.map((msg, index) => (
                  <IonItem key={index} className={`chatBox ${msg.type}`}>
                    {msg.type === "bot" && (
                      <div className="responseIconContainer">
                        <ResponseIcon />
                        <div className="modelLabel">{msg.model}</div>
                      </div>
                    )}
                    <div className={`message ${msg.type}Box`}>
                      <TextDisplay text={msg.text}/>
                      {msg.type === "bot" && (
                        <>
                          <IonButton 
                            fill="clear"
                            onClick={() => handleToggleExpand(index)}
                          >
                            <span>RAG</span>
                            {expanded[index] ? <ShrinkIcon /> : <ExpandIcon />}
                          </IonButton>
                          {expanded[index] && msg.reference && (
                            <div className="reference">
                              <TextDisplay text={msg.reference}/>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    {msg.type === "user" && loading && index === messages.length - 1 && (
                      <div className="chatBox loading">
                        <ResponseIcon />
                        <LoadingDots />
                      </div>
                    )}
                  </IonItem>
                ))}
                <div ref={messagesEndRef}></div>
              </IonList>
            </div>
            <form className="formWrapper" onSubmit={handleSubmit}>
              <Input
                value={currentMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentMessage(e.target.value)}
                onSubmit={handleSubmit}
              />
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chat;