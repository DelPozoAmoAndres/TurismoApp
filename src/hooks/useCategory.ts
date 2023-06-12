import { useEffect, useState } from 'react';
import { getActivityList } from '../apis/activityApi';
import { Activity, ActivityState } from '../models/Activity';

export const useCategory = () => {
  const [actividades, setActividades] = useState<{
    populars: Activity[];
    mountain: Activity[];
    beach: Activity[];
  }>({ populars: [], mountain: [], beach: [] });
  const categories = {
    populares: actividades.populars,
    montaña: actividades.mountain,
    playa: actividades.beach,
  };
  useEffect(() => {
    getActivityList("",{state:ActivityState.available})
      .then((list) =>
        setActividades({
          populars: [...list, ...list],
          mountain: [],
          beach: [],
        })
      )
      .catch((error) => console.error(error));
  }, []);

  return { categories };
};
