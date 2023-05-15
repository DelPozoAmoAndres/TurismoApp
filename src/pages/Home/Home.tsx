import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/react';
import { gridOutline, logInOutline, personOutline } from 'ionicons/icons';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { Language } from '../../models/Language';
import { App } from '@capacitor/app';
import { IonAlert } from '@ionic/react';
import { useHistory } from 'react-router';
import { Button } from '../../components/Button';
import { Role } from '../../models/User';

interface HomeProps {
    languages: Language[];
    defaultLanguage: Language;
}

const Home: React.FC<HomeProps> = ({ languages, defaultLanguage }) => {
    const [showAlert, setShowAlert] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const backPressHandler = App.addListener('backButton', () => {
            if (history.location.pathname.includes("home"))
                setShowAlert(true);
        });
        return () => {
            backPressHandler.remove();
        };
    }, [history]);

    const handleAlertConfirm = () => {
        setShowAlert(false);
        App.exitApp(); // Cierra la aplicación cuando se confirma el alerta
    };

    const handleAlertCancel = () => {
        setShowAlert(false);
    };
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar mode="ios">
                    <IonButtons slot="start">
                        <Button mode="ios" onClick={() => history.push("/login")} icon={logInOutline} text={"Login"} />
                        <Button role={null} mode="ios" onClick={() => history.push("/perfil")} icon={personOutline} text={"Perfil"} />
                        <Button role={Role.administrador} mode="ios" onClick={() => history.push("/admin/dashboard")} icon={gridOutline} text={"Dashboard"} />
                    </IonButtons>
                    <IonTitle>AsTour</IonTitle>
                    <IonButtons slot="end">
                        <LanguageSelector languages={languages} defaultLanguage={defaultLanguage} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
                <IonContent>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonCard>
                                    <img src="https://imagenes.elpais.com/resizer/2kZjFxiNoG3Pvq9dbeHPTe7aiXc=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/RWF77A5EQGZX4QA2ABH76KQAZE.jpg" alt="Imagen de Picos de Europa" />
                                    <IonCardHeader>
                                        <IonCardTitle>Bienvenido a Turismo Asturias</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                        Descubre los mejores servicios de turismo en Asturias. Desde playas paradisíacas hasta montañas impresionantes, ¡aquí encontrarás todo lo que necesitas para disfrutar de tus vacaciones!
                                    </IonCardContent>
                                    <IonButton expand="block" routerLink="/buscar">Buscar servicios de turismo</IonButton>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={handleAlertCancel}
                        header="Confirmación"
                        message="¿Estás seguro de que quieres salir de la aplicación?"
                        buttons={[
                            {
                                text: 'Cancelar',
                                role: 'cancel',
                                handler: handleAlertCancel,
                            },
                            {
                                text: 'Salir',
                                handler: handleAlertConfirm,
                            },
                        ]}
                    />
                </IonContent>
        </IonPage>
    );
}

export default Home;