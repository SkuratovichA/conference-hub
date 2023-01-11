// author: Skuratovich Aliaksandr

import {useEffect, Fragment, useState} from 'react'
import './styles/Scheduler.css'
import {Menu, Transition} from '@headlessui/react'
import {DotsVerticalIcon} from '@heroicons/react/outline'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid'
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
    differenceInSeconds
} from 'date-fns'
import {
    Autocomplete,
    Chip,
    TextField,
    MenuItem,
    InputLabel,
    Select,
    FormControl,
    Button,
    Paper,
    Stack,
    IconButton,
    AvatarGroup,
    Typography, Avatar,
} from '@mui/material'
import {MoneyFieldInputProps} from './MoneyFieldInputProps'
import {getUsers} from '../actions/UserFunctions'
import ClearIcon from '@mui/icons-material/Clear'
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import {conferenceCRUDHandler} from "../actions/ConferenceFunctions";
import {EuroSymbol} from "@mui/icons-material";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Scheduler({
    conference,
    canEdit,
    setFatherKostyl,
    fatherKostyl
}) {
    const eventTypes = {
        "lecture": 0,
        "poster": 1,
        "lunch": 2
    }
    let defaultEventState = ({
        event_id: null, // just for compatibility
        name: "",
        type: "",
        participants: [],
        date_time: null,
        date_time_end: null,
        description: "",
        start: "12:00",
        end: "12:45",
        price: 0,
        modified: false
    })
    const variant = "standard" // outline

    const [eventsState, setEvents] = useState([])

    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    // states: [viewingEvents, viewingEvent, creatingEvent]
    const [rightSideState, setRightSideState] = useState('viewingEvents')
    const [newEventValues, setNewEventValues] = useState(defaultEventState)
    const [researchers, setResearchers] = useState([])
    const [loading, setLoading] = useState(true)

    const [changeKostyli, setChangeKostyli] = useState(false)

    useEffect(
        () => {
            setLoading(true);
            getUsers("researchers")
                .then((r) => {
                        let repr = (user) => (user.user.name + " " + user.last_name + " - " + user.user.email)
                        setResearchers(r.map((user) => ({
                            "email": user.user.email,
                            "username": user.user.username,
                            "repr": repr(user)
                        })))
                    }
                )
            conferenceCRUDHandler("fetchEvents", conference)
                .then((newEvents) => {
                        setEvents(newEvents)
                    }
                )
            setLoading(false)
        },
        [changeKostyli]
    )
    if (loading) {
        return <></>
    }

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: -1})
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1})
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    let selectedDayEvents = eventsState.filter((event) =>
        isSameDay(parseISO(event.date_time), selectedDay)
    )

    const manipulateEvent = (optionalAction) => {
        switch (rightSideState) {

            case "creatingEvent":
                let _date = format(selectedDay, 'yyyy-MM-dd')
                let new_event = {
                    name: newEventValues.name,
                    type: newEventValues.type,
                    location: "somewhere",
                    participants:
                        researchers
                            .filter(res => newEventValues.participants.includes(res.repr))
                            .map(it => it.email)
                    ,
                    date_time: _date + "T" + newEventValues.start,
                    date_time_end: _date + "T" + newEventValues.end,
                    description: newEventValues.description,
                    price: newEventValues['price']
                }

                setRightSideState("viewingEvents")
                setNewEventValues(defaultEventState)

                let duration = differenceInSeconds(parseISO(new_event['date_time_end']), parseISO(new_event['date_time']))
                new_event = {
                    name: new_event['name'],
                    date_time: new_event['date_time'],
                    date_time_end: new_event['date_time_end'],
                    duration: duration,
                    location: new_event['location'],
                    description: new_event['description'],
                    type: new_event['type'],
                    price: new_event['price'],
                }
                conferenceCRUDHandler("createEvent", conference, null, new_event)
                break

            case "viewingEvent":
                switch (optionalAction) {
                    case "delete":
                        conferenceCRUDHandler("deleteEvent", conference, null, newEventValues)
                        setRightSideState('viewingEvents')
                        setNewEventValues(defaultEventState)
                        break

                    case "update":
                        console.log('new event values', newEventValues)
                        conferenceCRUDHandler("updateEvent", conference, null, newEventValues)
                        break
                    default:
                        return
                }
                break

            case "viewingEvents":
                setRightSideState("creatingEvent")
                break
        }

    }


    const calendar = () => (
        <div className="md:pr-14">
            <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900">
                    {format(firstDayCurrentMonth, 'MMMM yyyy')}
                </h2>
                <button
                    type="button"
                    onClick={previousMonth}
                    className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Previous month</span>
                    <ChevronLeftIcon className="w-5 h-5" aria-hidden="true"/>
                </button>
                <button
                    onClick={nextMonth}
                    type="button"
                    className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Next month</span>
                    <ChevronRightIcon className="w-5 h-5" aria-hidden="true"/>
                </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
                {days.map((day, dayIdx) => (
                    <div
                        key={day.toString()}
                        className={classNames(
                            dayIdx === 0 && colStartClasses[getDay(day)],
                            'py-1.5'
                        )}
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedDay(day)}
                            className={classNames(
                                isEqual(day, selectedDay) && 'text-white',
                                !isEqual(day, selectedDay) &&
                                isToday(day) &&
                                'text-red-500',
                                !isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                isSameMonth(day, firstDayCurrentMonth) &&
                                'text-gray-900',
                                !isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                !isSameMonth(day, firstDayCurrentMonth) &&
                                'text-gray-400',
                                isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                isEqual(day, selectedDay) &&
                                !isToday(day) &&
                                'bg-gray-900',
                                !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                (isEqual(day, selectedDay) || isToday(day)) &&
                                'font-semibold',
                                'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                            )}
                        >
                            <time dateTime={format(day, 'yyyy-MM-dd')}>
                                {format(day, 'd')}
                            </time>
                        </button>

                        <div className="w-1 h-1 mx-auto mt-1">
                            {eventsState.some((event) =>
                                isSameDay(parseISO(event.date_time), day)
                            ) && (
                                <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const newEventHandleChanges = (event) => {
        setNewEventValues({
            ...newEventValues,
            [event.target.name]: event.target.value,
            modified: true
        })
    }

    const canCreateEvent = () => {
        return (
            newEventValues.name !== "" &&
            newEventValues.type !== "" &&
            (newEventValues.start < newEventValues.end) &&
            newEventValues.price >= 0
        )
    }

    const createEventForm = () => {
        return (
            <div className={"mt-3"}>
                <Stack direction={"column"} spacing={1.2}>
                    {/*Name, type*/}
                    <Stack direction={"row"} spacing={1} justifyContent={"space-between"}>
                        {/*Name*/}
                        <TextField
                            sx={{width: "70%"}}
                            type="text"
                            label="Name"
                            variant={variant}
                            onChange={newEventHandleChanges}
                            name="name"
                            error={newEventValues.modified && newEventValues.name === ""}
                            value={newEventValues.name}
                        />

                        {/*Type*/}
                        {newEventValues?.event_id !== null ? (
                            <p className="text-gray-400">{newEventValues.type}</p>
                        ) : (
                            <FormControl sx={{minWidth: "30%", float: "right"}}>
                                <InputLabel htmlFor="event-create-type-select">Type</InputLabel>
                                <Select
                                    value={newEventValues.type}
                                    labelId="event-create-type-select"
                                    id="event-create-type-select"
                                    label="Event Type"
                                    autoWidth
                                    variant={variant}
                                    onChange={newEventHandleChanges}
                                    name="type"
                                    error={newEventValues.modified && newEventValues.type === ""}
                                >
                                    <MenuItem value={"poster"}>poster session</MenuItem>
                                    <MenuItem value={"lecture"}>lecture</MenuItem>
                                    <MenuItem value={"lunch"}>lunch</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    </Stack>

                    {/*brief description */}
                    <TextField
                        defaultValue={newEventValues.description}
                        style={{width: "100%"}}
                        // id={"event-create-brief"}
                        type="text"
                        label="Description"
                        multiline
                        variant={variant}
                        name="description"
                        onChange={newEventHandleChanges}
                    />

                    {/*Participants*/}
                    {newEventValues.event_id === null && newEventValues.type !== "lunch" && (
                        <Autocomplete
                            multiple
                            freeSolo
                            id="event-create-participants"
                            limitTags={3}
                            options={researchers.map((it) => it.repr)}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => {
                                    return <Chip variant={variant}
                                                 label={researchers.filter((it) => it.repr === option)[0].email} {...getTagProps({index})} />
                                })
                            }
                            renderInput={(params) => (
                                <TextField
                                    variant="standard"
                                    {...params}
                                    label={newEventValues.type === "lecture" ? "Lecturers" : "Participants"}
                                />
                            )}
                            name="participants"
                            onChange={(e, values) => (
                                setNewEventValues({...newEventValues, "participants": values})
                            )}

                            variant={variant}
                        />
                    )}

                    {/*start time - end time*/}
                    <Stack spacing={1} direction={"row"} justifyContent={"space-between"}>
                        <TextField
                            style={{width: "100%"}}
                            id={"event-create-time-start"}
                            label={"Start"}
                            type={"time"}
                            // defaultValue={format(parseISO(newEventValues.date_time_end), 'h:mm')}
                            defaultValue={
                                newEventValues.event_id !== null ? format(parseISO(newEventValues.date_time), 'HH:mm') : ''
                            }
                            InputLabelProps={{shrink: true}}
                            inputProps={{step: 60 * 15}}
                            variant={variant}
                            onChange={newEventHandleChanges}
                            name="start"

                            error={
                                newEventValues.event_id !== null ? (
                                    newEventValues.date_time_end > newEventValues.startTime
                                ) : (
                                    newEventValues.modified && newEventValues.start >= newEventValues.end)
                            }
                        />
                        <TextField
                            style={{width: "100%"}}
                            id={"event-create-time-end"}
                            label={"End"}
                            type={"time"}
                            // defaultValue={format(parseISO(newEventValues.date_time_end), 'h:mm')}
                            defaultValue={
                                newEventValues.event_id !== null ? format(parseISO(newEventValues.date_time_end), 'HH:mm') : ''
                            }
                            InputLabelProps={{shrink: true}}
                            inputProps={{step: 60 * 15}}

                            variant={variant}
                            onChange={newEventHandleChanges}
                            name="end"

                            error={
                                newEventValues?.event_id !== null ? (
                                    newEventValues.date_time_end > newEventValues.startTime
                                ) : (
                                    newEventValues.modified && newEventValues.start >= newEventValues.end)
                            }
                        />
                    </Stack>

                    {/*Price*/}
                    {newEventValues.type === "lunch" && (
                        <TextField
                            id={"event-lunch-price"}
                            label="price"
                            value={newEventValues.price}
                            InputProps={{
                                inputComponent: MoneyFieldInputProps,
                            }}
                            variant="standard"
                            onChange={newEventHandleChanges}
                            name="price"
                        />
                    )}

                </Stack>
                <br/>
            </div>
        )
    }

    const rightSide = () => {

        const headerPart = (headerString) => (
            <h2 className="font-semibold text-gray-900">
                {headerString}{' '}
                <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                    {format(selectedDay, 'MMM dd, yyy')}
                </time>
            </h2>
        )

        switch (rightSideState) {
            case "creatingEvent":
                return (
                    <>
                        {headerPart("Create event for")}
                        {createEventForm()}

                        <Button
                            sx={{float: "left"}}
                            onClick={() => {
                                setRightSideState("viewingEvents");
                                setNewEventValues(defaultEventState)
                                setChangeKostyli(!changeKostyli)
                                setFatherKostyl(!fatherKostyl)
                            }}
                            color={"error"}
                        >
                            CANCEL
                        </Button>
                        <Button
                            sx={{float: "right",}}
                            onClick={() => {
                                manipulateEvent()
                                setFatherKostyl(!fatherKostyl)
                                setChangeKostyli(!changeKostyli)
                            }}
                            disabled={!canCreateEvent()}
                        >
                            ADD EVENT
                        </Button>
                    </>
                )
            case "viewingEvents":
                return (
                    <>
                        {headerPart("Events for")}

                        <Paper elevation={0} style={{maxHeight: 350, overflow: 'auto'}}>
                            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500 mr-10">
                                {selectedDayEvents.map((event) => {
                                        return (
                                            <EventListItem
                                                onClick={() => {
                                                    setRightSideState("viewingEvent");
                                                    setNewEventValues({...event, modified: false, start: null, end: null})
                                                }}
                                                event={event}
                                                key={event.event_id}
                                            />
                                        )
                                    }
                                )}
                                {selectedDayEvents.length === 0 &&
                                    <p>No events for today.</p>
                                }
                            </ol>
                        </Paper>

                        {canEdit && (
                            <Stack>
                                <Button
                                    onClick={() => {
                                        setRightSideState("creatingEvent")
                                        setChangeKostyli(!changeKostyli)
                                    }}
                                >
                                    ADD EVENT
                                </Button>
                            </Stack>
                        )}
                    </>
                )
            case "viewingEvent":
                return (
                    <Stack direction={"column"} spacing={1.2}>
                        {canEdit ? (
                            <Stack direction={"column"}>
                                {createEventForm()}
                                <Stack direction={"row"} justifyContent={"space-between"}>
                                    <Button
                                        color={"error"}
                                        xs={{float: "left"}}
                                        onClick={() => {
                                            manipulateEvent("delete")
                                            setChangeKostyli(!changeKostyli)
                                            setFatherKostyl(!fatherKostyl)
                                        }}
                                    >
                                        DELETE
                                    </Button>
                                    <Button
                                        xs={{float: "right"}}
                                        onClick={() => {
                                            manipulateEvent("update")
                                            setChangeKostyli(!changeKostyli)
                                            setFatherKostyl(!fatherKostyl)
                                        }}
                                    >
                                        UPDATE
                                    </Button>
                                </Stack>
                            </Stack>
                        ) : (
                            <Event
                                event={newEventValues}
                            />
                        )}
                        <Button
                            sx={{float: "left"}}
                            onClick={() => {
                                manipulateEvent()
                                setRightSideState("viewingEvents")
                                setNewEventValues(defaultEventState)
                            }}
                        >
                            BACK
                        </Button>
                    </Stack>
                )
        }
    }

    return (
        <div className="pt-16">
            <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">

                    {calendar()}

                    <section className="mt-12 md:mt-0 md:pl-4">
                        {rightSide()}
                    </section>
                </div>
            </div>
        </div>
    )
}

function Event({event}) {

    const viewingEvent = () => (
        <>
            <Paper elevation={0} style={{maxHeight: 350, height: 300, overflow: 'auto'}}>
                <Stack direction={"column"} spacing={"2.5"}>

                    <Stack xs={{marginBottom: "20px"}} direction={"row"} spacing={"1.3"} justifyContent={"center"}>
                        <h1 className="font-semibold text-gray-900">{event.name}</h1>
                    </Stack>

                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Typography variant={"body1"} className="text-gray-400">{event.type}</Typography>
                        <Typography variant={"body1"}>
                            {event.participants?.length || 0}
                            <GroupIcon size={"small"}/>
                        </Typography>
                    </Stack>

                    <Typography>{event.description}</Typography>

                    <Stack direction={"row"} spacing={1.2}>
                        <AccessTimeIcon size={"small"}/>
                        <Typography>
                            {format(parseISO(event.date_time), 'h:mm a')}
                            {' '}-{' '}
                            {format(parseISO(event.date_time_end), 'h:mm a')}
                        </Typography>
                    </Stack>

                    <Stack direction={"row"} spacing={1.2}>
                        <LocationOnIcon size={"small"}/> <Typography>{event.location}</Typography>
                    </Stack>

                </Stack>
            </Paper>
        </>
    )

    return <div style={{width: "100%"}}> {viewingEvent()} </div>
}

function EventListItem({event, onClick}) {
    let startDateTime = parseISO(event.date_time)
    let endDateTime = parseISO(event.date_time_end)

    const backgrounds = {
        'lunch': 'rgba(189,158,154,0.4)',
        'lecture': 'rgba(155,189,154,0.4)',
        'poster': 'rgba(163,154,189,0.4)',
    }

    const getProp = (a, prop, className) => {
        return a[prop] ? <p className={className}>
            {prop === 'price' && <EuroSymbol size={'small'}/>}{' '}
            {a[prop]}
        </p> : null;
    }

    return (
        <li
            onClick={() => onClick()}
            className="flex mb-0 items-center px-4 py-2 space-x-4 group rounded-xl cursor-pointer hover:ring focus:outline-none focus-within:bg-gray-100 hover:opacity-36"
            style={{background: backgrounds[event.type], width: "100%"}}
        >

                <div className="flex-auto ">
                    <Stack direction={"row"} sx={{justifyContent: "space-between"}}>
                        {getProp(event, "name", "font-semibold text-gray-900")}
                        {getProp(event, "type", "text-gray-400")}
                    </Stack>

                    <p className="mt-0.5">
                        <time dateTime={event.startDatetime}>{format(startDateTime, 'h:mm a')}</time>
                        {' '}-{' '}
                        <time dateTime={event.date_time_end}>{format(endDateTime, 'h:mm a')}</time>
                    </p>

                    <Stack direction="row" sx={{justifyContent: "space-between"}}>
                        {getProp(event, "location", "text-gray-500")}
                        {getProp(event, "price", "text-gray-400")}
                    </Stack>
                </div>

        </li>
    )
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]
