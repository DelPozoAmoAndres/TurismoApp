import { App } from '@capacitor/app';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export const useExitAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const backPressHandler = App.addListener('backButton', () => {
      if (location.pathname.includes('home')) setShowAlert(true);
    });
    return () => {
      backPressHandler.remove();
    };
  }, [location]);

  const handleAlertConfirm = () => {
    setShowAlert(false);
    App.exitApp();
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
  };
  return { showAlert, handleAlertConfirm, handleAlertCancel };
};
