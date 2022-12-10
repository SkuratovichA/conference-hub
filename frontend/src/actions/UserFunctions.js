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

export const updateProfileUser = async (dataUpdate) => {

    console.log('dataUpdate', dataUpdate)

    // let response = await fetch('http://localhost:8000/users/api/manipulate_info_user', {
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': String("Bearer " + String(authTokens.access)),
    //     },
    //     body: {'data': dataUpdate}
    // })
    //
    // if (response.status === 200) {
    //     alert("!EBAC CHOROSHO!")
    // }
    // else {
    //     alert("!PIZDA SAPOGAM INFO USER!")
    // }
}