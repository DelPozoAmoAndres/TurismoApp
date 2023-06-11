import axios from 'axios';
import { filterPropertiesNotNull } from '../Utils/Utils';
import { Activity, Event } from '../models/Activity';

export const getActivityList = async (searchString:string = "",filters: any={}): Promise<Activity[]> => {
  filters=filterPropertiesNotNull(filters);
  console.log(filters)
  const params = new URLSearchParams({ searchString,...filters }).toString();
  return axios.get(`${process.env.REACT_APP_API_URL}/activities?${params}`).then((res) => res.data);
};

export const getActivity = async (id:string): Promise<Activity> => {
  return axios.get(`${process.env.REACT_APP_API_URL}/activity/${id}`).then((res) => res.data);
};

export const editActivity = async (activity: Activity): Promise<Activity> => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/admin/activity`, activity);
  return response.data;
};

export const deleteActivity = async (id:string): Promise<Activity> => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/admin/adctivity/${id}`);
};

export const createActivity = async (activity:Activity) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/admin/activity`,activity);
}

export const createEvent = async (activityId:string,event:Event,repeatInfo:any)=>{
  return axios.post(`${process.env.REACT_APP_API_URL}/admin/event`,{event:event,activityId:activityId,repeatInfo})
}

export const getEvents = async (activityId:string): Promise<Event[]> => {
  return axios.get(`${process.env.REACT_APP_API_URL}/activity/${activityId}/events`).then((res) => res.data);
};

export const saveActivity = async (activityId:string,planificationNameList:string[]): Promise<Event[]> => {
  return axios.post(`${process.env.REACT_APP_API_URL}/activity/${activityId}/save/`,planificationNameList).then((res) => res.data);
}

export const createPlanification = async (planificationName:string): Promise<Event[]> => {
  return axios.post(`${process.env.REACT_APP_API_URL}/planification/`,planificationName).then((res) => res.data);
}
