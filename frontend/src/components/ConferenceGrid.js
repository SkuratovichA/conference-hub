import React from "react";
import {Stack, Grid, CardContent, CardActionArea, Box, Card, CardMedia, Button, Typography} from "@mui/material"
import CreateConferenceDialog from './CreateConferenceDialog'
import plus from '../plus.png'
import Conference from './Conference'


import {MuiCard} from './ConferenceCard'

export const ConferenceGrid = (
    {
        conferences,
        conferenceCRUDHandler,
        tightLeft,
        conferenceOnClick
    }) => {

    let gridProps = {
        xs: 12,
        sm: tightLeft? 12: 6,
        md: tightLeft? 12: 4,
        xl: tightLeft? 12: 3
    }

    return (

        <Box style={{maxHeight: '100vh', 'overflowX': 'hidden', 'overflowY': 'scroll'}}>
            <Grid container spacing={2}>

                <Grid key="add_conference" item {...gridProps}>
                    <Box width="280px">
                        <Card>
                            <CreateConferenceDialog
                                conferenceCRUDHandler={conferenceCRUDHandler}
                            />
                        </Card>
                    </Box>
                </Grid>
                {conferences.map(conference => (
                        <Grid key={conference.name} item {...gridProps}>
                            <MuiCard
                                conferenceOnClick={() => conferenceOnClick(conference.slug)}
                                conference={conference}
                                conferenceCRUDHandler={conferenceCRUDHandler}
                            />
                        </Grid>
                    )
                )}

            </Grid>
        </Box>
    )
}
