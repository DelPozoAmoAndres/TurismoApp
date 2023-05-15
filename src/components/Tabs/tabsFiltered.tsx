import { IonIcon, IonLabel, IonTabBar, IonTabButton } from '@ionic/react';
import { homeOutline, personOutline } from 'ionicons/icons';
import { Role } from '../../models/User';

const TuristTabs = (
    <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/movil/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/movil/perfil">
            <IonIcon icon={personOutline} />
            <IonLabel>Perfil</IonLabel>
        </IonTabButton>
    </IonTabBar>
); 

const rolesTabs: { [key: string]: any } = {
    [Role.administrador]: TuristTabs,
    [Role.turista]: TuristTabs,
    [Role.guía]: TuristTabs
};

const tabsFiltered = () => {
    return rolesTabs;
};

export default tabsFiltered;