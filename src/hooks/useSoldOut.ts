import React, { useEffect, useState } from 'react'
import { Event } from '../models/Activity';

export const useSoldOut = (events: Event[] | null) => {
        /* Internal states */
        const [soldOutProps, setSoldOut] = useState({}) //Variable to change the state of the availability button

        const style = { "opacity": "1" }
        const disabled = true;
        const color = "medium"
        const props = { style, disabled, color } //Props with disabled state for the availability button

        useEffect(() => {
                setSoldOut((!events || events && events.length == 0) ? props : {})
        }, [events])

        return { soldOutProps }

}
