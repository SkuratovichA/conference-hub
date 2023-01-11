// author: Dziyana Khrystsiuk

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {createInvite, getToken, getUsers} from "../actions/UserFunctions"
import {useEffect, useState} from "react";
import {Box, Grid, List, Paper, Typography} from "@mui/material";
import {ListItem} from "@mui/joy";
import {fullNameFilter} from "./OrganizationMembers";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {TooltipStyled} from "./Notification";
import {useSnackbar} from "notistack";

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option) => `${option.last_name} ${option.user.name} ${option.user.username}`,
});

const sortByFullName = (a, b) => {

    let a_name = (a.user.name + a.last_name).toLowerCase()
    let b_name = (b.user.name + b.last_name).toLowerCase()

    if (a_name < b_name) {
        return -1;
    }
    if (a_name > b_name) {
        return 1;
    }
    // a must be equal to b
    return 0;

}
export const UserSearchNonMembers = ({keyword}) => {
    const [users, setUsers] = useState([]);
    const [foundUsers, setFound] = useState([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    let token = getToken()

    const addMember = (user) => {
      console.log(user)
      createInvite(token, user.user.username)
        .then(response => {
          if (response === true){
              enqueueSnackbar("Membership invite sent successfully.",{variant: "success"})
          }
        }
      )
    }

    useEffect(() => {
        getUsers("researchers")
            .then(response => {
                    setUsers(response);
                }
            )
    }, []);

    useEffect(()=>{
        if (keyword === ''){
            setFound([])
            return
        }
        if (users.length > 0) {
            let result = users.filter((user)=>{
                let name = (user.user.name).toLowerCase();
                let surname = (user.last_name).toLowerCase();
                return fullNameFilter(keyword, name, surname);
            })
            result.sort(sortByFullName)
            setFound(result)
        }
    },[users, keyword]);

    let i = 0;
    if (foundUsers.length === 0) {
      return (
        <Typography variant={"h6"}> No researcher with such name was found anywhere in the system. Typo?</Typography>
      )
    }
    return (
        <Box sx={{
            px: 2,
            pb: 2,
            overflow: 'auto',
        }}>
          <Typography variant="h6"> No members found. Add a new member?</Typography>
          <List sx={{ bgcolor: 'background.paper'}}>
            {foundUsers.map((value) => (
              <ListItem key={i++} sx={{width: "100%"}}>
                <Paper sx={{ width: "100%", fullWidth: true }} elevation={3}>
                  <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
                    <Grid item md={10} px={2} py={2}>
                      <Typography gutterBottom variant="h5">
                          {value.user.name} {value.last_name}
                      </Typography>
                      <Typography variant="subtitle1">
                        Email: {value.user.email}
                      </Typography>
                    </Grid>
                    <Grid item md={2} px={2} py={2}>
                      <TooltipStyled
                        onclickHandler={()=>{addMember(value)}}
                        color={"success"}
                        title={"Send a membership invitation"}
                        icon={<GroupAddIcon/>}/>
                    </Grid>
                  </Grid>
                </Paper>
              </ListItem>
            ))}
          </List>
        </Box>
    )
}
export default function UserSearch() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers("researchers")
    .then(response => {
        setUsers(response.sort(sortByFullName));
      }
    )
  }, []);


  console.log(typeof users)
  console.log(JSON.stringify(users))

  return (
    <Autocomplete
      id="filter-demo"
      options={users}
      getOptionLabel={(option) =>  `${option.user.name} ${option.last_name}`}
      filterOptions={filterOptions}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Add researcher" />}
    />
  );
}