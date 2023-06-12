import React from 'react';
/* Ionic Components */
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
  IonRow,
  IonButton,
  IonItemDivider,
} from '@ionic/react';
import { logOutOutline, personOutline, logInOutline, homeOutline, briefcaseOutline } from 'ionicons/icons';
/* Contexts*/
import { useAuth } from '../../contexts/AuthContexts';
/* Components */
import LanguageSelector from '../../shared/LanguageSelector';
import DarkModeToggle from '../../shared/DarkModeToggle';
/* i18n */
import { useTranslation } from 'react-i18next';

const AppMenu: React.FC = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar style={{ '--background': 'var(--ion-color-primary)' }}>
          <IonRow className="ion-margin ion-align-items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cruz_de_Asturias.svg/1200px-Cruz_de_Asturias.svg.png"
              width={50}
            />
            <IonLabel class="ion-margin-start" style={{ fontSize: '40px', color: 'white' }}>
              Astour
            </IonLabel>
          </IonRow>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            <IonItem button routerLink="/home">
              <IonIcon slot="start" icon={homeOutline} />
              <IonLabel>{t('home.title')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle id="login-modal" hidden={auth.user !== null}>
            <IonItem button>
              <IonIcon slot="start" icon={logInOutline} />
              <IonLabel>{t('personal.area.title')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle hidden={auth.user === null}>
            <IonItem button routerLink="/perfil">
              <IonIcon slot="start" icon={personOutline} />
              <IonLabel>{t('profile.title')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle hidden={auth.user === null}>
            <IonItem button routerLink="/reservas">
              <IonIcon slot="start" icon={briefcaseOutline} />
              <IonLabel>{t('reservations.title')}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <IonList class="ion-margin" style={{ position: 'fixed', bottom: 0, width: '90%' }}>
          <LanguageSelector />
          <DarkModeToggle />
          <IonItemDivider />
          <IonMenuToggle>
            <IonButton class="ion-margin-top" color={'danger'} expand="block" onClick={auth.logout}>
              <IonIcon slot="start" icon={logOutOutline} />
              <IonLabel>{t('log.out')}</IonLabel>
            </IonButton>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default AppMenu;
