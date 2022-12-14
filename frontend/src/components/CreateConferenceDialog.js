// author: Skuratovich Aliaksandr

import * as React from 'react'
import {
    CardActionArea,
    CardMedia,
} from '@mui/material'
import ConferenceModal from './ConferenceModal'
import plus from '../plus.png'
import {useParams, useLocation, useNavigate} from "react-router-dom";

export default function CreateConferenceDialog({
    user
}) {
    const [open, setOpen] = React.useState(false)
    let navigate = useNavigate()

    return (
        <React.Fragment>

            <CardActionArea
                color="neutral"
                // startDecorator={<Add/>}
                    onClick={() => {
                        navigate('/conferences' + "?create=true")
                        setOpen(true)
                    }
                }
            >
                <CardMedia // plus
                    component="img"
                    height="257"
                    image={plus}
                    alt="image"
                />
            </CardActionArea>

            <ConferenceModal
                    user={user}
                    open={open}
                    slug={null}
                    onClose={() => setOpen(false)}
                    canEdit={true}
                    newConf={true}
                    callBackOnCreate={() => setOpen(false)}
            />
        </React.Fragment>
    );
}
