// author: Skuratovich Aliaksandr
// author: Shchapaniak Andrei
// author: Dziyana Khrystsiuk

import React, {createContext, useContext, useEffect, useState} from "react";
import {AppBar, Toolbar, IconButton, Typography, Stack, Button, Drawer} from "@mui/material";
import AuthContext from "../context/AuthContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import {useNavigate} from "react-router-dom";
import './styles/Bucket.css'
import NotificationsIcon from "@mui/icons-material/Notifications";
import {getInfoUser, getToken, getInvitesInfo} from "../actions/UserFunctions";
import GroupIcon from '@mui/icons-material/Group';
import FestivalIcon from '@mui/icons-material/Festival';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import UsersNotifications from "./UsersNotifications";
import OrganizationMembers from "./OrganizationMembers";
import Box from "@mui/joy/Box";

let navbarState = false
let countBucketGlobal = 2

export const changeNavbarLogin = () => {
    navbarState = !navbarState
}

// export const changeBucketCount = (value) => {
//     countBucketGlobal += value
//     navbarState = !navbarState
//     let el = document.getElementsByClassName('count-bucket')
//     el.setAttribute('badgeContent', countBucketGlobal)
//     console.log(countBucketGlobal)
//     Navbar()
// }

export const InviteContext = createContext()

const Navbar = () => {
    let {user, logoutUser, authTokens} = useContext(AuthContext)
    //let [countBucket, setCountBucket] = useState(0)
    //let [newBucket, updateBucket] = useState(false)
    //let [loaded, setLoaded] = useState(false)
    let [userInfo, SetUserInfo] = useState({})
    let navigate = useNavigate()
    let token = getToken()
    //let [navbarState, updateNavbar] = useState(false)
    const[drawer, setDrawer ] = useState(false);
    let [invites, setInvites] = useState([])
    let [invite_num, setInvNum] = useState(0)

  const setStatus = (invite_id) =>{
      let result = invites.organizations.map(invite=> invite.inv_id === invite_id ?{... invite, status : true}: invite)
      setInvNum(invite_num-1)
    invites.organizations = [...result]
    setInvites({...invites})
  }

    const addStatus = (members) => {
        let unread = 0;
        members.forEach(member => {
          member.status = member.approved || member.rejected
          if (!member.status) unread++;
        })
        return [members, unread]
    }


const filterByRead = (invites) => {
      if (invites){
          let membership = invites.organizations

      membership.sort((a,b)=>{
        if (a.status === b.status){
          let a_date = new Date(a.date_sent)
          let b_date = new Date(b.date_sent)
          // console.log(a_date,b_date)
          return a_date < b_date
        }
        else {
          return a.status > b.status
        }
      })
      invites.organizations = [...membership]
      setInvites({...invites})
      }

}
    useEffect(() => {
      if (user){
        getInvitesInfo(token)
        .then(response => {
            setInvites(response);
            if (!user.is_organization){
              let [new_response, number_unread] = addStatus(response.organizations)
              response.organizations = [...new_response]
              setInvites({...response})
              setInvNum(number_unread)
              filterByRead(response)
            }
            console.log(response);
          }
        )
        .catch(error => {
            alert(error)
        })
      }

    }, [user]);

    useEffect(() => {
        getInfoUser(token)
            .then((data) => {
                SetUserInfo(data)
            })
    }, [navbarState, ])
    //
    // const decBucket = () => {
    //     setCountBucket(countBucket - 1)
    //     updateBucket(!newBucket)
    // }
    //
    // useContext(() => {
    //
    //}, [newBucket, ])
    const RegisteredTools = () => {
      return (
        <Stack direction="row">
            <IconButton
                aria-label="profile"
                onClick={() => {navigate("/users/"+user.username)}}
            >
                <PersonIcon fontSize={"medium"} />
            </IconButton>

            { user["is_organization"] ? (
                <span>
                    <IconButton aria-label="members"
                    onClick={() => setDrawer(true)}
                >
                    <Badge color="secondary" >
                      <GroupIcon fontSize={"medium"} />
                    </Badge>
                </IconButton>

                <IconButton
                    aria-label="conferences"
                    onClick={() => {navigate('/' + user.username + '/conferences')}}
                >
                    <Badge color="secondary" >
                      <DynamicFeedIcon fontSize={"medium"} />
                    </Badge>
                </IconButton>
                </span>
            ) : (
                <span>
                    <IconButton aria-label="notification"
                        onClick={() => {
                          setDrawer(true);
                          filterByRead(invites)
                        }}
                >
                    <Badge color="secondary" badgeContent={invite_num}>
                      <NotificationsIcon fontSize={"medium"} />
                    </Badge>
                </IconButton>

                {userInfo?.user?.is_researcher &&
                    <IconButton
                        aria-label="bucket"
                        onClick={() => {navigate('/' + user.username + '/bucket')}}
                    >
                        <Badge className={'bucket-count'} color="secondary" badgeContent={0} >
                          <ShoppingCartIcon fontSize={"medium"} />
                        </Badge>
                    </IconButton>
                }

                </span>
            )}
            <Button color="inherit" href="/login" onClick={logoutUser}>Log Out</Button>
        </Stack>
      );
    }

    return (
        <div>
            <AppBar position="sticky">
            <Toolbar>
                <IconButton href={"/"}>
                    <FestivalIcon size="large" edge="start" color="inherit" aria-label="logo">
                    </FestivalIcon>
                </IconButton>
                <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" href="/">Conference Hub</Button>
                </Typography>

                <Button color="inherit" href="/conferences" >Conferences</Button>

                <Stack direction={"row"} justifyContent={"between"}>
                    {user ? (
                        <RegisteredTools/>
                    ) : (
                        <Stack direction="row" spacing={2}>
                            <Button color="inherit" href="/login">Sign In</Button>
                        </Stack>
                        )
                    }
                </Stack>
            </Toolbar>
        </AppBar>
            {user && (<Drawer
              anchor="left"
              open={drawer}
              onClose={() => setDrawer(false)}
              PaperProps={{
                sx: { width: "50%" },
              }}
            >
                <InviteContext.Provider value={[invites,setStatus]}>
                {user["is_organization"] === true ? (
                  <Box>
                    <Toolbar sx={{background: "#1976d2", color: "#ffffff"}}>
                      <Typography variant="h5" sx={{fontWeight: 'bold'}} > Organization's Members </Typography>
                  </Toolbar>
                    <OrganizationMembers/>
                  </Box>

                ) : (
                  <Box>
                    <Toolbar sx={{background: "#1976d2", color: "#ffffff"}}>
                      <Typography variant="h5" sx={{fontWeight: 'bold'}} > User's Notifications </Typography>
                  </Toolbar>
                    <UsersNotifications/>
                  </Box>

                )}
                </InviteContext.Provider>
            </Drawer>)}
        </div>

    )
}

export default Navbar;