import React, { useEffect, useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';

const CompanyPolicy: React.FC = () => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    fetch('/manual.html')
      .then((response) => response.text())
      .then((data) => setContent(data))
      .catch((error) => console.error('Error fetching the HTML file:', error));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Company Policy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div
          className="companyPolicy"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </IonContent>
    </IonPage>
  );
};

export default CompanyPolicy;