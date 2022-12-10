import * as React from 'react'
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import {Box, IconButton} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

const useStyles = {
    noPadding: {
        'padding': '0',
    },
    // iconStyle: {
    //   width: spacing(2.5),
    //   height: spacing(2.5),
    // },
}

const defaultOnValidate = () => true

export const EditableTypography = (
    {
        initialValue,
        onSave,
        onValidate,
        textFieldProps,
        iconButtonProps,
        containerProps,
        ...rest
    }) => {
    const classes = useStyles

    const [value, setValue] = React.useState(initialValue)
    const [editing, setEditing] = React.useState(false)

    const handleKeyPress = React.useCallback(
        (e) => {
            if (e.key === 'Enter') {
                handleValueSave(value)
            } else if (e.key === 'Escape') {
                setEditing(false)
                setValue(initialValue)
            }
        },
        [handleValueSave, setEditing, setValue, initialValue, value]
    )

    const isValid = React.useMemo(() => onValidate(value), [onValidate, value])

    const getHelperText = React.useCallback(() => {
        if (!isValid) return 'Invalid'
        return ''
    }, [isValid, value, initialValue])

    const helperText = React.useMemo(() => getHelperText(value), [getHelperText, value])

    const handleValueSave = React.useCallback(
        (value) => {
            setEditing(false)
            if (isValid) {
                onSave(value)
            }
        },
        [setEditing, onSave, isValid]
    )

    const handleTextFieldOnChange = React.useCallback((e) => setValue(e.target.value), [
        setValue,
    ])
    const handleSaveClick = React.useCallback(() => handleValueSave(value), [
        handleValueSave,
        value,
    ])

    const handleEditClick = React.useCallback(
        (e) => {
            e.stopPropagation()
            setEditing(true)
        },
        [setEditing]
    )

    return (
        <Box display="flex" alignItems="center" {...containerProps}>
            {editing && (
                <>
                    <TextField
                        autoFocus
                        helperText={helperText}
                        error={!isValid}
                        value={value}
                        variant="outlined"
                        onChange={handleTextFieldOnChange}
                        onKeyDown={handleKeyPress}
                        className={classes.noPadding}
                        {...textFieldProps}
                        FormHelperTextProps={{
                            onClick: handleSaveClick
                        }}
                    />
                </>
            )}
            {!editing && (
                <>
                    <Typography color="inherit" {...rest}>{value}</Typography>
                    <IconButton onClick={handleEditClick} {...iconButtonProps}>
                        <EditIcon size="small"/>
                    </IconButton>
                </>
            )}
        </Box>
    )
}
