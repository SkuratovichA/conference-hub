import logo from './logo.svg';
import './App.css';
import React, {Component} from "react";
// import axios from 'axios';

import Navbar from './components/Navbar'
import UsersList from './components/UsersList'


class App extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <main className="content">
                <div>
                   <Navbar />
                    <UsersList />
                </div>
            </main>
        )
    };
}

export default App;
