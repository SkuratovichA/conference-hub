import * as React from 'react'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Add from '@mui/icons-material/Add';
import {CardActionArea, CardMedia } from '@mui/material'
import {MuiDateRangePicker} from './RangeDatePicker'
import {EditableTypography} from './EditableTypography'

import plus from '../plus.png'


export default function CreateConferenceDialog() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("Conference Name");

    const handleGroupNameValidation = (newName) => {
        return /^[A-Za-z][A-Za-z0-9\s_\-]+$/.test(newName)
    }
    // TODO: convert to conference somehow...
    const handleGroupNameChange = (hui) => (0)
    // useCallback((newGroupName) => {
    //         onChangeGroupParameter(groupId, 'group', newGroupName)
    //     },
    //     [onChangeGroupParameter, groupId]
    // )

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
                        maxWidth: '80%',
                        minWidth: '60%',
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                        background: 'rgba(142,181,225,0.85)',
                        color: 'rgb(245,245,246)'
                    }}
                >

                        {/*name */}
                        <EditableTypography
                            variant="h1"
                            initialValue={value}
                            onValidate={handleGroupNameValidation}
                            onSave={handleGroupNameChange}
                            label="Conference Name"

                            component="h1"
                            level="inherit"
                            fontSize="1.25em"
                            mb="0.25em"
                        >
                            {value}
                        </EditableTypography>

                        {/*brief description*/}
                        <EditableTypography
                            variant="h4"
                            component="h4"
                            initialValue={value}
                            onValidate={handleGroupNameValidation}
                            onSave={handleGroupNameChange}
                            label="Brief description of the conference"
                        >
                            {value}
                        </EditableTypography>

                        {/*TODO: date from - date to*/}
                        <MuiDateRangePicker />


                        {/*/!*TODO: address*!/*/}
                        {/*<EditableTypography*/}
                        {/*    variant="h2"*/}
                        {/*    initialValue={value}*/}
                        {/*    onValidate={handleGroupNameValidation}*/}
                        {/*    onSave={handleGroupNameChange}*/}
                        {/*    label="Address"*/}
                        {/*>*/}
                        {/*    {value}*/}
                        {/*</EditableTypography>*/}

                        {/*/!*TODO: price*!/*/}
                        {/*<EditableTypography*/}
                        {/*    variant="h2"*/}
                        {/*    initialValue={value}*/}
                        {/*    onValidate={handleGroupNameValidation}*/}
                        {/*    onSave={handleGroupNameChange}*/}
                        {/*    label="Prcie"*/}
                        {/*>*/}
                        {/*    {value}*/}
                        {/*</EditableTypography>*/}

                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
