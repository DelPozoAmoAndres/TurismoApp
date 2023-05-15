import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Pages */
import Home from './pages/Home/Home';
import SearchServices from './pages/Activities/SearchServices';
import Reservation from './pages/Reservation/Reservation';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Utility */
import axios from 'axios';
import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n/i18n';
import AdminRoute from './components/RouteTypes/AdminRoute';
import Tabs from './components/Tabs/Tabs';
import { Capacitor } from '@capacitor/core';
import { useLanguage } from './hooks/useLanguage';
import PrivateRoute from './components/RouteTypes/PrivateRoute';
import { useAuth } from './contexts/AuthContexts';
import UserList from './pages/AdminDashboard/Users/UserList';
import UserProfile from './pages/AdminDashboard/Users/UserProfile';
import AdminRegister from './pages/Admin/AdminRegister';
import CreateActivity from './pages/Admin/Activities/CreateActivity';
import ActivityList from './pages/Admin/Activities/ActivityList';
import ActivityDetails from './pages/Admin/Activities/ActivityDetails';

setupIonicReact();

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

const App: React.FC = () => {
  const {languages, defaultLanguage}=useLanguage();
  const auth = useAuth();
  return (
    <I18nextProvider i18n={i18n}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/">
              {Capacitor.getPlatform()!=='web' && auth.token ?
                <Redirect to="/movil" />
                : 
                <Redirect to='/home' />
              }
            </Route>
            <Route path="/movil" render={() => <Tabs />} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registro" component={Register} />
            <Route exact path="/home">
              <Home
                languages={languages}
                defaultLanguage={defaultLanguage}
              />
            </Route>
            <Route exact path="/buscar" component={SearchServices} />
            <Route exact path="/activity/:id" component={ActivityDetails} />
            <PrivateRoute path="/servicios/:id/reservar/fecha/:fecha" component={Reservation} alternativePath='/'/>
            <PrivateRoute exact path="/perfil" component={Profile} alternativePath='/'/>
            {/* <Route exact path="/admin/login" component={AdminLogin} /> */}
            <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
            <AdminRoute exact path="/admin/users" component={UserList} />
            <AdminRoute exact path="/admin/user/details/:email" component={UserProfile} />
            <AdminRoute exact path="/admin/user/add" component={AdminRegister} />
            <AdminRoute exact path="/admin/activity" component={CreateActivity} />
            <AdminRoute exact path="/admin/activities" component={ActivityList} />
            <Route exact path="/admin/activity/:id" component={ActivityDetails} />
            <Route component={NotFound} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </I18nextProvider>
  )
};

export default App;
