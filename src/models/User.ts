import { Activity } from './Activity';

export interface User {
  name: string;
  email: string;
  birthday?: Date | null;
  telephone?: number | null;
  country?: string | null;
  password: string;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;
  schedules?: Schedule[];
  _id?: string;
}

export interface Schedule {
  name: string;
  activities: Activity[];
}

export interface FieldConfig {
  key: keyof User;
  label: string;
  type?:
    | 'number'
    | 'email'
    | 'password'
    | 'search'
    | 'time'
    | 'text'
    | 'date'
    | 'tel'
    | 'url'
    | 'week'
    | 'month'
    | 'datetime-local'
    | undefined;
  disabled?: boolean;
}

export interface RegisterFormData extends User {
  confirmPassword: string;
}

export enum Role {
  'administrador' = 'admin',
  'turista' = 'user',
  'guía' = 'worker',
}

export interface UserFilter {
  country: string | null;
  role: Role | null;
}
