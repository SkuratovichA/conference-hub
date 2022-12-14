import * as React from "react";
import {Divider, TextField, Typography, Card, Button, CardActions, CardContent, IconButton, Stack} from "@mui/material";
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


export default class Conference extends React.Component {
    static contextType = authContext
    // canEdit - can create/delete/update a conference
    // newConf - creating a new conference, co it's not possible to delete one
    // conferenceCRUDHandler - (type, conference), type in ['create', 'update', 'fetch', 'delete'].
    // callBackOnCreate - close a window/do something else
    // callBackOnDelete - close a window/remove the element
    // slug - close a window/remove the element
    constructor(props) {
        super(props);

        this.state = {
            conference: JSON.parse(JSON.stringify({
                'name': 'Default Name',
                'brief': '',
                'slug': 'DefaultName',
                'date_from': '',
                'date_to': '',
                'address': '',
                'price': '',
                'visitors': [],
                'organization': this.props.owner
            })),
            loaded: false,
            token: null
        }
        this.handleDataChange = this._handleDataChange.bind(this)
        this.handleDataValidation = this._handleDataValidation.bind(this)
        this.createConference = this._createConference.bind(this)
        this.updateConference = this._updateConference.bind(this)
        this.deleteConference = this._deleteConference.bind(this)
    }

    _handleDataChange(key, newValue) {
        console.log(key, newValue)
        let var1 = this.state?.conference?.name

        this.setState({
            conference: {
                ...this.state?.conference,
                [key]: newValue,
                ['slug']: var1.replaceAll(" ", "")
            }
        })
    }

    _handleDataValidation = (newName) => {
        return true
    }

    _deleteConference() {
        conferenceCRUDHandler("delete", this.state?.conference?.slug, this.state.token, this.state?.conference, null)
        this.props.callBackOnDelete()
    }

    _updateConference() {
        conferenceCRUDHandler("update", this.state?.conference?.slug, this.state.token, this.state?.conference, null)
    }

    _createConference() {
        conferenceCRUDHandler("create", this.state?.conference?.slug, this.state?.token, this.state?.conference, null)
        this.props.callBackOnCreate()
    }

    componentDidMount() {
        let {user, authTokens} = this.context
        let token = "Bearer " + authTokens?.access

        this.setState({token: token})

        if (this.props.newConf === false) {
            conferenceCRUDHandler("fetch_one", this.props.slug, token, this.state?.conference, null)
                .then((confinfo) => {
                    this.setState({conference: confinfo})
                })
                .then(() => {
                    this.setState({loaded: true})
                })
        } else {
            this.setState({loaded: true})
        }
    }

    imageEdit = () => (this.props.canEdit && (
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
    ))

    cardActions = () => (this.props.canEdit && (
        <CardActions>
            {!this.props.newConf ? (
                <Stack direction={"row"} justifyContent={"flex-between"}>
                    <Button size="small" color={"error"}
                            onClick={this.deleteConference}
                    >
                        Delete
                    </Button>
                    <Button size="small"
                            onClick={this.updateConference}
                    >
                        Update
                    </Button>
                </Stack>
            ) : (
                <Button size="small" color={"success"}
                        onClick={this.createConference}
                >
                    Create
                </Button>
            )}
        </CardActions>
    ))

    leftSectionEditable = () => (
        <Stack direction={"column"} spacing={1.2}>
            {/*brief*/}
            <TextField
                label={"Brief"}
                size="small"
                variant={"standard"}
                value={this.state?.conference?.brief}
                onChange={(v) => this.handleDataChange("brief", v)}
            />

            {/*date_from - date_to*/}
            <MuiDateRangePicker
                canEdit={this.props.canEdit}
                fromValueHandler={(newFrom) => this.handleDataChange("date_from", newFrom)}
                toValueHandler={(newTo) => this.handleDataChange("date_to", newTo)}
                fromValue={this.state?.conference?.date_from}
                toValue={this.state?.conference?.date_to}
                variant={"standard"}
                sx={{justifyContent: "space-between"}}
            />

            {/*address*/}
            <Stack sx={{width: "100%"}} spacing={1} direction={"row"} justifyContent="space-between">

                <TextField
                    label="address"
                    value={this.state?.conference?.address}
                    variant="standard"
                    onChange={(v) => this.handleDataChange("address", v)}
                    name="address"
                />

                <TextField
                    label="price"
                    value={this.state?.conference?.price || 0}
                    InputProps={{
                        inputComponent: MoneyFieldInputProps,
                    }}
                    variant="standard"
                    onChange={(v) => this.handleDataChange("price", v)}
                    name="price"
                />
            </Stack>
        </Stack>
    )

    leftSectionStatic = () => (
        <React.Fragment>
            {/*brief*/}
            {this.state?.conference?.brief && (
                <Stack direction={"row"} spacing={1}>
                    <HistoryEduIcon size={"small"} />
                    <Typography color="text.secondary">{this.state?.conference?.brief}</Typography>
                </Stack>
            )}

            {/*date_from - date_to*/}
            <Stack direction={"row"} spacing={1}>
                <CalendarMonthIcon />
                <Typography color="text.secondary">
                    {format(parseISO(this.state?.conference?.date_from), 'MMM dd, yyy')}
                </Typography>
                <Typography color="text.secondary">{' - '}</Typography>
                <Typography color="text.secondary">
                    {format(parseISO(this.state?.conference?.date_to), 'MMM dd, yyy')}
                </Typography>
            </Stack>

            {/*address price*/}
            <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
                <Stack direction={"row"} spacing={1}>
                    <LocationOnIcon size={"small"} color={"inherit"}/>
                    <Typography>{this.state?.conference?.address}</Typography>
                </Stack>
                {this.state?.conference?.price && (
                    <Stack direction={"row"} spacing={1}>
                        <EuroIcon size={"small"} color={"inherit"}/>
                        <Typography>{this.state?.conference?.price}</Typography>
                    </Stack>
                )}
            </Stack>
        </React.Fragment>
    )

    leftSection = () => (
        this.props.canEdit ? (
            this.leftSectionEditable()
        ) : (
            this.leftSectionStatic()
        )
    )

    rightSection = () => (
        <React.Fragment></React.Fragment>
    )

    render() {

        return (
            this.state.loaded && (
                <Card>
                    <CustomCardMedia
                        src={"http://localhost:8000/media/static/conf_default.jpg"}
                    />
                    <CardContent>

                        {this.imageEdit()}

                        <EditableTypography
                            canEdit={this.props.canEdit}
                            variant="h1"
                            initialValue={this.state?.conference?.name}
                            onValidate={this.handleDataValidation}
                            onSave={(v) => this.handleDataChange("name", v)}
                            label="Conference Name"

                            level="inherit"
                            fontSize="3em"
                            className={"font-semibold"}
                            // mb="0.25em"
                        >
                            {this.state?.conference?.name}
                        </EditableTypography>

                        <Divider flexItem middle style={{marginBottom: "10px"}}/>

                        <div className={"row"} style={{justifyContent: "space-between", padding: "0px 24px"}}>
                            <div className={"col-6"}>
                                {this.leftSection()}
                            </div>
                            <div className={"col-6"}>
                                {this.rightSection()}
                            </div>
                        </div>

                        <Scheduler
                            conference={this.state.conference.slug}
                            canEdit={this.props.canEdit}
                        />

                    </CardContent>

                    {this.cardActions}

                </Card>
            )
        )
    }
}
