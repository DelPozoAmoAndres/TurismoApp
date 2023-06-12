export interface Activity {
  name: string;
  images: string[];
  location: string;
  duration: number;
  description: string;
  events: Event[] | null;
  accesibility: string;
  petsPermited: boolean;
  state: ActivityState;
  _id?: string;
}

export enum ActivityState {
  'available' = 'available',
  'temporaly-closed' = 'temporaly-closed',
  'canceled' = 'canceled',
}

export interface Event {
  seats: number;
  bookedSeats?: number;
  date: Date;
  price: number;
  language: string;
  guide: string;
  _id?: string;
}

export interface ActivityFilter {
  precio?: number;
  duration?: number ;
  petsPermited?: boolean ;
  state?: ActivityState ;
}
