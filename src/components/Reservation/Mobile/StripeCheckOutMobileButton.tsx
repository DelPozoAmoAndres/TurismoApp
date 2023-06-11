
import React, { useState } from "react";
/* Ionic Components */
import { IonButton } from "@ionic/react";
import { Capacitor } from "@capacitor/core";
import { Stripe } from "@capacitor-community/stripe";
/* Apis */
import { intentReservation } from "../../../apis/reservationApi";
/* Contexts */
import { useReservation } from "../../../contexts/ReservationContext";
/* i18n */
import { useTranslation } from "react-i18next";
/* Components */
import Spinner from "../../../shared/Spinner";
import { PaymentIntent } from "@stripe/stripe-js";

const StripeCheckoutMobileButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation(); //Hook to change the translation without refreshing the page
  const { reservation, registerReservation, setStep, paymentIntent, setPaymentIntent } = useReservation(); //Context of reservation

  if (Capacitor.isPluginAvailable("Stripe")) {
    Stripe.initialize({
      publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY + '',
    })
  }

  const handleCheckout = async () => {
    setLoading(true);

    try {
      let intent = paymentIntent;
      if (!intent){
        intent = await intentReservation(reservation.price);
        setPaymentIntent(intent);
      }
      console.log("PaymentIntent client secret:", intent!.client_secret);

      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: intent!.client_secret!,
        merchantDisplayName: "Inclusive Innovation Incubator",
      });

      await Stripe.presentPaymentSheet();
      await registerReservation(intent!.id);

      setStep(3);
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonButton onClick={handleCheckout} disabled={loading}>
      {loading ? <Spinner /> : t("continue")}
    </IonButton>
  );
};

export default StripeCheckoutMobileButton;