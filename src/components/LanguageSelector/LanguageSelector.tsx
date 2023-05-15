import React, { useState } from 'react';
import { IonButton, IonIcon, IonPopover } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import { Language } from '../../models/Language';
import i18n from '../i18n/i18n';

type LanguageSelectorProps = {
  languages: Language[];
  defaultLanguage: Language;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, defaultLanguage}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang.code);
    setShowPopover(false);
  }

  return (
    <>
      <IonButton mode="ios" onClick={() => setShowPopover(true)}>
        <IonIcon icon={globeOutline} />
        <span>{selectedLanguage.name}</span>
      </IonButton>
      <IonPopover isOpen={showPopover} onDidDismiss={() => setShowPopover(false)}>
        {languages.map((lang) => (
          <IonButton key={lang.code} onClick={() => handleLanguageChange(lang)}>{lang.name}</IonButton>
        ))}
      </IonPopover>
    </>
  );
}

export default LanguageSelector;
