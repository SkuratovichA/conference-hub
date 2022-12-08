import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import axios from 'axios';

import Navbar from './components/Navbar'
import UsersList from './components/UsersList'
import LogIn from './components/LogIn'


class App extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <BrowserRouter>
                <main className="content">
                    <div>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<UsersList />} exact />
                            <Route path="/login" element={<LogIn />} />
                        </Routes>
                    </div>
                </main>
            </BrowserRouter>
        )
    };
}

export default App;
