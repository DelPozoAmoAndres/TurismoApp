import { IonIcon, IonLabel, IonTabButton } from '@ionic/react';
import { briefcaseOutline, homeOutline, logInOutline, personOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import React from 'react';

export const Tabs = () => {
  const { t } = useTranslation();
  const HomeTab = (
    <IonTabButton tab="tab1" href="/movil/home">
      <IonIcon icon={homeOutline} />
      <IonLabel>{t('home.title')}</IonLabel>
    </IonTabButton>
  );
  const PersonalAreaTab = (
    <IonTabButton tab="tab2" onClick={() => document.getElementById('login-modal')?.click()}>
      <IonIcon icon={logInOutline} id="login-modal" />
      <IonLabel>{t('personalArea.title')}</IonLabel>
    </IonTabButton>
  );

  const ReservationsTab = (
    <IonTabButton tab="tab3" href="/movil/reservas">
      <IonIcon icon={briefcaseOutline} />
      <IonLabel>{t('reservations.title')}</IonLabel>
    </IonTabButton>
  );

  const NextEventsTab = (
    <IonTabButton tab="tab4" href="/movil/reservas">
      <IonIcon icon={briefcaseOutline} />
      <IonLabel>{t('nextEvents.title')}</IonLabel>
    </IonTabButton>
  );

  const ProfileTab = (
    <IonTabButton tab="tab5" href="/movil/perfil">
      <IonIcon icon={personOutline} />
      <IonLabel>{t('profile.title')}</IonLabel>
    </IonTabButton>
  );

  return {
    HomeTab,
    ProfileTab,
    PersonalAreaTab,
    ReservationsTab,
    NextEventsTab,
  };
};
