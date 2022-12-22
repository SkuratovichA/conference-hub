// author: Shchapaniak Andrei

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
import {buyConfs} from "../actions/OtherFunctions";

/* eslint-disable no-useless-escape */
/* eslint-disable no-unexpected-multiline */

const Bucket = ( props ) => {

    let [conferences_not_to_buy, deleteFromBuy] = useState([])
    let [conferences_to_buy, addToBuy] = useState([])
    let [action, changeAction] = useState(false)
    let [user, changeUserInfo] = useState(null)
    let [loaded, setLoad] = useState(false)
    let {authTokens} = useContext(authContext)
    let token = authTokens?.access ? "Bearer " + authTokens.access : null
    let [totalPrice, changeTotalPrice] = useState(0)

    const buySelectedConfs = () => {
        buyConfs(conferences_not_to_buy, token)
            .then((res) => {
                console.log(res, 'aaaaaa res')
                if (res >= 200 && res <= 299) {
                    deleteFromBuy([])
                    changeTotalPrice(0)
                }
                else {
                    alert('You do not have enough money.')
                }
            })
    }

    const wantToBuy = (conf) => {
        let new_arr_to_buy = conferences_to_buy
        let new_arr_not_to_buy = conferences_not_to_buy

        for (let conf_obj of new_arr_to_buy) {
            if (conf_obj.conference.name === conf.name) {
                let idx = conferences_to_buy.indexOf(conf_obj)
                new_arr_to_buy.splice(idx, 1)
                new_arr_not_to_buy.push(conf_obj)
                changeTotalPrice(totalPrice + parseInt(conf_obj.conference.price))
                break
            }
        }

        addToBuy(new_arr_to_buy)
        deleteFromBuy(new_arr_not_to_buy)
        changeAction(!action)
    }

    const dontWantToBuy = (conf) => {
        let new_arr_to_buy = conferences_to_buy
        let new_arr_not_to_buy = conferences_not_to_buy

        for (let conf_obj of new_arr_not_to_buy) {
            if (conf_obj.conference.name === conf.name) {
                let idx = conferences_not_to_buy.indexOf(conf_obj)
                new_arr_not_to_buy.splice(idx, 1)
                new_arr_to_buy.push(conf_obj)
                changeTotalPrice(totalPrice - parseInt(conf_obj.conference.price))
                break
            }
        }

        addToBuy(new_arr_to_buy)
        deleteFromBuy(new_arr_not_to_buy)
        changeAction(!action)
    }


    useEffect(() => {
        if (loaded === false) {
            getAllConfsBucket()
                .then((res) => {
                    addToBuy(res)
                    console.log(res)
                })
                .then(userinfo => {
                    changeUserInfo(userinfo)
                    setLoad(true)
                })
        }
    }, [action, ])

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
                            {conferences_to_buy.map(obj => (
                                <ListItem alignItems="center" key={obj.conference.name}>
                                    <BucketCard
                                        conf={obj.conference}
                                        button={<ShoppingCart />}
                                        callbackBuy={() => {
                                            wantToBuy(obj.conference)
                                        }}
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
                            {conferences_not_to_buy.map(obj => (
                                <ListItem alignItems="center" key={obj.conference.name}>
                                    <BucketCard
                                        conf={obj.conference}
                                        button={<Delete />}
                                        callbackBuy={() => {
                                            dontWantToBuy(obj.conference)
                                        }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Button variant="contained" color="success" style={{marginTop: '30px'}}
                        onClick={() => {
                            buySelectedConfs()
                        }}>
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