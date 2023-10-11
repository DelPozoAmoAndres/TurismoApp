import { IonContent, IonPage } from '@ionic/react';
import React, { ReactNode } from 'react';
import { Header } from '@menu/NavBar/Header';
import AppMenu from '@menu/Desplegable/AppMenu';
import Login from '@personal-area/Login/Login';
import { useAuth } from '@contexts/AuthContexts';
import { useScreen } from '@hooks/useScreen';
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
        {browsingWeb && isMobile && <><AppMenu /> </>}
        {browsingWeb && <Header />}
        {!auth.user && <Login /> }
        <IonContent id="main-content">{children}</IonContent>
      </IonPage>
    </>
  );
});

AppPage.propTypes = {
  children: PropTypes.node.isRequired,
};

AppPage.displayName = 'AppPage';
