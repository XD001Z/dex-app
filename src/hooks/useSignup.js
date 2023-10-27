import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { API_URL } from "../services/API_URL";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = (email, password) => {
        setIsLoading(true);
        setError(null);

        axios.post(API_URL + "/auth/signup", { email, password })
        .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data));
            dispatch({type: 'LOGIN', payload: response.data});
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            setError(error.response.data.message);
        });
    };
    return { signup, isLoading, error };
};
