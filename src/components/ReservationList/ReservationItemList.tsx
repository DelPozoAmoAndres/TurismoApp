import React from 'react';
/* Ionic Components */
import { IonButton, IonCardContent, IonCardSubtitle, IonItem, IonLabel, IonList, IonRow, IonText } from '@ionic/react';
/* Models */
import { Reservation } from '../../models/Reservation';
/* Utils */
import { formatDate } from '../../Utils/Utils';
/* i18n */
import { useTranslation } from 'react-i18next';

export const ReservationItemList: React.FC<{
  reservation: Reservation;
  last: boolean;
}> = ({ reservation, last }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  return (
    <>
      <IonCardContent className="ion-no-margin">
        <img
          width={100}
          height={80}
          alt={t('img.activity.alt') || ''}
          className="ion-margin-end"
          style={{ borderRadius: 6 }}
          src="https://imagenes.elpais.com/resizer/2kZjFxiNoG3Pvq9dbeHPTe7aiXc=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/RWF77A5EQGZX4QA2ABH76KQAZE.jpg"
        />
        <IonList class="ion-no-margin">
          <IonLabel>
            <strong>{reservation.activity?.name.toString()}</strong>
          </IonLabel>
          <IonText>{formatDate(reservation.event?.date || null, true)}</IonText>
          <IonText>{reservation.numPersons.toString()} personas</IonText>
          <IonRow class="ion-justify-content-between ion-align-items-center">
            <IonText>Total: {Number(reservation.event?.price) * Number(reservation.numPersons)}€</IonText>
            <IonCardSubtitle>{reservation.state}</IonCardSubtitle>
          </IonRow>
        </IonList>
      </IonCardContent>
      <IonItem lines={last ? 'none' : 'full'}>
        <IonButton expand="block" mode="ios" size="small" routerLink={`/reservation/${reservation._id}`}>
          Gestionar
        </IonButton>
      </IonItem>
    </>
  );
};
