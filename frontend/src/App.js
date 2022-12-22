import './App.css';

import React, {Component} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Provider} from "react-redux";
import store from './store';
import Navbar from './components/Navbar'
import UsersList from './components/UsersList'
import LogIn from './components/LogIn'
import {ConferenceSearchWithRouter} from './components/ConferenceSearch'
import Profile from './components/Profile'
import PrivateRoute from './utils/PrivateRoute'
import {AuthProvider} from './context/AuthContext'
import Scheduler from './components/Scheduler'
import AuthContext from "./context/AuthContext";
import Conference from './components/Conference'
import Bucket from "./components/Bucket";

import {ContentSection} from './components/ContentSection'


class App extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <AuthProvider>
                        <ContentSection>
                            <main className="content">
                                <Navbar/>
                            </main>
                            <div style={{maxWidth: "1600px", margin: "0 auto"}}>
                            <Routes>
                                <Route path="/" element={<UsersList/>} exact/>
                                <Route path="/login" element={<LogIn/>}/>
                                <Route
                                    path="/conferences"
                                    element={
                                        <ConferenceSearchWithRouter
                                        />
                                    }
                                />
                                <Route path="/users/:username" element={<Profile/>}/>
                                <Route path="/:username/bucket" element={<Bucket/>}/>


                                <Route exact path='/private-page' element={<PrivateRoute/>}>
                                    <Route exact path='/private-page' element={<UsersList/>}/>
                                </Route>
                            </Routes>
                                </div>
                        </ContentSection>
                    </AuthProvider>
                </BrowserRouter>
            </Provider>
        )
    };
}

export default App;
