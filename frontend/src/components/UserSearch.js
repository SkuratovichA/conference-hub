// author: Dziyana Khrystsiuk

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {getUsers} from "../actions/UserFunctions"
import {useEffect, useState} from "react";

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: (option) => `${option.last_name} ${option.user.name} ${option.user.username}`,
});

export default function UserSearch() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers("researchers")
    .then(response => {
        setUsers(response);
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