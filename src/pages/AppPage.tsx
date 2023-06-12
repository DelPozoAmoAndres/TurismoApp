import { IonContent, IonPage } from '@ionic/react';
import React, { ReactNode } from 'react';
import { Header } from '../components/Menu/Header';
import AppMenu from '../components/Menu/AppMenu';
import Login from '../components/Auth/Login';
import { useAuth } from '../contexts/AuthContexts';
import { useScreen } from '../hooks/useScreen';
import PropTypes from 'prop-types';
type Props = {
  children: ReactNode;
};

export const AppPage: React.FC<Props> = React.memo(({ children }) => {
  const auth = useAuth();
  const { browsingWeb, isMobile } = useScreen();
  return (
    <>
      <IonPage>
        {!auth.user && <Login />}
        {browsingWeb && <Header />}
        <IonContent id="main-content">{children}</IonContent>
      </IonPage>
      {browsingWeb && isMobile && <AppMenu />}
    </>
  );
});

AppPage.propTypes = {
  children: PropTypes.node.isRequired,
};

AppPage.displayName = 'AppPage';
