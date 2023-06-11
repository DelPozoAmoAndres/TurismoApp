import axios, { AxiosResponse } from 'axios';
import { User } from '../models/User';
import { filterPropertiesNotNull } from '../Utils/Utils';

export const getUserList = async (searchString:string,filters: any): Promise<User[]> => {
  filters=filterPropertiesNotNull(filters);
  const params = new URLSearchParams({ searchString,...filters }).toString();
  return axios.get(`${process.env.REACT_APP_API_URL}/admin/users?${params}`).then((res) => res.data);
};

export const getUserByToken = (): Promise<AxiosResponse<any, any>> => {
  return axios.get(process.env.REACT_APP_API_URL + '/user')
};

export const getUser = async (email:string): Promise<User> => {
  return axios.get(`${process.env.REACT_APP_API_URL}/admin/user?email=${email}`).then((res) => res.data);
};

export const editUser = async (user: User): Promise<User> => {
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/edit/user`, user);
  return response.data;
};

export const deleteUser = async (email:string): Promise<User> => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/admin/user?email=${email}`).then((res) => res.data);
};