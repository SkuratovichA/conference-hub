// author: Skuratovich Aliaksandr

import React, {useEffect} from "react";
import {CardActionArea, Box, Card, CardContent, Typography, CardActions, Button, Stack} from "@mui/material"
import ConferenceModal from './ConferenceModal'
import CustomCardMedia from './CustomCardMedia'
import {useNavigate} from "react-router-dom";
import {conferenceCRUDHandler} from "../actions/ConferenceFunctions";
import {getStateConfBucket} from "../actions/OtherFunctions";
import {getToken} from "../actions/UserFunctions";
import {addRemoveBucket} from "../actions/OtherFunctions";
import { useSnackbar } from 'notistack';


export const MuiCard = (props) => {
    const conference_j = props.conference

    const [open, setOpen] = React.useState(false)
    let [manipulate, setManipulate] = React.useState(false)
    let [inbucket, changeStateBucket] = React.useState(null)
    let [actionWithConf, changeAction] = React.useState(false)
    let [status, changeStatus] = React.useState('Default')
    let [loaded, setLoaded] = React.useState(false)
    let navigate = useNavigate()
    let token = getToken()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const addToBucket = (conf) => {
        changeStateBucket(!inbucket)
        changeAction(!actionWithConf)
    }

    useEffect(() => {
        if (status === 'Default') {
            return;
        }

        let method = inbucket === true ? 'POST' : 'DELETE';
        addRemoveBucket(method, conference_j.slug, token)
        .then((res) => {
            return getStateConfBucket(conference_j.slug, token)
        })
        .then((status_ret) => {
            changeStatus(status_ret)
        })
    }, [actionWithConf, ])

    useEffect(() => {
        if (props.user?.user?.username === conference_j?.organization?.user?.username) {
            setManipulate(true)
        }

        if (props.user?.user?.is_researcher) {
            getStateConfBucket(conference_j.slug, token)
                .then((res) => {
                    if (res === 'Remove from bucket') {
                        changeStateBucket(true)
                    }
                    else {
                        changeStateBucket(false)
                    }
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
                        onClick={() => {
                            console.log('CLICK CLICK');
                            props.conferenceOnClick()
                        }}
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
                            status === 'Add to bucket' &&
                            <Button
                                size="small"
                                onClick={() => {
                                    addToBucket(conference_j)
                                    enqueueSnackbar('The conference has been added to the bucket.', {variant: "success"});
                                }}
                            >
                                {status}
                            </Button>
                        }
                        {props.user?.user?.is_researcher &&
                            status === 'Remove from bucket' &&
                            <Button
                                size="small"
                                style={{ color: 'red' }}
                                onClick={() => {
                                    addToBucket(conference_j)
                                    enqueueSnackbar('The conference has been deleted from the bucket.', {variant: "info"});
                                }}
                            >
                                {status}
                            </Button>
                        }
                        {props.user?.user?.is_researcher &&
                            status === 'Participate' &&
                            <Typography
                                style={{ color: 'green', marginLeft: '20px', fontSize: '13px' }}
                            >
                                PARTICIPATE
                            </Typography>
                        }
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
