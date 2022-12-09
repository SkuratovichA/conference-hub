import React, {Component} from "react";
import {ConferenceGrid} from './ConferenceGrid'
import { Typography, Grid } from "@mui/material"


class ConferenceSearch extends Component {
    constructor(props, conferences) {
        super(props);
        this.state = {
            conferences: props.conferences
        }
    }

    render() {
        return (
            <Grid container spacing={2} sx={{m: 4}}>
                <Typography variant="h2" align="left">Conferences</Typography>
                <ConferenceGrid conferences={this.state.conferences}/>
            </Grid>
        )
    }
}

export default ConferenceSearch;