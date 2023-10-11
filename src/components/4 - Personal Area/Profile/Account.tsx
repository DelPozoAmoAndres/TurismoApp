import React from 'react';
/* Ionic components */
import { IonButton, IonGrid, IonIcon, IonLabel, IonRow } from '@ionic/react';
import { addOutline, trashOutline } from 'ionicons/icons';
/* i18n */
import { useTranslation } from 'react-i18next';

export const Account: React.FC = () => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  return (
    <IonGrid>
      <IonRow>
        <h2>
          <strong>{t('account.title')}</strong>
        </h2>
      </IonRow>
      <IonRow class="ion-justify-content-between ion-margin-top ion-align-items-center ">
        <IonLabel>{t('account.google')}</IonLabel>
        <IonButton disabled>
          <IonIcon slot="start" icon={addOutline} />
          {t('account.link')}
        </IonButton>
      </IonRow>
      <IonRow class="ion-justify-content-between ion-margin-top ion-align-items-center ">
        <IonLabel>{t('account.facebook')}</IonLabel>
        <IonButton disabled> 
          <IonIcon slot="start" icon={addOutline} />
          {t('account.link')}
        </IonButton>
      </IonRow>
      <IonRow class="ion-justify-content-between ion-margin-top ion-padding-top">
        <IonButton color={'danger'}>
          <IonIcon slot="start" icon={trashOutline} />
          {t('account.delete')}
        </IonButton>
      </IonRow>
    </IonGrid>
  );
};
