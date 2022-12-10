import React from "react";
import { CardActionArea, Box, Card, CardContent, Typography, CardActions, Button, CardMedia} from "@mui/material"
import plus from '../plus.png'
import ConferenceModal from './ConferenceModal'


// TODO: populate cards with data
export const MuiCard = (props) => {
    const conference_j = props.conference
    const conferenceCRUDHandler = props.conferenceCRUDHandler

    const [open, setOpen] = React.useState(false);

    return conference_j ? (
        <React.Fragment>
            <Box width="280px">
                <Card>
                    <CardActionArea
                        onClick={props.conferenceOnClick}
                    >
                        <CardMedia
                            component="img"
                            height="120"
                            image={props.conference.image}
                            alt="unsplash image"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component={'div'}>{conference_j.name}</Typography>
                            <Typography variant="body2" color="text.secondary">{conference_j.description}</Typography>
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
                canDelete={true} // TODO: current_user.is_organization
                conferenceCRUDHandler={conferenceCRUDHandler}
                callBackOnDelete={() => setOpen(false)}
            />
        </React.Fragment>
        ) :
        (
                <Box width="280px">
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="257"
                                image={plus}
                                alt=""
                            />
                        </CardActionArea>
                    </Card>
                </Box>
        )
}
