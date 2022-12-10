import React from 'react'
import {Modal, ModalDialog} from '@mui/joy'
import Conference from './Conference'


export default function ConferenceModal ({
    open,
    onClose,
    canEdit,
    canDelete,
    conferenceCRUDHandler,
    callBackOnCreate,
}) {

    return (
        <Modal open={open} onClose={onClose}>
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
                    canEdit={canEdit}
                    canDelete={canDelete}
                    conferenceCRUDHandler={conferenceCRUDHandler}
                    callBackOnCreate={callBackOnCreate}
                />
            </ModalDialog>
        </Modal>
    )
}