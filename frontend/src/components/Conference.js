import {Card, CardContent, CardMedia, IconButton, Stack} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import {EditableTypography} from "./EditableTypography";
import {MuiDateRangePicker} from "./RangeDatePicker";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EuroIcon from "@mui/icons-material/Euro";
import * as React from "react";


export const Conference = () => {

    const [values, setValues] = React.useState({
        'name': "Conference Name",
        'brief': "Brief Description",
        'date_from': "",
        'date_to': "",
        'address': "Address",
        'price': "100",
        'image': "https://source.unsplash.com/random"
    })

    const handleGroupNameValidation = (newName) => {
        return /^[A-Za-z][A-Za-z0-9\s_\-]+$/.test(newName)
    }
    // TODO: convert to conference somehow...
    const handleGroupNameChange = (hui) => (
        alert(hui)
    )

    // useCallback((newGroupName) => {
    //         onChangeGroupParameter(groupId, 'group', newGroupName)
    //     },
    //     [onChangeGroupParameter, groupId]
    // )

    return (
        <Card>
            <CardMedia
                component={"img"}
                height={"120"}
                image={values['image']}
                alt="unsplash image"
            />
            <CardContent>
                <input
                    accept="image/*"
                    style={{display: "none"}}
                    id="icon-button-photo"
                    onChange={handleGroupNameChange}
                    type="file"
                />

                <label htmlFor="icon-button-photo">
                    <IconButton
                        style={{
                            position: "relative",
                            // top: "10%",
                            // left: "94%",
                            transform: "translate(0, -120px)",
                            background: "rgba(255,255,255,0.85)"
                        }}
                        color="inherit"
                        component="span">
                        <ImageIcon/>
                    </IconButton>
                </label>

                {/*name */}
                <EditableTypography
                    variant="h1"
                    initialValue={values['name']}
                    onValidate={handleGroupNameValidation}
                    onSave={handleGroupNameChange}
                    label="Conference Name"

                    component="h1"
                    level="inherit"
                    fontSize="1.25em"
                    mb="0.25em"
                >
                    {values['name']}
                </EditableTypography>

                {/*brief description*/}
                <EditableTypography
                    variant="h4"
                    component="h4"
                    initialValue={values['brief']}
                    onValidate={handleGroupNameValidation}
                    onSave={handleGroupNameChange}
                    label="Brief description of the conference"
                >
                    {values['brief']}
                </EditableTypography>

                {/*TODO: date from - date to*/}
                <MuiDateRangePicker/>


                {/*/!*TODO: address*!/*/}
                <Stack direction={'row'}>
                    <LocationOnIcon sx={{mt: 1, mb: 1}}>
                    </LocationOnIcon>
                    <EditableTypography
                        variant="h2"
                        initialValue={values['address']}
                        onValidate={handleGroupNameValidation}
                        onSave={handleGroupNameChange}
                        label="Address"
                    >
                        {values['address']}
                    </EditableTypography>
                </Stack>

                {/*/!*TODO: price*!/*/}
                <Stack direction={'row'}>
                    <EuroIcon sx={{mt: 1, mb: 1}}/>
                    <EditableTypography
                        variant="h4"
                        component="h4"
                        initialValue={values['price']}
                        onValidate={handleGroupNameValidation}
                        onSave={handleGroupNameChange}
                        label="Price"
                    >
                        {values['price']}
                    </EditableTypography>
                </Stack>

            </CardContent>
        </Card>
    )
}