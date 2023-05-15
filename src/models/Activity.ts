export interface Activity{
    name:string;
    location:string;
    duration:number;
    description:string;
    events:Event[] | null;
    accesibility: string;
    petsPermited:boolean;
    state: ActivityState;
    _id?:string;
}

export enum ActivityState {"abierta","parada temporalmente","cancelada"}

export interface Event{
    seats: Number; 
    availableSeats: Number;
    date: Date;
    price: Number;
    language: string;
}

export interface ActivityFilter {
    duration: Number| null;
    petsPermited:Boolean | null;
    state:ActivityState|null;
}