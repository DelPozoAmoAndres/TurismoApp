// BuscarServicios.tsx
import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { getActivityList } from '../../apis/activityApi';
import { Activity } from '../../models/Activity';

// interface Comentario {
//     id: number;
//     usuario: string;
//     texto: string;
//     puntuacion: number;
// }

const SearchServices: React.FC<RouteComponentProps> = ({ history }) => {
    const [busqueda, setBusqueda] = useState<string>('');
    const [resultados, setResultados] = useState<Activity[]>([]);

    useEffect(() => {
        cargarServicios(busqueda);
    }, [busqueda]);

    const cargarServicios = async (busqueda:string) => {
        try {
            setResultados(await getActivityList(busqueda,{}))
        } catch (error) {
            console.error(error);
        }
    };

    const handleSeleccionarServicio = (id : string) => {
        history.push(`/activity/${id}`);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Buscar servicios de turismo</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel position="stacked">Buscar por nombre o categoría</IonLabel>
                        <IonInput value={busqueda} onIonChange={e => setBusqueda(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonButton expand="block" onClick={()=>cargarServicios(busqueda)}>Buscar</IonButton>
                </IonList>
                {resultados.length > 0 && (
                    <IonList>
                        {resultados.map(activity => (
                            <IonItem key={activity.name} button onClick={() => activity._id && handleSeleccionarServicio(activity._id)}>
                                <IonLabel>
                                    <h2>{activity.name}</h2>
                                    <p>{activity.description}</p>
                                </IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                )}
            </IonContent>
        </IonPage>
    );
};

export default SearchServices;
