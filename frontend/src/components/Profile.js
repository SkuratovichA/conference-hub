import React from 'react';
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {AppBar, Button, IconButton, Stack, Toolbar, Typography} from "@mui/material";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";

const Profile = () => {
    let {user} = useContext(AuthContext)
    let navigate = useNavigate()
    console.log(user)

    return (
        <p>{user.username}</p>
    )
}

export default Profile;