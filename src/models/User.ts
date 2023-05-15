export interface User {
    name: string;
    email: string;
    birthday? : Date|null;
    telephone?: Number|null;
    country?: string|null;
    password: string;
    role?: Role;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FieldConfig {
    key: keyof User;
    label: string;
    type?: "number" | "email" | "password" | "search" | "time" | "text" | "date" | "tel" | "url" | "week" | "month" | "datetime-local" | undefined;
    disabled?: boolean;
  }

export interface RegisterFormData extends User{
    confirmPassword: string;
}

export enum Role { "administrador"="admin", "turista"="user", "guía"="worker"}

export interface UserFilter {
    country: string | null;
    role:Role | null
}