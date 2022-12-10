import {Card, Button, CardActions, CardContent, CardMedia, IconButton, Stack} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import {EditableTypography} from "./EditableTypography";
import {MuiDateRangePicker} from "./RangeDatePicker";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EuroIcon from "@mui/icons-material/Euro";
import * as React from "react";


export const Conference = (
    {
        canEdit,
        canDelete,
        conferenceCRUDHandler,
        pk
    }
) => {

    // conferenceCRUDHandler("fetch", pk)
    const [conference, setValues] = React.useState((
        conferenceCRUDHandler ? conferenceCRUDHandler("fetch", {'pk': pk})
            : {
                'name': "Dummy",
                'brief': "Dummy description",
                'date_from': null,
                'date_to': null,
                'address': "Dummy Address",
                'price': "100",
                'image': "https://source.unsplash.com/random"
            }))
    alert(JSON.stringify(conference))

    // const [conference, setValues] = React.useState({
    // })

    const handleDataValidation = (newName) => {
        return /^[A-Za-z][A-Za-z0-9\s_\-]+$/.test(newName)
    }
    const handleDataChange = (key, newValue) => {
        setValues({
            ...conference,
            [key]: newValue
        })
    }

    return (
        <Card>
            <CardMedia
                component={"img"}
                height={"120"}
                src={conference['image']}
                alt="unsplash image"
            />
            <CardContent>

                {canEdit && (
                    <React.Fragment>
                        <input
                            accept="image/*"
                            style={{display: "none"}}
                            id="icon-button-photo"
                            // onChange={(v) => handleDataChange("image", v)}
                            type="file"
                        />

                        <label htmlFor="icon-button-photo">
                            <IconButton
                                style={{
                                    position: "relative",
                                    transform: "translate(0, -120px)",
                                    background: "rgba(255,255,255,0.85)"
                                }}
                                color="inherit"
                                component="span">
                                <ImageIcon/>
                            </IconButton>
                        </label>

                    </React.Fragment>
                )}


                {/*name */}
                <EditableTypography
                    canEdit={canEdit}
                    variant="h1"
                    initialValue={conference['name']}
                    onValidate={handleDataValidation}
                    onSave={(v) => handleDataChange("name", v)}
                    label="Conference Name"

                    level="inherit"
                    fontSize="1.25em"
                    mb="0.25em"
                >
                    {conference['name']}
                </EditableTypography>

                {/*brief description*/}
                <EditableTypography
                    canEdit={canEdit}
                    variant="h4"
                    initialValue={conference['brief']}
                    onValidate={handleDataValidation}
                    onSave={(v) => handleDataChange("brief", v)}
                    label="Brief description of the conference"
                    color="text.secondary"
                >
                    {conference['brief']}
                </EditableTypography>

                {/*date from - date to*/}
                <MuiDateRangePicker
                    canEdit={canEdit}
                    fromValueHandler={(newFrom) => handleDataChange("date_from", newFrom)}
                    toValueHandler={(newTo) => handleDataChange("date_to", newTo)}
                    fromValue={conference['date_from']}
                    toValue={conference['date_to']}
                />

                {/*/!* address*!/*/}
                <Stack direction={'row'}>
                    <LocationOnIcon sx={{mt: 1, mb: 1}}>
                    </LocationOnIcon>
                    <EditableTypography
                        canEdit={canEdit}
                        variant="h2"
                        initialValue={conference['address']}
                        onValidate={handleDataValidation}
                        onSave={(v) => handleDataChange("address", v)}
                        label="Address"
                    >
                        {conference['address']}
                    </EditableTypography>
                </Stack>

                {/*/!* price*!/*/}
                <Stack direction={'row'}>
                    <EuroIcon sx={{mt: 1, mb: 1}}/>
                    <EditableTypography
                        canEdit={canEdit}
                        variant="h4"
                        component="h4"
                        initialValue={conference['price']}
                        onValidate={handleDataValidation}
                        onSave={(v) => handleDataChange("price", v)}
                        label="Price"
                    >
                        {conference['price']}
                    </EditableTypography>
                </Stack>

            </CardContent>

            {canEdit &&
                <CardActions>
                    {canDelete && (
                        <>
                            <Button size="small" color={"error"}
                                    onClick={() => conferenceCRUDHandler("delete", conference)}>Delete</Button>
                            <Button size="small"
                                    onClick={() => conferenceCRUDHandler("update", conference)}>Update</Button>
                        </>
                    )}
                    {!canDelete && <Button size="small" color={"success"}
                                           onClick={() => conferenceCRUDHandler("create", conference)}>Create</Button>}
                </CardActions>
            }
        </Card>
    )
}