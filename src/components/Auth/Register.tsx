import React from 'react';
import { RouteComponentProps } from 'react-router';
/* Ionic Components */
import { IonPage, IonContent, IonItem, IonButton, IonAlert, IonHeader, IonToolbar, IonTitle, IonButtons } from '@ionic/react';
/* Components */
import Spinner from '../../shared/Spinner';
import { Field } from '../../shared/Field';
import { AppPage } from '../../pages/AppPage';
/* Utils */
import { dateValidation, emailValidation, lengthValidation, telephoneValidation } from '../../Utils/Validations';
import { formatDate } from '../../Utils/Utils';
/* Hooks */
import { useRegister } from '../../hooks/useRegister';
import { useScreen } from '../../hooks/useScreen';
/* i18n */
import { useTranslation } from 'react-i18next';

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const { formData, showAlert, loading, error, setShowAlert, setFormData, handleRegister } = useRegister();
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const {browsingWeb} = useScreen(); //Hook to have data of screen dimensions

  const header =
    <IonHeader>
      <IonToolbar mode="ios">
        <IonTitle>{t("sign.up")}</IonTitle>
        <IonButtons slot='start'>
          <IonButton mode="ios" routerLink='/'>
            {t("cancel")}
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

  const content =
    <IonContent>
      <form onSubmit={handleRegister}>
        <IonItem lines='none'>
          <Field
            label={t("personalData.name")}
            errorText={t("personalData.name.error")}
            placeholder={t("personalData.name.placeholder")}
            type='text'
            onIonInput={e => setFormData({ ...formData, name: e.detail.value! })}
            validationFn={e => lengthValidation(8, e)}
            value={formData.name}
          />
        </IonItem>
        <IonItem lines='none'>
          <Field
            label={t("personalData.email")}
            errorText={t("personalData.email.error")}
            placeholder={t("personalData.email.placeholder")}
            type='email'
            onIonInput={e => setFormData({ ...formData, email: e.detail.value! })}
            validationFn={emailValidation}
            value={formData.email}
          />
        </IonItem>
        <IonItem lines='none'>
          <Field
            label={t("personalData.telephone")}
            errorText={t("personalData.telephone.error")}
            placeholder={t("personalData.telephone.placeholder")}
            type='tel'
            onIonInput={e => setFormData({ ...formData, telephone: Number(e.detail.value!) })}
            validationFn={telephoneValidation}
            value={formData.telephone ? String(formData.telephone) : ""}
          />
        </IonItem>
        <IonItem lines='none'>
          <Field
            label={t("personalData.birthday")}
            errorText={t("personalData.birthday.error")}
            placeholder={t("personalData.birthday.placeholder")}
            validationFn={dateValidation}
            type='date'
            onIonInput={e => { setFormData({ ...formData, birthday: new Date(e.detail.value!) }) }}
            value={formatDate(formData.birthday!)}
          />
        </IonItem>
        <IonItem lines='none'>
          <Field
            label={t("personalData.country") + " (" + t("optional") + ")"}
            errorText={t("personalData.country.error")}
            placeholder={t("personalData.country.placeholder")}
            validationFn={() => true}
            type='text'
            onIonInput={e => { setFormData({ ...formData, country: e.detail.value! }) }}
            value={formData.country ? formData.country : ""}
          />
        </IonItem>

        <IonItem lines='none'>
          <Field
            label={t("personalData.password")}
            errorText={t("personalData.password.error")}
            placeholder={t("personalData.password.placeholder")}
            validationFn={() => true}
            type='password'
            onIonInput={e => { setFormData({ ...formData, password: e.detail.value! }) }}
            value={formData.password}
          />
        </IonItem>
        <IonItem lines='none'>
          <Field
            label={t("personalData.confirm.password")}
            errorText={t("personalData.confirm.password.error")}
            placeholder={t("personalData.confirm.password.placeholder")}
            validationFn={() => true}
            type='password'
            onIonInput={e => { setFormData({ ...formData, confirmPassword: e.detail.value! }) }}
            value={formData.confirmPassword}
          />
        </IonItem>
        <IonButton type="submit" expand="block">
          {loading ? <Spinner /> : t("sign.up")}
        </IonButton>
      </form>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => { setShowAlert(false); error ?? history.push("/") }}
        header={error ? t("alert.error.title")! : t("alert.account.created.title")!}
        message={error ?? t("alert.account.created.message")!}
        buttons={['OK']}
      />
    </IonContent>
  return (
    !browsingWeb ?
            <AppPage>
                {content}
            </AppPage> :
            <>
                {content}
            </>

  );
}

export default Register;
