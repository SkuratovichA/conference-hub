import * as React from "react";
import {Card, Button, CardActions, CardContent, CardMedia, IconButton, Stack} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import {EditableTypography} from "./EditableTypography";
import {MuiDateRangePicker} from "./RangeDatePicker";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EuroIcon from "@mui/icons-material/Euro";
import Scheduler from './Scheduler'
import authContext from "../context/AuthContext";
import {getInfoUser} from "../actions/UserFunctions";
import {wait} from "@testing-library/user-event/dist/utils";
/* eslint-disable no-useless-escape */

export default class Conference extends React.Component {
    static contextType = authContext
    // canEdit - can create/delete/update a conference
    // canDelete - *update* and *delete* buttons are displayed
    // conferenceCRUDHandler - (type, conference), type in ['create', 'update', 'fetch', 'delete'].
    // callBackOnCreate - close a window/do something else
    // callBackOnDelete - close a window/remove the element
    // slugName - close a window/remove the element
    constructor(props) {
        super(props);

        this.state = {
            conference: JSON.parse(JSON.stringify(
            {
                    'name': 'Default Name',
                    'brief': '',
                    'slug': 'DefaultName',
                    'date_from': '',
                    'date_to': '',
                    'address': '',
                    'price': '',
                    'image': '/media/static/conf_default.jpg',
                    'visitors': {},
                    'organization': this.props.owner
                }
            ))
        }
        this.handleDataChange = this._handleDataChange.bind(this)
        this.handleDataValidation = this._handleDataValidation.bind(this)
        this.createConference = this._createConference.bind(this)
        this.deleteConference = this._deleteConference.bind(this)
    }

    _handleDataChange(key, newValue) {
        this.setState({
                conference: {
                    ...this.state.conference,
                    [key]: newValue
                }
            }
        )
    }

    _handleDataValidation = (newName) => {
        return /^[A-Za-z][A-Za-z0-9\s_\-]+$/.test(newName)
    }

    _deleteConference() {
        this.props.conferenceCRUDHandler("delete", this.state)
        if (this.props.callBackOnDelete) {
            this.props.callBackOnDelete()
        }
    }

    _createConference() {
        this.props.conferenceCRUDHandler("create", this.state)
        if (this.props.callBackOnCreate) {
            this.props.callBackOnCreate()
        }
    }

    componentDidMount() {
        let {user, authTokens} = this.context
        let token = String("Bearer " + String(authTokens.access))
        this.props.conferenceCRUDHandler("fetch", this.state.conference.slug, token, this.state.conference)
        console.log(this.props.canEdit, this.props.canDelete)
    }

    render() {
        return (
            <Card>
                <CardMedia
                    component={"img"}
                    height={"120"}
                    src={String("http://localhost:8000" + this.state.conference.image)}
                    alt="unsplash image"
                />
                <CardContent>

                    {this.props.canEdit && (
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
                        canEdit={this.props.canEdit}
                        variant="h1"
                        initialValue={this.state.conference.name}
                        onValidate={this.handleDataValidation}
                        onSave={(v) => this.handleDataChange("name", v)}
                        label="Conference Name"

                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                    >
                        {this.state.conference.name}
                    </EditableTypography>

                    {/*brief description*/}
                    <EditableTypography
                        canEdit={this.props.canEdit}
                        variant="h4"
                        initialValue={this.state.conference.brief}
                        onValidate={this.handleDataValidation}
                        onSave={(v) => this.handleDataChange("brief", v)}
                        label="Brief description of the conference"
                        color="text.secondary"
                    >
                        {this.state.conference.brief}
                    </EditableTypography>

                    {/*date from - date to*/}
                    <MuiDateRangePicker
                        canEdit={this.props.canEdit}
                        fromValueHandler={(newFrom) => this.handleDataChange("date_from", newFrom)}
                        toValueHandler={(newTo) => this.handleDataChange("date_to", newTo)}
                        fromValue={this.state.conference.date_from}
                        toValue={this.state.conference.date_to}
                    />

                    {/*/!* address*!/*/}
                    <Stack direction={'row'}>
                        <LocationOnIcon sx={{mt: 1, mb: 1}}>
                        </LocationOnIcon>
                        <EditableTypography
                            canEdit={this.props.canEdit}
                            variant="h2"
                            initialValue={this.state.conference.address}
                            onValidate={this.handleDataValidation}
                            onSave={(v) => this.handleDataChange("address", v)}
                            label="Address"
                        >
                            {this.state.conference.address}
                        </EditableTypography>
                    </Stack>

                    {/*/!* price*!/*/}
                    <Stack direction={'row'}>
                        <EuroIcon sx={{mt: 1, mb: 1}}/>
                        <EditableTypography
                            canEdit={this.props.canEdit}
                            variant="h4"
                            component="h4"
                            initialValue={this.state.conference.price}
                            onValidate={this.handleDataValidation}
                            onSave={(v) => this.handleDataChange("price", v)}
                            label="Price"
                        >
                            {this.state.conference.price}
                        </EditableTypography>
                    </Stack>

                    {/*<Scheduler />*/}

                </CardContent>

                {this.props.canEdit &&
                    <CardActions>
                        {this.props.canDelete && (
                            <>
                                <Button size="small" color={"error"}
                                        onClick={() => {
                                            let {user, authTokens} = this.context
                                            let token = String("Bearer " + String(authTokens.access))
                                            this.props.conferenceCRUDHandler("delete", this.state.conference.slug, token, this.state.conference)
                                        }
                                    }
                                >
                                    Delete
                                </Button>
                                <Button size="small"
                                        onClick={() => {
                                            let {user, authTokens} = this.context
                                            let token = String("Bearer " + String(authTokens.access))
                                            this.props.conferenceCRUDHandler("update", this.state.conference.slug, token, this.state.conference)
                                        }
                                    }
                                >
                                    Update
                                </Button>
                            </>
                        )}
                        {!this.props.canDelete && <Button size="small" color={"success"}
                                          onClick={this.createConference}
                        >
                            Create
                        </Button>}
                    </CardActions>
                }
            </Card>
        )
    }
}
