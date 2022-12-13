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
import BucketCard from "./BucketCard";
import {Delete, ShoppingCart} from "@mui/icons-material";
import { Paper } from '@mui/material';
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';

const Bucket = ( props ) => {

    let [conferences_tickets, changeConfs] = useState([])
    let [user, changeUserInfo] = useState(null)
    let [loaded, setLoad] = useState(false)
    let {authTokens} = useContext(authContext)
    let token = authTokens?.access ? "Bearer " + authTokens.access : null
    let [totalPrice, changeTotalPrice] = useState(0)

    useEffect(() => {
        conferenceCRUDHandler("fetch_all", null, null, null)
            .then(confs => {
                changeConfs(confs)
                return getInfoUser(token)
            })
            .then(userinfo => {
                changeUserInfo(userinfo)
                setLoad(true)
            })

    }, [])

    if (loaded === false) {
        return ""
    }

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <div className="my-div">
                <div className="colorful-head-bucket">
                    Your Bucket
                </div>
                <Grid container justifyContent="center">
                    <Paper style={{maxHeight: "75vh", overflow: 'auto', width: "70%"}}>
                        <List>
                            {conferences_tickets.map(conference => (
                                <ListItem alignItems="center" key={conference.name}>
                                    <BucketCard
                                        conf={conference}
                                        button={<ShoppingCart />}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Button variant="contained" disableElevation style={{marginTop: '30px'}}>
                    Search conferences
                </Button>
            </div>
            <div className="my-div">
                <div className="colorful-head-buy">
                    Buy Tickets
                </div>
                <Grid container justifyContent="center">
                    <Paper style={{maxHeight: "75vh", overflow: 'auto', width: "70%"}}>
                        <List>
                            {conferences_tickets.map(conference => (
                                <ListItem alignItems="center" key={conference.name}>
                                    <BucketCard
                                        conf={conference}
                                        button={<Delete />}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Button variant="contained" color="success" style={{marginTop: '30px'}}>
                    Buy
                </Button>
                <div style={{color: "black"}}>
                    <b>Total price:</b> {totalPrice} $
                </div>
            </div>
        </section>
    );
}

export default Bucket