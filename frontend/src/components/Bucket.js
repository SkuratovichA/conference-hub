import React, {useEffect} from 'react';
import './styles/Other.css'
import {EditableTypography} from "./EditableTypography";
import { useContext } from "react";
import authContext from "../context/AuthContext";
import {setProperty} from "../actions/OtherFunctions"
/* eslint-disable no-useless-escape */
/* eslint-disable no-unexpected-multiline */
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBProgress,
  MDBProgressBar,
} from 'mdb-react-ui-kit';
import {getToken} from "../actions/UserFunctions";
import {useState} from "react";
import {userCRUDHandler} from "../actions/UserFunctions";
import {conferenceCRUDHandler} from "../actions/ConferenceFunctions";
import Grid from '@mui/material/Unstable_Grid2'
import {MuiCard} from "./ConferenceCard";
import {getInfoUser} from "../actions/UserFunctions";
import Conference from "./Conference";
import ConferenceModal from "./ConferenceModal";
import {getUsers} from "../actions/UserFunctions";

const Bucket = ( props ) => {

    let [conferences_tickets, changeConfs] = useState([])
    let [user, changeUserInfo] = useState(null)
    let [loaded, setLoad] = useState(false)
    let {authTokens} = useContext(authContext)
    let token = authTokens?.access ? "Bearer " + authTokens.access : null

    useEffect(() => {
        conferenceCRUDHandler("fetch_all", null, null, null)
            .then(confs => {
                console.log(confs)
                changeConfs(confs)
                return getInfoUser(token)
            })
            .then(userinfo => {
                changeUserInfo(userinfo)
                setLoad(true)
            })

        getUsers("all")
    }, [])

    if (loaded === false) {
        return ""
    }

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <div className="my-div one">Your Bucket</div>
            <div className="my-div two">But Tickets</div>
            {conferences_tickets.map(conference => (
                <div>
                    {conference.name}
                </div>
            ))}
            {/*<div>*/}
            {/*    <p>AAAAAAAAA</p>*/}
            {/*    <hr className="my-vline"/>*/}
            {/*</div>*/}
        </section>
    );
}

export default Bucket