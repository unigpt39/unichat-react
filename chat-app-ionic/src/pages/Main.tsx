import React, { useState } from "react";
import { 
  IonContent, 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonTitle,
  IonButton,
  IonIcon,
  useIonRouter
} from '@ionic/react';
import { menuOutline } from 'ionicons/icons';

import Header from "../components/Header";
import QuestionAnswerFrame from "../components/QuestionAnswerFrame";
import Symbol from "../components/icons/Symbol";
import Input from "../components/Input";
import Drawer from "../components/Drawer";

import "./Main.css";

const Main: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isAnimating, setAnimating] = useState<boolean>(false);
  const router = useIonRouter();

  const toggleDrawer = () => {
    if (isDrawerOpen) {
      setAnimating(true);
      setTimeout(() => {
        setDrawerOpen(false);
        setAnimating(false);
      }, 300);
    } else {
      setDrawerOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/chat/${encodeURIComponent(message)}`);
  };

  return (
    <IonPage>
      <IonHeader>
        {/* <IonToolbar>
          <IonButton slot="start" fill="clear" onClick={toggleDrawer}>
            <IonIcon icon={menuOutline} />
          </IonButton>
          <IonTitle>Main</IonTitle>
        </IonToolbar> */}
      </IonHeader>
      <IonContent>
        <div className="container">
          <Header toggleDrawer={toggleDrawer} showDemoButton={true} />
          <div className={`content ${isDrawerOpen || isAnimating ? "open" : ""}`}>
            <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
            <div className={`innerContent ${isDrawerOpen || isAnimating ? "open" : ""}`}>
              <div className="contentWrapper">
                <div className="symbolContainer">
                  <Symbol />
                </div>
                <QuestionAnswerFrame />
              </div>
              <form className="formWrapper" onSubmit={handleSubmit}>
                <Input
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
                  onSubmit={handleSubmit}
                />
              </form>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Main;