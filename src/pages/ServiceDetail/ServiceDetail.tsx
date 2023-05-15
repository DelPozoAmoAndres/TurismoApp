import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonBackButton,
  IonButtons,
  IonIcon,
} from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Service } from '../../models/Service';

interface ServiceDetailParams {
  id: string;
}

const services: Service[] = [
    {
      id: 1,
      name: 'Servicio de tour por la ciudad',
      description: 'Disfruta de un tour guiado por la ciudad de Madrid.',
      price: 50,
      location: 'Madrid, España',
      imageUrl: 'https://via.placeholder.com/300x200.png',
      availableDates: [
        {
          date: new Date('2022-06-01'),
          times: ['10:00', '14:00', '18:00']
        },
        {
          date: new Date('2022-06-02'),
          times: ['12:00', '16:00']
        }
      ]
    },
    {
      id: 2,
      name: 'Servicio de senderismo en la montaña',
      description: 'Explora la naturaleza con una caminata guiada por la montaña.',
      price: 80,
      location: 'Sierra Nevada, España',
      imageUrl: 'https://via.placeholder.com/300x200.png',
      availableDates: [
        {
          date: new Date('2022-07-01'),
          times: ['09:00', '13:00']
        },
        {
          date: new Date('2022-07-02'),
          times: ['11:00', '15:00']
        }
      ]
    }
  ];

interface ServiceDetailProps extends RouteComponentProps<ServiceDetailParams> {}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ match, history }) => {
  const service: Service | undefined = services.find((s) => s.id === Number(match.params.id));
  const [fecha, setFecha] = useState<Date | Date[] | undefined>(undefined);

  const handleDateChange = (value: any) => {
    if (Array.isArray(value)) {
      setFecha(value[0].toISOString());
    } else {
      setFecha(value.toISOString());
    }
  };

  const handleReservarClick = () => {
    if (fecha) {
      const dateStr = Array.isArray(fecha) && fecha[0] ? fecha[0].toISOString() : fecha.toLocaleString();
      history.push(`/servicios/${service?.id}/reservar/fecha/${dateStr}`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/buscar" />
          </IonButtons>
          <IonTitle>{service?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>{service?.description}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Precio</IonLabel>
            <IonLabel slot="end">{service?.price} €</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Ubicación</IonLabel>
            <IonLabel slot="end">{service?.location}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Disponibilidad</IonLabel>
            <IonButton onClick={() => setFecha(new Date())} slot="end">
              <IonIcon slot="start" icon={calendarOutline} />
              {fecha ? (
                <>
                  {Array.isArray(fecha) ? fecha[0].toLocaleDateString() : new Date(fecha).toLocaleDateString()}{' '}
                  {Array.isArray(fecha) ? fecha[0].toLocaleTimeString() : new Date(fecha).toLocaleTimeString()}
                </>
              ) : (
                'Seleccionar fecha'
              )}
            </IonButton>
          </IonItem>
          {fecha && (
            <IonItem>
              <Calendar onChange={handleDateChange} value={fecha instanceof Date ? fecha : undefined} />
            </IonItem>
          )}
          <IonItem>
            <IonButton disabled={!fecha} onClick={handleReservarClick} expand="block">
              Reservar
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ServiceDetail;
