import {Box, Stack, TextField, Grid, Typography} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import {LocalizationProvider} from '@mui/x-date-pickers-pro';
import React, {useState} from 'react'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';


export const MuiDateRangePicker = (
    {
        canEdit,
        startText,
        endText,
        width,
        fromValue,
        toValue,
        fromValueHandler,
        toValueHandler,
        ...other
    }
) => {
    if (!fromValueHandler || !toValueHandler) {
        [fromValue, fromValueHandler] = useState(null);
        [toValue, toValueHandler] = useState(null);
    }

    if (!width) {
        width = '500px'
    }
    if (!startText) {
        startText = 'Start'
    }
    if (!endText) {
        endText = 'End'
    }
    return (
        <Stack direction={"row"} spacing={1} justifyContent={"space-between"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    variant={"standard"}
                    readOnly={!canEdit}
                    label={startText}
                    value={fromValue}
                    onChange={(newValue) => fromValueHandler(newValue)}
                    renderInput={(params) => <TextField variant={"standard"} size="small" {...params} />}
                />

                <DatePicker
                    variant={"standard"}
                    readOnly={!canEdit}
                    label={endText}
                    value={toValue}
                    onChange={(newValue) => toValueHandler(newValue)}
                    renderInput={(params) => <TextField variant={"standard"} size="small" {...params} />}
                />
            </LocalizationProvider>
        </Stack>
    )
}