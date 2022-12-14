// author: Skuratovich Aliaksandr

import React from "react";
import { Grid, Box, Card } from "@mui/material"
import CreateConferenceDialog from './CreateConferenceDialog'
import plus from '../plus.png'
import Conference from './Conference'
import {conferenceCRUDHandler} from "../actions/ConferenceFunctions";


import {MuiCard} from './ConferenceCard'

export const ConferenceGrid = (
    {
        conferences,
        user,
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
            <Grid container spacing={2} >
                { user?.user?.is_organization &&
                    <Grid key="add_conference" item {...gridProps}>
                        <Box width="280px">
                            <Card>
                                <CreateConferenceDialog
                                    user={user}
                                />
                            </Card>
                        </Box>
                    </Grid>
                }
                {conferences.map(conference => (
                        <Grid key={conference.name} item {...gridProps}>
                            <MuiCard
                                user={user}
                                conferenceOnClick={() => conferenceOnClick(conference.slug)}
                                conference={conference}
                            />
                        </Grid>
                    )
                )}

            </Grid>
        </Box>
    )
}
