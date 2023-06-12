import React from 'react';
/* Ionic Components*/
import { IonButton, IonGrid, IonIcon, IonLabel, IonRow } from '@ionic/react';
import { copyOutline, logoWhatsapp, mailOutline } from 'ionicons/icons';
/* i18n */
import { useTranslation } from 'react-i18next';

export const Help: React.FC = () => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  return (
    <IonGrid style={{ width: '100%' }}>
      <IonRow>
        <h2>
          <strong>{t('help.title')}</strong>
        </h2>
      </IonRow>
      <IonRow style={{ width: '100%' }} class="ion-justify-content-between ion-margin-top ion-align-items-center ">
        <IonLabel>{t('help.email') + ':'}</IonLabel>
        <IonLabel>uo271035@uniovi.es</IonLabel>
        <IonButton>
          <IonIcon icon={copyOutline} />
          {t('copy')}
        </IonButton>
      </IonRow>
      <IonRow>
        <IonButton>
          <IonIcon slot="start" icon={mailOutline} />
          {t('send.message.email')}
        </IonButton>
      </IonRow>
      <IonRow class="ion-justify-content-between ion-margin-top ion-align-items-center ">
        <IonLabel>{t('help.telephone') + ': '}</IonLabel>
        <IonLabel> +34 681193906 </IonLabel>
        <IonButton>
          <IonIcon icon={copyOutline} />
          {t('copy')}
        </IonButton>
      </IonRow>
      <IonRow class="ion-align-items-center">
        <IonButton>
          <IonIcon slot="start" icon={logoWhatsapp} />
          {t('send.message.whatsapp')}
        </IonButton>
        <IonLabel>{t('o') + ' ' + t('call.by.telephone')}</IonLabel>
      </IonRow>
    </IonGrid>
  );
};
