import React, { useState } from 'react';
import { IonInput } from '@ionic/react';
import { useLanguage } from '../hooks/useLanguage';

interface FieldProps {
  value: string;
  label: string;
  type: any;
  placeholder: string;
  errorText:string;
  labelPlacement?:any;
  validationFn: (value: string) => boolean;
  onIonInput:(value:any) => void;
}

export const Field: React.FC<FieldProps> = ({ value, errorText,label, type, placeholder, labelPlacement, validationFn, onIonInput }) => {
  const [isValid, setIsValid] = useState<boolean | undefined>();
  const [isTouched, setIsTouched] = useState(false);

  const validate = (ev: any) => {
    const fieldValue = ev.detail.value;

    setIsValid(undefined);

    if (fieldValue === '') return;

    const isValidValue = validationFn(fieldValue);
    setIsValid(isValidValue);
    
  };

  const markTouched = () => {
    setIsTouched(true);
  };  

  const {defaultLanguage} = useLanguage();

  return (
    <IonInput
      className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
      type={type}
      labelPlacement={labelPlacement ?? "floating"}
      label={label}
      value={value}
      placeholder={placeholder}
      errorText={errorText}
      onIonInput={(event) => {validate(event);onIonInput(event)}}
      onIonBlur={() => markTouched()}
    ></IonInput>
  );
};