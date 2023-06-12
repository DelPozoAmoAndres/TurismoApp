import React, { useState } from 'react';
import { IonButton, IonIcon, IonNavLink, IonSelect, IonSelectOption } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import { Language } from '../models/Language';
import i18n from '../components/i18n/i18n';
import { getItem } from '../Utils/Utils';
import { useLanguage } from '../hooks/useLanguage';
import { useScreen } from '../hooks/useScreen';

const LanguageSelector: React.FC = () => {
  const { languages, defaultLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
  const { isMobile } = useScreen();
  const handleLanguageChange = async (lang: Language) => {
    await i18n.changeLanguage(lang.code);
    setSelectedLanguage(lang);
  };

  return (
    <IonNavLink hidden={isMobile}>
      <IonButton expand="block" disabled={getItem('i18nextLng') === null}>
        <IonIcon slot="start" icon={globeOutline} />
        <IonSelect
          style={{ width: 'auto' }}
          interface="popover"
          selectedText={selectedLanguage.name}
          onIonChange={async (e) => {
            console.log(e.detail);
            await handleLanguageChange(e.detail.value);
          }}
        >
          {languages.map((lang) => (
            <IonSelectOption key={lang.code} value={lang}>
              {lang.name}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonButton>
    </IonNavLink>
  );
};

export default LanguageSelector;
