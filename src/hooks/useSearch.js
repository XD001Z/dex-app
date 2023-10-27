import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { API_URL } from "../services/API_URL";

export const useSearch = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { user, dispatch } = useAuthContext();

    const search = (name) => {
        setIsLoading(true);
        setError(null);

        axios.post(API_URL + "/anime/find-one", {name}, {
            headers: {
                "Authorization": `Bearer ${user.authToken}`
            }
        })
        .then((response) => {
            let localUser = JSON.parse(localStorage.getItem('user'));
            localUser['registered'].push(response.data);
            localUser['registered'].sort((a, b) => a.dexNum - b.dexNum);
            localStorage.setItem('user', JSON.stringify(localUser));
            dispatch({type: 'ADD', payload: localUser});
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
            setError(error.response.data.message);
        });
    };
    return { search, isLoading, error };
};