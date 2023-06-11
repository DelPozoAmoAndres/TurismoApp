import { Redirect, Route } from 'react-router-dom';
import { IonContent, IonRouterOutlet, IonTabs } from '@ionic/react';
import HomePage from '../Home/HomePage';
import PrivateRoute from '../../shared/PrivateRoute';
import { useAuth } from '../../contexts/AuthContexts';
import TabsFiltered from './TabsFiltered';
import ProfilePage from '../../pages/ProfilePage';
import ReservationListPage from '../ReservationList/ReservationListPage';

const TabBar: React.FC = () => {
    const auth = useAuth();
    const rolesTabs = TabsFiltered();
    return (
        <IonContent>
            <IonTabs>
                <IonRouterOutlet>
                    <Redirect exact path="/movil" to="/movil/home" />
                    <Route exact path="/movil/home" component={HomePage} />
                    <PrivateRoute exact path="/movil/perfil" component={ProfilePage} alternativePath="/movil" />
                    <PrivateRoute exact path="/movil/reservas" component={ReservationListPage} alternativePath="/movil" />
                </IonRouterOutlet>
                       {auth.user ? rolesTabs[auth.user?.role!] :rolesTabs["none"]}               
            </IonTabs>
        </IonContent>
    );
}

export default TabBar;