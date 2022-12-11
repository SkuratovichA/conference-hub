import React, {Component} from "react";
import {ConferenceGrid} from './ConferenceGrid'
import {Box, Typography, Stack} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2'
import {Button} from '@mui/material'
import Conference from './Conference'
import withRouter from '../utils/withRouter'
import queryString from 'query-string';
import authContext from "../context/AuthContext";
import {conferenceCRUDHandler} from "../actions/ConferenceFunctions"

class ConferenceSearch extends Component {
    static contextType = authContext

    constructor(props) {
        super(props);
        let params = queryString.parse(this.props.router.location.search)

        this.state = {
            loaded: false,
            conferences: null,
            activeConference: params.conference_name
        }
    }

    componentDidMount() {
        conferenceCRUDHandler("fetch_all", null, null, null)
            .then((resp) => {
                this.setState({conferences: resp})
            })
            .then(() => {
                this.setState({loaded: true})
            })
    }

    render() {
        if (this.state.loaded === false) {
            return ""
        }

        let confXS = this.state.activeConference ? 3 : 12

        let conferenceGrid = (
            <ConferenceGrid
                conferences={this.state.conferences}
                conferenceCRUDHandler={conferenceCRUDHandler}
                tightLeft={this.state.activeConference}
                conferenceOnClick={(conferenceName) => this.setState({"activeConference": conferenceName})}
            />
        )

        return (
            <>
                <Button
                    onClick={() => this.setState({activeConference: null})}
                >I LOVE KAZASKY
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
                                    newConf={false}
                                    slug={this.state.activeConference}
                                    conferenceCRUDHandler={conferenceCRUDHandler}
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