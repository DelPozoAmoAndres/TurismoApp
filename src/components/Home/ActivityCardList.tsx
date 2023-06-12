import React, { useState } from 'react';
/* Carousel */
import { Keyboard, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
/* Ionic components */
import { IonButton, IonGrid, IonRow } from '@ionic/react';
/* Components */
import { ActivityCard } from './ActivityCard';
/* Hooks */
import { useScreen } from '../../hooks/useScreen';
/* Styles */
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
/* i18n */
import { useTranslation } from 'react-i18next';
import { useCategory } from '../../hooks/useCategory';
export const ActivityCardList: React.FC = () => {
  const { categories } = useCategory(); //List of activities grouped by category
  const [filtro, setFiltro] = useState<'populares' | 'montaña' | 'playa'>('populares'); // Variable to change between the 3 lists of activities
  const { browsingWeb, width, isMobile } = useScreen(); //Hook to have data of screen dimensions
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page

  return (
    <IonGrid class="ion-no-padding">
      <IonRow class="ion-padding-horizontal">
        <strong className="ion-no-margin">{t('welcome.categories.title')}</strong>
      </IonRow>
      <IonRow>
        <Swiper id="categories" slidesPerView={(((width + 10) / (width - 16)) * width) / 270} spaceBetween={8}>
          <SwiperSlide>
            <IonButton mode="ios" color={filtro != 'populares' ? 'secondary' : 'primary'} onClick={() => setFiltro('populares')}>
              {t('welcome.categories.popular')}
            </IonButton>
          </SwiperSlide>
          <SwiperSlide>
            <IonButton mode="ios" color={filtro != 'montaña' ? 'secondary' : 'primary'} onClick={() => setFiltro('montaña')}>
              {t('welcome.categories.mountain')}
            </IonButton>
          </SwiperSlide>
          <SwiperSlide>
            <IonButton mode="ios" color={filtro != 'playa' ? 'secondary' : 'primary'} onClick={() => setFiltro('playa')}>
              {t('welcome.categories.beach')}
            </IonButton>
          </SwiperSlide>
        </Swiper>
        <Swiper
          id="cards-home"
          slidesPerView={(((width + 10) / (width - 16)) * width) / 250}
          spaceBetween={10}
          modules={[Keyboard, Navigation, Pagination]}
          keyboard={{ enabled: true }}
          navigation={browsingWeb && !isMobile}
        >
          <>
            {categories[filtro].map((activity, index) => (
              <SwiperSlide key={index}>
                <ActivityCard activity={activity} />
              </SwiperSlide>
            ))}
          </>
        </Swiper>
      </IonRow>
    </IonGrid>
  );
};
