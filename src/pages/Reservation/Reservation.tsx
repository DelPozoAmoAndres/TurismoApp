import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';

interface ReservationProps extends RouteComponentProps<{
    id: string,
    fecha: string;
}> { }

const Reservation: React.FC<ReservationProps> = ({ match }) => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const fecha = new Date(match.params.fecha);

    const handleReservar = () => {
        console.log('Reserva realizada');
    }

    return (
        <IonPage className="ion-padding">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={"/servicio/" + match.params.id} />
                    </IonButtons>
                    <IonTitle>Reserva</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Fecha de reserva</IonLabel>
                        <IonInput type="text" value={fecha.toISOString()} readonly={true}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Nombre completo</IonLabel>
                        <IonInput type="text" value={nombre} onIonChange={(e) => setNombre(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Email</IonLabel>
                        <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Teléfono</IonLabel>
                        <IonInput type="tel" value={telefono} onIonChange={(e) => setTelefono(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonButton expand="block" onClick={handleReservar}>Reservar</IonButton>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Reservation;
