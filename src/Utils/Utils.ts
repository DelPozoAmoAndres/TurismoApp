// Filtrar las propiedades que no sean null
export const filterPropertiesNotNull =(data: any)=> {
  const filteredData: any = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null) {
      filteredData[key] = value;
    }
  });
  return filteredData ;
};

//Formatear fechas para inputs
export const formatDate = (date: Date | null, showTime?: boolean): string => {
  if (!date) return '';
  date = new Date(date.toString());
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  let time = '';
  if (showTime) {
    let hours = date.getHours().toString();
    hours = hours.length > 1 ? hours : '0' + hours;
    let minutes = date.getMinutes().toString();
    minutes = minutes.length > 1 ? minutes : '0' + minutes;
    time = 'T' + hours + ':' + minutes;
  }
  return `${year}-${month}-${day}${time}`;
};

export const formatDateToTime = (date: Date | null): string => {
  return formatDate(date, true).split('T')[1];
};

export function getItem(key: string) {
  try {
    return localStorage.getItem(key);
  } catch (error: unknown) {
    return null;
  }
}

export function setItem(key: string, item: string) {
  try {
    localStorage.setItem(key, item);
  } catch (error: unknown) {
    return null;
  }
}

export function removeItem(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (error: unknown) {
    return null;
  }
}
