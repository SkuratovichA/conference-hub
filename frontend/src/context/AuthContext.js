// author: Shchapaniak Andrei

import React, { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {getInfoUser} from "../actions/UserFunctions";
import {changeNavbarLogin} from "../components/Navbar";
import Navbar from '../components/Navbar'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })

        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/conferences')
            changeNavbarLogin()
        }
        else {
            alert("Incorrect password or username. Try again.")
        }

    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }

    let updateToken = async () => {
        let response = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens.refresh})
        })

        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }
        else {
            logoutUser()
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    useEffect(() => {
        // const fourMinutes = 30 * 24 * 3600 * 1000
        const fourMinutes = 4 * 60 * 1000
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
                setLoading() // may be delete
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}