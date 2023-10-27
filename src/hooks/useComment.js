import axios from "axios";
import { API_URL } from "../services/API_URL";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useComment = async ( e, text, animeid, setAnime ) => {
    e.preventDefault();
    const { user } = useAuthContext();

    axios.post(API_URL + `/anime/${animeid}/comment/add`, { text }, {
        headers: {
            "authorization": `Bearer ${user.authToken}`
        }
    })
    .then((response) => {
        setAnime(response.data);
        return
    })
    .catch((err) => {
        console.log(err);
    });
}

export {useComment};