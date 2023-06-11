import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../contexts/AuthContexts';

export const useNavButtonProps = (routeLink:string) => {
    const style = { borderBottom: " 1px solid var(--ion-color-primary)" }
    const history = useHistory();

    const handlePopState = () => {
        return history.location.pathname.includes(routeLink!) ? { style } : {}
     };
     const [props, setProps] = useState(handlePopState)
 
     useEffect(() => {
         history.listen(()=>setProps(handlePopState))
     }, [history])

     return  {props}
}
