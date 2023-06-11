/* Ionic components */
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonButton, IonIcon, IonText } from '@ionic/react'
import { star } from 'ionicons/icons'
/* Models */
import { Activity } from '../../models/Activity'
/* Styles */
import "./ActivityCard.css"
/* Hooks */
import { useScreen } from '../../hooks/useScreen'
/* i18n */
import { useTranslation } from 'react-i18next'

export const ActivityCard: React.FC<{ activity: Activity}> = ({ activity }) => {
    const {width} = useScreen(); //Hook to have data of screen dimensions
    const {t}=useTranslation(); //Hook to change the translation without refreshing the page

    activity.images=["https://imagenes.elpais.com/resizer/2kZjFxiNoG3Pvq9dbeHPTe7aiXc=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/RWF77A5EQGZX4QA2ABH76KQAZE.jpg"]

    return (
        <IonCard id="card-home" class="ion-no-margin" mode='ios' style={{"width":(width-(13*2)-(((width/250)-1)*10))/(width/250),"backgroundImage":`url(${activity?.images[0]})`}}>
            <IonCardContent class="ion-no-padding">
                <IonCard >
                    <IonCardTitle >
                        {activity.name}
                    </IonCardTitle>
                    <IonCardSubtitle>
                        <IonText className='ion-margin-left'>{activity.location}</IonText>
                        <IonText class="ion-no-margin ion-align-items-center">
                            <IonIcon icon={star} color='primary'/>
                            <IonText class="ion-no-margin">3/5 (323)</IonText>
                        </IonText>
                    </IonCardSubtitle>
                    <IonCardContent class="ion-no-padding">
                    {activity?.events ? <strong>
                                {t("from")} {Math.min(...(activity?.events?.map(e=>e.price as number)!)).toString()}€
                            </strong>:<strong>{t("sold.out")}</strong>}
                        <IonButton routerLink={'/activity/'+activity._id}>{t("show.info")}</IonButton>
                    </IonCardContent>
                </IonCard>
            </IonCardContent>
        </IonCard>
    )
}
