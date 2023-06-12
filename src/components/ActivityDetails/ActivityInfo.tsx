import React from 'react';
/* Ionic components */
import { IonButton, IonCardSubtitle, IonCardTitle, IonCol, IonLabel, IonRow, IonText } from '@ionic/react';
/* Models */
import { Activity } from '../../models/Activity';
/* Styles */
import './ActivityInfo.css';
/* i18n */
import { useTranslation } from 'react-i18next';
/* Hooks */
import { useScreen } from '../../hooks/useScreen';
import { useSoldOut } from '../../hooks/useSoldOut';
/* Models */

export const ActivityInfo: React.FC<{
  activityData: Activity;
  share: () => void;
}> = ({ activityData, share }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { browsingWeb } = useScreen(); //Hook to have data of screen dimensions
  const { soldOutProps } = useSoldOut(activityData?.events);

  return (
    <div id="activity-info" className="ion-margin-top">
      <IonRow class="ion-margin-bottom">
        <IonCardTitle>
          <strong>{activityData?.name}</strong>
        </IonCardTitle>
        <IonCardSubtitle>{activityData?.location}</IonCardSubtitle>
      </IonRow>
      <div>{browsingWeb && <IonButton onClick={share}>{t('share')}</IonButton>}</div>
      <IonRow class="ion-margin-top">
        <IonLabel>
          <strong>{t('description')}</strong>
        </IonLabel>
      </IonRow>
      <IonRow>
        <IonText>{activityData?.description}</IonText>
      </IonRow>
      <IonRow class="ion-margin-top">
        <IonLabel>
          <strong>{t('accesibility')}</strong>
        </IonLabel>
      </IonRow>
      <IonRow>{activityData?.accesibility}</IonRow>
      <IonRow class="ion-margin-top">
        <IonLabel>
          <strong>{t('duration')}</strong>
        </IonLabel>
      </IonRow>
      <IonRow>{t('duration.data') + ' ' + activityData?.duration + ' ' + t('minutes')}</IonRow>
      <IonRow>
        <IonLabel class="ion-margin-top">
          <strong>{t('info.extra')}</strong>
        </IonLabel>
      </IonRow>
      {activityData?.petsPermited ? t('pet.allowed') : t('pet.not.allowed')}
      {activityData?.events && (
        <IonRow>
          <IonRow class="ion-margin-top">
            <IonLabel>
              <strong>{t('price')}</strong>
            </IonLabel>
          </IonRow>
          {t('from')}{' '}
          {activityData?.events && activityData.events.length > 0 ? Math.min(...activityData.events.map((e) => e.price)).toString() : ''}
        </IonRow>
      )}
      <IonCol>
        <IonCol>
          <IonButton disabled expand="block" mode="ios">
            {t('show.events')}
          </IonButton>

          <IonButton {...soldOutProps} expand="block" mode="ios" id="Availability-modal">
            {activityData?.events ? t('show.availability') : t('sold.out')}
          </IonButton>
        </IonCol>
      </IonCol>
    </div>
  );
};
