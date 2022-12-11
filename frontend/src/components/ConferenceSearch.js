import React, {Component} from "react";
import {ConferenceGrid} from './ConferenceGrid'
import {Box, Typography, Stack} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2'
import {Button} from '@mui/material'
import Conference from './Conference'
import withRouter from '../utils/withRouter'
import queryString from 'query-string';



class ConferenceSearch extends Component {
    constructor(props) {
        super(props);
        let params = queryString.parse(this.props.router.location.search)

        this.state = {
            conferences: props.conferences,
            activeConference: params.conference_name
        }
    }

    render() {
        let confXS = this.state.activeConference ? 3 : 12
        let conferenceGrid = (
            <ConferenceGrid
                conferences={this.state.conferences} // TODO: delete me after create conferenceCRUDHandler
                conferenceCRUDHandler={this.props.conferenceCRUDHandler}
                tightLeft={this.state.activeConference}
                conferenceOnClick={(conferenceName) => this.setState({"activeConference": conferenceName})}
            />
        )

        return (
            <>
                <Button
                    onClick={() => this.setState({activeConference: null})}
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
                                    slug={this.state.activeConference}
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


export default ConferenceSearch
export const ConferenceSearchWithRouter = withRouter(ConferenceSearch)