import React, { useEffect, useState } from 'react'
import { getEvents } from '../apis/activityApi';
import { formatDate } from '../Utils/Utils';
import { Event } from '../models/Activity';

export const useActivityAvailability = (activityId: string) => {
    const [highlightedDates, setHighlightedDates] = useState<any>([]);  //Days with events available
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); //Day used to display the events of that day
    const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);  //List of the events whose date is the selectedDate
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); //Event selected for the reservation
    const [events, setEvents] = useState<Event[] | null>(null)  //List of all the events of the activity 

    const handleDateChange = (date: Date) => { //Method to handle when de date selected in the calendar change
        setSelectedDate(date);
        setSelectedEvent(null);
        const selectedEvents = events?.filter((event) => formatDate(event.date) === formatDate(date));
        if (selectedEvents) {
            setSelectedEvents(selectedEvents!);
        }
    };

    useEffect(() => {
        getEvents(activityId).then((events: Event[]) => {
            setEvents(events);
            let days: any[] = []
            events.forEach((event) => days.push({
                date: formatDate(event.date), textColor: "white",
                backgroundColor: '#B37FD9'
            }))
            setHighlightedDates(days);
        })
    }, [])
    return {highlightedDates,selectedDate,selectedEvent,selectedEvents,handleDateChange,setSelectedEvent}
}
