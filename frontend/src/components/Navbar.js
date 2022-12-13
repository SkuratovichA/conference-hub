import React, {useContext} from "react";
import {AppBar, Toolbar, IconButton, Typography, Stack, Button} from "@mui/material";
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import AuthContext from "../context/AuthContext";
import { BsFillBucketFill } from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import './styles/Bucket.css'
const Navbar = () => {
    let {user, logoutUser} = useContext(AuthContext)
    let navigate = useNavigate()

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton>
                    <AccessibleForwardIcon size="large" edge="start" color="inherit" aria-label="logo">
                    </AccessibleForwardIcon>
                </IconButton>
                <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" href="/">Conference Hub</Button>
                </Typography>

                {user ? (
                    <Stack direction="row" spacing={2}>
                        <Button color="inherit" href="/login" onClick={logoutUser}>Log Out</Button>
                        <Button color="inherit" href={"/users/"+user.username}>View Profile</Button>
                        <BsFillBucketFill size={28} onClick={() => {
                                navigate('/' + user.username + '/bucket')
                            }}
                        >
                        </BsFillBucketFill>
                        <sup className="bucket-count">2</sup>
                    </Stack>
                ) : (
                    <Stack direction="row" spacing={2}>
                        <Button color="inherit" href="/login">Sign In</Button>
                    </Stack>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;