import React, { useRef } from 'react';
/* Ionic Components */
import { IonInput, IonButton, IonText, IonItem, IonAlert, IonImg, IonList, IonGrid, IonRow } from '@ionic/react';
/* Styles */
import './Login.css';
/* Components */
import { Modal } from '@shared/Modal';
import Spinner from '@shared/Spinner';
/* Hooks */
import { useLogin } from '@hooks/useLogin';
/* i18n */
import { useTranslation } from 'react-i18next';
import Register from '../Register/Register';

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
                <span>{t('personal.data.password.forgotten')} <strong>{t('click.here')}</strong></span>
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
            <IonButton size="small" slot="start" color={'dark'}>
              <IonImg
                slot="start"
                src="https://imgs.search.brave.com/Nqjnp4n8xvqCMSW_-5M1dN1Ei5dDoWFv7tOV9PK-KIk/rs:fit:860:0:0/g:ce/aHR0cDovL2Fzc2V0/cy5zdGlja3BuZy5j/b20vaW1hZ2VzLzVh/OTUxOTM5YzRmZmMz/M2U4YzE0OGFmMi5w/bmc"
                style={{ width: 20, marginRight: 5 }}
              />
              <IonText slot="end">{t('log.in.google')}</IonText>
            </IonButton>
            <IonButton size="small" slot="end" color={'dark'}>
              <IonImg slot="end" src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" style={{ width: 20, marginRight: 5 }} />
              <IonText slot="end">{t('log.in.facebook')}</IonText>
            </IonButton>
          </IonList>
        </IonRow>
        <IonRow class="ion-padding-top">
          <IonItem
            id="register-modal"
            lines="none"
            //onClick={() => modal.current?.dismiss() && document.getElementById('register-modal')?.click()}
            style={{ borderRadius: '5px', width: '100%' }}
          >
            <IonText>
              {t('not.account') + ' '}
              <strong>{t('sign.up.here')}</strong>
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
        header={error ? t('alert.title.error') || 'Error' : t('log.in') || ''}
        message={error ?? (t('alert.login.success') || '')}
        buttons={['OK']}
      ></IonAlert>

    <Register />
    </Modal>
  );
};

export default Login;
