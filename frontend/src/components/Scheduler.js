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
    Stack
} from '@mui/material'
import {MoneyFieldInputProps} from './MoneyFieldInputProps'
import {getUsers} from '../actions/UserFunctions'


const meetings = [
    {
        id: 1,
        name: 'Lecture One',
        type: "lecture",
        location: "somewhere",
        lecturer: 'Leslie Alexander',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        startDatetime: '2022-05-11T13:00',
        endDatetime: '2022-05-11T14:30',
    },
    {
        id: 2,
        name: 'Ukranian Fascists',
        type: "lecture",
        lecturer: 'Vladimir Putin',
        location: "somewhere",
        imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        startDatetime: '2022-12-13T15:00',
        endDatetime: '2022-12-13T15:30',
    },
    {
        id: 6,
        name: 'How to be a sexy pretty boy',
        type: "lecture",
        lecturer: 'Shchapaniak Andrei',
        location: "somewhere",
        imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        startDatetime: '2022-12-13T15:00',
        endDatetime: '2022-12-13T15:30',
    },
    {
        id: 7,
        name: 'one more',
        type: "lecture",
        location: "somewhere",
        lecturer: 'Shchapaniak Andrei',
        imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        startDatetime: '2022-12-13T15:00',
        endDatetime: '2022-12-13T15:30',
    },

    {
        id: 8,
        name: 'Skuratovich Aliaksandr',
        type: "lunch",
        location: "somewhere",
        lecturer: 'Shchapaniak Andrei',
        imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        startDatetime: '2022-12-13T15:00',
        endDatetime: '2022-12-13T15:30',
        price: "100$",
        menu: "suka",
    },
    {
        id: 9,
        name: 'Skuratovich Aliaksandr',
        type: "lunch",
        location: "somewhere",
        lecturer: 'aaa',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        startDatetime: '2022-12-13T15:00',
        endDatetime: '2022-12-13T15:30',
        price: "100$",
        menu: "suka",
    },
    {
        id: 10,
        name: 'Skuratovich Aliaksandr',
        type: "poster",
        location: "somewhere",
        lecturer: 'aaa',
        imageUrl:
            'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        startDatetime: '2022-12-13T15:00',
        endDatetime: '2022-12-13T15:30',
    },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Scheduler() {
    const eventTypes = {
        "lecture": 0,
        "poster": 1,
        "lunch": 2
    }
    const variant = "standard" // outline

    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    // used in create event form
    const [creatingEvent, setCreatingEvent] = useState(false)
    const [researchers, setResearchers] = useState([])
    const [newEventValues, setNewEventValues] = useState({
        name: "",
        type: "",
        participants: [],
        brief: "",
        start: "",
        end: "",
        price: 0,
    })

    const [loading, setLoading] = useState(true)

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
            setLoading(false)
        },
        []
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

    let selectedDayEvents = meetings.filter((meeting) =>
        isSameDay(parseISO(meeting.startDatetime), selectedDay)
    )

    const handleEventCreate = () => {
        if (creatingEvent === false) {
            setCreatingEvent(true)
            return
        }

        alert("create a confecence!")
        console.log(
            'new event values:', newEventValues
        )
        setCreatingEvent(false)
    }

    const newEventHandleChanges = (event) => {
        setNewEventValues({
            ...newEventValues,
            [event.target.name]: event.target.value
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

    const createEventForm = () => (
        <div className={"mt-3"}>
            <Stack direction={"column"} spacing={1.2}>
                <Stack direction={"row"} spacing={1} justifyContent={"space-between"}>
                    <TextField
                        sx={{width: "70%"}}
                        // id={"event-create-name"}
                        type="text"
                        label="Name"
                        variant={variant}
                        onChange={newEventHandleChanges}
                        name="name"

                        error={newEventValues.name === ""}
                    />
                    <FormControl sx={{minWidth: "30%", float: "right"}}>
                        <InputLabel htmlFor="event-create-type-select">Type</InputLabel>
                        <Select
                            labelId="event-create-type-select"
                            id="event-create-type-select"
                            value={newEventValues.type}
                            label="Event Type"
                            autoWidth
                            variant={variant}
                            onChange={newEventHandleChanges}
                            name="type"
                            error={newEventValues.type === ""}
                        >
                            <MenuItem value={"poster"}>poster session</MenuItem>
                            <MenuItem value={"lecture"}>lecture</MenuItem>
                            <MenuItem value={"lunch"}>lunch</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <TextField
                    style={{width: "100%"}}
                    id={"event-create-brief"}
                    type="text"
                    label="Brief"
                    variant={variant}
                    onChange={newEventHandleChanges}
                    name="brief"
                />

                {newEventValues.type !== "lunch" && (
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

                <Stack spacing={1} direction={"row"} justifyContent={"space-between"}>
                    <TextField
                        style={{width: "100%"}}
                        id={"event-create-time-start"}
                        label={"Start"}
                        type={"time"}
                        defaultValue={newEventValues.start}
                        InputLabelProps={{shrink: true}}
                        inputProps={{step: 60 * 15}}

                        variant={variant}
                        onChange={newEventHandleChanges}
                        name="start"

                        error={newEventValues.start >= newEventValues.end}
                    />
                    <TextField
                        style={{width: "100%"}}
                        id={"event-create-time-end"}
                        label={"End"}
                        type={"time"}
                        defaultValue={newEventValues.end}
                        InputLabelProps={{shrink: true}}
                        inputProps={{step: 60 * 15}}

                        variant={variant}
                        onChange={newEventHandleChanges}
                        name="end"

                        error={newEventValues.start >= newEventValues.end}
                    />
                </Stack>
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

    return (
        <div className="pt-16">
            <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
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
                                        {meetings.some((meeting) =>
                                            isSameDay(parseISO(meeting.startDatetime), day)
                                        ) && (
                                            <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <section className="mt-12 md:mt-0 md:pl-4">
                        <h2 className="font-semibold text-gray-900">
                            {creatingEvent ? "Add event for" : "Schedule for"}{' '}
                            <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                                {format(selectedDay, 'MMM dd, yyy')}
                            </time>
                        </h2>

                        {creatingEvent ? (
                            createEventForm()
                        ) : (
                            <Paper elevation={0} style={{maxHeight: 350, overflow: 'auto'}}>
                                <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                                    {selectedDayEvents.length > 0 ? (
                                        selectedDayEvents.map((meeting) => (
                                            <Event meeting={meeting} key={meeting.id}/>
                                        ))
                                    ) : (
                                        <p>No events for today.</p>
                                    )}
                                </ol>
                            </Paper>
                        )}

                        {creatingEvent ? (
                            <>
                                <Button
                                    sx={{float: "left"}}
                                    onClick={() => setCreatingEvent(false)}
                                    color={"error"}
                                >
                                    CANCEL
                                </Button>

                                <Button
                                    sx={{float: "right",}}
                                    onClick={handleEventCreate}
                                    disabled={!canCreateEvent()}
                                >
                                    ADD EVENT
                                </Button>
                            </>
                        ) : (
                            <Stack justyfyContent={"centre"}>
                                <Button
                                    onClick={() => setCreatingEvent(true)}
                                >
                                    ADD EVENT
                                </Button>
                            </Stack>
                        )}

                    </section>

                </div>
            </div>
        </div>
    )
}

function Event({meeting}) {
    let startDateTime = parseISO(meeting.startDatetime)
    let endDateTime = parseISO(meeting.endDatetime)

    const backgrounds = {
        'lunch': 'rgba(189,158,154,0.4)',
        'lecture': 'rgba(155,189,154,0.4)',
        'poster': 'rgba(163,154,189,0.4)',
    }

    const getProp = (a, prop, className) => {
        return a[prop] ? <p className={className}>{a[prop]}</p> : null;
    }

    return (
        <li
            style={{background: backgrounds[meeting.type]}}
            className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:opacity-30"
        >
            <img
                src={meeting.imageUrl}
                alt=""
                className="flex-none w-10 h-10 rounded-full"
            />

            <div className="flex-auto">

                <Stack direction={"row"} sx={{"justify-content": "space-between"}}>
                    {getProp(meeting, "name", "font-semibold text-gray-900")}
                    {getProp(meeting, "type", "text-gray-400 ")}
                </Stack>

                <p className="mt-0.5">
                    <time dateTime={meeting.startDatetime}>{format(startDateTime, 'h:mm a')}</time>
                    {' '}-{' '}
                    <time dateTime={meeting.endDatetime}>{format(endDateTime, 'h:mm a')}</time>
                </p>

                <Stack direction="row" sx={{"justify-content": "space-between"}}>
                    {getProp(meeting, "location", "text-gray-500")}
                    {getProp(meeting, "price", "text-gray-400")}
                </Stack>
            </div>


            {/*<Menu*/}
            {/*  as="div"*/}
            {/*  className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"*/}
            {/*>*/}
            {/*  <div>*/}
            {/*    <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">*/}
            {/*      <span className="sr-only">Open options</span>*/}
            {/*      <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />*/}
            {/*    </Menu.Button>*/}
            {/*  </div>*/}

            {/*  <Transition*/}
            {/*    as={Fragment}*/}
            {/*    enter="transition ease-out duration-100"*/}
            {/*    enterFrom="transform opacity-0 scale-95"*/}
            {/*    enterTo="transform opacity-100 scale-100"*/}
            {/*    leave="transition ease-in duration-75"*/}
            {/*    leaveFrom="transform opacity-100 scale-100"*/}
            {/*    leaveTo="transform opacity-0 scale-95"*/}
            {/*  >*/}
            {/*    <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">*/}
            {/*      <div className="py-1">*/}
            {/*        <Menu.Item>*/}
            {/*          {({ active }) => (*/}
            {/*            <a*/}
            {/*              href="#"*/}
            {/*              className={classNames(*/}
            {/*                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',*/}
            {/*                'block px-4 py-2 text-sm'*/}
            {/*              )}*/}
            {/*            >*/}
            {/*              Edit*/}
            {/*            </a>*/}
            {/*          )}*/}
            {/*        </Menu.Item>*/}
            {/*        <Menu.Item>*/}
            {/*          {({ active }) => (*/}
            {/*            <a*/}
            {/*              href="#"*/}
            {/*              className={classNames(*/}
            {/*                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',*/}
            {/*                'block px-4 py-2 text-sm'*/}
            {/*              )}*/}
            {/*            >*/}
            {/*              Delete*/}
            {/*            </a>*/}
            {/*          )}*/}
            {/*        </Menu.Item>*/}
            {/*      </div>*/}
            {/*    </Menu.Items>*/}
            {/*  </Transition>*/}
            {/*  */}
            {/*</Menu>*/}

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
