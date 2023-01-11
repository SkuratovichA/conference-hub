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
        <Box
          sx={{
            px: 2,
            pb: 2,
            overflow: 'auto',
          }}
        >
          {invites.organizations.length > 0 ? (
            <List sx={{ bgcolor: 'background.paper'}}>
            {invites.organizations.map((value) => (
              <ListItem key={i++} sx={{width: "100%"}}>
                <NotificationItem invite={value}/>
              </ListItem>
            ))}
          </List>
          ): (
            <Typography variant={"h6"} align={'center'} py={3}>
              No notifications available yet ;)
            </Typography>
          )}
        </Box>
    )
}

export default UsersNotifications;