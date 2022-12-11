import React from "react";
import {Grid, CardContent, CardActionArea, Box, Card, CardMedia, Button, Typography} from "@mui/material"
import CreateConferenceDialog from './CreateConferenceDialog'
import plus from '../plus.png'

import {MuiCard} from './ConferenceCard'

export const ConferenceGrid = ({
    conferences,
    conferenceCRUDHandler
}) => {

    return (
        <Grid container spacing={2} sx={{m: 4}}>
            <Grid key="add_conference" item xs={12} sm={6} md={4} lg={3} xl={2}>
                <Box width="280px">
                    <Card>
                        <CreateConferenceDialog
                            conferenceCRUDHandler={conferenceCRUDHandler}
                        />
                    </Card>
                </Box>
            </Grid>

            {conferences.map(conference => (
                    <Grid key={conference.pk} item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <MuiCard
                            conference={conference}
                            conferenceCRUDHandler={conferenceCRUDHandler}
                        />
                    </Grid>
                )
            )}
        </Grid>
    )
}
