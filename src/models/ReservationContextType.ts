import { PaymentIntent } from "@stripe/stripe-js";
import { Activity, Event } from "./Activity";
import { Reservation } from "./Reservation";
import { RegisterFormData, User } from "./User";

export interface ReservationContextType {
    step: number,
    activity: Activity | null,
    event: Event | null,
    paymentIntent:PaymentIntent | null,
    reservation: Reservation,
    setStep: Function,
    setPersonalData:Function,
    setPaymentIntent:Function,
    registerReservation:Function
  }