import {useContext} from "react";
import authContext from "../context/AuthContext";
export const getInfoUser = async (token) => {
    let response = await fetch('http://localhost:8000/users/api/manipulate_info_user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    })

    let data = await response.json()

    if (response.status === 200) {
        return data
    }
    else {
        alert("!PIZDA SAPOGAM INFO USER!")
        return {}
    }
}

export const userCRUDHandler = async (type, dataToUpdate, token) => {

    console.log('type', type, dataToUpdate)

    let response = await fetch('http://localhost:8000/users/api/manipulate_info_user', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify({
            data: dataToUpdate,
        }),
    })

    if (response.status === 200) {
        alert("!EBAC CHOROSHO!")
    }
    else {
        alert("!PIZDA SAPOGAM CRUD USER!")
    }
}