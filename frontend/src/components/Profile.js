// author: Shchapaniak Andrei

import React, {useState} from 'react';
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import ProfilePageResearcher from "./ProfilePageResearcher";
import ProfilePageOrganization from "./ProfilePageOrganization";
import {getInfoUser, getToken} from "../actions/UserFunctions";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    let {authTokens} = useContext(AuthContext)
    let [user, SetUserInfo] = useState({})
    let [loaded, setLoaded] = useState(false)
    let [canManipulate, changeManipulate] = useState(true)
    let [renderAgain, changeRenderAgain] = useState(false)
    let token = String("Bearer " + String(authTokens.access))
    let navigate = useNavigate()

    useEffect(() => {
        getInfoUser(token)
            .then((data) => {
                SetUserInfo(data)
            })
            .then(() => {
                setLoaded(true)
            })
    }, [renderAgain, ])


    if ("/users/" + user.user?.username !== window.location.pathname) {
        navigate('/')
        return ""
    }

    if (loaded === false) {
        return ""
    }

    if (user.user?.is_researcher === true) {
        return (
            <ProfilePageResearcher
                user={user}
                canManipulate={canManipulate}
                token={token}
                callbackRender={() => {
                    console.log("AAAAAAAAAAAAAAAAAAAAA")
                    changeRenderAgain(!renderAgain)
                }}
            />
        )
    } else {
        return (
            <ProfilePageOrganization
                user={user}
                canManipulate={canManipulate}
                token={token}
            />
        )
    }
}

export default Profile;