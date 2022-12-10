import * as React from 'react'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Add from '@mui/icons-material/Add';
import {
    CardActionArea,
    CardMedia,
} from '@mui/material'
import { Conference } from './Conference'

import plus from '../plus.png'


export default function CreateConferenceDialog() {
    const [open, setOpen] = React.useState(false);

    const [values, setValues] = React.useState({
        'name': "Conference Name",
        'brief': "Brief Description",
        'date_from': "",
        'date_to': "",
        'address': "Address",
        'price': "100",
        'image': "https://source.unsplash.com/random"
    })

    const confCRUDNoBack = (type, conference) => {
        switch (type) {
            case "fetch":
                alert('Fetching data...')
                return {
                    'pk': 12340987,
                    'name': "Conference Name",
                    'brief': "Brief Description",
                    'date_from': null,
                    'date_to': null,
                    'address': "Address",
                    'price': "100",
                    'image': "https://source.unsplash.com/random"
                }
                break;
            case "update":
                alert('Update a conference...')
                break;
            case "delete":
                alert('Delete a conference...')
                break;
            case "create":
                alert('Create a new conference...')
                break;
        }
    }

    return (
        <React.Fragment>

            <CardActionArea
                color="neutral"
                startDecorator={<Add/>}
                onClick={() => setOpen(true)}
            >
                <CardMedia
                    component="img"
                    height="257"
                    image={plus}
                    alt="image"
                />
            </CardActionArea>

            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    aria-labelledby="basic-modal-dialog-title"
                    aria-describedby="basic-modal-dialog-description"
                    sx={{
                        border: 'none',
                        maxWidth: '80%',
                        minWidth: '60%',
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                        background: 'transparent',
                        color: 'rgb(245,245,246)'
                    }}
                >
                <Conference
                    canEdit={true}
                    conferenceCRUDHandler={confCRUDNoBack}
                />
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}