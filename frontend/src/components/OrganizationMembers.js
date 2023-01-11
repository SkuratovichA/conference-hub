import React, {useContext, useEffect, useState} from "react";
import {getInvitesInfo, getUsers} from "../actions/UserFunctions";
import {Box, Grid, InputAdornment, List, Paper, TextField, Toolbar, Typography} from "@mui/material";
import {ListItem} from "@mui/joy";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import {MemberItem} from "./Notification";
import {UserSearchNonMembers} from "./UserSearch";
import {InviteContext} from "./Navbar";


const OrganizationMembers = () => {

    const [invites, setState] = useContext(InviteContext)

    if (invites === undefined){
        return (
          <Typography>Loading members...</Typography>
        )
    }
    // the value of the search field
    const [name, setName] = useState('');
    // the search result
    const [foundUsers, setFoundUsers] = useState(invites);

    const [timer, setTimer] = useState(null);

    const timeoutFilter = (e) => {
        let keyword = e.target.value;
        setName(keyword);

        clearTimeout(timer);

        const newTimer = setTimeout(()=>{
            keyword = keyword.toLowerCase();
            if (keyword !== '' && invites) {
                const results = invites.filter((user) => {
                    let name = (user.res_name).toLowerCase();
                    let surname = (user.res_surname).toLowerCase();
                    return fullNameFilter(keyword, name, surname);
                });
              setFoundUsers(results);
            } else {
              setFoundUsers(invites);
              // If the text field is empty, show all users
            }
        },250)

        setTimer(newTimer);
    };

    let i = 0;
    return (
        <span>
                <TextField
                onChange={timeoutFilter}
                onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                        timeoutFilter(e)
                    }
                }}
                fullWidth
                variant="filled"
                label="Find or add a member"
                sx={{
                    px: 1,
                    py: 1,
                    overflow: 'auto',
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonSearchIcon />
                    </InputAdornment>
                  ),
                }}>{name}</TextField>

            {foundUsers.length > 0 ? (<Box
              sx={{
                px: 2,
                pb: 2,
                overflow: 'auto',
              }}
            >
            <List sx={{ bgcolor: 'background.paper'}}>
              {foundUsers.map((value) => (
                <ListItem key={i++} sx={{width: "100%"}}>
                    <MemberItem member={value}/>
                </ListItem>
              ))}
            </List>
            </Box>

        ) : (<UserSearchNonMembers keyword={name.toLowerCase()}/>)}
        </span>)
}


export const fullNameFilter = (keyword, name, surname) => {

    let name_S = name.startsWith(keyword);
    let surname_S = surname.startsWith(keyword);
    let name_surname_S = (name+' '+surname).startsWith(keyword);
    let surname_name_S = (surname+' '+name).startsWith(keyword);

    return name_S || surname_S || name_surname_S || surname_name_S;

}

export default OrganizationMembers;