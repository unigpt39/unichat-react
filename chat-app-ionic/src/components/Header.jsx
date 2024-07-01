import React from "react";
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, useIonRouter } from '@ionic/react';
import MenuBurgerIcon from "./icons/MenuBurgerIcon";
import "./Header.css";

const Header = ({ toggleDrawer, showDemoButton }) => {
  const router = useIonRouter();

  const handleDemoClick = () => {
    router.push('/company-policy');
  };

  return (
    // <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={toggleDrawer}>
            <MenuBurgerIcon />
          </IonButton>
        </IonButtons>
        <IonTitle>Chat to</IonTitle>
        {showDemoButton && (
          <IonButtons slot="end">
            <IonButton onClick={handleDemoClick}>Demo</IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    // </IonHeader>
  );
};

export default Header;