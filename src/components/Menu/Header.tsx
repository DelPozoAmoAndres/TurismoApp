/* Ionic Components */
import { IonButtons, IonHeader, IonLabel, IonMenuButton, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { briefcaseOutline, gridOutline, homeOutline, logInOutline, personOutline } from 'ionicons/icons';
/* Hooks */
import { useScreen } from '../../hooks/useScreen';
/* Models */
import { Role } from '../../models/User';
/* Components */
import { Button } from '../../shared/Button';
import LanguageSelector from '../../shared/LanguageSelector';
import DarkModeToggle from '../../shared/DarkModeToggle';
/* Styles */
import "./Header.css";
/* i18n */
import { useTranslation } from 'react-i18next';

export const Header = () => {
    const { isMobile, browsingWeb } = useScreen();
    const {t} = useTranslation();
    return (
            <IonHeader mode='ios'>
                <IonToolbar>
                    <IonButtons slot="start" >
                        {browsingWeb && isMobile && <IonMenuButton autoHide={false}/>}
                    </IonButtons>
                    <IonTitle>
                        <IonRow className="ion-align-items-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Cruz_de_Asturias.svg/1200px-Cruz_de_Asturias.svg.png" width={30} />
                            <IonLabel class='ion-margin-start' id="title-app">+Astour</IonLabel>
                        </IonRow>
                    </IonTitle>
                    <IonButtons slot="end" >
                        <Button routeLink='/home' icon={homeOutline} text={t("home.title")} />
                        <Button id="login-modal" icon={logInOutline} text={t("personal.area.title")} />
                        <Button role={null} routeLink='/home' icon={homeOutline} text={t("home.title")} />
                        <Button role={null} routeLink="/perfil" icon={personOutline} text={t("profile.title")} />
                        <Button role={Role.administrador} routeLink="/admin/dashboard" icon={gridOutline} text={t("dashboard.title")} />
                        <Button role={Role.administrador} routeLink="/reservas" icon={briefcaseOutline} text={t("reservations.title")} />
                        <LanguageSelector />
                        <DarkModeToggle />
                    </IonButtons>
                </IonToolbar>
            </IonHeader> 
    )
}
