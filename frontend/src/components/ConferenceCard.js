import React from "react";
import {CardActionArea, Box, Card, CardContent, Typography, CardActions, Button} from "@mui/material"
import plus from '../plus.png'
import ConferenceModal from './ConferenceModal'
import CustomCardMedia from './CustomCardMedia'


// TODO: populate cards with data
export const MuiCard = (props) => {
    const conference_j = props.conference
    const conferenceCRUDHandler = props.conferenceCRUDHandler

    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Box width="280px">
                <Card>
                    <CardActionArea
                        onClick={props.conferenceOnClick}
                    >
                        <CustomCardMedia src={'http://localhost:8000' + conference_j.image}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component={'div'}>{conference_j.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{conference_j.brief}</Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small">{conference_j.price}</Button>
                        <Button
                            size="small"
                            onClick={() => setOpen(true)}
                        >
                            Show info
                        </Button>
                    </CardActions>
                </Card>
            </Box>

            <ConferenceModal
                open={open}
                onClose={() => setOpen(false)}
                canEdit={true} // TODO: current_user.is_organization
                conferenceCRUDHandler={conferenceCRUDHandler}
                callBackOnDelete={() => setOpen(false)}
            />
        </React.Fragment>
    )
}
