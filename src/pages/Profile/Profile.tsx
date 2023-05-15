// Perfil.tsx
import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonInput, IonButton, IonAlert } from '@ionic/react';
import { useAuth } from '../../contexts/AuthContexts';
import { editUser } from '../../apis/userApi';
import { User } from '../../models/User';
import { RouteComponentProps } from 'react-router';

const Profile: React.FC<RouteComponentProps> = ({history}) => {
  const auth = useAuth();
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isEditModeActive, setEditModeActive] = useState<boolean>(false);


  useEffect(()=>{
    setNombre(auth.user?.name!);
    setEmail(auth.user?.email!);
    setPassword(auth.user?.password!);
  },[auth.user])

  const guardarCambios = () => {
    // Lógica para guardar los cambios en el perfil
    let user:User = auth.user!;
    user.name=nombre;
    user.password=password;
    user.email=email;
    
    editUser(user);
    setShowAlert(true);
    setEditModeActive(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem disabled={!isEditModeActive}>
            <IonInput value={nombre} label='Nombre completo' labelPlacement='stacked' onIonChange={e => setNombre(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem disabled={!isEditModeActive}>
            <IonInput type="email" value={email} label='Correo electrónico' labelPlacement='stacked'  onIonChange={e => setEmail(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem disabled={!isEditModeActive}>
            <IonInput type="password" value={password} label="Contraseña" labelPlacement='stacked' onIonChange={e => setPassword(e.detail.value!)}></IonInput>
          </IonItem>
          {(isEditModeActive) ?
            <IonButton expand="block" onClick={guardarCambios}>Guardar cambios</IonButton>
            :
            <IonButton expand="block" onClick={()=>setEditModeActive(true)}>Editar Perfil</IonButton>}
          <IonButton expand="block" color={"danger"} onClick={()=>{auth.logout()}}>Cerrar Sesión</IonButton>
        </IonList>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Perfil actualizado"
          message="Los cambios se han guardado correctamente."
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
