import React, {useState} from 'react';
import {CardMedia} from "@mui/material";


export default function CustomCardMedia({src}) {

    return (
        <CardMedia
            component={'img'}
            height={"120px"}
            src={src}
            alt=""
            onError={({currentTarget}) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = null;
            }}
        />

    )
}