// NotFound.tsx
import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonText } from '@ionic/react';

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>404 - Página no encontrada</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText>
          <p>Lo sentimos, la página que estás buscando no se encuentra en nuestro sitio.</p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
