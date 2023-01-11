// author: Skuratovich Aliaksandr
// author: Shchapaniak Andrei

import React, {Component, useContext, useState} from "react";
import {ConferenceGrid} from './ConferenceGrid'
import {Box, Paper, Typography, Stack} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2'
import {Button} from '@mui/material'
import Conference from './Conference'
import withRouter from '../utils/withRouter'
import queryString from 'query-string';
import authContext from "../context/AuthContext";
import {conferenceCRUDHandler} from "../actions/ConferenceFunctions"
import {ContentSection} from './ContentSection'
import {getInfoUser, getToken} from "../actions/UserFunctions";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {TextField, IconButton} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const ConferenceSearch = (props) => {
    let params = queryString.parse(props.router.location.search)
    let navigate = useNavigate()

    let {authTokens} = useContext(authContext)
    let [loaded, setLoaded] = useState(false)
    let [conferences, setConfs] = useState(false)
    let [activeConference, setActiveConference] = useState(params.conference_name)
    let [userinfo, setUserInfo] = useState({})
    let [manipulate, setManipulate] = useState(false)
    let [updateKostyl, setUpdateKostyl] = useState(false)

    const updateActiveConference = (conferenceName) => {
        if (conferenceName !== null) {
            conferenceCRUDHandler("fetch_one", conferenceName, null, null)
                .then(resp => {
                    if (resp.organization?.user?.username === userinfo.user?.username) {
                        setManipulate(true)
                    } else {
                        setManipulate(false)
                    }
                })
        }
        setActiveConference(conferenceName)
    }

    let token = authTokens?.access ? "Bearer " + authTokens.access : null

    useEffect(() => {
        conferenceCRUDHandler("fetch_all", null, null, null, null)
            .then(resp_conf => {
                setConfs(resp_conf)
                return getInfoUser(token)
            })
            .then(resp_user => {
                setUserInfo(resp_user)
                setLoaded(true)
            })

    }, [activeConference, updateKostyl])

    if (loaded === false) {
        return ""
    }

    let confXS = activeConference ? 3 : 12

    let conferenceGrid = (
        <ConferenceGrid
            // conferences={conferences}
            user={userinfo}
            tightLeft={activeConference}
            conferenceOnClick={updateActiveConference}
            updateKostyl={updateKostyl}
            setUpdateKostyl={() => setUpdateKostyl(!updateKostyl)}
        />
    )

    return (
        <>
            <ContentSection
                // margin={"0 auto"}
                padding={"2% 2% 2% 2%"}
                // justifyContent={"space-between"}
            >
                <Grid
                    container xs={12} sm={12} md={12} xl={12} lg={12} spacing={4}
                    style={{margin: "0 auto"}}
                >
                    <Grid xs={10}>
                        <Button
                            onClick={() => {
                                setActiveConference(null)
                            }}
                        >
                            <Typography variant="h2" align="left">Conferences</Typography>
                        </Button>
                        <TextField
                            fullWidth
                            id="standard-bare"
                            variant="standard"
                            label="Search Conferences"
                            InputProps={{
                                endAdornment: (
                                    <IconButton>
                                        <ManageSearchIcon/>
                                    </IconButton>
                                ),
                            }}
                        />
                    </Grid>


                    {activeConference &&
                        <Grid
                            container
                            xs={12} sm={12} md={8} xl={8} lg={8}
                            style={{justifyContent: "center"}}
                        >
                            <Box style={{maxHeight: '100vh', 'overflowY': 'scroll', 'width': '90%'}}>
                                <Conference
                                    canEdit={manipulate}
                                    canDelete={manipulate}
                                    newConf={false}
                                    owner={userinfo}
                                    slug={activeConference}
                                    setSlug={setActiveConference}
                                    callBackOnDelete={() => {
                                        setActiveConference(null)
                                    }}
                                    updateKostyl={updateKostyl}
                                    setUpdateKostyl={setUpdateKostyl}
                                    key={activeConference}
                                />
                            </Box>
                        </Grid>
                    }

                    <Grid
                        xs={12} sm={12} md={confXS} xl={confXS} lg={confXS}
                    >
                        {conferenceGrid}
                    </Grid>
                </Grid>
            </ContentSection>
        </>
    )
}


export default ConferenceSearch
export const ConferenceSearchWithRouter = withRouter(ConferenceSearch)