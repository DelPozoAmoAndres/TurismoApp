import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonButton, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonInput, IonAlert } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { deleteUser, editUser, getUser } from '../../../apis/userApi'; // Importa los métodos para obtener información del usuario y las reservas
import { User } from '../../../models/User';
import { formatDate } from '../../../Utils/Utils';

interface UserProfileProps extends RouteComponentProps<{ email: string }> { }

const UserProfile: React.FC<UserProfileProps> = ({ match, history }) => {
    const [formData, setFormData] = useState<User | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
    const [isEditModeActive, setEditModeActive] = useState<boolean>(false);
    // const [reservations, setReservations] = useState<any[]>([]);
    useEffect(() => {
        const email = match.params.email;
        getUser(email).then((data: User) => {
            setFormData(data);
        });
        // getUserReservations(userId).then((data) => {
        //   setReservations(data);
        // });
    }, [match.params.email]);


    const guardarCambios = () => {
        if (formData) {
            editUser(formData);
            setShowAlert(true);
            setEditModeActive(false);
        }
    };

    const handleAlertConfirm = () => {
        setShowAlert(false);
        deleteUser(formData?.email!)
        history.push("/admin/users")
    };

    const handleAlertCancel = () => {
        setShowAlert(false);
    };

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
                        <IonInput value={formData?.name} label='Nombre completo' labelPlacement='stacked' onIonChange={e => formData && setFormData({...formData, name: e.detail.value!})}></IonInput>
                    </IonItem>
                    <IonItem disabled={!isEditModeActive}>
                        <IonInput type="email" value={formData?.email} label='Correo electrónico' labelPlacement='stacked' onIonChange={e => formData &&  setFormData({...formData, email: e.detail.value!})}></IonInput>
                    </IonItem>
                    <IonItem disabled={!isEditModeActive}>
                        <IonInput type="password" value={formData?.password} label="Contraseña" labelPlacement='stacked' onIonChange={e => formData &&  setFormData({...formData, password: e.detail.value!})}></IonInput>
                    </IonItem>
                    <IonItem disabled={!isEditModeActive}>
                        <IonInput type="tel" value={formData?.telephone?.toString()} label="Telefono" labelPlacement='stacked' onIonChange={e => formData &&  setFormData({...formData, telephone: Number(e.detail.value!)})}></IonInput>
                    </IonItem>
                    <IonItem disabled={!isEditModeActive}>
                        <IonInput value={formData?.country} label="País" labelPlacement='stacked' onIonChange={e => formData && setFormData({...formData, country: e.detail.value!})}></IonInput>
                    </IonItem>
                    <IonItem disabled={!isEditModeActive}>
                        <IonInput type="date" value={formatDate(formData?.birthday!)} label="Fecha de nacimiento" labelPlacement='stacked' onIonChange={e => formData && setFormData({...formData, birthday: new Date(e.detail.value!)})}></IonInput>
                    </IonItem>
                    <IonItem disabled={!isEditModeActive}>
                        <IonInput type="date" value={formatDate(formData?.createdAt!)} label="Cuenta creada" labelPlacement='stacked' onIonChange={e => formData && setFormData({...formData, createdAt: new Date(e.detail.value!)})}></IonInput>
                    </IonItem>
                    <IonItem disabled={!isEditModeActive}>
                        <IonInput type="date" value={formatDate(formData?.updatedAt!)} label="Cuenta actualizada" labelPlacement='stacked' onIonChange={e => formData && setFormData({...formData, updatedAt: new Date(e.detail.value!)})}></IonInput>
                    </IonItem>
                    {(isEditModeActive) ?
                        <IonButton expand="block" onClick={guardarCambios}>Guardar cambios</IonButton>
                        :
                        <IonButton expand="block" onClick={() => setEditModeActive(true)}>Editar Perfil</IonButton>}
                    <IonButton expand="block" color="danger" onClick={() =>setShowDeleteAlert(true)}>Borrar cuenta</IonButton>
                </IonList>
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Perfil actualizado"
                    message="Los cambios se han guardado correctamente."
                    buttons={['OK']}
                />
                <IonAlert
                    isOpen={showDeleteAlert}
                    onDidDismiss={handleAlertCancel}
                    header="Eliminar cuenta"
                    message="Estás seguro que desear eliminar permanentemente esta cuenta, no podrás recuperar la cuenta"
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
};

export default UserProfile;


