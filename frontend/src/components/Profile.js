import React, {useState} from 'react';
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import ProfilePage from "./ProfilePage";
import {getInfoUser} from "../actions/UserFunctions";

const Profile = () => {
    let {authTokens} = useContext(AuthContext)
    let [user_info, SetUserInfo] = useState({})
    let [profile_info, SetProfileInfo] = useState({})
    let token = String("Bearer " + String(authTokens.access))

    useEffect(() => {
        getInfoUser(token).
            then((data) => {
                SetUserInfo(data['infouser'])
                SetProfileInfo(data['profile'])
            })
    }, [])

    return (
        <ProfilePage user_info={user_info} profile_info={profile_info} />
    )
}

export default Profile;