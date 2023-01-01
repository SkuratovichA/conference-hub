// author: Khrystsiuk Dziyana

import {useNavigate} from "react-router-dom";
import queryString from "query-string";
import React, {useContext, useState} from "react";
import withRouter from "../utils/withRouter";
import AuthContext from "../context/AuthContext";
import {ContentSection} from "./ContentSection";
import {AppBar, Box, Button, Drawer, List, ListItemText, Paper, Toolbar, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Conference from "./Conference";
import UserSearch from "./UserSearch";
import {ListItem} from "@mui/joy";
import Notification from "./Notification";

const UsersNotifications = () => {
    const user_nofitications = mock;
    let i = 0;
    // let navigate = useNavigate()
    //
    //
    //
    // let {authTokens} = useContext(AuthContext)
    // let [loaded, setLoaded] = useState(false)
    // let [conferences, setConfs] = useState(false)
    // let [activeConference, setAC] = useState(params.conference_name)
    // let [userInfo, setUserInfo] = useState({})
    // let [canManipulate, setManipulate] = useState(false)

    // alert(params)
    return (
        <Box>
            <Toolbar sx={{background: "#1976d2", color: "#ffffff"}}>
                <Typography variant="h5" sx={{fontWeight: 'bold'}} > User's Notifications </Typography>
            </Toolbar>

            <Box
              sx={{
                px: 2,
                pb: 2,
                overflow: 'auto',
              }}
            >
            <List sx={{ bgcolor: 'background.paper'}}>
              {user_nofitications.map((value) => (
                <ListItem key={i++} sx={{width: "100%"}}>
                  <Notification invite={value}/>
                </ListItem>
              ))}
            </List>
            </Box>

        </Box>


    )
}

//<UserSearch/>

let mock = [
    {
        type: "membership",
        message: "Your boss want you to participate in your organization",
        date: new Date(2022,12,12,12,0),
        status: false,
    },
    {
        type: "lecture",
        message: "We are waiting for you to join us on the energetic event we like",
        date: new Date(2022, 12, 27, 17,45),
        status: false,
    },
    {
        type: "presentation",
        message: "You have a presentation to commit to your lecture",
        date: new Date(2022, 3, 12, 10, 0),
        status: false,
    },
    {
        type: "lecture",
        message: "You need to participate in this fucking event",
        date: new Date(2022,12,23, 8,9),
        status: false,
    },
    {
        type: "membership",
        message: "Your mom want you to piss in the organization",
        date: new Date(2022,12,20,6,58),
        status: false,
    }
]

export default UsersNotifications;