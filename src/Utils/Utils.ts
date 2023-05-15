// Filtrar las propiedades que no sean null
export const filterPropertiesNotNull = <T extends object >(data: any): T => {
  const filteredData: any = {};
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null) {
      filteredData[key as keyof T] = value;
    }
  });
  return filteredData as T;
};

//Formatear fechas para inputs
export const formatDate = (date: Date |null): string => {
  if (!date) return '';
  date=new Date(date.toString())
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
  