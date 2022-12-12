import React, {useState} from 'react'
import {Modal, ModalDialog} from '@mui/joy'
import Conference from './Conference'
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import {getInfoUser} from "../actions/UserFunctions";
import {useLocation} from "react-router-dom";


export default function ConferenceModal ({
    open,
    onClose,
    slug,
    canEdit,
    newConf,
    conferenceCRUDHandler,
    callBackOnCreate,
    callBackOnDelete,
    callBackOnUpdate
}) {

    let {authTokens} = useContext(AuthContext)
    let [user, SetUserInfo] = useState({})
    let [token, setToken] = useState(authTokens?.access ? "Bearer " + authTokens?.access : null)

    useEffect(() => {
        getInfoUser(token)
            .then((data) => {
                SetUserInfo(data['infouser'])
            })
    }, [])

    // TODO move to caller
    // let query = new URLSearchParams(useLocation().search)
    // query.get('create')
    console.log('newconfffffffff', open)

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
                    newConf={newConf}
                    slug={slug}
                    conferenceCRUDHandler={conferenceCRUDHandler}
                    owner={user}
                    callBackOnCreate={callBackOnCreate}
                    callBackOnDelete={callBackOnDelete}
                />
            </ModalDialog>
        </Modal>
    )
}