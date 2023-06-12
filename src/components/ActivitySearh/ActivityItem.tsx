import React from 'react';
/* Ionic components */
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonButton, IonIcon, IonItem, IonText } from '@ionic/react';
import { pencilOutline, star, trashOutline } from 'ionicons/icons';
/* Styles */
import './ActivityItem.css';
/* Models */
import { Activity } from '../../models/Activity';
import { Role } from '../../models/User';
/* i18n */
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContexts';
/* Hooks */
import { useScreen } from '../../hooks/useScreen';
/* Apis */
import { deleteActivity } from '../../apis/activityApi';

export const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const auth = useAuth(); //Context of the user
  const { isMobile } = useScreen(); //Hook to have data of screen dimensions
  activity.images=[""]
  return (
    <IonItem id="card-search" lines="none">
      <IonCard class="ion-no-margin" mode="ios" style={{ backgroundImage: 'url(' + activity.images[0] + ')' }}>
        <IonCardContent class="ion-no-padding"></IonCardContent>
      </IonCard>
      <IonCard class="ion-no-margin">
        <IonCardTitle>{activity.name}</IonCardTitle>
        <IonCardSubtitle>
          <IonText className="ion-margin-left">{activity.location}</IonText>
          <IonText class="ion-no-margin ion-align-items-center">
            <IonIcon icon={star} color="primary" />
            <IonText class="ion-no-margin">3/5 (323)</IonText>
          </IonText>
        </IonCardSubtitle>
        <IonText>
          <p>{activity.description}</p>
        </IonText>
        <IonCardContent class="ion-no-padding">
          {auth.user?.role === Role.administrador && !isMobile ? (
            <>
              <IonButton disabled color={'danger'}>
                <IonIcon icon={trashOutline} onClick={async () => activity._id && (await deleteActivity(activity._id))} />
                {t('delete')}
              </IonButton>
              <IonButton disabled>
                <IonIcon icon={pencilOutline} />
                {t('edit')}
              </IonButton>
            </>
          ) : (
            <IonText>
              <strong>
                {activity?.events && t('from') + activity?.events && activity.events.length > 0
                  ? Math.min(...activity.events.map((e) => e.price)).toString()
                  : ''}
              </strong>
            </IonText>
          )}
          <IonButton routerLink={`/activity/${activity._id}`}>{t('show.info')}</IonButton>
        </IonCardContent>
      </IonCard>
    </IonItem>
  );
};
