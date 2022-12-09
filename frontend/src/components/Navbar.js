import React, {Component, useContext} from "react";
import {AppBar, Toolbar, IconButton, Typography, Stack, Button} from "@mui/material";
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    let {user, logoutUser} = useContext(AuthContext)

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton>
                    <AccessibleForwardIcon size="large" edge="start" color="inherit" aria-label="logo">
                    </AccessibleForwardIcon>
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" href="/">Conference Hub</Button>
                </Typography>

                {user ? (
                    <Button color="inherit" href="/login" onClick={logoutUser}>Log Out</Button>
                ) : (
                    <Stack direction="row" spacing={2}>
                        <Button color="inherit" href="/login">Sign In</Button>
                        <Button color="inherit" href="/signup">Sign Up</Button>
                    </Stack>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;