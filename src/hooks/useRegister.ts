import React, { useState, FormEvent } from 'react'
import { RegisterFormData } from '../models/User';
import { useAuth } from '../contexts/AuthContexts';
import { filterPropertiesNotNull } from '../Utils/Utils';

export const useRegister = () => {
    const [formData, setFormData] = useState<RegisterFormData>({ name: '', telephone: null, email: '', birthday: null, country: null, password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const auth = useAuth();

    const handleRegister = async (e: FormEvent) => {
        try {
            e.preventDefault();
            setLoading(true);
            setError(null);
            await auth.register(filterPropertiesNotNull(formData));
        } catch (error: any) {
            console.error(error);
            setError(error?.message ?? 'Ha habido un error en el servidor.');
        }
        setLoading(false);
        setShowAlert(true);
    }
    return {formData,showAlert,setShowAlert,loading,error, setFormData, handleRegister}
}
