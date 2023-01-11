// author: Skuratovich Aliaksandr
// author: Shchapaniak Andrei

import * as React from "react";
import {withSnackbar} from 'notistack';
import {
    AvatarGroup,
    Avatar,
    Divider,
    TextField,
    Typography,
    Card,
    Button,
    CardActions,
    CardContent,
    IconButton,
    Stack,
} from "@mui/material";
import {EditableTypography} from "./EditableTypography";
import {MuiDateRangePicker} from "./RangeDatePicker";
import Scheduler from './Scheduler'
import authContext from "../context/AuthContext";
import {getInfoUser} from "../actions/UserFunctions";
import CustomCardMedia from './CustomCardMedia'
import {useLocation} from "react-router-dom";
import {conferenceCRUDHandler} from "../actions/ConferenceFunctions";
import {createFile} from "../actions/OtherFunctions";
import {MoneyFieldInputProps} from './MoneyFieldInputProps'
import {
    format, parse, parseISO
} from 'date-fns'
import ImageIcon from "@mui/icons-material/Image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EuroIcon from "@mui/icons-material/Euro";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';


function Conference(props) {
    let {authTokens} = React.useContext(authContext)
    let token = authTokens?.access ? "Bearer " + authTokens.access : null

    const [state, setState] = React.useState({
        conference: {
            'name': 'Default Name',
            'brief': '',
            'slug': props.slug,
            'date_from': '',
            'date_to': '',
            'address': '',
            'price': '',
            'visitors': [],
            'organization': props.owner,
            'events': [],
        },
        conferenceSlugName: props.slug,
        user: '',
        loaded: false,
        token: token,
    })
    const [updateKostyl, setUpdateKostyl] = React.useState(false)
    React.useEffect(
        () => {
            if (props.newConf === false) {
                setState({...state, loaded: false})
                conferenceCRUDHandler("fetch_one", state.conferenceSlugName, state.token, null, null)
                    .then((conf) => {
                        console.log('backend returns this:', conf)
                        setState({...state, ['conference']: conf, conferenceSlugName: conf.slug,  loaded: true})
                    })
            } else { // newConf = True
                setState({...state, loaded: true})
            }
        },
        []
    )

    const handleDataChange = (key, newValue) => {
        let slug = state.conference.name.replaceAll(" ", "_")
        setState({
            ...state,
            conference: {
                ...state.conference,
                [key]: newValue,
                ['slug']: slug,
            }
        })
    }

    const deleteConference = () => {
        conferenceCRUDHandler("delete", state.conferenceSlugName, state.token, state?.conference, null)
        props.callBackOnDelete()
        props.enqueueSnackbar('Conference has been deleted', {variant: "success"})
    }

    const updateConference = () => {
        conferenceCRUDHandler("update", state.conferenceSlugName, state.token, state?.conference, null)
        props.enqueueSnackbar('Conference has been updated', {variant: "success"})
    }

    const createConference = () => {
        conferenceCRUDHandler("create", state.conferenceSlugName, state?.token, state?.conference, null)
        props.enqueueSnackbar('Conference has been created', {variant: "success"})
        props.callBackOnCreate()
    }

    const imageEdit = () => (props.canEdit && (
        <React.Fragment>
            <input
                accept="image/*"
                style={{display: "none"}}
                id="icon-button-photo"
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
    ))

    const cardActions = () => (props.canEdit && (
        <CardActions>
            {!props.newConf ? (
                <Stack direction={"row"} justifyContent={"flex-between"}>
                    <Button size="small" color={"error"} onClick={deleteConference}>
                        Delete
                    </Button>
                    <Button
                        size="small"
                        onClick={() => {
                            console.log('b', state.conference.name, state.conferenceSlugName)
                            updateConference()
                            let newSlug = state.conference.name.replace(' ', "")
                            setState({...state, conference: {...state.conference, slug: newSlug} , conferenceSlugName: newSlug})
                            props.setSlug(newSlug)
                            props.setUpdateKostyl(!props.updateKostyl)
                            console.log('a', state.conference.name, state.conferenceSlugName)
                        }}>
                        UPDATE
                    </Button>
                </Stack>
            ) : (
                <Button
                    size="small"
                    color={"success"}
                    onClick={() => {
                        createConference();
                        props.setUpdateKostyl(!props.updateKostyl)
                    }}
                >
                    Create
                </Button>
            )}
        </CardActions>
    ))


    const leftSectionEditable = () => (
        <Stack direction={"column"} spacing={1.2}>
            {/*brief*/}
            <TextField
                label={"Brief"}
                size="small"
                variant={"standard"}
                value={state?.conference?.brief}
                onChange={(v) => handleDataChange("brief", v.target.value)}
            />

            {/*date_from - date_to*/}
            <MuiDateRangePicker
                canEdit={props.canEdit}
                fromValueHandler={(newFrom) => handleDataChange("date_from", newFrom)}
                toValueHandler={(newTo) => handleDataChange("date_to", newTo)}
                fromValue={state?.conference?.date_from}
                toValue={state?.conference?.date_to}
                variant={"standard"}
                sx={{justifyContent: "space-between"}}
            />

            {/*address*/}
            <Stack sx={{width: "100%"}} spacing={1} direction={"row"} justifyContent="space-between">

                <TextField
                    label="address"
                    value={state?.conference?.address}
                    variant="standard"
                    onChange={(v) => handleDataChange("address", v.target.value)}
                    name="address"
                />

                <TextField
                    label="price"
                    value={state?.conference?.price || 0}
                    InputProps={{
                        inputComponent: MoneyFieldInputProps,
                    }}
                    variant="standard"
                    onChange={(v) => handleDataChange("price", v.target.value)}
                    name="price"
                />
            </Stack>
        </Stack>
    )

    const leftSectionStatic = () => (
        <React.Fragment>
            {/*brief*/}
            {state?.conference?.brief && (
                <Stack direction={"row"} spacing={1}>
                    <HistoryEduIcon size={"small"}/>
                    <Typography color="text.secondary">{state?.conference?.brief}</Typography>
                </Stack>
            )}

            {/*date_from - date_to*/}
            <Stack direction={"row"} spacing={1}>
                <CalendarMonthIcon/>
                <Typography color="text.secondary">
                    {format(parseISO(state?.conference?.date_from), 'MMM dd, yyy')}
                </Typography>
                <Typography color="text.secondary">{' - '}</Typography>
                <Typography color="text.secondary">
                    {format(parseISO(state?.conference?.date_to), 'MMM dd, yyy')}
                </Typography>
            </Stack>

            {/*address price*/}
            <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
                <Stack direction={"row"} spacing={1}>
                    <LocationOnIcon size={"small"} color={"inherit"}/>
                    <Typography>{state?.conference?.address}</Typography>
                </Stack>
                {state?.conference?.price && (
                    <Stack direction={"row"} spacing={1}>
                        <EuroIcon size={"small"} color={"inherit"}/>
                        <Typography>{state?.conference?.price}</Typography>
                    </Stack>
                )}
            </Stack>
        </React.Fragment>
    )

    const leftSection = () => (
        props.canEdit ? (
            leftSectionEditable()
        ) : (
            leftSectionStatic()
        )
    )

    const rightSection = () => (
        <React.Fragment>
            <Stack direction={"column"} spacing={2}>

                <Button
                    style={{background: 'rgba(217,223,231,0.62)', borderRadius: '8px'}}
                    href={"/users/" + state.conference.organization.user.username}
                >
                    <Stack
                        spacing={2}
                        direction={"row"}
                        style={{margin: "4px"}}
                    >
                        <Avatar
                            alt={state.conference.organization.user.username}
                            style={{height: "40%", margin: "auto 0"}}
                            src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        />
                        <Stack direction={"column"}>
                            <Typography color={"primary.main"}>{state.conference.organization.user.name}</Typography>
                            <Typography variant={"body1"}
                                        color={"text.secondary"}>{state.conference.organization.user.email}</Typography>
                            <Typography variant={"body1"}
                                        color={"text.secondary"}>{state.conference.organization.user.city}, {state.conference.organization.user.country}</Typography>
                        </Stack>
                    </Stack>

                </Button>

                <AvatarGroup max={4}>
                    <Avatar alt="Skuratovich Aliaksandr"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"/>
                </AvatarGroup>
            </Stack>
        </React.Fragment>
    )


    return (
        state.loaded && (
            <>
                <Card>
                    <CustomCardMedia
                        src={"http://localhost:8000/media/static/conf_default.jpg"}
                    />
                    <CardContent>

                        {imageEdit()}

                        <EditableTypography
                            canEdit={props.canEdit}
                            variant="h1"
                            initialValue={state?.conference?.name}
                            onSave={(v) => handleDataChange("name", v)}
                            label="Conference Name"
                            onValidate={() => true}
                            level="inherit"
                            fontSize="3em"
                            className={"font-semibold"}
                            // mb="0.25em"
                        >
                            {state?.conference?.name}
                        </EditableTypography>

                        <Divider flexItem style={{marginBottom: "10px"}}/>

                        <div className={"row"} style={{justifyContent: "space-between", padding: "0px 24px"}}>
                            <div className={"col-6"}>
                                {leftSection()}
                            </div>
                            <div className={"col-6"}>
                                {rightSection()}
                            </div>
                        </div>

                        <Scheduler
                            conference={state.conference.slug}
                            canEdit={props.canEdit}
                            setFatherKostyl={() => setUpdateKostyl(!updateKostyl)}
                        />

                    </CardContent>

                    {cardActions()}

                </Card>
            </>
        )
    )
}

export default withSnackbar(Conference)
