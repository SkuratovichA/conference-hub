import React, {useState} from 'react'
import {Modal, ModalDialog} from '@mui/joy'
import Conference from './Conference'
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import {getInfoUser} from "../actions/UserFunctions";
import {useNavigate} from "react-router-dom";


export default function ConferenceModal ({
    user,
    open,
    onClose,
    slug,
    canEdit,
    newConf,
    callBackOnCreate,
    callBackOnDelete,
}) {
    let navigate = useNavigate()

    useEffect(() => {
        if (open === false) {
            navigate('/conferences')
        }
    }, [open, ])

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
                    owner={user}
                    callBackOnCreate={callBackOnCreate}
                    callBackOnDelete={callBackOnDelete}
                />
            </ModalDialog>
        </Modal>
    )
}