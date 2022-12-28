// author: Shchapaniak Andrei

import React, {useEffect} from 'react';
import './styles/Other.css'
import { useContext } from "react";
import authContext from "../context/AuthContext";
import {useState} from "react";
import Grid from '@mui/material/Unstable_Grid2'
import BucketCard from "./BucketCard";
import {Delete, ShoppingCart} from "@mui/icons-material";
import { Paper } from '@mui/material';
import { List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';
import {getAllConfsBucket} from "../actions/OtherFunctions";
import {buyConfs} from "../actions/OtherFunctions";
import {useNavigate} from "react-router-dom";
import Conference from "./Conference";
import {Modal, ModalDialog} from '@mui/joy'
import {addRemoveBucket} from "../actions/OtherFunctions";
import { useSnackbar } from 'notistack';

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
    let [isOpen, funcOpen] = useState(false)
    let [isOpenBuyWindow, changeBuyWindow] = useState(false)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    let [detailSlug, changeSlug] = useState(null)
    let navigate = useNavigate()

    const showMoreInfo = (conf_slug) => {
        changeSlug(conf_slug)
        funcOpen(true)
    }

    const deleteFromBucket = (conf_slug) => {
        let new_arr_to_buy = conferences_to_buy
        let new_arr_not_to_buy = conferences_not_to_buy
        let found = false

        addRemoveBucket('DELETE', conf_slug, token)
            .then((res => {
                for (let conf_obj of new_arr_to_buy) {
                    if (conf_obj.conference.slug === conf_slug) {
                        let idx = conferences_to_buy.indexOf(conf_obj)
                        new_arr_to_buy.splice(idx, 1)
                        found = true
                        break
                    }
                }

                if (found === false) {
                    for (let conf_obj of new_arr_not_to_buy) {
                        if (conf_obj.conference.slug === conf_slug) {
                            let idx = conferences_not_to_buy.indexOf(conf_obj)
                            new_arr_not_to_buy.splice(idx, 1)
                            changeTotalPrice(totalPrice - parseInt(conf_obj.conference.price))
                            break
                        }
                    }
                }

                deleteFromBuy(new_arr_not_to_buy)
                addToBuy(new_arr_to_buy)
                changeAction(!action)
            }))

        enqueueSnackbar('The conference has been deleted from the bucket.', {variant: "info"});
    }

    const buySelectedConfs = () => {
        buyConfs(conferences_not_to_buy, token)
            .then((res) => {
                if (res >= 200 && res <= 299) {
                    deleteFromBuy([])
                    changeTotalPrice(0)
                    enqueueSnackbar('Conferences were successfully purchased.', {variant: "success"});
                }
                else {
                    enqueueSnackbar('You do not have enough money.', {variant: "error"});
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
                    addToBuy(res['in_bucket'])
                    // console.log(res)
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
                {
                    conferences_to_buy.length > 0
                        &&
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
                                            callbackDetail={() => {
                                                showMoreInfo(obj.conference.slug)
                                            }}
                                            callbackDeleteFromBucket={() => {
                                                deleteFromBucket(obj.conference.slug)
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                }
                <Button variant="contained" disableElevation style={{marginTop: '30px'}}
                    onClick={() => {
                        navigate('/conferences')
                    }}
                >
                    Search conferences
                </Button>
            </div>
            <div className="my-div">
                <div className="colorful-head-buy">
                    Buy Tickets
                </div>
                {
                    conferences_not_to_buy.length > 0
                        &&
                    <div>
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
                                                callbackDetail={() => {
                                                    showMoreInfo(obj.conference.slug)
                                                }}
                                                callbackDeleteFromBucket={() => {
                                                    deleteFromBucket(obj.conference.slug)
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                        <Button variant="contained" color="success" style={{marginTop: '30px'}}
                            onClick={() => {
                                changeBuyWindow(true)
                            }}
                        >
                            Buy
                        </Button>
                        <div style={{color: "black"}}>
                            <b>Total price:</b> {totalPrice} $
                        </div>
                    </div>
                }
            </div>
            {
                isOpen
                    &&
                <Modal open={isOpen} onClose={() => { funcOpen(false) }}>
                    <ModalDialog
                        aria-labelledby="basic-modal-dialog-title"
                        aria-describedby="basic-modal-dialog-description"
                        sx={{
                            border: 'none',
                            maxWidth: '80%',
                            minWidth: '60%',
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                            background: 'transparent',
                            color: 'rgb(245,245,246)'
                        }}
                    >
                        <Conference
                            canEdit={false}
                            newConf={false}
                            slug={detailSlug}
                            owner={user}
                            callBackOnCreate={null}
                            callBackOnDelete={null}
                        />
                    </ModalDialog>
                </Modal>
            }

            {
                isOpenBuyWindow
                    &&
                <Modal open={isOpenBuyWindow} onClose={() => { changeBuyWindow(false) }}>
                    <ModalDialog
                        aria-labelledby="basic-modal-dialog-title"
                        aria-describedby="basic-modal-dialog-description"
                        sx={{
                            border: 'none',
                            maxWidth: '80%',
                            minWidth: '60%',
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                            background: 'transparent',
                            color: 'rgb(245,245,246)',
                            top:' 5%',
                        }}
                    >
                        <div className="PopUp">
                            <div className="pu-content-container">
                                {/*<img className="pu-img" src={bone} alt="bone" />*/}
                                <h3>Do you want to buy {conferences_not_to_buy.length === 1 ?
                                    conferences_not_to_buy.length + " ticket?" :
                                    conferences_not_to_buy.length + " tickets?"
                                }
                                </h3>
                            </div>
                            <div className="pu-button-container">
                                <button type="button" className="btn btn-success"
                                    onClick={() => { buySelectedConfs(); changeBuyWindow(false) }}
                                >
                                    Yes
                                </button>
                                <button type="button" className="btn btn-danger"
                                    onClick={() => { changeBuyWindow(false) }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </ModalDialog>
                </Modal>
            }
        </section>
    );
}

export default Bucket