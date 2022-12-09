import React from "react";
import {Grid, CardContent, Box, Card, CardMedia, Button, Typography} from "@mui/material"

import {MuiCard} from './ConferenceCard'

export const ConferenceGrid = ({conferences}) => {
    return (

        <Grid container spacing={2} sx={{m: 4}}>
            <Grid key="add_conference" item xs={12} sm={6} md={4} lg={3} xl={2}>
                <MuiCard conference={null}/>
            </Grid>

            {conferences.map(conference => (
                    <Grid key={conference.pk} item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <MuiCard conference={conference}/>
                    </Grid>
                )
            )}
        </Grid>
)
}
