import React from 'react';
import { Header } from './Header';
import Footer from './Footer';
import { IonContent, IonPage } from '@ionic/react';
import './PageTemplate.css';
import Login from '@components/4 - Personal Area/Login/Login';
import Register from '@components/4 - Personal Area/Register/Register';

interface PageTemplateProps {
    children: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
    return (
        <IonPage id="pageWeb">
            <IonContent>
                <div>
                    <header><Header /></header>
                    <main>
                        <Login />
                        {children}
                    </main>
                    <footer><Footer /></footer>
                </div>
            </IonContent>

        </IonPage>
    );
};

export default PageTemplate;
