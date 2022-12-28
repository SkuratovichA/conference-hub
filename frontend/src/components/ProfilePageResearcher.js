// author: Shchapaniak Andrei

import React, {useEffect, useState} from 'react';
import './styles/Other.css'
import {EditableTypography} from "./EditableTypography";
import {buyConfs, getAllConfsBucket, setProperty} from "../actions/OtherFunctions"
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
} from 'mdb-react-ui-kit';
import {userCRUDHandler} from "../actions/UserFunctions";
import {List, Paper, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Unstable_Grid2";
import ConfProfileCard from "./ConfProfileCard";
import {Modal, ModalDialog} from "@mui/joy";
import Conference from "./Conference";
import './styles/Other.css'
import { useSnackbar } from 'notistack';
import {userRefundMoney} from "../actions/OtherFunctions";

function getHash(s) {
  var h = 0, l = s.length, i = 0;
  if ( l > 0 )
    while (i < l)
      h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return h;
};

function getColor(colors_arr, slug_conf) {
    let num = getHash(slug_conf)
    num = num > 0 ? num : num * -1
    return colors_arr[num % 2]
}

const ProfilePageResearcher = ( props ) => {
    let [detailSlug, changeSlug] = useState(null)
    let [isOpen, funcOpen] = useState(false)
    let [isOpenRefundWindow, changeRefundWindow] = useState(false)
    let [moneyWereRefunded, refundMoneyChange] = useState(false)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    let [newBalance, changeBalance] = useState(props.user?.user?.balance)
    let [tmpConfPrice, changeTmpConfPrice] = useState(0)

    let colors = [
        [13, 14, 150, 0.15],
        [240, 14, 50, 0.1]
    ]

    const handleGroupNameValidation = (newName) => {
        return true
    }

    const refundMoney = () => {
        userRefundMoney(detailSlug, props.token)
            .then(() => {
                enqueueSnackbar('The money were refunded.', {variant: "success"});
                let new_var = (parseFloat(newBalance) + parseFloat(tmpConfPrice)).toFixed(2);
                changeBalance(new_var)
            })
            .then(() => {
                refundMoneyChange(!moneyWereRefunded)
            })
    }

    const handleGroupNameChange = (key, new_val) => {
        if (key === "fullname") {
            let new_values = new_val.trim().split(/\s+/);
            if (new_values.length === 2) {
                Object.assign(props.user, setProperty(props.user, 'user.name', new_values[1]))
                Object.assign(props.user, setProperty(props.user, 'last_name', new_values[0]))
            }
        }
        else if (key === "address") {
            let new_values = new_val.trim().split(/\s+/);
            if (new_values.length === 2) {
                Object.assign(props.user, setProperty(props.user, 'user.country', new_values[1]))
                Object.assign(props.user, setProperty(props.user, 'user.city', new_values[0].slice(0, -1)))
            }
        }
        else if (key === "email") {
            Object.assign(props.user, setProperty(props.user, 'user.email', new_val))
        }
        else if (key === "login") {
            Object.assign(props.user, setProperty(props.user, 'user.username', new_val))
        }

        userCRUDHandler("update", props.user, props.token)
    }

    const showMoreInfo = (conf_slug) => {
        changeSlug(conf_slug)
        funcOpen(true)
    }

    const modalRefund = (conf_slug) => {
        changeSlug(conf_slug)
        changeRefundWindow(true)
    }

    const getLectures = (confs) => {
        let new_arr = []

        for (let obj_conf of confs) {
            new_arr.push(obj_conf.conference)
        }

        changeListLectures(new_arr)
    }

    let [loaded, setLoad] = useState(false)
    let [my_lectures, changeListLectures] = useState([])

    useEffect(() => {
        getAllConfsBucket()
            .then((res) => {
                getLectures(res['bought'])
            })
            .then(() => {
                setLoad(true)
            })
    }, [moneyWereRefunded, ])

    if (loaded === false) {
        return "";
    }

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCardBody className="text-center">
                            <MDBCardImage
                              src={"http://localhost:8000/media/static/default.png"}
                              alt="avatar"
                              className="rounded-circle"
                              style={{ width: '250px', display: 'inline-block' }}
                              fluid
                            />
                            <div className="d-flex justify-content-center mb-2 profile-buttons">
                                <button type="button" className="btn btn-danger">
                                    Delete profile
                                </button>
                            </div>
                        </MDBCardBody>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3" className="card-text-center">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">
                                            <EditableTypography
                                                canEdit={true}
                                                variant="h1"
                                                initialValue={(props.user || {}).last_name + " " + ((props.user || {}).user || {}).name}
                                                onValidate={handleGroupNameValidation}
                                                onSave={(v) => handleGroupNameChange("fullname", v)}
                                                label="FullName"

                                                component="h1"
                                                level="inherit"
                                                fontSize="1.25em"
                                                mb="0.25em"
                                            />
                                        </MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                  <MDBCol sm="3" className="card-text-center">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <EditableTypography
                        canEdit={true}
                        variant="h1"
                        initialValue={((props.user || {}).user || {}).email}
                        onValidate={handleGroupNameValidation}
                        onSave={(v) => handleGroupNameChange("email", v)}
                        label="Email"

                        component="h1"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                      />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3" className="card-text-center">
                    <MDBCardText>Login</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <EditableTypography
                        canEdit={true}
                        variant="h1"
                        initialValue={((props.user || {}).user || {}).username}
                        onValidate={handleGroupNameValidation}
                        onSave={(v) => handleGroupNameChange("login", v)}
                        label="Login"

                        component="h1"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                      />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3" className="card-text-center">
                    <MDBCardText>Balance</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <EditableTypography
                        canEdit={false}
                        initialValue={newBalance + " $"}
                        onValidate={handleGroupNameValidation}
                        onSave={(v) => handleGroupNameChange("balance", v)}
                        label="Balance"

                        component="h1"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                      />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3" className="card-text-center">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      <EditableTypography
                        canEdit={true}
                        variant="h1"
                        initialValue={((props.user || {}).user || {}).city + ", " + ((props.user || {}).user || {}).country}
                        onValidate={handleGroupNameValidation}
                        onSave={(v) => handleGroupNameChange("address", v)}
                        label="Address"

                        component="h1"
                        level="inherit"
                        fontSize="1.25em"
                        mb="0.25em"
                      />
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

          <MDBRow>
            <MDBCol md="4">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                  <MDBCardText className="mb-4" style={{display: 'inline-block', justifyContent: 'center', alignItems: 'center'}}>My conferences</MDBCardText>
                    <Grid container justifyContent="center">
                        <Paper style={{maxHeight: "40vh", overflow: 'auto', width: "100%"}}>
                            <List>
                                {my_lectures.map(obj => (
                                    <ListItem alignItems="center" key={obj.name}>
                                        <ConfProfileCard
                                            conf={obj}
                                            callbackDetail={() => {
                                                showMoreInfo(obj.slug)
                                            }}
                                            color={getColor(colors, obj.slug)}
                                            callbackRefundModalDialog={() => {
                                                changeTmpConfPrice(obj.price)
                                                modalRefund(obj.slug)
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="4">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                  <MDBCardText className="mb-4">My lectures</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>

            <MDBCol md="4">
              <MDBCard className="mb-4 mb-md-0">
                <MDBCardBody>
                  <MDBCardText className="mb-4">My Organizations</MDBCardText>
                  <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>My organizations</MDBCardText>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
      </MDBContainer>

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
                    owner={props.user}
                    callBackOnCreate={null}
                    callBackOnDelete={null}
                />
            </ModalDialog>
        </Modal>
    }

    {
        isOpenRefundWindow
            &&
        <Modal open={isOpenRefundWindow} onClose={() => { changeRefundWindow(false) }}>
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
                    top: '5%',
                }}
            >
                <div className="PopUp">
                    <div className="pu-content-container">
                        {/*<img className="pu-img" src={bone} alt="bone" />*/}
                        <h3>Do you want to refund money for the selected conference?</h3>
                    </div>
                    <div className="pu-button-container">
                        <button type="button" className="btn btn-success"
                            onClick={() => { refundMoney(); changeRefundWindow(false) }}
                        >
                            Yes
                        </button>
                        <button type="button" className="btn btn-danger"
                            onClick={() => { changeRefundWindow(false) }}
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

export default ProfilePageResearcher