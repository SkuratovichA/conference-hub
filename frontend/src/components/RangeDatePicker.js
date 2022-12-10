import {Box, TextField, Grid, Typography} from '@mui/material'
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
        <Box width={width}>
            <Typography
                color="text.secondary"
                sx={{m: 1}}
            >
                Conference date:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container>
                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                        <DatePicker
                            readOnly={!canEdit}
                            label={startText}
                            value={fromValue}
                            onChange={(newValue) => fromValueHandler(newValue)}
                            renderInput={(params) => <TextField  size="small" {...params} />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                        <DatePicker
                            readOnly={!canEdit}
                            label={endText}
                            value={toValue}
                            onChange={(newValue) => toValueHandler(newValue)}
                            renderInput={(params) => <TextField  size="small" {...params} />}
                        />
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </Box>
    )
}