import React, {Component} from "react";
import {ConferenceGrid} from './ConferenceGrid'
import {Box, Typography, Stack} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2'
import {Button} from '@mui/material'
import Conference from './Conference'


class ConferenceSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conferences: props.conferences,
            activeConference: false
        }
        console.log(this.props)
    }

    render() {
        let confXS = this.state.activeConference ? 3 : 12
        let conferenceGrid = (
            <ConferenceGrid
                conferences={this.state.conferences} // TODO: delete me after create conferenceCRUDHandler
                conferenceCRUDHandler={this.props.conferenceCRUDHandler}
                tightLeft={this.state.activeConference}
            />
        )

        return (
            <>
                <Button
                    onClick={() => this.setState({activeConference: !this.state.activeConference})}
                >CLICK ME
                </Button>

                <Grid container xs={12} sm={12} md={12} xl={12} lg={12} spacing={4} sx={{m: 4}}>
                    <Grid xs={10}>
                        <Typography variant="h2" align="left">Conferences</Typography>
                    </Grid>

                    {this.state.activeConference &&
                        <Grid container xs={12} sm={12} md={8} xl={8} lg={8}>
                            <Box style={{maxHeight: '100vh', 'overflowY': 'scroll', 'width': '90%'}}>
                                <Conference
                                    canEdit
                                    canDelete
                                    conferenceCRUDHandler={this.props.conferenceCRUDHandler}
                                    callBackOnDelete={() => this.setState({activeConference: null})}
                                />
                            </Box>
                        </Grid>
                    }

                    <Grid xs={12} sm={12} md={confXS} xl={confXS} lg={confXS}>
                        {conferenceGrid}
                    </Grid>

                </Grid>
            </>
        )
    }
}

export default ConferenceSearch;