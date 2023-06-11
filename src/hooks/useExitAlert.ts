import { App } from "@capacitor/app";
import { useEffect, useState } from "react";

export const useExitAlert = (location: any) => {
    const [showAlert, setShowAlert] = useState(false);
    useEffect(() => {
        const backPressHandler = App.addListener('backButton', () => {
            if (location.pathname.includes("home"))
                setShowAlert(true);
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
    return {showAlert, handleAlertConfirm,handleAlertCancel}
}