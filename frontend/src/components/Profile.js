import React, {useState} from 'react';
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import ProfilePageResearcher from "./ProfilePageResearcher";
import ProfilePageOrganization from "./ProfilePageOrganization";
import {getInfoUser, userCRUDHandler} from "../actions/UserFunctions";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    let {authTokens} = useContext(AuthContext)
    let [user, SetUserInfo] = useState({})
    let [loaded, setLoaded] = useState(false)
    let token = String("Bearer " + String(authTokens.access))
    let navigate = useNavigate()

    useEffect(() => {
        getInfoUser(token)
            .then((data) => {
                SetUserInfo(data['infouser'])
            })
            .then(() => {
                setLoaded(true)
            })
    }, [])

    if (loaded === false) {
        return ""
    }

    if (String("/" + (user.user || {}).username) !== window.location.pathname) {
        alert("TY DAUN???")
        navigate('/')
        return ""
    }

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