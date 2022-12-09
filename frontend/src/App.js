import './App.css';
import React, {Component} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import store from './store';


import Navbar from './components/Navbar'
import UsersList from './components/UsersList'
import LogIn from './components/LogIn'
import {ConferenceGrid} from './components/ConferenceGrid'
import ConferenceSearch from './components/ConferenceSearch'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import AuthContext from "./context/AuthContext";

const conferences = [
    {
        "pk": 1,
        "name": "one",
        "description": "hello-one",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "price": "1100$"
    },
    {
        "pk": 2,
        "name": "two",
        "description": "hello-two",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "price": "1200$"
    },
    {
        "pk": 3,
        "name": "three",
        "description": "hello-three",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "price": "1300$"
    },
    {
        "pk": 4,
        "name": "four",
        "description": "hello-four",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "price": "1400$"
    },
    {
        "pk": 5,
        "name": "five",
        "description": "hell-five",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "price": "1500$"
    },
    {
        "pk": 6,
        "name": "six",
        "description": "hello-six",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "price": "1600$"
    },
    {
        "pk": 7,
        "name": "seven",
        "description": "hello-seven",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "price": "1700$"
    },
    {
        "pk": 8,
        "name": "eight",
        "description": "hello-eight",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "price": "1800$"
    },
    {
        "pk": 9,
        "name": "nine",
        "description": "hello-nine",
        "date_from": "29.12.2000",
        "date_to": "10.1.2020",
        "price": "1900$"
    },
]

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conferences: conferences
        }
    };

    render() {
        return (
            <Provider store={store} >
                <BrowserRouter>
                    <AuthProvider>
                        <main className="content">
                            <div>
                                <Navbar />
                            </div>
                        </main>
                        <Routes>
                            <Route path="/" element={<UsersList />} exact />
                            <Route path="/login" element={<LogIn />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/:username" element={<Profile />} />

                            <Route exact path='/private-page' element={<PrivateRoute />}>
                                  <Route exact path='/private-page' element={<UsersList />}/>
                            </Route>
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </Provider>
        )
    };
}

export default App;
