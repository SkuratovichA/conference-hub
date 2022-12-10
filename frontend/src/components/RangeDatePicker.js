import {Box, TextField} from '@mui/material'
import { DateRangePicker }  from '@mui/x-date-pickers-pro'
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import React, {useState} from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export const MuiDateRangePicker = (
    {
        startText,
        endText,
        width
    }
) => {
    const [value, setValue] = useState([null, null])
    console.log({value})
    if (!width) {
        width = '200px'
    }
    if (!startText) {
        startText = 'Start'
    }
    if (!endText) {
        endText = 'End'
    }
    return (
        <Box width={width}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                    calendars={0}
                    // startText={startText}
                    // endText={endText}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue)
                    }}
                    renderInput={(startProps, endProps) => (
                        <div>
                            <TextField sx={{color: 'rgb(245,245,246)'}} {...startProps} />
                            <Box sx={{mx: 2, color: 'rgb(245,245,246)' }}> to </Box>
                            <TextField sx={{color: 'rgb(245,245,246)'}} {...endProps} />
                        </div>
                    )
                    }
                ></DateRangePicker>
            </LocalizationProvider>
        </Box>
    )
}