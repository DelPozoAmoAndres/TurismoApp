import React from 'react';
/* Ionic Components */
import { IonCard, IonContent, IonLabel, IonList, IonRow } from '@ionic/react';
/* Hooks */
import { useScreen } from '../../hooks/useScreen';
import { useReservationList } from '../../hooks/useReservationList';
/* Components */
import { AppPage } from '../../pages/AppPage';
import { ReservationItemList } from './ReservationItemList';
/* Utils */
import { formatDate } from '../../Utils/Utils';

const ReservationListPage: React.FC = () => {
    const { browsingWeb } = useScreen(); //Hook to have data of screen dimensions
    const reservationsGroup = useReservationList(); //Hooks to have all the reservation data

    const content =
        <IonContent>
            <IonList mode="ios" id="reservation-list">
                <IonRow class="ion-justify-content-center ion-margin-top">
                    <IonLabel class="ion-text-center"><strong>Reservas</strong></IonLabel>
                </IonRow>
                {reservationsGroup.map((reservationGroup, index) => (
                    <div key={"reservationsGroup" + index} className="ion-margin-bottom">
                        <IonRow class="ion-padding-start ion-padding-vertical">
                            <IonLabel><strong>{formatDate(reservationGroup.dateFrom) + "-----" + formatDate(reservationGroup.dateTo)}</strong></IonLabel>
                        </IonRow>
                        <IonCard >
                            {reservationGroup.reservations.map((reservation, index, array) => (
                                <div key={"reservation" + index} >
                                    <ReservationItemList reservation={reservation} last={index === array.length - 1} />
                                </div>
                            ))}
                        </IonCard>
                    </div>
                ))}
            </IonList>
        </IonContent>
        
    return (
        !browsingWeb ?
            <AppPage>
                {content}
            </AppPage> :
            <>
                {content}
            </>
    )
}

export default ReservationListPage
