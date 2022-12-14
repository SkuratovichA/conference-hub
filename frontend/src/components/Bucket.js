import React, {useEffect} from 'react';
import './styles/Other.css'
import { useContext } from "react";
import authContext from "../context/AuthContext";
import {useState} from "react";
import {conferenceCRUDHandler} from "../actions/ConferenceFunctions";
import Grid from '@mui/material/Unstable_Grid2'
import {getInfoUser} from "../actions/UserFunctions";
import BucketCard from "./BucketCard";
import {Delete, ShoppingCart} from "@mui/icons-material";
import { Paper } from '@mui/material';
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';
import {getAllConfsBucket} from "../actions/OtherFunctions";
import {getStateConfBucket} from "../actions/OtherFunctions";

/* eslint-disable no-useless-escape */
/* eslint-disable no-unexpected-multiline */

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

        getAllConfsBucket()
            .then((res) => {
                console.log(res)
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