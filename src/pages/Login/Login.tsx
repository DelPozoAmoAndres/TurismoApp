import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonText, IonItem, IonAlert } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { useAuth } from '../../contexts/AuthContexts';
import "./Login.css";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const auth = useAuth();

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await auth.login(email, password);
    } catch (error: any) {
      console.error(error)
      setError(error?.message ?? 'Ha habido un error en el servidor.');
    }
    setShowAlert(true);
    setLoading(false);
  };

  return (
    <IonPage>
      <IonContent>
          <IonItem>
            <IonInput type="email" placeholder="Email" value={email} onIonInput={e => {setEmail(e.detail.value!) }}  />
          </IonItem>

          <IonItem>
            <IonInput type="password" placeholder="Contraseña" value={password} onIonInput={e => { setPassword(e.detail.value!) }}  />
          </IonItem>

          <IonButton type="submit" expand="block" onClick={()=>handleLogin()}>
            {loading ? <Spinner /> : 'Iniciar sesión'}
          </IonButton>
        <IonText>¿No tienes una cuenta? <a href="/registro">Regístrate aquí</a></IonText>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => { setShowAlert(false); error ?? history.push("/") }}
          header={error ? "Error" : "Inicio de sesión"}
          message={error ?? "Se ha iniciado sesión correctamente"}
          buttons={['OK']}
        ></IonAlert>
      </IonContent>
    </IonPage >
  );
};

export default Login;
