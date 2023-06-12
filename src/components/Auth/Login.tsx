import React, { useRef } from 'react';
/* Ionic Components */
import { IonInput, IonButton, IonText, IonItem, IonAlert, IonImg, IonList, IonGrid, IonRow } from '@ionic/react';
/* Styles */
import './Login.css';
/* Components */
import { Modal } from '../../shared/Modal';
import Spinner from '../../shared/Spinner';
/* Hooks */
import { useLogin } from '../../hooks/useLogin';
/* i18n */
import { useTranslation } from 'react-i18next';

const Login: React.FC = () => {
  const { handleLogin, setShowAlert, setEmail, setPassword, email, password, loading, showAlert, error } = useLogin();
  const modal = useRef<HTMLIonModalElement>(null); //Reference of the modal to close it
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  return (
    <Modal id={'login-modal-card'} tittle={t('log.in')} trigger={'login-modal'} modal={modal} minWidthAndroid={550} minWidthIos={492}>
      <IonGrid id="login-grid" class="ion-no-padding">
        <IonRow>
          <IonList class="ion-margin-bottom">
            <IonItem lines="none">
              <IonInput
                type="email"
                placeholder={t('personal.data.email') || ''}
                value={email}
                onIonInput={(e) => {
                  setEmail(e.detail.value || '');
                }}
              />
            </IonItem>
            <IonItem lines="none">
              <IonInput
                type="password"
                placeholder={t('personal.data.password') || ''}
                value={password}
                onIonInput={(e) => {
                  setPassword(e.detail.value || '');
                }}
              />
            </IonItem>
            <IonItem lines="none">
              <IonText>
                <strong>{t('password.forgotten')}</strong>
              </IonText>
            </IonItem>
            <IonButton type="submit" expand="block" onClick={() => handleLogin()}>
              {' '}
              {loading ? <Spinner /> : t('log.in')}
            </IonButton>
          </IonList>
        </IonRow>
        <div>
          <div></div>
          <p style={{ margin: ' auto' }}>o</p>
          <div></div>
        </div>
        <IonRow id="social-buttons">
          <IonList mode="ios" class="ion-margin-top">
            <IonButton size="small" slot="start">
              <IonImg
                slot="start"
                src="https://w7.pngwing.com/pngs/543/934/png-transparent-google-app-logo-google-logo-g-suite-google-text-logo-circle.png"
                style={{ width: 20 }}
              />
              <IonText slot="end">{t('login.google')}</IonText>
            </IonButton>
            <IonButton size="small" slot="end">
              <IonImg slot="end" src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" style={{ width: 20 }} />
              <IonText slot="end">{t('login.facebook')}</IonText>
            </IonButton>
          </IonList>
        </IonRow>
        <IonRow class="ion-padding-top">
          <IonItem
            lines="none"
            routerLink="/registro"
            onClick={() => modal.current?.dismiss()}
            style={{ borderRadius: '5px', width: '100%' }}
          >
            <IonText>
              {t('not.account') + ' '}
              <strong>{t('sign.up.phrase')}</strong>
            </IonText>
          </IonItem>
        </IonRow>
      </IonGrid>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => {
          setShowAlert(false);
          if (!error) {
            modal.current?.dismiss();
          }
        }}
        header={error ? t('alert.error.title') || 'Error' : t('log.in') || ''}
        message={error ?? (t('alert.login.success') || '')}
        buttons={['OK']}
      ></IonAlert>
    </Modal>
  );
};

export default Login;
