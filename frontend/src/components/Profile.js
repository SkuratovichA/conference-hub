import React, {useState} from 'react';
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import ProfilePageResearcher from "./ProfilePageResearcher";
import ProfilePageOrganization from "./ProfilePageOrganization";
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

    if ((user.user || {}).is_researcher === true) {
        return (
            <ProfilePageResearcher user={user} userCRUDHandler={userCRUDHandler} token={token}/>
        )
    } else {
        return (
            <ProfilePageOrganization user={user} userCRUDHandler={userCRUDHandler} token={token}/>
        )
    }
}

export default Profile;