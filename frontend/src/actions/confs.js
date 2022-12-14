// author: Shchapaniak Andrei

import axios from "axios";

import { GET_CONFS } from "./types";

// GET CONFS
export const getConfs = () => dispatch => {
    axios.get('http://localhost:8000/users/api/users_list')
        .then(res => {
            dispatch({
                type: GET_CONFS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}