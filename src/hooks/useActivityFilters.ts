import React, { useEffect, useState } from 'react'
import { ActivityFilter } from '../models/Activity';

export const useActivityFilters = (applyFilters:Function,filters?:ActivityFilter) => {
    const defaultFilters: ActivityFilter = { precio: null, duration: null, petsPermited: null, state: null }
    const [filtersToApply, setFilters] = useState<ActivityFilter>(filters?filters:defaultFilters);
    const [newFilters, setNewFilters] = useState<boolean>(false);

    useEffect(()=>{
        filters && Object.values(filters).filter(v=>v!==null).length>0 && setNewFilters(true)
    },[])
    
    const clearFilters = () => {
        applyFilters(defaultFilters);
        setFilters(defaultFilters)
        setNewFilters(false)
    };

    const confirmFilters = () => {
        applyFilters(filtersToApply);
        setNewFilters(JSON.stringify(filtersToApply) !== JSON.stringify(defaultFilters));
    };

    const handleFilters = (value: any, filterName: string) => {
        let filtersCopy = { ...filtersToApply, [filterName]: value! }
        setFilters(filtersCopy);
    };

    return {handleFilters,confirmFilters,clearFilters, filtersToApply, newFilters}
}
