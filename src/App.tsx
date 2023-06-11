import { Redirect, Route } from 'react-router-dom';
/* Ionic Components */
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Capacitor } from '@capacitor/core';
/* Pages */
import HomePage from './components/Home/HomePage';
import NotFound from './pages/NotFoundPage';
import Register from './components/Auth/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';
import { ReservationStatusPage } from './components/Reservation/ReservationStatusPage';
import ReservationDetailsPage from './components/ReservationDetails/ReservationDetailsPage';
import SearchActivityPage from './components/ActivitySearh/ActivitySearchPage';
import ReservationListPage from './components/ReservationList/ReservationListPage';
import ProfilePage from './pages/ProfilePage';
import ReservationPage from './components/Reservation/ReservationPage';
import { AppPage } from './pages/AppPage';
import UserList from './pages/Admin/Users/UserList';
import UserProfile from './pages/Admin/Users/UserDetails';
import ActivityDetailsPage from './components/ActivityDetails/ActivityDetailsPage';
/* Styles */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
/* Utility */
import axios from 'axios';
import { getItem } from './Utils/Utils';
/* i18n */
import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n/i18n';
/* Components */
import AdminRoute from './shared/AdminRoute';
import TabBar from './components/Menu/TabBar';
import PrivateRoute from './shared/PrivateRoute';
/* Hooks */
import { useTheme } from './hooks/useTheme';

setupIonicReact();

axios.interceptors.request.use(
  config => {
    const token = getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);



const App: React.FC = () => {
  useTheme();
  return (

    <I18nextProvider i18n={i18n}>
      <IonApp>
        <IonReactRouter>
          <AppPage>
            <IonRouterOutlet>

              <Route exact path="/">
                {Capacitor.isNativePlatform() ?
                  <Redirect to="/movil" />
                  :
                  <Redirect to='/home' />
                } 
              </Route>
              <Route path="/movil" render={() => <TabBar />} />
              <Route exact path="/registro" component={Register} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/buscar" component={SearchActivityPage} />
              <Route exact path="/activity/:id" component={ActivityDetailsPage} />
              <PrivateRoute path="/activity/:id/reservar/" component={ReservationPage} alternativePath='/' />
              <PrivateRoute exact path="/perfil" component={ProfilePage} alternativePath='/' />
              <PrivateRoute exact path="/reservas" component={ReservationListPage} alternativePath='/' />
              <Route path="/payment/status" component={ReservationStatusPage} />
              {/* <PrivateRoute exact path="/saved" component={SavedPage} alternativePath='/' /> */}
              <PrivateRoute exact path="/reservation/:id" component={ReservationDetailsPage} alternativePath='/' />
              <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
              <AdminRoute exact path="/admin/users" component={UserList} />
              <AdminRoute exact path="/admin/user/:id" component={UserProfile} />
              <Route component={NotFound} />
            </IonRouterOutlet>
          </AppPage>
        </IonReactRouter>
      </IonApp>
    </I18nextProvider>
  )
};

export default App;
