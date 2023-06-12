import React from 'react';
/* Ionic Components */
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonLabel, IonList, IonText } from '@ionic/react';
/* Utils */
import { formatDate } from '../../Utils/Utils';
/* Models */
import { Reservation } from '../../models/Reservation';
/* Hooks */
import { useScreen } from '../../hooks/useScreen';

export const ReservationActivityData: React.FC<{
  reservation: Reservation;
}> = ({ reservation }) => {
  const { isMobile } = useScreen(); //Hook to have data of screen dimensions

  return (
    <section className={isMobile ? 'ion-margin-horizontal' : ''}>
      <IonCard>
        <IonImg
          src="https://imagenes.elpais.com/resizer/2kZjFxiNoG3Pvq9dbeHPTe7aiXc=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/RWF77A5EQGZX4QA2ABH76KQAZE.jpg"
          style={{ maxWidth: isMobile ? 'none' : 500 }}
        />
      </IonCard>
      <section hidden={isMobile}>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{reservation?.activity?.name}</IonCardTitle>
            <IonCardSubtitle>{formatDate(reservation?.event?.date || null, true)}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonLabel>
                <strong>Descripción:</strong>
              </IonLabel>
              <IonText>{String(reservation?.activity?.description)}</IonText>
            </IonList>
          </IonCardContent>
        </IonCard>
      </section>
    </section>
  );
};
