import { Redirect, Route } from 'react-router-dom';
import { IonContent, IonRouterOutlet, IonTabs } from '@ionic/react';
import Profile from '../../pages/Profile/Profile';
import Home from '../../pages/Home/Home';
import PrivateRoute from '../RouteTypes/PrivateRoute';
import { useAuth } from '../../contexts/AuthContexts';
import tabsFiltered from './tabsFiltered';
import { useLanguage } from '../../hooks/useLanguage';


const Tabs: React.FC = () => {
    const auth = useAuth();
    const rolesTabs = tabsFiltered();
    const { languages, defaultLanguage } = useLanguage();

    return (
        <IonContent>
            {auth.user && <IonTabs>
                <IonRouterOutlet>
                    <Redirect exact path="/movil" to="/movil/home" />
                    <Route exact path="/movil/home" >
                        <Home languages={languages}
                            defaultLanguage={defaultLanguage} />
                    </Route>
                    <PrivateRoute exact path="/movil/perfil" component={Profile} alternativePath="/movil" />
                </IonRouterOutlet>
                {rolesTabs[auth.user?.role!]}
            </IonTabs>
            }
        </IonContent>
    );
}

export default Tabs;