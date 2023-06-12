import React from 'react';
/* Ionic components */
import { IonButton, IonCheckbox, IonCol, IonIcon, IonItem, IonLabel, IonList, IonRange, IonRow } from '@ionic/react';
import { filterOutline } from 'ionicons/icons';
/* Hooks */
import { useScreen } from '../../hooks/useScreen';
import { useActivityFilters } from '../../hooks/useActivityFilters';
/* Models */
import { ActivityFilter, ActivityState } from '../../models/Activity';
/* i18n */
import { useTranslation } from 'react-i18next';

export const ActivityFiltersView: React.FC<{
  applyFilters: (arg0: ActivityFilter) => void;
  filters?: ActivityFilter;
}> = ({ applyFilters, filters }) => {
  const { filtersToApply, newFilters, confirmFilters, handleFilters, clearFilters } = useActivityFilters(applyFilters, filters); // Hook to handle the filters
  const { width } = useScreen(); //Hook to have data of screen dimensions
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  return (
    <>
      <IonList class="ion-padding" style={{ width: filters ? '100%' : width / 4 }}>
        {!filters && (
          <IonRow class="ion-align-center">
            <h2>
              {' '}
              <IonIcon icon={filterOutline} />
              {t('filtersToApply.title')}
            </h2>
          </IonRow>
        )}
        <IonCol>
          <IonRow>
            <IonLabel>
              <strong>{t('filtersToApply.max.price')}</strong>
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonRange
              min={0}
              max={500}
              value={filtersToApply.precio ? filtersToApply.precio : 0}
              pin={true}
              ticks={true}
              onIonChange={(e) => (e.detail.value == 0 ? handleFilters(null, 'precio') : handleFilters(e.detail.value, 'precio'))}
            ></IonRange>
          </IonRow>
          <IonRow>
            <IonLabel>
              <strong>{t('filtersToApply.max.duration')}</strong>
            </IonLabel>
          </IonRow>
          <IonRow>
            <IonRange
              min={0}
              max={24}
              pin={true}
              value={filtersToApply.duration ? filtersToApply.duration : 0}
              ticks={true}
              onIonChange={(e) => (e.detail.value == 0 ? handleFilters(null, 'duration') : handleFilters(e.detail.value, 'duration'))}
            ></IonRange>
          </IonRow>
          <IonRow class="ion-margin-bottom">
            <IonCheckbox
              checked={filtersToApply.petsPermited ? filtersToApply.petsPermited : false}
              onIonChange={(e) => handleFilters(e.detail.checked ? true : null, 'petsPermited')}
            >
              <strong>{t('filtersToApply.pets.friendly')}</strong>
            </IonCheckbox>
          </IonRow>
          <IonRow class="ion-margin-bottom">
            <IonLabel>
              <strong>{t('filtersToApply.state')}</strong>
            </IonLabel>
          </IonRow>
          {Object.values(ActivityState).map((state, index) => (
            <IonRow class="ion-margin-bottom ion-margin-start" key={'Filter' + index}>
              <IonCheckbox
                checked={filtersToApply.state === state}
                onIonChange={(e) => handleFilters(e.detail.checked ? state : null, 'state')}
              >
                {t('filtersToApply.state.' + state)}
              </IonCheckbox>
            </IonRow>
          ))}
          <IonItem class=" ion-no-padding" lines="none" style={{ position: 'fixed', bottom: 0, width: '90%', left: '5%' }}>
            {newFilters && (
              <IonButton style={{ width: '100%' }} expand="block" onClick={clearFilters}>
                {t('filtersToApply.delete')}
              </IonButton>
            )}
            <IonButton expand="block" style={{ width: '100%' }} onClick={confirmFilters}>
              {t('filtersToApply.apply')}
            </IonButton>
          </IonItem>
        </IonCol>
      </IonList>
    </>
  );
};
