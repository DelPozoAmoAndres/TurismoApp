import axios from 'axios';
import { filterPropertiesNotNull } from '../Utils/Utils';
import { Activity } from '../models/Activity';

export const getActivityList = async (searchString:string,filters: any): Promise<Activity[]> => {
  filters=filterPropertiesNotNull(filters);
  const params = new URLSearchParams({ searchString,...filters }).toString();
  return axios.get(`${process.env.REACT_APP_API_URL}/admin/activities?${params}`).then((res) => res.data);
};

export const getActivity = async (id:string): Promise<Activity> => {
  return axios.get(`${process.env.REACT_APP_API_URL}/activity/${id}`).then((res) => res.data);
};

export const editActivity = async (activity: Activity): Promise<Activity> => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/activity`, activity);
  return response.data;
};

export const deleteActivity = async (id:string): Promise<Activity> => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/admin/adctivity/${id}`);
};

export const createActivity = async (activity:Activity) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/admin/activity`,activity);
}
