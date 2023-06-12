import { IonContent, IonGrid, IonIcon, IonLabel, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import { useState } from 'react';
import { PersonalData } from '../components/Auth/PersonalData';
import { Help } from '../components/Auth/Help';
import { Account } from '../components/Auth/Account';
import { useAuth } from '../contexts/AuthContexts';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../Utils/Utils';
import { bookOutline, helpCircleOutline, settingsOutline, shieldOutline } from 'ionicons/icons';
import { useScreen } from '../hooks/useScreen';
import { AppPage } from './AppPage';
import { Capacitor } from '@capacitor/core';
import React from 'react';

const ProfilePage: React.FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<string | undefined>('personalData');
  const { width, browsingWeb } = useScreen();

  const maxWidth = 755;
  const content = (
    <IonContent>
      <IonGrid>
        {Capacitor.isNativePlatform() && (
          <div className="ion-text-end ion-margin-end">
            <IonIcon icon={settingsOutline} class="ion-text-end" />
            <IonLabel>{t('settings.title')}</IonLabel>
          </div>
        )}
        <IonRow class="ion-justify-content-center">
          <section>
            <img
              src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png"
              width={width < 1000 ? 200 : 250}
            />
            <IonRow>
              <h1>
                <strong>{auth.user?.name}</strong>
              </h1>
            </IonRow>
            <IonRow>
              <IonLabel>{t('account.created.date')}</IonLabel>
            </IonRow>
            <IonRow>
              <h3>{formatDate(auth.user?.createdAt || null)}</h3>
            </IonRow>
          </section>
          {width < maxWidth && (
            <IonSegment value={selectedTab} onIonChange={(e) => setSelectedTab(e.detail.value)}>
              <IonSegmentButton value="personalData">
                <IonLabel>{t('personal.data.title.sort')}</IonLabel>
                <IonIcon icon={bookOutline} />
              </IonSegmentButton>
              <IonSegmentButton value="help">
                <IonLabel>{t('help.title.sort')}</IonLabel>
                <IonIcon icon={helpCircleOutline} />
              </IonSegmentButton>
              <IonSegmentButton value="account">
                <IonLabel>{t('account.title')}</IonLabel>
                <IonIcon icon={shieldOutline} />
              </IonSegmentButton>
            </IonSegment>
          )}
          <section className="ion-margin-horizontal" style={{ width: width < maxWidth ? '100%' : 500 }}>
            {(selectedTab == 'personalData' || width >= maxWidth) && <PersonalData />}
            {(selectedTab == 'help' || width >= maxWidth) && <Help />}
            {(selectedTab == 'account' || width >= maxWidth) && <Account />}
          </section>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
  return !browsingWeb ? <AppPage>{content}</AppPage> : <>{content}</>;
};

export default ProfilePage;
