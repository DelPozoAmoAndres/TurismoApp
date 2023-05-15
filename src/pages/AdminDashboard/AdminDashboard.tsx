import React, { useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonList, IonItem, IonLabel, IonIcon, IonAlert } from '@ionic/react';
import { logOut, list, addOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContexts';

const AdminDashboard: React.FC = () => {
  const [alert, setAlert] = useState<boolean>(false)
  const history = useHistory();
  const auth = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await auth.logout();
  };

  const handleListUsers = () => {
    // Aquí iría el código para mostrar la lista de usuarios
    history.push('/admin/users');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('adminDashboard.title')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonButton onClick={handleListUsers}>
              <IonIcon slot="start" icon={list} />
              <IonLabel>{t('adminDashboard.listUsers')}</IonLabel>
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton onClick={() => history.push("/admin/user/add")} >
              <IonIcon slot="start" icon={addOutline} />
              <IonLabel>Añadir usuarios</IonLabel>
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton onClick={() => history.push("/admin/activities")} >
              <IonIcon slot="start" icon={list} />
              <IonLabel>Listar actividades</IonLabel>
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton onClick={() => history.push("/admin/activity")} >
              <IonIcon slot="start" icon={addOutline} />
              <IonLabel>Añadir actividades</IonLabel>
            </IonButton>
          </IonItem>
          <IonItem>
            <IonButton color="danger" onClick={() => setAlert(true)}>
              <IonIcon slot="start" icon={logOut} />
              <IonLabel>{t('adminDashboard.logout')}</IonLabel>
            </IonButton>
          </IonItem>
        </IonList>
        <IonAlert
          isOpen={alert}
          onDidDismiss={() => setAlert(false)}
          header={"Cerrar sesión"}
          message={"¿Está seguro que quiere cerrar la sesión?"}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'OK',
              role: 'confirm',
              handler: handleLogout,
            },
          ]}
        ></IonAlert>

      </IonContent>
    </IonPage>
  );
};

export default AdminDashboard;
