// author: Shchapaniak Andrei

import {useContext, useState} from "react";
import AuthContext from "../context/AuthContext";

export const getInfoUser = async (token) => {
    if (token === null) {
        return {}
    }

    let response = await fetch('http://localhost:8000/users/api/manipulate_info_user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })

    let data = await response.json()
    return response.status >= 200 && response.status <= 299 ? data['infouser'] : null
}

export const getUsers = async (type) => {
    // type in [all, researchers, organizations]
     let response = await fetch('http://localhost:8000/users/api/get_users_' + type, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    let data = await response.json()
    let users = data['users']
    let success = response.status >= 200 && response.status <= 299

    console.log(JSON.stringify(users))
    console.log(Array.isArray(users))
    console.log("success: " + success)


    if (!success) {
        console.log("users in getUsers: ", users)
        console.log("response.status", response.status)
    }

    return success ? users : []
}

export const userCRUDHandler = async (type, dataToUpdate, token) => {
    await fetch('http://localhost:8000/users/api/manipulate_info_user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            data: dataToUpdate,
        }),
    })
}

export const getToken = () => {
    let {authTokens} = useContext(AuthContext)
    return "Bearer " + authTokens.access
}