import * as React from 'react'
import {
    CardActionArea,
    CardMedia,
} from '@mui/material'
import ConferenceModal from './ConferenceModal'
import plus from '../plus.png'

export default function CreateConferenceDialog({
    conferenceCRUDHandler
}) {
    const [open, setOpen] = React.useState(false)

    return (
        <React.Fragment>

            <CardActionArea
                color="neutral"
                // startDecorator={<Add/>}
                onClick={() => setOpen(true)}
            >
                <CardMedia
                    component="img"
                    height="257"
                    image={plus}
                    alt="image"
                />
            </CardActionArea>

            <ConferenceModal
                    open={open}
                    onClose={() => setOpen(false)}
                    canEdit={true}
                    newConf={true}
                    conferenceCRUDHandler={conferenceCRUDHandler}
                    callBackOnCreate={() => setOpen(false)}
            />
        </React.Fragment>
    );
}
