// author: Skuratovich Aliaksandr

import React, {useEffect} from "react";
import {CardActionArea, Box, Card, CardContent, Typography, CardActions, Button, Stack} from "@mui/material"
import plus from '../plus.png'
import ConferenceModal from './ConferenceModal'
import CustomCardMedia from './CustomCardMedia'
import {useNavigate} from "react-router-dom";
import {conferenceCRUDHandler} from "../actions/ConferenceFunctions";
import {getStateConfBucket} from "../actions/OtherFunctions";
import {getToken} from "../actions/UserFunctions";
import {addRemoveBucket} from "../actions/OtherFunctions";


// TODO: populate cards with data
export const MuiCard = (props) => {
    const conference_j = props.conference

    const [open, setOpen] = React.useState(false)
    let [manipulate, setManipulate] = React.useState(false)
    let [inbucket, changeStateBucket] = React.useState(false)
    let [status, changeStatus] = React.useState('Default')
    let [loaded, setLoaded] = React.useState(false)
    let navigate = useNavigate()
    let token = getToken()

    const addToBucket = (conf) => {
        changeStateBucket(!inbucket)
    }

    useEffect(() => {
        if (status === 'Default') {
            return;
        }

        let method = inbucket === true ? 'POST' : 'DELETE';
        addRemoveBucket(method, conference_j.slug, token)
        .then((res) => {
            console.log(res)
            return getStateConfBucket(conference_j.slug, token)
        })
        .then((status_ret) => {
            changeStatus(status_ret)
        })
    }, [inbucket])

    useEffect(() => {
        if (props.user?.user?.username === conference_j?.organization?.user?.username) {
            setManipulate(true)
        }

        if (props.user?.user?.is_researcher) {
            getStateConfBucket(conference_j.slug, token)
                .then((res) => {
                    changeStatus(res)
                })
                .then(() => {
                    setLoaded(true)
                })
        }
        else {
            setLoaded(true)
        }
    }, [])

    if (loaded === false) {
        return "";
    }

    return (
        <React.Fragment>
            <Box width="280px">
                <Card>
                    <CardActionArea
                        onClick={props.conferenceOnClick}
                    >
                        <CustomCardMedia src={'http://localhost:8000/media/static/conf_default.jpg'}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component={'div'}>{conference_j.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{conference_j.brief}</Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions >
                        {/*<Button size="small">{conference_j.price}</Button>*/}
                        <Button
                            size="small"
                            sx={{marginLeft: "auto"}}
                            onClick={() => {
                                navigate('/conferences' + "?conf=" + conference_j.slug)
                                setOpen(true)
                            }
                            }
                        >
                            PREVIEW
                        </Button>
                        {props.user?.user?.is_researcher &&
                            <Button
                            size="small"
                                onClick={() => {
                                    addToBucket(conference_j)
                                    //navigate('/conferences' + "?conf="+conference_j.slug)
                                    //setOpen(true)
                                }
                            }
                        >
                                {status}
                        </Button>}
                    </CardActions>
                </Card>
            </Box>

            <ConferenceModal
                user={props.user}
                open={open}
                newConf={false}
                onClose={() => setOpen(false)}
                slug={conference_j.slug}
                // canEdit={manipulate}
                canEdit={false}
                conferenceCRUDHandler={conferenceCRUDHandler}
                callBackOnDelete={() => setOpen(false)}
            />
        </React.Fragment>
    )
}
