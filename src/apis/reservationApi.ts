import axios from "axios";
import { Reservation, ReservationGroup } from "../models/Reservation";
import { Stripe } from "@capacitor-community/stripe";

export const getReservationList = async (): Promise<ReservationGroup[]> => {
  return axios.get(`${process.env.REACT_APP_API_URL}/reservations`).then((res) => { console.log(res.data); return res.data });
};

export const getReservation = async (id: string): Promise<Reservation> => {
  return axios.get(`${process.env.REACT_APP_API_URL}/reservation/${id}`).then(res => res.data)
}

export const cancelReservation = async (id: string) => {
  return axios.put(`${process.env.REACT_APP_API_URL}/cancel/reservation/${id}`)
}

export const createReservation = async (reservation: any, intentId: string) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/reservation`, { reservation, intentId });
}

export const intentReservation = async (price: number) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/intent/reservation/`, {
      price
    });
    return response.data.paymentIntent;
}

export const confrimPayment = async (paymentId: string) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/confirm/reservation/`, { paymentId }).then(res => res.data);
}

export const verifyPayment = async (paymentId: string) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/verify/reservation/`, { paymentId }).then(res => res.data)
}