// author: Shchapaniak Andrei

import React, {useState} from 'react';
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import ProfilePageResearcher from "./ProfilePageResearcher";
import ProfilePageOrganization from "./ProfilePageOrganization";
import {getInfoUser, getToken} from "../actions/UserFunctions";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    let {user, authTokens} = useContext(AuthContext)
    let [userFull, SetUserInfo] = useState({})
    let [loaded, setLoaded] = useState(false)
    let [canManipulate, changeManipulate] = useState(true)
    let token = String("Bearer " + String(authTokens.access))
    let navigate = useNavigate()

    useEffect(() => {
        getInfoUser(token)
            .then((data) => {
                SetUserInfo(data)
            })
            .then(() => {
                // if ("/users/" + user.username !== window.location.pathname) {
                //     navigate('/')
                // }
                setLoaded(true)
            })
    }, [])

    if (loaded === false) {
        return ""
    }

    if (user.user?.is_researcher === true) {
        return (
            <ProfilePageResearcher
                user={userFull}
                canManipulate={canManipulate}
                token={token}
            />
        )
    } else {
        return (
            <ProfilePageOrganization
                user={userFull}
                canManipulate={canManipulate}
                token={token}
            />
        )
    }
}

export default Profile;