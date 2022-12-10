import {Box, TextField, Grid, Typography} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers'
import {LocalizationProvider} from '@mui/x-date-pickers-pro';
import React, {useState} from 'react'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';


export const MuiDateRangePicker = (
    {
        startText,
        endText,
        width
    }
) => {
    const [value, setValue] = useState({
        'from': null,
        'to': null
    })

    console.log({value})
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
            <Typography>Conference date:</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container>
                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                        <DatePicker
                            label="Start"
                            value={value.from}
                            onChange={(newValue) => setValue({...value, ...newValue})}
                            renderInput={(params) => <TextField  size="small" {...params} />}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                        <DatePicker
                            label="End"
                            value={value.to}
                            onChange={(newValue) => setValue({...value, ...newValue})}
                            renderInput={(params) => <TextField  size="small" {...params} />}
                        />
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </Box>
    )
}