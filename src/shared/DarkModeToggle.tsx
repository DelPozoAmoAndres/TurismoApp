import React, { useState } from 'react';
import { IonIcon, IonButton, IonNavLink } from '@ionic/react';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import { getItem, setItem } from '../Utils/Utils';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { useScreen } from '../hooks/useScreen';

const DarkModeToggle: React.FC = () => {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return theme === 'dark';
  });

  const { isMobile } = useScreen();

  const { t } = useTranslation();

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark', !isDarkMode);
    setIsDarkMode(!isDarkMode);
    setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <IonNavLink hidden={isMobile}>
      <IonButton expand="block" onClick={toggleDarkMode} disabled={getItem('i18nextLng') === null}>
        <IonIcon icon={isDarkMode ? sunnyOutline : moonOutline} slot="start" />
        {t('theme.title')}
      </IonButton>
    </IonNavLink>
  );
};

export default DarkModeToggle;
