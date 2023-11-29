import React from 'react';
import { Header } from './Header';
import Footer from './Footer';
import { IonContent, IonPage } from '@ionic/react';
import './PageTemplate.css';
import Login from '@components/4 - Personal Area/Login/Login';
import Register from '@components/4 - Personal Area/Register/Register';
import PropTypes from 'prop-types';

interface PageTemplateProps {
    children: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <IonPage id="pageWeb">
            <Login isOpen={isOpen} setOpen={setIsOpen}/>
            <IonContent>
                <div>
                    <header><Header openLogin={setIsOpen}/></header>
                    <main>
                        {children}
                    </main>
                    <footer><Footer /></footer>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default PageTemplate;