import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonToolbar } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import React, { useEffect, useRef, useState } from 'react'
import { Language } from '../../models/Language';

declare interface DateSelectorProps {
    page: React.MutableRefObject<null>;
    defaultLanguage: Language;
    setBirthday: Function;
    presentation: any;
    initialBreakpoint : number;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ page, defaultLanguage, setBirthday, presentation, initialBreakpoint }) => {
    const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null);
    const modal = useRef<HTMLIonModalElement>(null);
    const [fecha, setFecha] = useState(new Date());
    useEffect(() => {
        setPresentingElement(page.current);
    }, []);

    const handleDateChange = (value: any) => {
        setFecha(value);
    };

    function dismiss() {
        modal.current?.dismiss();
    }

    async function canDismiss(data?: any, role?: string) {
        return role !== 'gesture';
    }

    return (
        <>
            <IonModal ref={modal} trigger="open-modal" animated initialBreakpoint={initialBreakpoint} canDismiss={canDismiss} presentingElement={presentingElement!}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => dismiss()}>Cancelar</IonButton>
                        </IonButtons>
                        <IonButtons slot="end">
                            <IonButton onClick={() => { setBirthday(fecha); dismiss() }}>Aceptar</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonDatetime presentation={presentation} lang={defaultLanguage.code} onIonChange={e => handleDateChange(e.detail.value!)} />
                </IonContent>
            </IonModal>
        </>
    )
}
