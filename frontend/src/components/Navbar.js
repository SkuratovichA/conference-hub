// author: Skuratovich Aliaksandr
// author: Shchapaniak Andrei

import React, {useContext} from "react";
import {AppBar, Toolbar, IconButton, Typography, Stack, Button} from "@mui/material";
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import AuthContext from "../context/AuthContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import {useNavigate} from "react-router-dom";
import './styles/Bucket.css'
import NotificationsIcon from "@mui/icons-material/Notifications";


const Navbar = () => {
    let {user, logoutUser} = useContext(AuthContext)
    let navigate = useNavigate()

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton href={"/"}>
                    <AccessibleForwardIcon size="large" edge="start" color="inherit" aria-label="logo">
                    </AccessibleForwardIcon>
                </IconButton>
                <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" href="/">Conference Hub</Button>
                </Typography>

                <Button color="inherit" href="/conferences" >Conferences</Button>

                <Stack direction={"row"} justifyContent={"between"}>
                    {user ? (
                        <Stack direction="row" spacing={2}>
                            <IconButton
                                aria-label="profile"
                                onClick={() => {navigate("/users/"+user.username)}}
                            >
                                <PersonIcon fontSize={"medium"} />
                            </IconButton>

                            <IconButton aria-label="notification"
                                        onClick={() => {navigate(user.username+'/notifications')}}
                            >
                                <Badge color="secondary" badgeContent={5}>
                                  <NotificationsIcon fontSize={"medium"} />
                                </Badge>
                            </IconButton>



                            <IconButton
                                aria-label="bucket"
                                onClick={() => {navigate('/' + user.username + '/bucket')}}
                            >
                                <Badge color="secondary" badgeContent={2} >
                                  <ShoppingCartIcon fontSize={"medium"} />
                                </Badge>
                            </IconButton>

                            <Button color="inherit" href="/login" onClick={logoutUser}>Log Out</Button>
                        </Stack>
                    ) : (
                        <Stack direction="row" spacing={2}>
                            <Button color="inherit" href="/login">Sign In</Button>
                        </Stack>
                        )
                    }
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;