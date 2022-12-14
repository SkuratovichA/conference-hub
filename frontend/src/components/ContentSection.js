// author: Skuratovich Aliaksandr

import React, {Component} from "react";
import {styled} from '@mui/system'
import {Box} from '@mui/material'


export const ContentSection = styled('div')(
    function({theme, children, ...props}) {
        return {
            backgroundColor: props.backgroundColor ? props.backgroundColor : theme.palette.mode === 'dark' ? 'rgba(66,76,93,0.18)' : 'rgba(130,147,185,0.11)',
            boxSizing: "borderBox",
            margin: props.margin ? props.margin : "0 auto",
            padding: props.padding ? props.padding : null,
            borderRadius: props.borderRadius ? props.borderRadius : "20px",
            ...props
        }
    }
)
