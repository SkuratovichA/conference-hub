import React, {useState} from 'react'
import {Modal, ModalDialog} from '@mui/joy'
import Conference from './Conference'
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import {getInfoUser} from "../actions/UserFunctions";


export default function ConferenceModal ({
    open,
    onClose,
    canEdit,
    newConf,
    canDelete,
    conferenceCRUDHandler,
    callBackOnCreate,
    callBackOnDelete,
    callBackOnUpdate
}) {

    let {authTokens} = useContext(AuthContext)
    let [user, SetUserInfo] = useState({})
    let token = String("Bearer " + String(authTokens.access))

    useEffect(() => {
        getInfoUser(token)
            .then((data) => {
                SetUserInfo(data['infouser'])
            })
    }, [])

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
                    newConf={newConf}
                    conferenceCRUDHandler={conferenceCRUDHandler}
                    owner={user}
                    callBackOnCreate={callBackOnCreate}
                    callBackOnDelete={callBackOnDelete}
                />
            </ModalDialog>
        </Modal>
    )
}