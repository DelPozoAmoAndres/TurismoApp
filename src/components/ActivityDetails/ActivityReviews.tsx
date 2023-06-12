import React from 'react';
/* Ionic components */
import { IonButton, IonCard, IonIcon, IonImg, IonLabel, IonText } from '@ionic/react';
import { starOutline } from 'ionicons/icons';
/* Style */
import './ActivityReviews.css';
/* i18n */
import { useTranslation } from 'react-i18next';

export const ActivityReviews: React.FC = () => {
  const defaultComment = {
    image:
      'https://imagenes.elpais.com/resizer/2kZjFxiNoG3Pvq9dbeHPTe7aiXc=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/RWF77A5EQGZX4QA2ABH76KQAZE.jpg',
    userName: 'Nombre de usuario',
    date: '2023-05-03',
    score: 3,
    text: 'mensaje opcional para describir como ha sido tu experiencia',
  };
  const listOfComments = [];
  listOfComments.push(defaultComment);
  listOfComments.push(defaultComment);
  listOfComments.push(defaultComment);
  listOfComments.push(defaultComment);
  listOfComments.push(defaultComment);
  listOfComments.push(defaultComment);
  listOfComments.push(defaultComment);
  listOfComments.push(defaultComment);

  const { t } = useTranslation();
  return (
    <div className="ion-margin">
      <IonLabel>
        <strong>{t('reviews.title')}</strong>
      </IonLabel>
      <div id="list-activity-review" className="ion-margin-vertical">
        {listOfComments.map((comment, index) => (
          <IonCard key={'Review' + index} id="activity-review" class="ion-no-margin">
            <section className="ion-margin-bottom">
              <IonImg src={comment.image} />
              <section>
                <IonLabel>
                  <strong>{comment.userName}</strong>
                </IonLabel>
                <section>
                  <IonLabel>{comment.date}</IonLabel>
                  <IonLabel>
                    {comment.score}/5 <IonIcon icon={starOutline} />
                  </IonLabel>
                </section>
              </section>
            </section>
            <IonText>{comment.text}</IonText>
            <IonButton disabled color={'danger'} expand="block">
              {t('report')}
            </IonButton>
          </IonCard>
        ))}
      </div>
    </div>
  );
};
