import './App.css';
import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
// import axios from 'axios';


import Navbar from './components/Navbar'
import UsersList from './components/UsersList'
import LogIn from './components/LogIn'
import {ConferenceGrid} from './components/ConferenceGrid'
import ConferenceSearch from './components/ConferenceSearch'

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
            <BrowserRouter>
                <header className="header">
                    <Navbar/>
                </header>
                <main className="content">
                    <Routes>
                        <Route path="/" element={<UsersList/>} exact/>
                        <Route path="/conferences" element={<ConferenceSearch conferences={this.state.conferences} />}/>
                        <Route path="/login" element={<LogIn/>}/>
                    </Routes>
                </main>
            </BrowserRouter>
        )
    };
}

export default App;
