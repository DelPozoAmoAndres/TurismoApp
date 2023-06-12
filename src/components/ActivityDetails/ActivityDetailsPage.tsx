import React from 'react';
import { RouteComponentProps } from 'react-router';
/* Ionic components */
import {
  IonContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonAlert,
  IonRow,
  IonCard,
  IonImg,
} from '@ionic/react';
import { shareSocialOutline } from 'ionicons/icons';
/* Hooks */
import { useScreen } from '../../hooks/useScreen';
import { useActivityData } from '../../hooks/useActivityData';
import { useShare } from '../../hooks/useShare';
/* Components */
import { ActivityInfo } from './ActivityInfo';
import { ActivityReviews } from './ActivityReviews';
import { ActivityAvailability } from './ActivityAvailability';
/* i18n */
import { useTranslation } from 'react-i18next';
import { AppPage } from '../../pages/AppPage';
/* Carousel */
import { Keyboard, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
/* Styles */
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './ActivityDetailsPage.css';
import LoadingPage from '../../pages/LoadingPage';

type ActivityDetailsProps = RouteComponentProps<{ id: string }>;

const ActivityDetailsPage: React.FC<ActivityDetailsProps> = ({ match }) => {
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { browsingWeb } = useScreen(); //Hook to have data of screen dimensions
  const { activityData } = useActivityData(match.params.id); //Hook to have all the data of an activity
  const { shareActivity, showAlert, setShowAlert } = useShare(match.params.id); //Hook to share a link to the activity

  const header = (
    <IonHeader mode="ios" collapse="fade" class="ion-no-border">
      <IonToolbar>
        {/* Back button */}
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" text={t('go.back')} />
        </IonButtons>
        {/* Share button */}
        <IonButtons slot="end" onClick={async () => await shareActivity()}>
          <IonButton>
            {t('share')}
            <IonIcon slot="end" icon={shareSocialOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );

  const content = activityData ? (
    <IonContent>
      <ActivityAvailability activityId={match.params.id} />
      <IonRow class="ion-justify-content-center ion-margin-top">
        <section className="ion-margin-horizontal">
          <IonCard id="activity-image-card" class="ion-no-margin" mode="ios">
            <Swiper
              pagination={{ type: 'fraction' }}
              keyboard={{ enabled: true }}
              navigation={true}
              modules={[Pagination, Navigation, Keyboard]}
              loop
            >
              {activityData?.images?.map((imgUrl, index) => (
                <SwiperSlide key={'image' + index}>
                  <IonImg src={imgUrl} />
                </SwiperSlide>
              ))}
            </Swiper>
          </IonCard>
          <ActivityInfo activityData={activityData} share={shareActivity} />
        </section>
        <ActivityReviews />
      </IonRow>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={t('alert.title.error') || 'Error'}
        message={t('alert.message.share.error') || ''}
        buttons={[
          {
            text: t('close'),
            role: 'cancel',
            handler: () => setShowAlert(false),
          },
        ]}
      />
    </IonContent>
  ) : (
    <LoadingPage />
  );

  return !browsingWeb ? (
    <AppPage>
      {header}
      {content}
    </AppPage>
  ) : (
    <>{content}</>
  );
};

export default ActivityDetailsPage;
