import React from 'react';
/* Ionic components */
import { IonButton, IonCard, IonCardContent, IonCardTitle, IonText } from '@ionic/react';
/* Styles*/
import './Home.css';
/* i18n */
import { useTranslation } from 'react-i18next';

export const HomeWelcomeCard = () => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  return (
    <IonCard id="card-welcome" mode="ios">
      <IonCardTitle class="text-white">
        <p className="ion-padding-horizontal">{t('welcome.title')}</p>
      </IonCardTitle>
      <IonCardContent class="ion-no-margin no-border">
        <IonText class="text-white">
          <p>{t('welcome.message')}</p>
        </IonText>
        <IonButton class="ion-margin-bottom" routerLink="/buscar">
          {t('welcome.search')}
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};
