import React, {Component} from "react";
import {styled} from '@mui/system'
import {Box} from '@mui/material'


export const ContentSection = styled(Box)(
    function({theme, children, ...props}) {
        console.log(props)
        return {
            backgroundColor: props.backgroundColor ? props.backgroundColor : theme.palette.mode === 'dark' ? 'rgba(66,76,93,0.18)' : 'rgba(130,147,185,0.11)',
            margin: "1% 1% 1% 1%",
            borderRadius: props.borderRadius ? props.borderRadius : "20px",
            height: String(window.height),
            paddingBottom: props.paddingBottom ? props.paddingBottom :"200px",
            ...props
        }
    }
)
