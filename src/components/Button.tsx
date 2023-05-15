import React, { MouseEventHandler } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { useAuth } from "../contexts/AuthContexts";
import { Role } from "../models/User";

interface ButtonProps {
    mode?: "ios" | "md" | undefined;
    icon: string;
    text: string;
    onClick: MouseEventHandler;
    role?: Role|null;
}

export const Button: React.FC<ButtonProps> = ({ mode, icon, text, role, onClick }) => {
    const auth = useAuth();
    return (
        (auth.user && role===null) || (auth.user?.role===role) || (role === undefined && auth.token === null) ?
            <IonButton mode={mode || "ios"} onClick={onClick} >
                <IonIcon icon={icon} />
                <p>{text}</p>
            </IonButton > :
            <></>
    )
}
