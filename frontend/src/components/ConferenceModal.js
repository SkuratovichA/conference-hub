// author: Skuratovich Aliaksandr

import React, {useState} from 'react'
import Dialog from '@mui/material/Dialog';
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
        <Dialog
            open={open}
            onClose={onClose}
            scroll= 'body'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth='true'
            maxWidth='md'
            style={{outline:'none'}}
        ><Conference
                    canEdit={canEdit}
                    newConf={newConf}
                    slug={slug}
                    owner={user}
                    callBackOnCreate={callBackOnCreate}
                    callBackOnDelete={callBackOnDelete}
                />
        </Dialog>
    )
}