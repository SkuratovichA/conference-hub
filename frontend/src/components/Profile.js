import React, {useState} from 'react';
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import ProfilePage from "./ProfilePage";
import {getInfoUser, userCRUDHandler} from "../actions/UserFunctions";

const Profile = () => {
    let {authTokens} = useContext(AuthContext)
    let [user, SetUserInfo] = useState({})
    let token = String("Bearer " + String(authTokens.access))

    useEffect(() => {
        getInfoUser(token)
            .then((data) => {
                SetUserInfo(data['infouser'])
            })
    }, [])

    return (
        <ProfilePage user={user} userCRUDHandler={userCRUDHandler} />
    )
}

export default Profile;