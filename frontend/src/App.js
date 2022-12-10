import './App.css';
import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {Provider} from "react-redux";
import store from './store';

import Navbar from './components/Navbar'
import UsersList from './components/UsersList'
import LogIn from './components/LogIn'
import {ConferenceSearchWithRouter} from './components/ConferenceSearch'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import PrivateRoute from './utils/PrivateRoute'
import {AuthProvider} from './context/AuthContext'
import Scheduler from './components/Scheduler'
import AuthContext from "./context/AuthContext";
import Conference from './components/Conference'
/* eslint-disable no-useless-escape */

const conferences = [
    {
        "pk": 1,
        "name": "one",
        "slug": "one",
        "description": "hello-one",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "image": "https://source.unsplash.com/random",
        "price": "1100$"
    },
    {
        "pk": 2,
        "name": "two",
        "slug": "two",
        "description": "hello-two",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "image": "https://source.unsplash.com/random",
        "price": "1200$"
    },
    {
        "pk": 3,
        "name": "three",
        "slug": "three",
        "description": "hello-three",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "image": "https://source.unsplash.com/random",
        "price": "1300$"
    },
    {
        "pk": 4,
        "name": "four",
        "slug": "four",
        "description": "hello-four",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "image": "https://source.unsplash.com/random",
        "price": "1400$"
    },
    {
        "pk": 5,
        "name": "five",
        "slug": "five",
        "description": "hell-five",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "image": "https://source.unsplash.com/random",
        "price": "1500$"
    },
    {
        "pk": 6,
        "name": "six",
        "slug": "six",
        "description": "hello-six",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "image": "https://source.unsplash.com/random",
        "price": "1600$"
    },
    {
        "pk": 7,
        "name": "seven",
        "slug": "seven",
        "description": "hello-seven",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "image": "https://source.unsplash.com/random",
        "price": "1700$"
    },
    {
        "pk": 8,
        "name": "eight",
        "slug": "eight",
        "description": "hello-eight",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "image": "https://source.unsplash.com/random",
        "price": "1800$"
    },
    {
        "pk": 99,
        "name": "nine",
        "slug": "nine",
        "description": "hello-nine",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "image": "https://source.unsplash.com/random",
        "price": "1900$"
    },
]

function conferenceCRUDHandler(type, {_conference}) {
    console.log(_conference)
    switch (type) {
        case "fetch":
            console.log('Fetching data ...')
            let conference = _conference
            console.log(conference)

            for (let conf in conferences) {
                console.log(conf)

                if (conferences[conf].slug === conference.slug) {
                    console.log(`Conference found: ${conferences[conf]}`)
                    return conferences[conf]
                }
            }
            return null
        case "update":
            alert('Update a conference...')
            break;
        case "delete":
            alert('Delete a conference...')
            break;
        case "create":
            alert('Create a new conference...')
            break;
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conferences: conferences
        }
    };

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <AuthProvider>
                        <main className="content">
                            <Navbar/>
                        </main>
                        <Routes>
                            <Route path="/" element={<UsersList />} exact />
                            <Route path="/login" element={<LogIn />} />
                            <Route
                                path="/conferences"
                                element={<ConferenceSearchWithRouter
                                            conferenceCRUDHandler={conferenceCRUDHandler}
                                            conferences={conferences}/>
                                }
                            />
                            <Route path="/:username" element={<Profile/>}/>


                            <Route exact path='/private-page' element={<PrivateRoute/>}>
                                <Route exact path='/private-page' element={<UsersList/>}/>
                            </Route>
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </Provider>
        )
    };
}

export default App;
