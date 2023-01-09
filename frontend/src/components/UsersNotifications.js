// author: Khrystsiuk Dziyana

import React, {useContext} from "react";
import {Box, List, Toolbar, Typography} from "@mui/material";
import {ListItem} from "@mui/joy";
import {NotificationItem} from "./Notification";
import {InviteContext} from "./Navbar";

const UsersNotifications = () => {
    const invites = useContext(InviteContext)
    let i = 0;

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
                {invites.organizations.map((value) => (
                  <ListItem key={i++} sx={{width: "100%"}}>
                    <NotificationItem invite={value}/>
                  </ListItem>
                ))}
              </List>
            </Box>
        </Box>
    )
}

export default UsersNotifications;