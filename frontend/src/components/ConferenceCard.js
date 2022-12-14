import React, {useEffect} from "react";
import {CardActionArea, Box, Card, CardContent, Typography, CardActions, Button} from "@mui/material"
import plus from '../plus.png'
import ConferenceModal from './ConferenceModal'
import CustomCardMedia from './CustomCardMedia'
import {useNavigate} from "react-router-dom";


// TODO: populate cards with data
export const MuiCard = (props) => {
    const conference_j = props.conference
    const conferenceCRUDHandler = props.conferenceCRUDHandler

    const [open, setOpen] = React.useState(false)
    let [manipulate, setManipulate] = React.useState(false)
    let navigate = useNavigate()


    useEffect(() => {
        if (props.user?.user?.username === conference_j?.organization?.user?.username) {
            setManipulate(true)
        }
    }, [])

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
                    <CardActions>
                        <Button size="small">{conference_j.price}</Button>
                        <Button
                            size="small"
                                onClick={() => {
                                    navigate('/conferences' + "?conf="+conference_j.slug)
                                    setOpen(true)
                                }
                            }
                        >
                            Show info
                        </Button>
                    </CardActions>
                </Card>
            </Box>

            <ConferenceModal
                user={props.user}
                open={open}
                newConf={false}
                onClose={() => setOpen(false)}
                slug={conference_j.slug}
                canEdit={manipulate}
                conferenceCRUDHandler={conferenceCRUDHandler}
                callBackOnDelete={() => setOpen(false)}
            />
        </React.Fragment>
    )
}
