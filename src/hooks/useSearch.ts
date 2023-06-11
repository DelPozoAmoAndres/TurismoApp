import { useState, useEffect } from 'react';
import { Activity } from '../models/Activity';


export const useSearch = (getList:Function,filterScheme:any) => {
    const [searchText, setSearchText] = useState<string>('');
    const [filters, setFilters] = useState(filterScheme);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        cargarServicios();
    }, [searchText, filters]);

    const cargarServicios = async () => {
        try {
            setItems(await getList(searchText, filters))
        } catch (error) {
            console.error(error);
        }
    };

    const handleFilter = (filters:any) => {
        setFilters(filters);
    };
    
    return {handleFilter,setSearchText,items, filters}
}
